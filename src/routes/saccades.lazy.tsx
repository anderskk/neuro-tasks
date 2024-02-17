import { createLazyFileRoute } from '@tanstack/react-router';
import { SaccadesModule } from '@saccades';

export const Route = createLazyFileRoute('/saccades')({
  component: SaccadesPage,
})

function SaccadesPage() {
  return <SaccadesModule />
}