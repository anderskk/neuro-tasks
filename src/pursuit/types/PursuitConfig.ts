export type PursuitSpeed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
