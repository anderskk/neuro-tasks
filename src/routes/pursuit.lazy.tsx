import { createLazyFileRoute } from '@tanstack/react-router';
import { PursuitModule } from '@pursuit';

export const Route = createLazyFileRoute('/pursuit')({
  component: PursuitModule,
});
