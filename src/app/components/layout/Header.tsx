// components/layout/Header.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle"; // On importe le composant

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    // Le dashboard est maintenant unifié à la racine /dashboard
    return `/dashboard`;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold">PicknDrop Link</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm flex-1">
        {user && user.role === 'livreur' && (
              <Link href="/offres" className="transition-colors hover:text-foreground/80 text-foreground/60">
                  Offres de livraison
              </Link>
          )}
        </nav>
        <div className="flex items-center justify-end space-x-2">
          {/* LE VOICI ! On ajoute le bouton de toggle ici */}
          <ThemeToggle />

          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href={getDashboardLink()}>Mon Dashboard</Link>
              </Button>
              <Button size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}