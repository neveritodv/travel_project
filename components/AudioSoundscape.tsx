'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

interface AudioSoundscapeProps {
  compact?: boolean;
}

export const AudioSoundscape: React.FC<AudioSoundscapeProps> = ({ compact = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMood, setActiveMood] = useState<'desert' | 'riad' | 'atlas'>('desert');
  const [showMoodMenu, setShowMoodMenu] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const toggleAudio = () => {
    if (!isPlaying) {
      startSoundscape();
    } else {
      stopSoundscape();
    }
  };

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm ambient chords (A Arabian scale resonance - A, C, E, G, G#)
      const frequencies = activeMood === 'desert' 
        ? [110, 164.81, 220, 329.63, 440] // Low warm desert wind drone
        : activeMood === 'riad'
        ? [130.81, 196, 261.63, 392, 523.25] // Bright courtyard fountain harmonic
        : [98, 146.83, 196, 293.66, 392]; // High mountain peak breeze

      oscillatorsRef.current = frequencies.map((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // LFO for slow breath-like swelling
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.1 + idx * 0.05;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain);
        lfoGain.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.02, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        return osc;
      });

      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio Context initialization restricted:', e);
    }
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try {
            o.stop();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
        setIsPlaying(false);
      }, 300);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  if (compact) {
    return (
      <div className="relative inline-flex items-center">
        <button
          onClick={toggleAudio}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowMoodMenu(!showMoodMenu);
          }}
          className={`relative p-2 rounded-full transition-all duration-300 focus:outline-none ${
            isPlaying
              ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'text-white/70 hover:text-amber-300 hover:bg-slate-800/60'
          }`}
          title={isPlaying ? `Audio Ambiance: ${activeMood.toUpperCase()} (Right click to change)` : "Enable Moroccan Audio Ambiance"}
        >
          {isPlaying ? (
            <Volume2 className="h-4 w-4 animate-pulse" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </button>

        {isPlaying && showMoodMenu && (
          <div className="absolute right-0 top-full mt-2 z-50 flex items-center gap-1 rounded-xl border border-amber-500/30 bg-slate-950/95 p-1.5 backdrop-blur-xl shadow-2xl">
            <button
              onClick={() => {
                setActiveMood('desert');
                stopSoundscape();
                setTimeout(startSoundscape, 100);
                setShowMoodMenu(false);
              }}
              className={`px-2 py-1 text-[10px] font-medium rounded-lg transition ${
                activeMood === 'desert' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sahara
            </button>
            <button
              onClick={() => {
                setActiveMood('riad');
                stopSoundscape();
                setTimeout(startSoundscape, 100);
                setShowMoodMenu(false);
              }}
              className={`px-2 py-1 text-[10px] font-medium rounded-lg transition ${
                activeMood === 'riad' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Riad
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-slate-950/80 px-3 py-1.5 text-xs text-amber-200 backdrop-blur-md transition hover:border-amber-400">
      <button
        onClick={toggleAudio}
        className="flex items-center gap-1.5 font-medium tracking-wide transition hover:text-amber-400"
        title="Toggle Moroccan Soundscape Audio"
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Sahara Ambiance</span>
          </>
        ) : (
          <>
            <VolumeX className="h-3.5 w-3.5 text-amber-400/60" />
            <span className="hidden sm:inline">Audio Ambiance</span>
          </>
        )}
      </button>

      {isPlaying && (
        <div className="flex items-center gap-1 border-l border-amber-500/20 pl-2">
          <button
            onClick={() => {
              setActiveMood('desert');
              if (isPlaying) {
                stopSoundscape();
                setTimeout(startSoundscape, 100);
              }
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded transition ${
              activeMood === 'desert' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-amber-200'
            }`}
          >
            Desert
          </button>
          <button
            onClick={() => {
              setActiveMood('riad');
              if (isPlaying) {
                stopSoundscape();
                setTimeout(startSoundscape, 100);
              }
            }}
            className={`px-1.5 py-0.5 text-[10px] rounded transition ${
              activeMood === 'riad' ? 'bg-amber-500/20 text-amber-300 font-semibold' : 'text-slate-400 hover:text-amber-200'
            }`}
          >
            Riad
          </button>
        </div>
      )}
    </div>
  );
};
