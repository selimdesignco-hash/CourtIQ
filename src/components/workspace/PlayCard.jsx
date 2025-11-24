import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Target, Shield } from "lucide-react";

export default function PlayCard({ play, type }) {
  const Icon = type === 'offense' ? Target : Shield;
  const color = type === 'offense' ? 'orange' : 'blue';

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800 hover:border-orange-500/50 transition-all">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-${color}-500/10 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-5 h-5 text-${color}-500`} />
            </div>
            <div className="text-lg">{play.name}</div>
          </div>
          <span className="text-sm font-normal text-orange-500">{play.frequency}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm leading-relaxed">{play.description}</p>
      </CardContent>
    </Card>
  );
}
