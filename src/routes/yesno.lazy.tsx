import { createLazyFileRoute } from '@tanstack/react-router';
import { YesNoModule } from '@yesno';

export const Route = createLazyFileRoute('/yesno')({
  component: YesNoModule,
});
