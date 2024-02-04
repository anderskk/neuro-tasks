export interface GameConfig {
    gameTime: number; // in milliseconds
    colors: {
        center: string;
        sides: string;
    };
    circleDistance: number;
    blinkInterval: number; // in milliseconds
    pauseInterval: number; // in milliseconds
}
