// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from "sonner"; // MODIFICATION : On importe 'toast' directement de 'sonner'
import { Truck, Package, Hourglass, BellRing } from 'lucide-react';

// --- Types ---
type Delivery = { id: string; status: 'PENDING' | 'ACCEPTED' | 'PICKED_UP'; pickupAddress: string; dropoffAddress: string; customerName: string; };
type UserProfile = { firstName: string; };

// --- Données Fictives ---
const initialDeliveries: Delivery[] = [
    { id: 'del-dla-456', status: 'ACCEPTED', pickupAddress: 'Akwa, Douala', dropoffAddress: 'Bonabéri, Douala', customerName: 'Mme Biloa'},
];
const userProfile: UserProfile = { firstName: 'Djibrila' };


export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProfile(userProfile);
      setDeliveries(initialDeliveries);
      setIsLoading(false);
    }, 800);
  }, []);

  const simulateNewDelivery = () => {
    const newDelivery: Delivery = {
      id: `del-yde-${Math.floor(Math.random() * 1000)}`,
      status: 'PENDING',
      pickupAddress: 'Bastos, Yaoundé',
      dropoffAddress: 'Mvan, Yaoundé',
      customerName: 'Nouveau Client',
    };
    
    setDeliveries(prevDeliveries => [newDelivery, ...prevDeliveries]);

    // MODIFICATION : L'utilisation de 'sonner' est plus simple
    toast.success("Nouvelle livraison disponible !", {
      description: `Course pour ${newDelivery.customerName} de ${newDelivery.pickupAddress} à ${newDelivery.dropoffAddress}.`,
      action: {
        label: "Voir",
        onClick: () => console.log(`Rediriger vers la livraison ${newDelivery.id}`), // On mettra un vrai lien plus tard
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <div className="text-center"><Truck className="h-12 w-12 mx-auto text-gray-400 animate-bounce" /><p className="text-lg mt-4 text-slate-600">Chargement...</p></div>
      </div>
    );
  }

  const pendingDeliveries = deliveries.filter(d => d.status === 'PENDING');
  const ongoingDeliveries = deliveries.filter(d => d.status === 'ACCEPTED' || d.status === 'PICKED_UP');
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bonjour, {profile?.firstName} !</h1>
            <p className="text-slate-600">Bienvenue sur votre tableau de bord.</p>
          </div>
          <Button onClick={simulateNewDelivery}>
            <BellRing className="mr-2 h-4 w-4" />
            Simuler une nouvelle livraison
          </Button>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-700"><Hourglass className="text-yellow-500" /> En attente</h2>
            <div className="space-y-4">
              {pendingDeliveries.length > 0 ? (
                pendingDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)
              ) : (
                <Card><CardContent className="pt-6"><p className="text-slate-500 text-sm">Aucune nouvelle livraison.</p></CardContent></Card>
              )}
            </div>
          </section>
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-700"><Truck className="text-blue-500" /> En cours</h2>
            <div className="space-y-4">
              {ongoingDeliveries.length > 0 ? (
                ongoingDeliveries.map(delivery => <DeliveryCard key={delivery.id} delivery={delivery} />)
              ) : (
                <Card><CardContent className="pt-6"><p className="text-slate-500 text-sm">Aucune livraison en cours.</p></CardContent></Card>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// --- Composant DeliveryCard (inchangé) ---
const DeliveryCard = ({ delivery }: { delivery: Delivery }) => (
  <Link href={`/deliveries/${delivery.id}`} className="block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg">
    <Card className="hover:border-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div><CardTitle className="text-lg">{delivery.customerName}</CardTitle><CardDescription>ID: {delivery.id}</CardDescription></div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            {delivery.status === 'PENDING' ? <Hourglass className="h-5 w-5 text-yellow-500" /> : <Truck className="h-5 w-5 text-blue-500" />}
            {delivery.status.charAt(0) + delivery.status.slice(1).toLowerCase()}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2 text-slate-700"><p><strong>De:</strong> {delivery.pickupAddress}</p><p><strong>À:</strong> {delivery.dropoffAddress}</p></div>
      </CardContent>
    </Card>
  </Link>
);