import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { MUSIC_TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = MUSIC_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const skipTrack = (direction: number) => {
    setCurrentTrackIndex((prev) => (prev + direction + MUSIC_TRACKS.length) % MUSIC_TRACKS.length);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#151619] p-6 rounded-xl border border-zinc-800 shadow-2xl text-zinc-100 w-80">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Now Playing</h2>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
      </div>
      <p className="text-lg font-semibold tracking-tight">{track.title}</p>
      <p className="text-sm text-zinc-500 mb-6 font-mono">{track.artist}</p>
      <audio ref={audioRef} src={track.url} />
      <div className="flex justify-between items-center bg-black p-3 rounded-lg border border-zinc-800">
        <button onClick={() => skipTrack(-1)} className="text-zinc-400 hover:text-green-400"><SkipBack size={20} /></button>
        <button onClick={togglePlay} className="p-3 bg-green-500 rounded-full text-black hover:bg-green-400">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={() => skipTrack(1)} className="text-zinc-400 hover:text-green-400"><SkipForward size={20} /></button>
      </div>
    </div>
  );
}
