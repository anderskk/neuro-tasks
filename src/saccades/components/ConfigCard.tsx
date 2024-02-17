import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@components';
import { GameConfig } from '../types/GameConfig.ts';
import { OrientationSwitch } from './OrientationSwitch.tsx';
import { ChangeEvent, useCallback, useId } from 'react';

interface Props {
  gameConfig: GameConfig;
  toggleOrientation: () => void;
  startGame: () => void;
  onChangeBlinkDuration: (num: number) => void;
  onChangePauseDuration: (num: number) => void;
  onChangeRepetitions: (num: number) => void;
}

export const ConfigCard: React.FC<Props> = ({ gameConfig, toggleOrientation, startGame, onChangeRepetitions, onChangePauseDuration, onChangeBlinkDuration }) => {
  const repetitionsId = useId()
  const blinkDurationId = useId()
  const pauseDurationId = useId()

  const onRepetitionsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num > 0) {
      onChangeRepetitions(Number(event.target.value))
    }
  }, [onChangeRepetitions])

  const onBlinkDurationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num > 0) {
      onChangeBlinkDuration(Number(event.target.value))
    }
  }, [onChangeBlinkDuration])

  const onPauseDurationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num > 0) {
      onChangePauseDuration(Number(event.target.value))
    }
  }, [onChangePauseDuration])

  return (
    <Card className="fixed left-20 top-10">
      <CardHeader>
        <CardTitle className="flex space-x-8 align-middle">
          <span>Saccades</span>
          <OrientationSwitch
            value={gameConfig.orientation}
            onToggle={toggleOrientation}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <div>
          <Label htmlFor={repetitionsId}>Repetitions</Label>
          <Input
            value={gameConfig[gameConfig.orientation].repetitions}
            type="number"
            onChange={onRepetitionsChange}
            id={repetitionsId}
          />
        </div>
        <div>
          <Label htmlFor={blinkDurationId}>Blink duration (ms)</Label>
          <Input
            value={gameConfig[gameConfig.orientation].blinkDuration}
            type="number"
            onChange={onBlinkDurationChange}
            id={blinkDurationId}
          />
        </div>
        <div>
          <Label htmlFor={pauseDurationId}>Pause duration (ms)</Label>
          <Input
            value={gameConfig[gameConfig.orientation].pauseDuration}
            type="number"
            onChange={onPauseDurationChange}
            id={pauseDurationId}
          />
        </div>
        <Button onClick={startGame} size="lg" type="button">
          START
        </Button>
      </CardContent>
    </Card>
  )
}