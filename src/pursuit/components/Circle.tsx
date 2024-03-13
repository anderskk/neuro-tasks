import { cn } from '@utils';

interface Props {
  radius: number;
  className?: string;
}

export const Circle = ({ radius, className }: Props) => {
  const classList = cn('rounded-full relative', className);

  return (
    <div style={{ width: `${radius}px`, height: `${radius}px`}} className={classList}>
      <div className="absolute w-[6%] h-full bg-background left-[50%] translate-x-[-50%]" />
      <div className="absolute h-[6%] w-full bg-background top-[50%] translate-y-[-50%]" />
    </div>
  );
};