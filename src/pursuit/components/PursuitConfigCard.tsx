import {
  Button,
  Card,
  CardContent, CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider
} from '@components';
import { highestPursuitSpeed, lowestPursuitSpeed, PursuitConfig, PursuitVariant } from '../types/PursuitConfig';
import { ChangeEvent, useCallback, useId } from 'react';

interface Props {
  startGame: () => void;
  config: PursuitConfig;
  onSelectVariant: (option: PursuitVariant) => void;
  onChangeRepetitions: (reps: number) => void;
  onChangeSpeed: (speed: number) => void;
  onChangeCircleSize: (size: number) => void;
}

export const PursuitConfigCard: React.FC<Props> = ({
  startGame,
  config,
  onSelectVariant,
  onChangeRepetitions,
  onChangeSpeed,
  onChangeCircleSize,
}) => {
  const repetitionsId = useId();
  const speedId = useId();
  const circleSizeId = useId();
  const chosenVariantConfig = config[config.variant];
  const onRepetitionsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num > 0) {
      onChangeRepetitions(Number(event.target.value))
    }
  }, [onChangeRepetitions]);
  const onSpeedChange = useCallback((value: number[]) => {
    onChangeSpeed(value[0])
  }, [onChangeSpeed]);
  const onCircleSizeChange = useCallback((value: number[]) => {
    onChangeCircleSize(value[0])
  }, [onChangeCircleSize]);

  return (
    <Card className="fixed left-20 top-10 w-[360px]">
      <CardHeader>
        <CardTitle className="flex space-x-8 items-center">
          <span>Pursuit</span>
          <Select onValueChange={(variant: PursuitVariant) => onSelectVariant(variant)} value={config.variant}>
            <SelectTrigger>
              <SelectValue placeholder="Select pursuit variant"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="topDownReset">Vertical with reset</SelectItem>
                <SelectItem value="topDownReturn">Vertical</SelectItem>
                <SelectItem value="leftRightReturn">Horizontal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div>
          <Label htmlFor={repetitionsId}>Repetitions</Label>
          <Input
            value={chosenVariantConfig.repetitions}
            type="number"
            onChange={onRepetitionsChange}
            id={repetitionsId}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <Label htmlFor={circleSizeId}>Circle size</Label>
          <Slider
            value={[chosenVariantConfig.circleSize]}
            onValueChange={onCircleSizeChange}
            min={30}
            max={200}
            step={5}
            id={circleSizeId}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <Label htmlFor={speedId}>Speed</Label>
          <Slider
            value={[chosenVariantConfig.speed]}
            onValueChange={onSpeedChange}
            min={lowestPursuitSpeed}
            max={highestPursuitSpeed}
            step={1}
            id={speedId}
          />
          <div className="flex space-x-2 justify-between">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={startGame} size="lg" type="button" className="w-full">
          START
        </Button>
      </CardFooter>
    </Card>
  )
}