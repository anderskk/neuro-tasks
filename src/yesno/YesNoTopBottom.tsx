import { cn } from '@utils';

interface Props {
  className?: string;
}
export const YesNoTopBottom = ({ className }: Props) => {
  return (
    <div className={cn(
      'relative w-[100px] h-[100px] border-[2px] border-foreground rounded-full bg-transparent',
      className
    )}>
      <div className="absolute top-[40px] left-[40px] w-[20px] h-[20px] rounded-full bg-red-600"/>
      <div className="absolute top-[-10px] left-[40px] w-[20px] h-[20px] rounded-full bg-foreground"/>
      <div className="absolute bottom-[-10px] left-[40px] w-[20px] h-[20px] rounded-full bg-foreground"/>
    </div>
  )
}