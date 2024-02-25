import styled, { keyframes } from 'styled-components';
import { Circle } from './Circle.tsx';

interface AnimatedRightLeftCircleProps {
  animate: boolean;
  animationDurationMs: number;
  repetitions: number;
  initialDelayMs: number;
}

const leftRightReturnKeyframes = keyframes`
    0% {
        transform: translate(0, -50%);
    }
    50% {
        transform: translate(calc(100vw - 100%), -50%);
    }
    100% {
        transform: translate(0, -50%);
    }
`;

export const AnimatedLeftRightReturnCircle = styled(Circle)<AnimatedRightLeftCircleProps>`
    transform: translate(0, -50%);
    animation-name: ${({ animate }) => animate ? leftRightReturnKeyframes : undefined};
    animation-duration: ${({ animationDurationMs }) => `${animationDurationMs}ms`};
    animation-timing-function: ease-in-out;
    animation-iteration-count: ${({ repetitions }) => repetitions};
    animation-delay: ${({ initialDelayMs }) => initialDelayMs}ms;
`;
