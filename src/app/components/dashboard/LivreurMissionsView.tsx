// components/dashboard/LivreurMissionsView.tsx
"use client";

import { getMyMissions, checkAndExpireMission, markAsInProgress } from "@/lib/api";
import { Delivery, User } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Clock, PackageCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CompleteMissionDialog } from "@/components/livreur/CompleteMissionDialog";
import { useCountdown } from "@/hooks/useCountdown";
import { Button } from "@/components/ui/button";

interface LivreurMissionsViewProps {
    user: User;
}

function MissionCard({ delivery, onMissionUpdate }: { delivery: Delivery, onMissionUpdate: () => void }) {
    const deadline = delivery.status === 'assigned' && delivery.pickupDeadline ? delivery.pickupDeadline : null;
    const { hours, minutes, seconds, isExpired } = useCountdown(deadline || new Date().toISOString());
    const [isUpdating, setIsUpdating] = useState(false);

    const handlePickup = async () => {
        setIsUpdating(true);
        try {
            await markAsInProgress(delivery.id);
            toast.success("Mission démarrée ! En route vers la destination.");
            onMissionUpdate(); // Rafraîchit la liste pour mettre à jour le statut
        } catch (error) {
            toast.error("Impossible de démarrer la mission.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mission #{delivery.id}</CardTitle>
                <CardDescription>De: {delivery.originAddress} <br/> À: {delivery.destinationAddress}</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Affichage du timer */}
                {deadline && !isExpired && (
                    <div className="flex items-center gap-2 p-3 mb-4 rounded-md bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                        <Clock className="h-5 w-5" />
                        <div>
                            <p className="font-bold text-sm">Temps restant pour le ramassage :</p>
                            <p className="text-xl font-mono tracking-wider">{String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                        </div>
                    </div>
                )}
                {deadline && isExpired && (
                    <p className="font-bold text-destructive mb-4">Délai de ramassage expiré !</p>
                )}
                
                <p>Statut: <span className="font-semibold capitalize">{delivery.status.replace('_', ' ')}</span></p>
            </CardContent>
            
            <CardFooter>
                {/* --- LOGIQUE D'AFFICHAGE DES BOUTONS CORRIGÉE --- */}

                {/* Cas 1: La mission est assignée, le livreur doit récupérer le colis */}
                {delivery.status === 'assigned' && !isExpired && (
                    <Button onClick={handlePickup} disabled={isUpdating}>
                        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <PackageCheck className="mr-2 h-4 w-4" />
                        J'ai récupéré le colis
                    </Button>
                )}
                
                {/* Cas 2: Le livreur a le colis, il doit le livrer */}
                {delivery.status === 'in_progress' && (
                    <CompleteMissionDialog delivery={delivery} onMissionUpdate={onMissionUpdate} />
                )}

                {/* Cas 3: Le délai est expiré, on n'affiche plus d'actions */}
                {delivery.status === 'assigned' && isExpired && (
                     <p className="text-sm text-destructive">Cette mission a expiré.</p>
                )}
            </CardFooter>
        </Card>
    );
}

export default function LivreurMissionsView({ user }: LivreurMissionsViewProps) {
    const [missions, setMissions] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAndCheckMissions = async () => {
        setIsLoading(true);
        try {
            const missionsData = await getMyMissions(user.id, user.role);
            
            // Vérification des expirations
            const checkedMissions = [];
            for (const mission of missionsData) {
                const expired = await checkAndExpireMission(mission);
                if (expired) {
                    toast.error(`La mission #${mission.id} a expiré et est de nouveau disponible.`);
                } else {
                    checkedMissions.push(mission);
                }
            }
            setMissions(checkedMissions);

        } catch (error) {
            toast.error("Impossible de charger vos missions.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAndCheckMissions();
    }, [user]);

    const handleMissionUpdate = () => {
        // Après une mise à jour, on rafraîchit simplement la liste
        fetchAndCheckMissions();
    };

    if (isLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8" /></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Mes Missions de Livraison</h1>
            <div className="space-y-4">
                {missions.length > 0 
                    ? missions.map(mission => <MissionCard key={mission.id} delivery={mission} onMissionUpdate={handleMissionUpdate} />) 
                    : <p className="text-muted-foreground">Aucune mission en cours.</p>
                }
            </div>
        </div>
    );
}