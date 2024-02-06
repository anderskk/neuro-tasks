import {Label, Switch} from "@components";
import {useId} from "react";

interface Props {
    value: 'vertical' | 'horizontal',
    onToggle: () => void
}

export const OrientationSwitch = ({value, onToggle}: Props) => {
    const switchId = useId()
    return (
        <div className="flex items-center space-x-2">
            <Label htmlFor={switchId}>Horizontal</Label>
            <Switch id={switchId} onClick={onToggle} checked={value === 'vertical'}/>
            <Label htmlFor={switchId}>Vertical</Label>
        </div>
    )
}