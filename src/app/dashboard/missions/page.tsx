// app/dashboard/missions/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

// On importe les "vues" spécifiques à chaque rôle
import LivreurMissionsView from "@/components/dashboard/LivreurMissionsView";
import ClientDeliveriesView from "@/components/dashboard/ClientDeliveriesView";
import OrganisationDeliveriesView from "@/components/dashboard/OrganisationDeliveriesView";

export default function MissionsPage() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    if (!user) {
        return <p>Utilisateur non trouvé.</p>;
    }

    // Aiguillage en fonction du rôle de l'utilisateur
    switch (user.role) {
        case 'livreur':
            return <LivreurMissionsView user={user} />;
        case 'client':
            return <ClientDeliveriesView user={user} />;
        case 'organisation':
            return <OrganisationDeliveriesView user={user} />;
        // case 'admin':
        //     return <AdminGlobalView />;
        default:
            return <p>Votre rôle n'est pas supporté sur cette page.</p>;
    }
}