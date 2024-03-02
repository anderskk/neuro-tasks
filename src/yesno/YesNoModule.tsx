import { YesNoRightLeft } from './YesNoRightLeft.tsx';
import { YesNoAll } from './YesNoAll.tsx';
import { YesNoTopBottom } from './YesNoTopBottom.tsx';
import Draggable, { ControlPosition } from 'react-draggable';
import { useMemo } from 'react';

const yesNoPositionKey = 'yesno-position';
const savePosition = (position: ControlPosition) => localStorage.setItem(yesNoPositionKey, JSON.stringify(position))

const firstDefaultPosition: ControlPosition = {x: 200, y: 100}

export const YesNoModule = () => {
  const defaultPosition: ControlPosition = useMemo(() =>
      JSON.parse(localStorage.getItem(yesNoPositionKey) || JSON.stringify(firstDefaultPosition)),
    []
  );

  return (
    <div className="h-full relative">
      <Draggable
        bounds="parent"
        defaultPosition={defaultPosition}
        onStop={(_, {x, y}) => savePosition({x, y})}
      >
        <div
          className="flex flex-col space-y-[150px] items-center w-min cursor-move">
          <YesNoTopBottom/>
          <div className="flex space-x-[150px]">
            <YesNoRightLeft/>
            <YesNoAll/>
            <YesNoRightLeft/>
          </div>
          <YesNoTopBottom/>
        </div>
      </Draggable>
    </div>
  )
}