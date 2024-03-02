import { useMemo, useState } from 'react';
import { PursuitConfig, PursuitSpeed, PursuitVariant } from './types/PursuitConfig.ts';
import { PursuitConfigCard } from './components/PursuitConfigCard.tsx';
import { AnimatedTopDownCircle } from './components/AnimatedTopDownCircle.tsx';
import { useIdle } from "@uidotdev/usehooks";
import { clsx } from 'clsx';
import { AnimatedLeftRightReturnCircle } from './components/AnimatedLeftRightReturnCircle.tsx';
import useScreenSize from '../lib/useScreenSize.ts';
import useLocalStorageState from '../lib/useLocalStorageState.ts';

const initPursuitConfig: PursuitConfig = {
  variant: 'topDownReset',
  leftRightReturn: {
    repetitions: 10,
    speed: 6,
    initialDelayMs: 500,
    circleSize: 50,
  },
  topDownReset: {
    repetitions: 10,
    speed: 3,
    initialDelayMs: 500,
    circleSize: 50,
  }
};

const speedToPixelsPerSecondMap: Record<PursuitSpeed, number> = {
  1: 300,
  2: 440,
  3: 580,
  4: 720,
  5: 860,
  6: 1000,
  7: 1140,
  8: 1280,
  9: 1420,
}

export default function PursuitModule() {
  const { width: screenWidth, height: screenHeight } = useScreenSize();
  const [gameConfig, setGameConfig] = useLocalStorageState('pursuitConfig', {
    defaultValue: () => initPursuitConfig
  });
  const changeVariant = (variant: PursuitVariant) => setGameConfig(prev => ({
    ...prev,
    variant
  }));
  const chosenVariant = gameConfig.variant;
  const variantConfig = gameConfig[chosenVariant];
  const [isPlaying, setIsPlaying] = useState(false);

  const pixelsToTravel = useMemo(() => {
    switch (chosenVariant) {
      case "leftRightReturn":
        return (screenWidth - variantConfig.circleSize) * 2;
      case "topDownReset":
        return screenHeight - variantConfig.circleSize;
    }
  }, [chosenVariant, screenHeight, screenWidth, variantConfig.circleSize]);

  const animationDurationMs = useMemo(() => {
    const pixelsPerSecond = speedToPixelsPerSecondMap[variantConfig.speed];
    return pixelsToTravel / pixelsPerSecond * 1000
  }, [pixelsToTravel, variantConfig.speed])
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
          animationDurationMs={animationDurationMs}
          initialDelayMs={variantConfig.initialDelayMs}
          radius={variantConfig.circleSize}
          animate={isPlaying}
          repetitions={variantConfig.repetitions}
          className="bg-foreground absolute top-[50%]"
        />
      ) : (
        <AnimatedTopDownCircle
          animationDurationMs={animationDurationMs}
          initialDelayMs={variantConfig.initialDelayMs}
          radius={variantConfig.circleSize}
          animate={isPlaying}
          repetitions={variantConfig.repetitions}
          className="bg-foreground absolute left-[50%]"
        />
      )}
    </div>
  )
}
