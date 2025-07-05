// app/dashboard/nouvelle-livraison/page.tsx
"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Package, Ruler, Thermometer, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Pensez à l'ajouter : npx shadcn-ui@latest add checkbox
import { createDelivery, searchAddress } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function NewDeliveryPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [originQuery, setOriginQuery] = useState("");
    const [originResults, setOriginResults] = useState<any[]>([]);
    const [selectedOrigin, setSelectedOrigin] = useState<any | null>(null);

    const [destinationQuery, setDestinationQuery] = useState("");
    const [destinationResults, setDestinationResults] = useState<any[]>([]);
    const [selectedDestination, setSelectedDestination] = useState<any | null>(null);

    // États pour les détails du colis
    const [isFragile, setIsFragile] = useState(false);
    const [isPerishable, setIsPerishable] = useState(false);
    const [deliveryDeadline, setDeliveryDeadline] = useState("");

    const handleSearch = async (type: 'origin' | 'destination', query: string) => {
        if (type === 'origin') setOriginQuery(query);
        else setDestinationQuery(query);

        if (query.length > 2) {
            const results = await searchAddress(query);
            if (type === 'origin') setOriginResults(results);
            else setDestinationResults(results);
        } else {
             if (type === 'origin') setOriginResults([]);
             else setDestinationResults([]);
        }
    };

    const selectAddress = (type: 'origin' | 'destination', address: any) => {
        if (type === 'origin') {
            setSelectedOrigin(address);
            setOriginQuery(address.display_name);
            setOriginResults([]);
        } else {
            setSelectedDestination(address);
            setDestinationQuery(address.display_name);
            setDestinationResults([]);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !selectedOrigin || !selectedDestination) {
            toast.error("Veuillez sélectionner une adresse de départ et de destination valides.");
            return;
        }

        setIsSubmitting(true);
        try {
            const deliveryData = {
                clientId: user.id,
                originAddress: selectedOrigin.display_name,
                destinationAddress: selectedDestination.display_name,
                origin: { lat: parseFloat(selectedOrigin.lat), lng: parseFloat(selectedOrigin.lon) },
                destination: { lat: parseFloat(selectedDestination.lat), lng: parseFloat(selectedDestination.lon) },
                isFragile,
                isPerishable,
                pickupDeadline: deliveryDeadline, // Le champ est réutilisé pour le délai de livraison
                // On peut ajouter les dimensions ici si on a les champs dans le formulaire
            };
            
            await createDelivery(deliveryData);
            toast.success("Livraison créée avec succès !");
            router.push("/dashboard/missions");

        } catch (error) {
            toast.error("Une erreur est survenue lors de la création.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Nouvelle Livraison</h1>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Détails du Colis</CardTitle>
                    <CardDescription>Remplissez les informations pour soumettre votre livraison.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AddressSearcher 
                            label="Adresse de départ"
                            query={originQuery}
                            results={originResults}
                            onQueryChange={(q) => handleSearch('origin', q)}
                            onSelectAddress={(addr) => selectAddress('origin', addr)}
                            placeholder="Taper pour rechercher (ex: Carrefour Mvog-Mbi)"
                        />
                        <AddressSearcher 
                            label="Adresse de destination"
                            query={destinationQuery}
                            results={destinationResults}
                            onQueryChange={(q) => handleSearch('destination', q)}
                            onSelectAddress={(addr) => selectAddress('destination', addr)}
                            placeholder="Taper pour rechercher (ex: Ambassade de France, Bastos)"
                        />

                        {/* Options du colis */}
                        <div className="space-y-2">
                           <Label>Options du colis</Label>
                           <div className="flex items-center space-x-4">
                               <CheckboxWithLabel id="fragile" label="Fragile" checked={isFragile} onCheckedChange={setIsFragile} icon={<Shield className="h-4 w-4" />} />
                               <CheckboxWithLabel id="perishable" label="Périssable" checked={isPerishable} onCheckedChange={setIsPerishable} icon={<Thermometer className="h-4 w-4" />} />
                           </div>
                        </div>

                       <div className="space-y-1">
                            <Label>Dimensions du colis</Label>
                            <div className="grid grid-cols-3 gap-2">
                                <Input placeholder="Largeur (cm)" type="number" />
                                <Input placeholder="Hauteur (cm)" type="number" />
                                <Input placeholder="Poids (kg)" type="number" />
                            </div>
                       </div>

                        <div className="space-y-1">
                            <Label htmlFor="deadline">Délai de livraison souhaité</Label>
                            <Input 
                                id="deadline" 
                                value={deliveryDeadline}
                                onChange={e => setDeliveryDeadline(e.target.value)}
                                placeholder="Ex: 2 heures, Fin de journée" 
                            />
                        </div>

                        <Button className="w-full" type="submit" disabled={isSubmitting || !selectedOrigin || !selectedDestination}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Soumettre la demande
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

// Helper components pour garder le code propre
const AddressSearcher = ({ label, query, results, onQueryChange, onSelectAddress, placeholder }: any) => (
    <div className="space-y-1 relative">
        <Label>{label}</Label>
        <Input 
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
        />
        {results.length > 0 && (
            <ul className="absolute z-10 w-full bg-background border rounded-md mt-1 max-h-48 overflow-y-auto">
                {results.map((res: any) => (
                    <li 
                        key={res.place_id} 
                        onClick={() => onSelectAddress(res)}
                        className="p-2 text-sm hover:bg-accent cursor-pointer"
                    >
                        {res.display_name}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const CheckboxWithLabel = ({ id, label, icon, checked, onCheckedChange }: any) => (
    <div className="flex items-center space-x-2">
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <Label htmlFor={id} className="flex items-center gap-1 font-normal">{icon} {label}</Label>
    </div>
);