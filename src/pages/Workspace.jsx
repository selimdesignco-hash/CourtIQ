import React, { useState, useEffect } from 'react';
import { base44 } from "../api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Loader2, FileText, Download, Home, FolderOpen } from "lucide-react";
import GameSidebar from "../components/workspace/GameSidebar";
import PlayerCard from "../components/workspace/PlayerCard";
import PlayCard from "../components/workspace/PlayCard";

export default function Workspace() {
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [coachNotes, setCoachNotes] = useState('');
  const [allGames, setAllGames] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('gameId');

  useEffect(() => {
    const init = async () => {
      const games = await base44.entities.Game.list('-created_date');
      setAllGames(games);

      const targetId = gameId || games[0]?.id;

      if (!targetId) {
        navigate(createPageUrl('Upload'), { replace: true });
        return;
      }

      if (!gameId && games[0]) {
        navigate(createPageUrl(`Workspace?gameId=${games[0].id}`), { replace: true });
        return;
      }

      await loadGame(targetId);
    };

    init();
  }, [gameId, navigate]);

  const loadGame = async (id) => {
    const games = await base44.entities.Game.filter({ id });
    if (games.length === 0) {
      navigate(createPageUrl('Upload'), { replace: true });
      return;
    }

    const loadedGame = games[0];
    setGame(loadedGame);
    setCoachNotes(loadedGame.coach_notes || '');

    if (loadedGame.analysis_status === 'pending') {
      analyzeGame(loadedGame);
    }
  };

  const analyzeGame = async (gameData) => {
    setAnalyzing(true);
    try {
      await base44.entities.Game.update(gameData.id, { analysis_status: 'analyzing' });

      const analysisPrompt = `You are an expert basketball scout analyzing game film. 

Game Details:
- Title: ${gameData.title}
- Opponent: ${gameData.opponent || 'Unknown'}
- Tournament: ${gameData.tournament || 'N/A'}
- Date: ${gameData.date || 'N/A'}

Watch the provided video and generate a comprehensive scouting report with the following structure:

1. Key Players (identify 5-7 key players with their number, position, strengths, weaknesses, and tendencies)
2. Offensive Sets (identify common plays like High Pick & Roll, Horns, BLOB, etc. with frequency and description)
3. Defensive Schemes (identify defensive coverages like Man-to-man, Zone, Press with frequency and description)
4. Coaching Keys (3-5 strategic insights for game planning)

Return your analysis in this EXACT JSON format:
{
  "key_players": [
    {
      "name": "Player Name",
      "number": "#10",
      "position": "Guard",
      "strengths": ["Quick first step", "Good shooter"],
      "weaknesses": ["Left hand", "Defensive awareness"],
      "tendencies": "Drives right 80% of the time, looks for pull-up mid-range"
    }
  ],
  "offensive_sets": [
    {
      "name": "High Pick & Roll",
      "frequency": "35%",
      "description": "Primary action, usually run with #10 and #23"
    }
  ],
  "defensive_schemes": [
    {
      "name": "Man-to-Man",
      "frequency": "70%",
      "description": "Aggressive on-ball pressure, help from weak side"
    }
  ],
  "coaching_keys": [
    "Attack their weak side help defense",
    "Force them left - they struggle finishing with left hand",
    "Push pace - they're vulnerable in transition"
  ]
}

Provide realistic and detailed analysis based on what you observe in the video.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: analysisPrompt,
        file_urls: [gameData.video_url],
        response_json_schema: {
          type: "object",
          properties: {
            key_players: { type: "array" },
            offensive_sets: { type: "array" },
            defensive_schemes: { type: "array" },
            coaching_keys: { type: "array" }
          }
        }
      });

      await base44.entities.Game.update(gameData.id, {
        analysis_status: 'completed',
        scouting_report: result
      });

      await loadGame(gameData.id);
    } catch (error) {
      console.error('Analysis failed:', error);
      await base44.entities.Game.update(gameData.id, { analysis_status: 'failed' });
    } finally {
      setAnalyzing(false);
    }
  };

  const saveCoachNotes = async () => {
    await base44.entities.Game.update(game.id, { coach_notes: coachNotes });
    alert('Notes saved!');
  };

  const exportPDF = () => {
    alert('PDF export feature - integrate with your preferred PDF library');
  };

  if (!game) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex">
      {/* Sidebar */}
      <GameSidebar games={allGames} currentGameId={gameId} />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{game.title}</h1>
            <div className="flex gap-4 text-gray-400">
              {game.opponent && <span>vs {game.opponent}</span>}
              {game.tournament && <span>• {game.tournament}</span>}
              {game.date && <span>• {new Date(game.date).toLocaleDateString()}</span>}
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Upload'))}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              New Upload
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(createPageUrl('Home'))}
              className="border-gray-700 text-gray-400 hover:text-white"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>

        {/* Analysis Status */}
        {(analyzing || game.analysis_status === 'analyzing') && (
          <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/30 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                <div>
                  <h3 className="text-white font-bold text-lg">AI Analysis in Progress...</h3>
                  <p className="text-gray-400">Analyzing players, plays, and defensive schemes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Video Player */}
        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="bg-black rounded-xl aspect-video flex items-center justify-center border border-gray-800">
              {game.video_url?.includes('youtube') ? (
                <iframe
                  src={game.video_url.replace('watch?v=', 'embed/')}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                />
              ) : (
                <video controls className="w-full h-full rounded-xl">
                  <source src={game.video_url} />
                </video>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Scouting Report */}
        {game.analysis_status === 'completed' && game.scouting_report && (
          <div className="space-y-8">
            {/* Export Button */}
            <div className="flex justify-end">
              <Button
                onClick={exportPDF}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export PDF Report
              </Button>
            </div>

            {/* Key Players */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-orange-500" />
                Key Players
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {game.scouting_report.key_players?.map((player, i) => (
                  <PlayerCard key={i} player={player} />
                ))}
              </div>
            </div>

            {/* Offensive Sets */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Offensive Sets</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {game.scouting_report.offensive_sets?.map((play, i) => (
                  <PlayCard key={i} play={play} type="offense" />
                ))}
              </div>
            </div>

            {/* Defensive Schemes */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Defensive Schemes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {game.scouting_report.defensive_schemes?.map((scheme, i) => (
                  <PlayCard key={i} play={scheme} type="defense" />
                ))}
              </div>
            </div>

            {/* Coaching Keys */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Coaching Keys</h2>
              <Card className="bg-gradient-to-b from-orange-500/10 to-black border-orange-500/30">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {game.scouting_report.coaching_keys?.map((key, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-orange-500 font-bold text-xl">{i + 1}.</span>
                        <span className="text-white text-lg">{key}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Coach Notes */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-white mb-6">Coach Notes</h2>
          <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800">
            <CardContent className="p-6">
              <Textarea
                value={coachNotes}
                onChange={(e) => setCoachNotes(e.target.value)}
                placeholder="Add your own observations, game plan adjustments, or reminders..."
                className="bg-black border-gray-700 text-white min-h-[200px] mb-4"
              />
              <Button
                onClick={saveCoachNotes}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
