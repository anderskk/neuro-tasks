import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ThemeModeToggle,
  ThemeProvider
} from '@components';
import { Atom, CircleDashed, CircleDot, Menu } from 'lucide-react';
import { Link, Outlet, useMatchRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useState } from 'react';

export const AppContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const matchRoute = useMatchRoute()
  const saccadesMatch = matchRoute({
    to: '/saccades'
  });
  const pursuitMatch = matchRoute({
    to: '/pursuit'
  });
  const yesNoMatch = matchRoute({
    to: '/yesno'
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="absolute top-4 left-4 z-10">
            <Menu/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Neuro exercises</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 py-4">
            <Button asChild variant={saccadesMatch ? 'default' : 'outline'} onClick={onClose}>
              <Link to="/saccades" className="!justify-start">
                <CircleDashed className="mr-4"/>
                Saccades
              </Link>
            </Button>
            <Button asChild variant={pursuitMatch ? 'default' : 'outline'} onClick={onClose}>
              <Link to="/pursuit" className="!justify-start">
                <CircleDot className="mr-4"/>
                Pursuit
              </Link>
            </Button>
            <Button asChild variant={yesNoMatch ? 'default' : 'outline'} onClick={onClose}>
              <Link to="/yesno" className="!justify-start">
                <Atom className="mr-4" />
                Yes/No
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <div className="absolute top-4 right-4 z-10">
        <ThemeModeToggle/>
      </div>
      <Outlet/>
      {import.meta.env.DEV && <TanStackRouterDevtools/>}
    </ThemeProvider>
  );
}