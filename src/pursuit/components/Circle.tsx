import clsx from 'clsx';

interface Props {
  radius: number;
  className?: string;
}

export const Circle = ({ radius, className }: Props) => {
  const classList = clsx(`rounded-full`, className);

  return (
    <div style={{ width: `${radius}px`, height: `${radius}px`}} className={classList} />
  );
};