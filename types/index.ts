// types/index.ts
export type Role = 'INDEPENDENT' | 'AGENCY_MEMBER';
export type DeliveryStatus = 'PENDING' | 'ACCEPTED' | 'PICKED_UP' | 'DELIVERED';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  agencyName?: string; // Optionnel, seulement pour les membres d'agence
}

export interface Delivery {
  id: string;
  status: DeliveryStatus;
  pickupAddress: string;
  dropoffAddress: string;
  customerName: string;
  createdAt: string;
  vehicle?: {
    model: string;
    licensePlate: string;
    photoUrl: string;
  };
}