import { useState } from 'react';
import { PursuitConfig, PursuitSpeed } from './pursuitConfig.ts';
import { PursuitConfigCard } from './PursuitConfigCard.tsx';
import { AnimatedTopDownCircle } from './AnimatedTopDownCircle.tsx';
import { useIdle } from "@uidotdev/usehooks";
import { clsx } from 'clsx';

const initPursuitConfig: PursuitConfig = {
  mode: 'reset',
  orientation: 'vertical',
  repetitions: 10,
  speed: 8,
  initialDelayMs: 500,
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
  const totalDurationMs = (animationDurationMs * config.repetitions) + config.initialDelayMs;
  const isIdle = useIdle(500);

  const startGame = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), totalDurationMs);
  };

  return (
    <div className={clsx({
      'cursor-none': isIdle && isPlaying,
    }, 'h-full')}>
      {!isPlaying && (<PursuitConfigCard startGame={startGame}/>)}
      <AnimatedTopDownCircle
        animationDurationMs={animationDuration[config.speed]}
        initialDelayMs={config.initialDelayMs}
        radius={50}
        animate={isPlaying}
        repetitions={config.repetitions}
        className="bg-foreground absolute left-[50%]"
      />
    </div>
  )
}
