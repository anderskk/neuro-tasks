import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components';
import { PursuitConfig, PursuitVariant } from '../types/PursuitConfig.ts';
import { ChangeEvent, useCallback, useId } from 'react';

interface Props {
  startGame: () => void;
  config: PursuitConfig;
  onSelectVariant: (option: PursuitVariant) => void;
  onChangeRepetitions: (num: number) => void;
}

export const PursuitConfigCard: React.FC<Props> = ({startGame, config, onSelectVariant, onChangeRepetitions}) => {
  const repetitionsId = useId()
  const chosenVariantConfig = config[config.variant];
  const onRepetitionsChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const num = Number(event.target.value)
    if (num > 0) {
      onChangeRepetitions(Number(event.target.value))
    }
  }, [onChangeRepetitions]);

  return (
    <Card className="fixed left-20 top-10">
      <CardHeader>
        <CardTitle className="flex space-x-8 align-middle">
          <span>Pursuit</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
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
        <div>
          <Label htmlFor={repetitionsId}>Repetitions</Label>
          <Input
            value={chosenVariantConfig.repetitions}
            type="number"
            onChange={onRepetitionsChange}
            id={repetitionsId}
          />
        </div>
        <Button onClick={startGame} size="lg" type="button">
          START
        </Button>
      </CardContent>
    </Card>
  )
}