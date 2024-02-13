import { useTheme, } from "@components";
import { Canvas, Vector3 } from "@react-three/fiber";
import { useCallback, useMemo, useState } from "react";
import { MeshCircle } from "./components/MeshCircle.tsx";
import "./styles.css";
import { GameConfig, OrientationConfig } from "./types/GameConfig.ts";
import { ConfigCard } from './components/ConfigCard.tsx';

interface GameState {
	state: "playing" | "notPlaying";
	leftCircle: "show" | "hide";
	rightCircle: "show" | "hide";
}

const initGameState: GameState = {
	state: "notPlaying",
	leftCircle: "show",
	rightCircle: "show",
};

const initHorizontalConfig: OrientationConfig = {
	repetitions: 30,
	circleColors: {
		lightMode: {
			center: "#000",
			sides: "#328bff",
		},
		darkMode: {
			center: "#fff",
			sides: "#4aceff",
		},
	},
	circleDistance: 6,
	blinkDuration: 400,
	pauseDuration: 400,
};

const initVerticalConfig: OrientationConfig = {
	...initHorizontalConfig,
	circleDistance: 3.2,
};

const initGameConfig: GameConfig = {
	orientation: "horizontal",
	horizontal: initHorizontalConfig,
	vertical: initVerticalConfig,
};

function SaccadesModule() {
	const { resolveTheme } = useTheme();
	const [gameConfig, setGameConfig] = useState<GameConfig>(initGameConfig);
	const [gameState, setGameState] = useState<GameState>(initGameState);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const  orientationConfig = useMemo(
		() => gameConfig[gameConfig.orientation],
		[gameConfig],
	);
	const leftCirclePosition: Vector3 = useMemo(() => {
		return gameConfig.orientation === "horizontal"
			? [orientationConfig.circleDistance, 0, 0]
			: [0, orientationConfig.circleDistance, 0];
	}, [gameConfig.orientation, orientationConfig.circleDistance]);
	const circleColors = useMemo(() => {
		return resolveTheme() === "light"
			? orientationConfig.circleColors.lightMode
			: orientationConfig.circleColors.darkMode;
	}, [resolveTheme, orientationConfig]);

	const rightCirclePosition: Vector3 = useMemo(() => {
		return gameConfig.orientation === "horizontal"
			? [-orientationConfig.circleDistance, 0, 0]
			: [0, -orientationConfig.circleDistance, 0];
	}, [gameConfig.orientation, orientationConfig.circleDistance]);

	const startHideCircleInterval = useCallback(
		() =>
			setInterval(() => {
				const random = Math.random();
				if (random < 0.5) {
					setGameState((prevState) => ({ ...prevState, leftCircle: "hide" }));
				} else {
					setGameState((prevState) => ({ ...prevState, rightCircle: "hide" }));
				}
			}, orientationConfig.blinkDuration + orientationConfig.pauseDuration),
		[orientationConfig.blinkDuration, orientationConfig.pauseDuration],
	);

	const startShowCirclesInterval = useCallback(
		() =>
			setInterval(() => {
				setGameState((prevState) => ({
					...prevState,
					leftCircle: "show",
					rightCircle: "show",
				}));
			}, orientationConfig.blinkDuration + orientationConfig.pauseDuration),
		[orientationConfig.blinkDuration, orientationConfig.pauseDuration],
	);

	const startGame = useCallback(() => {
		setGameState((prevState) => ({ ...prevState, state: "playing" }));
		let hideCircleIntervalId: number;
		setTimeout(() => {
			hideCircleIntervalId = startHideCircleInterval();
		}, orientationConfig.pauseDuration);
		const showCirclesIntervalId = startShowCirclesInterval();
		const gameTime =
			(orientationConfig.repetitions + 1) *
			(orientationConfig.blinkDuration + orientationConfig.pauseDuration);

		setTimeout(() => {
			clearInterval(hideCircleIntervalId);
			clearInterval(showCirclesIntervalId);
			setGameState(initGameState);
		}, gameTime);
	}, [
		orientationConfig.repetitions,
		orientationConfig.blinkDuration,
		orientationConfig.pauseDuration,
		startHideCircleInterval,
		startShowCirclesInterval,
	]);

	const isPlaying = gameState.state === "playing";

	const toggleOrientation = () =>
		setGameConfig((prevState) => ({
			...prevState,
			orientation:
				prevState.orientation === "horizontal"
					? "vertical"
					: "horizontal",
		}))

	const onRepetitionChange = (num: number) => setGameConfig((prevState) => ({
		...prevState,
		[prevState.orientation]: {
			...prevState[prevState.orientation],
			repetitions: num
		}
	}))

	const onBlinkDurationChange = (num: number) => setGameConfig((prevState) => ({
		...prevState,
		[prevState.orientation]: {
			...prevState[prevState.orientation],
			blinkDuration: num
		}
	}))

	const onPauseDurationChange = (num: number) => setGameConfig((prevState) => ({
		...prevState,
		[prevState.orientation]: {
			...prevState[prevState.orientation],
			pauseDuration: num
		}
	}))

	return (
		<>
			<Canvas>
				<ambientLight intensity={1.5} />
				{gameState.leftCircle === "show" && (
					<MeshCircle
						position={leftCirclePosition}
						color={circleColors.sides}
						radius={0.3}
					/>
				)}
				<MeshCircle
					position={[0, 0, 0]}
					color={circleColors.center}
					radius={0.3}
				/>
				{gameState.rightCircle === "show" && (
					<MeshCircle
						position={rightCirclePosition}
						color={circleColors.sides}
						radius={0.3}
					/>
				)}
			</Canvas>
			{!isPlaying && (
				<ConfigCard
					gameConfig={gameConfig}
					toggleOrientation={toggleOrientation}
					startGame={startGame}
					onChangeRepetitions={onRepetitionChange}
					onChangeBlinkDuration={onBlinkDurationChange}
					onChangePauseDuration={onPauseDurationChange}
				/>
			)}
		</>
	);
}

export default SaccadesModule;
