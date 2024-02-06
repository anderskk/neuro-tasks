import {Canvas, Vector3} from "@react-three/fiber";
import {useCallback, useMemo, useState} from "react";
import {GameConfig, OrientationConfig} from "./types/GameConfig.ts";
import './styles.css';
import {Button, Card, CardContent, CardHeader, CardTitle, useTheme} from "@components";
import {OrientationSwitch} from "./components/OrientationSwitch.tsx";
import {MeshCircle} from "./components/MeshCircle.tsx";

interface GameState {
    state: 'playing' | 'notPlaying';
    leftCircle: 'show' | 'hide';
    rightCircle: 'show' | 'hide';
}

const initGameState: GameState = {
    state: 'notPlaying',
    leftCircle: 'show',
    rightCircle: 'show',
}

const initHorizontalConfig: OrientationConfig = {
    repetitions: 30,
    circleColors: {
        lightMode: {
            center: '#000',
            sides: '#328bff',
        },
        darkMode: {
            center: '#fff',
            sides: '#4aceff',
        }
    },
    circleDistance: 6,
    blinkInterval: 400,
    pauseInterval: 400,
}

const initVerticalConfig: OrientationConfig = {
    ...initHorizontalConfig,
    circleDistance: 3.2,
}

const initGameConfig: GameConfig = {
    orientation: 'horizontal',
    horizontal: initHorizontalConfig,
    vertical: initVerticalConfig,
}

function SaccadesModule() {
    const {resolveTheme} = useTheme();
    const [gameConfig, setGameConfig] = useState<GameConfig>(initGameConfig);
    const [gameState, setGameState] = useState<GameState>(initGameState);
    const orientationConfig = useMemo(() => gameConfig[gameConfig.orientation], [gameConfig]);
    const leftCirclePosition: Vector3 = useMemo(() => {
        return gameConfig.orientation === 'horizontal' ? [orientationConfig.circleDistance, 0, 0] : [0, orientationConfig.circleDistance, 0];
    }, [gameConfig.orientation, orientationConfig.circleDistance]);
    const circleColors = useMemo(() => {
        return resolveTheme() === 'light' ? orientationConfig.circleColors.lightMode : orientationConfig.circleColors.darkMode
    }, [resolveTheme, orientationConfig]);

    const rightCirclePosition: Vector3 = useMemo(() => {
        return gameConfig.orientation === 'horizontal' ? [-orientationConfig.circleDistance, 0, 0] : [0, -orientationConfig.circleDistance, 0];
    }, [gameConfig.orientation, orientationConfig.circleDistance]);

    const startHideCircleInterval = useCallback(() =>
            setInterval(() => {
                const random = Math.random();
                if (random < 0.5) {
                    setGameState((prevState) => ({...prevState, leftCircle: 'hide'}));
                } else {
                    setGameState((prevState) => ({...prevState, rightCircle: 'hide'}));
                }
            }, orientationConfig.blinkInterval + orientationConfig.pauseInterval)
        , [orientationConfig.blinkInterval, orientationConfig.pauseInterval]);

    const startShowCirclesInterval = useCallback(() => setInterval(() => {
            setGameState((prevState) => ({...prevState, leftCircle: 'show', rightCircle: 'show'}));
        }, orientationConfig.blinkInterval + orientationConfig.pauseInterval),
        [orientationConfig.blinkInterval, orientationConfig.pauseInterval])

    const startGame = useCallback(() => {
        setGameState((prevState) => ({...prevState, state: 'playing'}));
        let hideCircleIntervalId: number;
        setTimeout(() => {
            hideCircleIntervalId = startHideCircleInterval();
        }, orientationConfig.pauseInterval);
        const showCirclesIntervalId = startShowCirclesInterval();
        const gameTime = (orientationConfig.repetitions + 1) * (orientationConfig.blinkInterval + orientationConfig.pauseInterval);

        setTimeout(() => {
            clearInterval(hideCircleIntervalId);
            clearInterval(showCirclesIntervalId);
            setGameState(initGameState);
        }, gameTime);
    }, [orientationConfig.repetitions, orientationConfig.blinkInterval, orientationConfig.pauseInterval, startHideCircleInterval, startShowCirclesInterval]);

    const isPlaying = gameState.state === 'playing';

    return (
        <>
            <Canvas>
                <ambientLight intensity={1.5}/>
                {gameState.leftCircle === 'show' && (
                    <MeshCircle position={leftCirclePosition}
                                color={circleColors.sides} radius={0.3}/>
                )}
                <MeshCircle position={[0, 0, 0]}
                            color={circleColors.center} radius={0.3}/>
                {gameState.rightCircle === 'show' && (
                    <MeshCircle position={rightCirclePosition}
                                color={circleColors.sides} radius={0.3}/>
                )}
            </Canvas>
            {!isPlaying && (
                <Card className="fixed left-8 bottom-10">
                    <CardHeader>
                        <CardTitle>Saccades</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-4">
                        <OrientationSwitch value={gameConfig.orientation}
                                           onToggle={() => setGameConfig((prevState) => ({
                                               ...prevState,
                                               orientation: prevState.orientation === 'horizontal' ? 'vertical' : 'horizontal'
                                           }))}/>
                        <Button onClick={startGame} size="lg"
                                type="button">
                            START
                        </Button>
                    </CardContent>
                </Card>
            )
            }
        </>
    )
}

export default SaccadesModule;
