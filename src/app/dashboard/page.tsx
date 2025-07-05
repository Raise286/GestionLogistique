// src/app/dashboard/page.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getMyMissions } from "@/lib/api";
import { Delivery } from "@/lib/types";
import { Loader2, Package, Truck, CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
    const { user } = useAuth();
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      if (user) {
        getMyMissions(user.id, user.role)
          .then(data => setDeliveries(data))
          .finally(() => setIsLoading(false));
      }
    }, [user]);

    if (!user) return null;

    // --- LOGIQUE SPÉCIFIQUE AU RÔLE ---

    let dashboardContent;

    if (isLoading) {
        dashboardContent = <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    } else if (user.role === 'livreur') {
        const activeMissions = deliveries.filter(d => d.status === 'assigned' || d.status === 'in_progress').length;
        const completedMissions = deliveries.filter(d => d.status === 'delivered').length;
        
        dashboardContent = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Missions Actives" 
                    value={activeMissions} 
                    description="Missions que vous devez réaliser." 
                    icon={<Truck className="h-4 w-4 text-muted-foreground" />} 
                />
                <StatCard 
                    title="Missions Terminées" 
                    value={completedMissions} 
                    description="Nombre total de missions achevées." 
                    icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />} 
                />
            </div>
        );
    } else if (user.role === 'client' || user.role === 'organisation') {
        const pendingDeliveries = deliveries.filter(d => d.status === 'pending').length;
        const inProgressDeliveries = deliveries.filter(d => d.status === 'assigned' || d.status === 'in_progress').length;

        dashboardContent = (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard 
                    title="Livraisons en attente" 
                    value={pendingDeliveries} 
                    description="En attente de prise en charge par un livreur." 
                    icon={<Package className="h-4 w-4 text-muted-foreground" />} 
                />
                <StatCard 
                    title="Livraisons en cours" 
                    value={inProgressDeliveries} 
                    description="Actuellement prises en charge par un livreur." 
                    icon={<Truck className="h-4 w-4 text-muted-foreground" />} 
                />
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Bienvenue, {user.name} !</h1>
            <p className="text-muted-foreground mb-8">Vue d'ensemble de votre activité sur PicknDrop Link.</p>
            {dashboardContent}
        </div>
    )
}

// Composant helper pour les cartes de statistiques pour éviter la répétition
interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}