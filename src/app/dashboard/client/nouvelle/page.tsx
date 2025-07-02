// app/dashboard/client/nouvelle/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function NewDeliveryPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [origin, setOrigin] = useState('12 Rue de Rivoli, 75001 Paris');
    const [destination, setDestination] = useState('8 Boulevard de Bercy, 75012 Paris');
    const [isFragile, setIsFragile] = useState(false);
    const [isPerishable, setIsPerishable] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;
        
        setIsSubmitting(true);
        const toastId = toast.loading('Soumission de votre demande...');

        // Simuler un appel réseau
        await new Promise(resolve => setTimeout(resolve, 1500));

        const newDelivery = { /* ... */ };
        console.log("Nouvelle livraison créée :", newDelivery);
        
        toast.success("Votre demande a été soumise !", { id: toastId });
        router.push('/dashboard/client');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Soumettre une nouvelle livraison</h1>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
                {/* ... vos champs de formulaire ... */}
                <div>
                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Adresse de départ</label>
                    <input id="origin" type="text" value={origin} onChange={e => setOrigin(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Adresse de destination</label>
                    <input id="destination" type="text" value={destination} onChange={e => setDestination(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                <div className="flex items-center gap-8">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={isFragile} onChange={e => setIsFragile(e.target.checked)} className="h-4 w-4 rounded" />
                        Colis fragile
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={isPerishable} onChange={e => setIsPerishable(e.target.checked)} className="h-4 w-4 rounded" />
                        Colis périssable
                    </label>
                </div>
                {/* ... fin des champs de formulaire ... */}
                <button 
                  type="submit" 
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md shadow-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Envoi...' : 'Estimer le prix et Soumettre'}
                </button>
            </form>
        </div>
    )
}