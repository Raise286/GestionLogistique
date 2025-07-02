// app/dashboard/client/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { deliveries as mockDeliveries } from "@/data/mockData";
import { Delivery } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ClientDashboard() {
  const { user } = useAuth();
  // On utilise un état local pour pouvoir le modifier plus tard
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);

  const myDeliveries = useMemo(() => {
    if (!user) return [];
    return deliveries.filter(d => d.clientId === user.id);
  }, [user, deliveries]);

  if (!user) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Livraisons</h1>
        <Link href="/dashboard/client/nouvelle" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <PlusCircle size={20} />
          <span>Nouvelle Livraison</span>
        </Link>
      </div>

      <div className="space-y-4">
        {myDeliveries.length > 0 ? (
          myDeliveries.map(d => (
            <div key={d.id} className="bg-white p-4 rounded-lg shadow-md border flex justify-between items-center">
              <div>
                <h3 className="font-bold">Livraison #{d.id}</h3>
                <p className="text-sm text-gray-600">{d.originAddress} → {d.destinationAddress}</p>
              </div>
              <span className="text-sm font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                {d.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">Vous n'avez pas encore de livraison.</p>
        )}
      </div>
    </div>
  );
}