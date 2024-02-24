import { Button, Card, CardContent, CardHeader, CardTitle } from '@components';

interface Props {
  startGame: () => void;
}

export const PursuitConfigCard: React.FC<Props> = ({ startGame }) => {
  return (
    <Card className="fixed left-20 top-10">
      <CardHeader>
        <CardTitle className="flex space-x-8 align-middle">
          <span>Pursuit</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button onClick={startGame} size="lg" type="button">
          START
        </Button>
      </CardContent>
    </Card>
  )
}