// app/dashboard/layout.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Si le chargement est terminé et qu'il n'y a pas d'utilisateur,
    // on redirige vers la page de connexion.
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Affiche le loader UNIQUEMENT pendant la vérification initiale.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // Si le chargement est terminé et qu'il y a un utilisateur,
  // on affiche le contenu de la page du dashboard.
  // S'il n'y a pas d'utilisateur, on affiche "null" (rien) pendant que
  // le useEffect ci-dessus fait son travail de redirection.
  // Cela empêche le loader de rester bloqué.
  if (user) {
    return <>{children}</>;
  }

  // Pendant le bref instant avant la redirection, on ne rend rien.
  return null;
}