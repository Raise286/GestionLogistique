// components/dashboard/OrganisationDeliveriesView.tsx
"use client";

import { getMyMissions } from "@/lib/api";
import { Delivery, User } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, PlusCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// On importe les composants pour un tableau de données
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OrganisationDeliveriesViewProps {
    user: User;
}

export default function OrganisationDeliveriesView({ user }: OrganisationDeliveriesViewProps) {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // La fonction getMyMissions fonctionne aussi pour les organisations
        // si elle est conçue pour chercher par `clientId`
        getMyMissions(user.id, user.role)
            .then(setDeliveries)
            .catch(() => toast.error("Impossible de charger les livraisons de l'organisation."))
            .finally(() => setIsLoading(false));
    }, [user]);

    if (isLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8" /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Gestion des Livraisons</h1>
                    <p className="text-muted-foreground">Tableau de bord de l'organisation: {user.name}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Gérer les employés
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard/nouvelle-livraison">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Nouvelle Livraison
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Un tableau est plus professionnel pour une organisation */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Origine</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Assigné à</TableHead>
                            <TableHead className="text-right">Prix</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deliveries.length > 0 ? deliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                                <TableCell className="font-medium">#{delivery.id}</TableCell>
                                <TableCell>
                                    <Badge variant={delivery.status === 'pending' ? 'destructive' : 'secondary'}>
                                        {delivery.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{delivery.originAddress}</TableCell>
                                <TableCell>{delivery.destinationAddress}</TableCell>
                                <TableCell>{delivery.livreurId ? `Livreur #${delivery.livreurId}` : 'Aucun'}</TableCell>
                                <TableCell className="text-right">{new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(delivery.price)}</TableCell>
                                <TableCell className="text-right">
                                    {delivery.status === 'pending' && (
                                        <Button variant="outline" size="sm">
                                            Assigner
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    Aucune livraison pour le moment.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}