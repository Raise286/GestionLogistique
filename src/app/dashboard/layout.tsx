"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2, LayoutDashboard, Send, MessageSquare, Star, Settings, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sidebarNavItems = [
  { title: "Vue d'ensemble", href: "/dashboard", icon: LayoutDashboard },
  { title: "Missions / Livraisons", href: "/dashboard/missions", icon: Send },
  { title: "Messagerie", href: "/dashboard/chat", icon: MessageSquare, disabled: true },
  { title: "Favoris", href: "/dashboard/favoris", icon: Star, disabled: true },
  { title: "Paramètres", href: "/dashboard/parametres", icon: Settings, disabled: false },
]

const SidebarNav = () => {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {sidebarNavItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith(item.href) ? "bg-accent" : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-8">
      {/* Barre latérale pour les grands écrans */}
      <aside className="hidden w-[200px] flex-col md:flex">
        <SidebarNav />
      </aside>
      
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {/* Header pour les petits écrans avec le menu hamburger */}
        <div className="md:hidden flex justify-end mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] pt-10">
              <SidebarNav />
            </SheetContent>
          </Sheet>
        </div>
        
        {children}
      </main>
    </div>
  );
}