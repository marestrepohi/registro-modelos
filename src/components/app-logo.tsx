import { Layers3 } from 'lucide-react';

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Layers3 className="size-6 text-sidebar-primary-foreground" />
      <h1 className="text-lg font-bold text-sidebar-primary-foreground">
        Modelo Maestro
      </h1>
    </div>
  );
}
