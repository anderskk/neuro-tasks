import styled, { keyframes } from 'styled-components';
import { Circle } from './Circle.tsx';

interface AnimatedTopDownCircleProps {
  animate: boolean;
  animationDurationMs: number;
  repetitions: number;
}

const topDownKeyframes = keyframes`
    0% {
        transform: translateY(0);
    }
    70% {
        transform: translateY(calc(100vh - 100%));
    }
    100% {
        transform: translateY(calc(100vh - 100%));
    }
`;

export const AnimatedTopDownCircle = styled(Circle)<AnimatedTopDownCircleProps>`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    animation-name: ${({ animate }) => animate ? topDownKeyframes : undefined};
    animation-duration: ${({ animationDurationMs }) => `${animationDurationMs}ms`};
    animation-timing-function: linear;
    animation-iteration-count: ${({ repetitions }) => repetitions};
`;
