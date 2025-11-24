import React from 'react';
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Video, Calendar } from "lucide-react";

export default function GameSidebar({ games, currentGameId }) {
  return (
    <div className="w-80 bg-black border-r border-gray-800 p-6 overflow-y-auto">
      <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
        <Video className="w-5 h-5 text-orange-500" />
        Your Games
      </h2>
      <div className="space-y-3">
        {games.map((game) => (
          <Link
            key={game.id}
            to={createPageUrl(`Workspace?gameId=${game.id}`)}
            className={`block p-4 rounded-lg border transition-all ${
              game.id === currentGameId
                ? 'bg-orange-500/10 border-orange-500'
                : 'bg-gray-900 border-gray-800 hover:border-gray-700'
            }`}
          >
            <h3 className="text-white font-medium mb-1 line-clamp-1">{game.title}</h3>
            {game.opponent && (
              <p className="text-sm text-gray-400 mb-2">vs {game.opponent}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {new Date(game.created_date).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                game.analysis_status === 'completed' 
                  ? 'bg-green-500/20 text-green-400'
                  : game.analysis_status === 'analyzing'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {game.analysis_status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
