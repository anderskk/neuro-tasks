
export interface OrientationConfig {
    repetitions: number;
    colors: {
        center: string;
        sides: string;
    };
    circleDistance: number;
    blinkInterval: number; // in milliseconds
    pauseInterval: number; // in milliseconds
}

export interface GameConfig {
    orientation: 'vertical' | 'horizontal';
    horizontal: OrientationConfig;
    vertical: OrientationConfig;
}
