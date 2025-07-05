// src/app/offres/[id]/page.tsx
"use client";
import { getDeliveryById, applyForDelivery } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { Delivery } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Calendar as CalendarIcon, MapPin, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ApplyForDeliveryPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const [pickupTime, setPickupTime] = useState('');
    const [proposedDestination, setProposedDestination] = useState<'final' | 'intermediate'>('final');
    const [intermediateAddress, setIntermediateAddress] = useState('');

    useEffect(() => {
        const deliveryId = Number(params.id);
        if (deliveryId) {
            getDeliveryById(deliveryId)
                .then(data => setDelivery(data || null))
                .finally(() => setIsLoading(false));
        }
    }, [params.id]);

    const handleApply = async () => {
        if (!user || !delivery) return;
        if (proposedDestination === 'intermediate' && !intermediateAddress) {
            toast.error("Veuillez spécifier l'adresse du point intermédiaire.");
            return;
        }

        setIsApplying(true);
        try {
            const pickupDate = new Date();
            const [hours, minutes] = pickupTime.split(':');
            pickupDate.setHours(Number(hours), Number(minutes), 0, 0);

            // On passe les nouvelles informations à l'API
            await applyForDelivery(delivery.id, user.id, pickupDate, proposedDestination, intermediateAddress);

            toast.success("Postulation envoyée !");
            router.push('/dashboard/missions');
        } catch (error: any) {
            toast.error(error.message || "Une erreur est survenue.");
        } finally {
            setIsApplying(false);
        }
    }
    if (isLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8" /></div>;
    if (!delivery) return <div className="text-center mt-10">Désolé, cette offre n'est plus disponible.</div>

    return (
        <div className="container py-12 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Postuler pour la livraison #{delivery.id}</CardTitle>
                    <CardDescription>Vérifiez les détails et proposez votre heure de ramassage.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 border rounded-md space-y-2">
                        <p className="flex items-start gap-2"><MapPin size={16} className="text-primary mt-1" /> {delivery.originAddress}</p>
                        <p className="flex items-start gap-2"><Star size={16} className="text-primary mt-1" /> {delivery.destinationAddress}</p>
                        <p className="font-bold text-lg pt-2">{new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(delivery.price)}</p>
                    </div>
                     <div className="space-y-2">
                        <Label>Je compte livrer le colis :</Label>
                        <RadioGroup value={proposedDestination} onValueChange={(v: any) => setProposedDestination(v)}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="final" id="dest-final" />
                                <Label htmlFor="dest-final">À la destination finale indiquée</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="intermediate" id="dest-inter" />
                                <Label htmlFor="dest-inter">À un point de livraison intermédiaire</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {proposedDestination === 'intermediate' && (
                        <div className="space-y-1 pl-2">
                            <Label htmlFor="intermediate-address">Adresse du point intermédiaire</Label>
                            <Input 
                                id="intermediate-address"
                                value={intermediateAddress}
                                onChange={e => setIntermediateAddress(e.target.value)}
                                placeholder="Ex: Agence Buca Voyages, Mvan"
                            />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="pickupTime" className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Heure de ramassage proposée
                        </Label>
                        <Input 
                            id="pickupTime"
                            type="time" 
                            value={pickupTime}
                            onChange={e => setPickupTime(e.target.value)}
                            className="w-fit"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                     <Button className="w-full" onClick={handleApply} disabled={isApplying || delivery.status !== 'pending'}>
                        {isApplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {delivery.status !== 'pending' ? "Offre déjà prise" : "Confirmer ma postulation"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}