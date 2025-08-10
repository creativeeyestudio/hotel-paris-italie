import React, { MouseEventHandler } from "react";
import UseAnimations from "react-useanimations"
import arrowDown from "react-useanimations/lib/arrowDown";

interface ScrollDownIconProps {
    className?: string;
    clickAction?: MouseEventHandler;
}

const ScrollDownIcon: React.FC<ScrollDownIconProps> = ({ className, clickAction }) => {
    return (
        <UseAnimations 
            size={64}
            strokeColor="white" 
            className={className}
            animation={arrowDown}
            onClick={clickAction}
        />
    )
}

export default ScrollDownIcon;