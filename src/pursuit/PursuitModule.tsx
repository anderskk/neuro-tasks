import { useState } from 'react';
import { PursuitConfig, PursuitSpeed, PursuitVariant } from './types/PursuitConfig.ts';
import { PursuitConfigCard } from './components/PursuitConfigCard.tsx';
import { AnimatedTopDownCircle } from './components/AnimatedTopDownCircle.tsx';
import { useIdle } from "@uidotdev/usehooks";
import { clsx } from 'clsx';
import { AnimatedLeftRightReturnCircle } from './components/AnimatedLeftRightReturnCircle.tsx';

const initPursuitConfig: PursuitConfig = {
  variant: 'topDownReset',
  leftRightReturn: {
    repetitions: 10,
    speed: 2,
    initialDelayMs: 500,
  },
  topDownReset: {
    repetitions: 10,
    speed: 8,
    initialDelayMs: 500,
  }
};

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
  const [gameConfig, setGameConfig] = useState(initPursuitConfig);
  const changeVariant = (variant: PursuitVariant) => setGameConfig(prev => ({
    ...prev,
    variant
  }));
  const chosenVariant = gameConfig.variant;
  const variantConfig = gameConfig[chosenVariant];
  const [isPlaying, setIsPlaying] = useState(false);
  const animationDurationMs = animationDuration[variantConfig.speed];
  const totalDurationMs = (animationDurationMs * variantConfig.repetitions) + variantConfig.initialDelayMs;
  const isIdle = useIdle(500);

  const startGame = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), totalDurationMs);
  };

  return (
    <div className={clsx({
      'cursor-none': isIdle && isPlaying,
    }, 'h-full')}>
      {!isPlaying && (
        <PursuitConfigCard
          startGame={startGame}
          config={gameConfig}
          onSelectVariant={changeVariant}
        />
      )}
      {chosenVariant === 'leftRightReturn' ? (
        <AnimatedLeftRightReturnCircle
          animationDurationMs={animationDuration[variantConfig.speed]}
          initialDelayMs={variantConfig.initialDelayMs}
          radius={50}
          animate={isPlaying}
          repetitions={variantConfig.repetitions}
          className="bg-foreground absolute top-[50%]"
        />
      ) : (
        <AnimatedTopDownCircle
          animationDurationMs={animationDuration[variantConfig.speed]}
          initialDelayMs={variantConfig.initialDelayMs}
          radius={50}
          animate={isPlaying}
          repetitions={variantConfig.repetitions}
          className="bg-foreground absolute left-[50%]"
        />
      )}
    </div>
  )
}
