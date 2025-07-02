// app/dashboard/organisation/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { deliveries as mockDeliveries, users as mockUsers } from "@/data/mockData";
import { Delivery, User } from "@/lib/types";
import { useState, useMemo } from "react";
import { PackageCheck, Users } from "lucide-react";

// On réutilise le composant DeliveryCard défini dans la page livreur
// Idéalement, il serait dans son propre fichier `components/ui/DeliveryCard.tsx`
// Pour la simplicité, on le redéfinit ici.
// DANS UN VRAI PROJET: EXPORTEZ ET IMPORTEZ CE COMPOSANT
interface DeliveryCardProps {
  delivery: Delivery;
  children?: React.ReactNode;
}
function DeliveryCard({ delivery, children }: DeliveryCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg">Livraison #{delivery.id}</h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100">{delivery.status}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{delivery.originAddress} → {delivery.destinationAddress}</p>
      {children}
    </div>
  );
}


export default function OrganisationDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'deliveries' | 'employees'>('deliveries');

  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const orgDeliveries = useMemo(() => {
    if (!user) return [];
    return deliveries.filter(d => d.organizationId === user.organizationId);
  }, [user, deliveries]);

  const orgEmployees = useMemo(() => {
    if (!user) return [];
    return users.filter(u => u.organizationId === user.organizationId && u.role === 'livreur');
  }, [user, users]);
  
  const handleAssign = (deliveryId: number, livreurId: number) => {
    setDeliveries(prev => prev.map(d => d.id === deliveryId ? {...d, livreurId, status: 'assigned'} : d));
    alert(`Livreur #${livreurId} assigné à la livraison #${deliveryId}`);
  };

  if (!user) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard Organisation</h1>
      <p className="text-gray-600 mb-6">Gérez vos livraisons et vos équipes.</p>

      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('deliveries')} className={`flex items-center gap-2 py-2 px-4 text-sm font-medium ${activeTab === 'deliveries' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            <PackageCheck size={16}/> Gestion des Livraisons
        </button>
        <button onClick={() => setActiveTab('employees')} className={`flex items-center gap-2 py-2 px-4 text-sm font-medium ${activeTab === 'employees' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            <Users size={16}/> Gestion des Employés
        </button>
      </div>

      {activeTab === 'deliveries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orgDeliveries.map(delivery => (
            <DeliveryCard key={delivery.id} delivery={delivery}>
              {delivery.status === 'pending' && (
                <div className="mt-4">
                  <label className="text-xs font-bold">ASSIGNER À :</label>
                  <select 
                    onChange={(e) => handleAssign(delivery.id, Number(e.target.value))}
                    className="mt-1 block w-full text-sm p-2 border border-gray-300 rounded-md"
                  >
                    <option>Choisir un livreur disponible</option>
                    {orgEmployees.filter(e => e.status === 'online').map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.email} ({emp.equipment})</option>
                    ))}
                  </select>
                </div>
              )}
              {delivery.status !== 'pending' && delivery.livreurId && (
                <p className="mt-4 text-sm">Assignée à: <span className="font-semibold">{users.find(u => u.id === delivery.livreurId)?.email}</span></p>
              )}
            </DeliveryCard>
          ))}
        </div>
      )}

      {activeTab === 'employees' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Email</th>
                <th>Matériel</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orgEmployees.map(emp => (
                <tr key={emp.id} className="border-b">
                  <td className="py-3">{emp.email}</td>
                  <td>{emp.equipment}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs rounded-full ${emp.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}