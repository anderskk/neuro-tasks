import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle, Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel, SelectTrigger, SelectValue
} from '@components';
import { PursuitConfig, PursuitVariant } from '../types/PursuitConfig.ts';

interface Props {
  startGame: () => void;
  config: PursuitConfig;
  onSelectVariant: (option: PursuitVariant) => void;
}

export const PursuitConfigCard: React.FC<Props> = ({ startGame, config, onSelectVariant }) => {
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
            <SelectValue placeholder="Select pursuit variant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pursuit variants</SelectLabel>
              <SelectItem value="topDownReset">Vertical with reset</SelectItem>
              <SelectItem value="topDownReturn">Vertical</SelectItem>
              <SelectItem value="leftRightReturn">Horizontal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={startGame} size="lg" type="button">
          START
        </Button>
      </CardContent>
    </Card>
  )
}