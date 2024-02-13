interface CircleColors {
    center: string;
    sides: string;
}

export interface OrientationConfig {
    repetitions: number;
    circleColors: {
        lightMode: CircleColors
        darkMode: CircleColors
    };
    circleDistance: number;
    blinkDuration: number; // in milliseconds
    pauseDuration: number; // in milliseconds
}

export interface GameConfig {
    orientation: 'vertical' | 'horizontal';
    horizontal: OrientationConfig;
    vertical: OrientationConfig;
}
