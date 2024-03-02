import styled, { keyframes } from 'styled-components';
import { Circle } from './Circle.tsx';

interface AnimatedTopDownCircleProps {
  animate: boolean;
  animationDurationMs: number;
  repetitions: number;
  initialDelayMs: number;
}

const topDownKeyframes = keyframes`
    0% {
        transform: translate(-50%, 0);
    }
    70% {
        transform: translate(-50%, calc(100vh - 100%));
    }
    100% {
        transform: translate(-50%, calc(100vh - 100%));
    }
`;

export const AnimatedTopDownCircle = styled(Circle)<AnimatedTopDownCircleProps>`
    transform: translate(-50%, 0);
    animation-name: ${({ animate }) => animate ? topDownKeyframes : undefined};
    animation-duration: ${({ animationDurationMs }) => `${animationDurationMs}ms`};
    animation-timing-function: linear;
    animation-iteration-count: ${({ repetitions }) => repetitions};
    animation-delay: ${({ initialDelayMs }) => initialDelayMs}ms;
`;
