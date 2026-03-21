/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 p-8 flex flex-col items-center justify-center gap-12">
      <header className="text-center">
        <h1 className="text-6xl font-bold tracking-tighter text-green-500 mb-2">NEON SNAKE BEATS</h1>
        <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Hardware Interface v1.0</p>
      </header>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center bg-[#151619] p-4 rounded-xl border border-zinc-800">
            <span className="font-mono text-xs text-zinc-500 uppercase">Score</span>
            <span className="font-mono text-2xl font-bold text-green-500">{score.toString().padStart(4, '0')}</span>
          </div>
          <SnakeGame onScoreUpdate={setScore} />
        </div>
        <MusicPlayer />
      </div>
    </div>
  );
}
