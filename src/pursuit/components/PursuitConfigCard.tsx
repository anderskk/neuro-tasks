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
import { highestPursuitSpeed, lowestPursuitSpeed, PursuitConfig, PursuitVariant } from '../types/PursuitConfig.ts';
import { ChangeEvent, useCallback, useId } from 'react';

interface Props {
  startGame: () => void;
  config: PursuitConfig;
  onSelectVariant: (option: PursuitVariant) => void;
  onChangeRepetitions: (num: number) => void;
  onChangeSpeed: (num: number) => void;
}

export const PursuitConfigCard: React.FC<Props> = ({
  startGame,
  config,
  onSelectVariant,
  onChangeRepetitions,
  onChangeSpeed
}) => {
  const repetitionsId = useId();
  const sliderId = useId();
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

  return (
    <Card className="fixed left-20 top-10">
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
          <Label htmlFor={sliderId}>Speed</Label>
          <Slider
            value={[chosenVariantConfig.speed]}
            onValueChange={onSpeedChange}
            min={lowestPursuitSpeed}
            max={highestPursuitSpeed}
            step={1}
            className="w-[320px]"
            id={sliderId}
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