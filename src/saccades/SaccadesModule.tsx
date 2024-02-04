import {Canvas} from "@react-three/fiber";
import {useCallback, useState} from "react";
import {GameConfig} from "./types/GameConfig.ts";
import './styles.css';

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
    gameTime: 31 * 1000,
    colors: {
        center: '#000',
        sides: '#328bff',
    },
    circleDistance: 6,
    blinkInterval: 500,
    pauseInterval: 500,
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

        setTimeout(() => {
            clearInterval(hideCircleIntervalId);
            clearInterval(showCirclesIntervalId);
            setGameState(initGameState);
        }, gameConfig.gameTime);
    }, [gameConfig.gameTime, gameConfig.pauseInterval, startHideCircleInterval, startShowCirclesInterval]);

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
                <button className="start-button" onClick={startGame}
                        type="button">
                    START
                </button>
            }
        </>
    )
}

export default SaccadesModule;
