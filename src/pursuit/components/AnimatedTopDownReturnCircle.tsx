import styled, { keyframes } from 'styled-components';
import { Circle } from './Circle.tsx';

interface AnimatedTopDownCircleProps {
  animate: boolean;
  animationDurationMs: number;
  repetitions: number;
  initialDelayMs: number;
}

const topDownReturnKeyframes = keyframes`
    0% {
        transform: translate(-50%, 0);
    }
    50% {
        transform: translate(-50%, calc(100vh - 100%));
    }
    100% {
        transform: translate(-50%, 0);
    }
`;

export const AnimatedTopDownReturnCircle = styled(Circle)<AnimatedTopDownCircleProps>`
    transform: translate(-50%, 0);
    animation-name: ${({ animate }) => animate ? topDownReturnKeyframes : undefined};
    animation-duration: ${({ animationDurationMs }) => `${animationDurationMs}ms`};
    animation-timing-function: ease-in-out;
    animation-iteration-count: ${({ repetitions }) => repetitions};
    animation-delay: ${({ initialDelayMs }) => initialDelayMs}ms;
`;
