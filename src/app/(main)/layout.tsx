import SiteHeader from '@/components/layout/header';
import SiteSidebar from '@/components/layout/sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SiteSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 bg-muted/40">
            <div className="mx-auto grid w-full max-w-7xl gap-2 p-4 md:p-6">
                {children}
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
