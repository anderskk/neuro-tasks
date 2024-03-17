interface Props {
  topCircle?: boolean;
  rightCircle?: boolean;
  bottomCircle?: boolean;
  leftCircle?: boolean;
}

export const YesNoAtom = ({topCircle, rightCircle, bottomCircle, leftCircle}: Props) => {
  return (
    <div className="relative w-[110px] h-[110px] border-[2px] border-foreground rounded-full bg-transparent">
      <div className="absolute top-[45px] left-[45px] w-[20px] h-[20px] rounded-full bg-red-600"/>
      {topCircle && <div className="absolute top-[-10px] left-[45px] w-[20px] h-[20px] rounded-full bg-foreground"/>}
      {rightCircle && <div className="absolute top-[45px] right-[-10px] w-[20px] h-[20px] rounded-full bg-foreground"/>}
      {bottomCircle &&
        <div className="absolute bottom-[-10px] left-[45px] w-[20px] h-[20px] rounded-full bg-foreground"/>}
      {leftCircle && <div className="absolute top-[45px] left-[-10px] w-[20px] h-[20px] rounded-full bg-foreground"/>}
    </div>
  )
}