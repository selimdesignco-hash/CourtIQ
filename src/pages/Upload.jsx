import React, { useState } from 'react';
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Upload as UploadIcon, Link as LinkIcon, Loader2, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Upload() {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState('file');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [progressStep, setProgressStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    opponent: '',
    tournament: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      alert('File too large. Please upload a video under 500MB.');
      return;
    }

    setUploading(true);
    setProgressStep(1);
    setUploadProgress('Uploading video file...');
    
    try {
      // Upload video file
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      setProgressStep(2);
      setUploadProgress('Processing file...');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgressStep(3);
      setUploadProgress('Creating game record...');
      
      // Create game record
      const game = await base44.entities.Game.create({
        ...formData,
        video_url: file_url,
        analysis_status: 'pending'
      });

      setProgressStep(4);
      setUploadProgress('Almost there!');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to workspace
      navigate(createPageUrl(`Workspace?gameId=${game.id}`));
    } catch (error) {
      alert('Upload failed. Please try again.');
      console.error(error);
      setUploadProgress('');
      setProgressStep(0);
    } finally {
      setUploading(false);
    }
  };

  const handleYoutubeUpload = async () => {
    const youtubeUrl = document.getElementById('youtube-url').value;
    if (!youtubeUrl) {
      alert('Please enter a YouTube URL');
      return;
    }

    setUploading(true);
    setProgressStep(1);
    setUploadProgress('Validating YouTube link...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      setProgressStep(2);
      setUploadProgress('Connecting to YouTube...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProgressStep(3);
      setUploadProgress('Creating game record...');
      const game = await base44.entities.Game.create({
        ...formData,
        video_url: youtubeUrl,
        analysis_status: 'pending'
      });

      setProgressStep(4);
      setUploadProgress('Almost there!');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      navigate(createPageUrl(`Workspace?gameId=${game.id}`));
    } catch (error) {
      alert('Upload failed. Please try again.');
      console.error(error);
      setUploadProgress('');
      setProgressStep(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl font-bold text-white mb-4">Upload Game Film</h1>
          <p className="text-xl text-gray-400">
            Upload your footage and let AI generate a complete scouting report
          </p>
        </div>

        {/* Game Details Form */}
        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Game Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-gray-300">Game Title *</Label>
              <Input
                id="title"
                placeholder="e.g., vs Lakers - Championship Game"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="bg-black border-gray-700 text-white"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="opponent" className="text-gray-300">Opponent</Label>
                <Input
                  id="opponent"
                  placeholder="Opponent team name"
                  value={formData.opponent}
                  onChange={(e) => setFormData({...formData, opponent: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="tournament" className="text-gray-300">Tournament/League</Label>
                <Input
                  id="tournament"
                  placeholder="e.g., State Finals, AAU Circuit"
                  value={formData.tournament}
                  onChange={(e) => setFormData({...formData, tournament: e.target.value})}
                  className="bg-black border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="date" className="text-gray-300">Game Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="bg-black border-gray-700 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Loading Overlay */}
        {uploading && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-4">
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
                {/* Progress Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center">
                      <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
                    </div>
                    <div className="absolute -inset-2 bg-orange-500/20 rounded-full animate-ping" />
                  </div>
                </div>

                {/* Progress Text */}
                <h3 className="text-2xl font-bold text-white text-center mb-2">
                  {uploadProgress}
                </h3>
                <p className="text-gray-400 text-center mb-8">
                  Please wait while we process your upload
                </p>

                {/* Progress Steps */}
                <div className="space-y-3">
                  {[
                    { step: 1, label: 'Uploading file' },
                    { step: 2, label: 'Processing video' },
                    { step: 3, label: 'Creating record' },
                    { step: 4, label: 'Finalizing' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        progressStep >= item.step 
                          ? 'bg-orange-500 text-white' 
                          : progressStep === item.step - 1
                          ? 'bg-orange-500/20 text-orange-500 animate-pulse'
                          : 'bg-gray-800 text-gray-600'
                      }`}>
                        {progressStep > item.step ? '✓' : item.step}
                      </div>
                      <span className={`text-sm ${
                        progressStep >= item.step ? 'text-white font-medium' : 'text-gray-500'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-500 ease-out"
                    style={{ width: `${(progressStep / 4) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Method Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* File Upload */}
          <Card className={`bg-gradient-to-b from-gray-900 to-black border-2 cursor-pointer transition-all ${
            uploadType === 'file' ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => setUploadType('file')}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-orange-500" />
                Upload Video File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">Upload MP4, MOV, or AVI files directly</p>
              <label htmlFor="file-upload" className="block">
                <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                  uploading ? 'border-gray-700 bg-gray-900/50' : 'border-gray-700 hover:border-orange-500 hover:bg-orange-500/5'
                }`}>
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                      <p className="text-gray-400 font-medium">{uploadProgress}</p>
                      <p className="text-sm text-gray-500 mt-2">Large files may take a few minutes...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <UploadIcon className="w-12 h-12 text-gray-500 mb-4" />
                      <p className="text-white font-medium mb-2">Click to upload</p>
                      <p className="text-sm text-gray-500">MP4, MOV, AVI (max 500MB)</p>
                      <p className="text-xs text-gray-600 mt-1">Larger files may take several minutes</p>
                    </div>
                  )}
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  disabled={uploading || !formData.title}
                  className="hidden"
                />
              </label>
              {!formData.title && (
                <p className="text-sm text-orange-500 mt-2">Please enter a game title first</p>
              )}
            </CardContent>
          </Card>

          {/* YouTube Upload */}
          <Card className={`bg-gradient-to-b from-gray-900 to-black border-2 cursor-pointer transition-all ${
            uploadType === 'youtube' ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => setUploadType('youtube')}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-orange-500" />
                YouTube Link
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-6">Paste a YouTube video URL</p>
              <div className="space-y-4">
                <Input
                  id="youtube-url"
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-black border-gray-700 text-white"
                  disabled={uploading || !formData.title}
                />
                <Button
                  onClick={handleYoutubeUpload}
                  disabled={uploading || !formData.title}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Upload from YouTube
                    </>
                  )}
                </Button>
              </div>
              {!formData.title && (
                <p className="text-sm text-orange-500 mt-2">Please enter a game title first</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => navigate(createPageUrl('Home'))}
            className="border-gray-700 text-gray-400 hover:text-white"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
