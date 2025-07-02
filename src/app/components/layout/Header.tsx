// components/layout/Header.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Rocket } from "lucide-react";

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  const getDashboardLink = () => {
    if (!user) return "/";
    return `/dashboard/${user.role}`;
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Rocket className="text-blue-600" />
          <span>Livraison Express</span>
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          ) : user ? (
            <>
              <Link href={getDashboardLink()} className="font-semibold text-gray-600 hover:text-blue-600">
                Mon Tableau de Bord
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 text-sm">
                <LogOut size={16} />
                <span>Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-semibold text-gray-600 hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}