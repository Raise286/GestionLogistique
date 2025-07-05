// components/dashboard/ClientDeliveriesView.tsx
"use client";

import { getMyMissions } from "@/lib/api";
import { Delivery, User } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClientDeliveriesViewProps {
    user: User;
}

export default function ClientDeliveriesView({ user }: ClientDeliveriesViewProps) {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMyMissions(user.id, user.role)
            .then(setDeliveries)
            .catch(() => toast.error("Impossible de charger vos livraisons."))
            .finally(() => setIsLoading(false));
    }, [user]);

    if (isLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Mes Livraisons</h1>
                <Button asChild>
                    <Link href="/dashboard/nouvelle-livraison">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Soumettre une livraison
                    </Link>
                </Button>
            </div>
            <div className="space-y-4">
                {deliveries.length > 0 ? deliveries.map(delivery => (
                    <Card key={delivery.id}>
                        <CardHeader>
                            <CardTitle>Livraison #{delivery.id}</CardTitle>
                            <CardDescription>De: {delivery.originAddress} <br/> À: {delivery.destinationAddress}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Statut: <span className="font-semibold">{delivery.status}</span></p>
                            {delivery.livreurId && <p className="text-sm text-muted-foreground">Prise en charge par le livreur #{delivery.livreurId}</p>}
                        </CardContent>
                    </Card>
                )) : (
                    <div className="text-center py-10 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Vous n'avez aucune livraison en cours.</p>
                        <Button asChild className="mt-4">
                           <Link href="/dashboard/nouvelle-livraison">Commencer ma première livraison</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}