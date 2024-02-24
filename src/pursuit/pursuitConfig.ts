export type PursuitSpeed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface PursuitConfig {
  repetitions: number;
  mode: 'reset' | 'smooth';
  speed: PursuitSpeed;
  orientation: 'horizontal' | 'vertical';
}
