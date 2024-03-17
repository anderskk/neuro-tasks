import Draggable, { ControlPosition } from 'react-draggable';
import { useMemo } from 'react';
import { YesNoAtom } from './YesNoAtom.tsx';

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
          <YesNoAtom topCircle bottomCircle />
          <div className="flex space-x-[150px]">
            <YesNoAtom rightCircle leftCircle />
            <YesNoAtom topCircle rightCircle bottomCircle leftCircle />
            <YesNoAtom rightCircle leftCircle />
          </div>
          <YesNoAtom topCircle bottomCircle />
        </div>
      </Draggable>
    </div>
  )
}