import {Canvas} from "@react-three/fiber";
import {useCallback, useState} from "react";
import {GameConfig} from "./types/GameConfig.ts";
import './styles.css';
import {Button} from "@components";

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

const initGameConfig: GameConfig = {
    repetitions: 30,
    colors: {
        center: '#000',
        sides: '#328bff',
    },
    circleDistance: 6,
    blinkInterval: 400,
    pauseInterval: 400,
}

function SaccadesModule() {
    const [gameConfig] = useState<GameConfig>(initGameConfig);
    const [gameState, setGameState] = useState<GameState>(initGameState);

    const startHideCircleInterval = useCallback(() =>
            setInterval(() => {
                const random = Math.random();
                if (random < 0.5) {
                    setGameState((prevState) => ({...prevState, leftCircle: 'hide'}));
                } else {
                    setGameState((prevState) => ({...prevState, rightCircle: 'hide'}));
                }
            }, gameConfig.blinkInterval + gameConfig.pauseInterval)
        , [gameConfig.blinkInterval, gameConfig.pauseInterval]);

    const startShowCirclesInterval = useCallback(() => setInterval(() => {
            setGameState((prevState) => ({...prevState, leftCircle: 'show', rightCircle: 'show'}));
        }, gameConfig.blinkInterval + gameConfig.pauseInterval),
        [gameConfig.blinkInterval, gameConfig.pauseInterval])

    const startGame = useCallback(() => {
        setGameState((prevState) => ({...prevState, state: 'playing'}));
        let hideCircleIntervalId: number;
        setTimeout(() => {
            hideCircleIntervalId = startHideCircleInterval();
        }, gameConfig.pauseInterval);
        const showCirclesIntervalId = startShowCirclesInterval();
        const gameTime = (gameConfig.repetitions + 1) * (gameConfig.blinkInterval + gameConfig.pauseInterval);

        setTimeout(() => {
            clearInterval(hideCircleIntervalId);
            clearInterval(showCirclesIntervalId);
            setGameState(initGameState);
        }, gameTime);
    }, [gameConfig.repetitions, gameConfig.blinkInterval, gameConfig.pauseInterval, startHideCircleInterval, startShowCirclesInterval]);

    const isPlaying = gameState.state === 'playing';

    return (
        <>
            <Canvas>
                <ambientLight intensity={Math.PI / 2}/>
                {gameState.leftCircle === 'show' && (
                    <mesh position={[-gameConfig.circleDistance, 0, 0]}>
                        <circleGeometry args={[0.3]}/>
                        <meshStandardMaterial color={gameConfig.colors.sides}/>
                    </mesh>
                )}
                <mesh position={[0, 0, 0]}>
                    <circleGeometry args={[0.3]}/>
                    <meshStandardMaterial color={gameConfig.colors.center}/>
                </mesh>
                {gameState.rightCircle === 'show' && (
                    <mesh position={[gameConfig.circleDistance, 0, 0]}>
                        <circleGeometry args={[0.3]}/>
                        <meshStandardMaterial color={gameConfig.colors.sides}/>
                    </mesh>
                )}
            </Canvas>
            {!isPlaying &&
                <Button onClick={startGame} className="start-button" size="lg"
                        type="button">
                    START
                </Button>
            }
        </>
    )
}

export default SaccadesModule;
