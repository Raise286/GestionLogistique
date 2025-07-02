// app/dashboard/livreur/page.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { deliveries as mockDeliveries } from '@/data/mockData';
import { Delivery } from '@/lib/types';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Clock, Loader2, MapPin, Package, ShieldAlert, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

// ... (code du DeliveryMap)
const DeliveryMap = dynamic(() => import('@/components/map/DeliveryMap'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg"><p>Chargement de la carte...</p></div>
});


export default function LivreurDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'available' | 'missions'>('available');
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [loadingDeliveryId, setLoadingDeliveryId] = useState<number | null>(null);

  const availableDeliveries = useMemo(() => { if (!user || user.role !== 'livreur') return [];
    return deliveries.filter(d => 
      d.status === 'pending' &&
      (user.type === 'independant' ? d.organizationId === null : d.organizationId === user.organizationId)
    );}, [user, deliveries]);
  const myMissions = useMemo(() => { if (!user) return [];
    return deliveries.filter(d => d.livreurId === user.id); }, [user, deliveries]);

  const handleAccept = async (deliveryId: number) => {
    if (!user) return;
    setLoadingDeliveryId(deliveryId);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule l'appel API

    setDeliveries(prev => 
      prev.map(d => d.id === deliveryId ? { ...d, status: 'assigned', livreurId: user.id } : d)
    );
    setLoadingDeliveryId(null);
    toast.success(`Mission #${deliveryId} acceptée !`);
    setActiveTab('missions');
  };
  
  const handleComplete = async (deliveryId: number) => {
    setLoadingDeliveryId(deliveryId);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simule l'appel API

    setDeliveries(prev => 
      prev.map(d => d.id === deliveryId ? { ...d, status: 'delivered' } : d)
    );
    setLoadingDeliveryId(null);
    toast.success(`Mission #${deliveryId} terminée avec succès !`, { icon: '🎉' });
  }

  if (!user) return null;

  return (
    <div>
        {/* ... (pas de changement dans le header du dashboard) ... */}
        <h1 className="text-3xl font-bold">Tableau de bord Livreur</h1>
        <p className="text-gray-600 mb-6">Statut : <span className="font-semibold text-green-600">{user.status}</span></p>
        
        <div className="flex border-b">
          <button onClick={() => setActiveTab('available')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'available' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            Livraisons Disponibles ({availableDeliveries.length})
          </button>
          <button onClick={() => setActiveTab('missions')} className={`py-2 px-4 text-sm font-medium ${activeTab === 'missions' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            Mes Missions ({myMissions.length})
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[70vh]">
            <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4">
                {activeTab === 'available' && (
                    availableDeliveries.length > 0 
                    ? availableDeliveries.map(d => (
                        <DeliveryCard 
                            key={d.id} 
                            delivery={d} 
                            onAction={() => handleAccept(d.id)} 
                            actionLabel="Accepter" 
                            isLoading={loadingDeliveryId === d.id}
                        />
                    ))
                    : <p>Aucune livraison disponible.</p>
                )}
                {activeTab === 'missions' && (
                    myMissions.length > 0 
                    ? myMissions.map(d => (
                        <DeliveryCard 
                            key={d.id} 
                            delivery={d} 
                            onAction={d.status !== 'delivered' ? () => handleComplete(d.id) : undefined} 
                            actionLabel="Terminer la livraison" 
                            isLoading={loadingDeliveryId === d.id}
                        />
                    ))
                    : <p>Vous n'avez aucune mission en cours.</p>
                )}
            </div>
            <div className="lg:col-span-2 h-full">
                <DeliveryMap 
                    deliveries={activeTab === 'available' ? availableDeliveries : myMissions} 
                    center={{lat: 48.8566, lng: 2.3522}} 
                />
            </div>
        </div>
    </div>
  );
}


// Composant DeliveryCard mis à jour pour gérer l'état de chargement
interface DeliveryCardProps {
  delivery: Delivery;
  onAction?: (id: number) => void;
  actionLabel?: string;
  isLoading?: boolean;
}

function DeliveryCard({ delivery, onAction, actionLabel, isLoading, children }: DeliveryCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">Livraison #{delivery.id}</h3>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${delivery.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
            {delivery.status}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <p className='flex items-center gap-2'><MapPin size={14} className="text-green-500"/>{delivery.originAddress}</p>
        <p className='flex items-center gap-2'><Star size={14} className="text-yellow-500"/>{delivery.destinationAddress}</p>
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
        {delivery.isFragile && <span className='flex items-center gap-1'><ShieldAlert size={14}/>Fragile</span>}
        {delivery.isPerishable && <span className='flex items-center gap-1'><Clock size={14}/>Périssable</span>}
      </div>
      {children}
      {onAction && actionLabel && (
        <button 
          onClick={() => onAction(delivery.id)}
          className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          disabled={isLoading || delivery.status === 'delivered'}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Chargement...' : actionLabel}
        </button>
      )}
    </div>
  );
}