import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioSrc?: string;
  title: string;
  description: string;
  duration?: string;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  title,
  description,
  duration = "0:45",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(45); // 45 seconds default
  const audioRef = useRef<HTMLAudioElement>(null);

  // Simulate audio playback when no real audio file is provided
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const simulationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && !audioSrc) {
      // Simulate audio progress
      simulationRef.current = setInterval(() => {
        setSimulatedProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (100 / totalDuration); // Progress per second
        });
      }, 1000);
    } else {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    }

    return () => {
      if (simulationRef.current) {
        clearInterval(simulationRef.current);
      }
    };
  }, [isPlaying, audioSrc, totalDuration]);

  const togglePlayPause = () => {
    if (audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      // Simulate play/pause
      if (isPlaying) {
        setSimulatedProgress(0);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = audioSrc ? (currentTime / totalDuration) * 100 : simulatedProgress;
  const displayTime = audioSrc ? currentTime : (simulatedProgress / 100) * totalDuration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`group/audio ${className}`}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/20 to-purple-400/20 rounded-xl blur-xl group-hover/audio:blur-2xl transition-all duration-500 opacity-50 group-hover/audio:opacity-75"></div>
      
      <div className="relative bg-gradient-to-br from-dark-800/80 via-dark-700/80 to-dark-800/80 backdrop-blur-xl border border-neon-pink/30 rounded-xl p-6 group-hover/audio:border-neon-pink/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-pink/20 to-purple-400/20 rounded-full flex items-center justify-center mr-4">
            <Mic className="w-6 h-6 text-neon-pink" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-semibold mb-1">{title}</h4>
            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <div className="text-neon-pink text-sm font-medium">
            {duration}
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="w-12 h-12 bg-gradient-to-r from-neon-pink to-purple-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-neon-pink/25 hover:shadow-neon-pink/40 transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>

          {/* Progress Bar */}
          <div className="flex-1">
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-pink to-purple-400 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
              {/* Animated glow effect */}
              {isPlaying && (
                <motion.div
                  className="absolute top-0 h-full w-4 bg-white/30 rounded-full blur-sm"
                  style={{ left: `${Math.max(0, progress - 2)}%` }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(displayTime)}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Volume Icon */}
          <Volume2 className="w-5 h-5 text-gray-400" />
        </div>

        {/* Verification Badge */}
        <div className="mt-4 flex items-center justify-center">
          <div className="bg-neon-pink/10 border border-neon-pink/20 rounded-full px-4 py-2 flex items-center">
            <div className="w-2 h-2 bg-neon-pink rounded-full mr-2 animate-pulse"></div>
            <span className="text-neon-pink text-sm font-medium">Nagranie weryfikacyjne</span>
          </div>
        </div>

        {/* Hidden audio element for real audio playback */}
        {audioSrc && (
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={() => {
              if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
              }
            }}
            onLoadedMetadata={() => {
              if (audioRef.current) {
                setTotalDuration(audioRef.current.duration);
              }
            }}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(0);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
