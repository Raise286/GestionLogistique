// app/lib/types.ts
export type UserRole = 'livreur' | 'client' | 'organisation';
export type LivreurType = 'independant' | 'employe';
export type DeliveryStatus = 'pending' | 'assigned' | 'in_progress' | 'delivered' | 'cancelled';

export interface User {
  id: number;
  email: string;
  password?: string; // Le mot de passe ne devrait jamais être sur le frontend en vrai
  role: UserRole;
  // Spécifique au livreur
  type?: LivreurType;
  organizationId?: number | null;
  status?: 'online' | 'offline';
  equipment?: 'vélo' | 'scooter' | 'voiture';
}

export interface Delivery {
  id: number;
  clientId: number;
  livreurId: number | null;
  organizationId: number | null;
  status: DeliveryStatus;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  originAddress: string;
  destinationAddress: string;
  urgency: 'normal' | 'high';
  isPerishable: boolean;
  isFragile: boolean;
  createdAt: string;
}