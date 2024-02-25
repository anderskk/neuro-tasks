import { YesNoRightLeft } from './YesNoRightLeft.tsx';
import { YesNoAll } from './YesNoAll.tsx';
import { YesNoTopBottom } from './YesNoTopBottom.tsx';


export const YesNoModule = () => {
  return (
    <div className="h-full">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col space-y-[150px] items-center">
        <YesNoTopBottom/>
        <div className="flex space-x-[150px]">
          <YesNoRightLeft/>
          <YesNoAll/>
          <YesNoRightLeft/>
        </div>
        <YesNoTopBottom/>
      </div>
    </div>
  )
}