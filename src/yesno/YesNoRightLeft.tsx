

export const YesNoRightLeft = () => {
  return (
    <div className="relative w-[100px] h-[100px] border-[2px] border-foreground rounded-full bg-transparent">
      <div className="absolute top-[40px] left-[40px] w-[20px] h-[20px] rounded-full bg-red-600"/>
      <div className="absolute top-[40px] left-[-10px] w-[20px] h-[20px] rounded-full bg-foreground"/>
      <div className="absolute top-[40px] right-[-10px] w-[20px] h-[20px] rounded-full bg-foreground"/>
    </div>
  )
}