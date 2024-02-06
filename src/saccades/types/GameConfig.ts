export interface GameConfig {
    repetitions: number;
    colors: {
        center: string;
        sides: string;
    };
    circleDistance: number;
    blinkInterval: number; // in milliseconds
    pauseInterval: number; // in milliseconds
}
