export const pursuitSpeedOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type PursuitSpeed = typeof pursuitSpeedOptions[number];
export const lowestPursuitSpeed: PursuitSpeed = pursuitSpeedOptions[0];
export const highestPursuitSpeed = pursuitSpeedOptions[pursuitSpeedOptions.length - 1]

export type PursuitVariant = 'topDownReset' | 'leftRightReturn' | 'topDownReturn'

export type PursuitConfig = {
  [key in PursuitVariant]: PursuitVariantConfig
} & {
  variant: PursuitVariant;
};

export interface PursuitVariantConfig {
  repetitions: number;
  speed: PursuitSpeed;
  initialDelayMs: number;
  circleSize: number;
}
