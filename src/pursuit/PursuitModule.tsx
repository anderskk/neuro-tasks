import { useState } from 'react';
import { PursuitConfig, PursuitSpeed } from './pursuitConfig.ts';
import { PursuitConfigCard } from './PursuitConfigCard.tsx';
import { AnimatedTopDownCircle } from './AnimatedTopDownCircle.tsx';

const initPursuitConfig: PursuitConfig = {
  mode: 'reset',
  orientation: 'vertical',
  repetitions: 10,
  speed: 8,
}

const animationDuration: Record<PursuitSpeed, number> = {
  1: 5000,
  2: 4500,
  3: 4000,
  4: 3500,
  5: 3000,
  6: 2500,
  7: 2000,
  8: 1500,
  9: 1000,
}

export default function PursuitModule() {
  const [config] = useState(initPursuitConfig);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationDurationMs = animationDuration[config.speed];
  const totalDurationMs = animationDurationMs * config.repetitions;

  const startGame = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), totalDurationMs);
  };

  return (
    <div className="h-full">
      {!isPlaying && (<PursuitConfigCard startGame={startGame}/>)}
      <AnimatedTopDownCircle
        animationDurationMs={animationDuration[config.speed]}
        radius={50}
        animate={isPlaying}
        repetitions={config.repetitions}
        className="bg-foreground absolute left-[50%]"
      />
    </div>
  )
}
