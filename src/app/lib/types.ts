// app/lib/types.ts
export type UserRole = 'livreur' | 'client' | 'organisation' | 'admin';
export type type = 'independant' | 'employe';
export type DeliveryStatus = 'pending' | 'applied' | 'assigned' | 'in_progress' | 'intermediate_drop' | 'delivered' | 'cancelled' | 'expired';
export type EquipmentType = 'vélo' | 'scooter' | 'voiture' | 'camion' | 'avion'; 

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Le mot de passe ne devrait jamais être sur le frontend en vrai
  role: UserRole;
  photoUrl?: string;
  // Spécifique au livreur
  type?: type;
  organizationId?: number | null;
  status?: 'online' | 'offline';
  equipment?: EquipmentType;
}

export interface Application {
  id: number;
  deliveryId: number;
  livreurId: number;
  pickupTime: string; // Heure de récupération proposée (ISO string)
  status: 'pending' | 'accepted' | 'rejected';
  proposedDestination: 'final' | 'intermediate';
  intermediateAddress?: string;
}

export interface Delivery {
  id: number;
  clientId: number;
  livreurId: number | null;
  status: DeliveryStatus;
  organizationId?: number | null; 
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  currentPosition?: { lat: number; lng: number };
  originAddress: string;
  destinationAddress: string;
  price: number;
  distance: number; // en km
  pickupDeadline?: string; // Limite pour récupérer le colis (ISO string)
  createdAt: string;
  history: { status: string; timestamp: string; location?: string }[];
}