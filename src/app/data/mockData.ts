// app/data/mockData.ts
import { User, Delivery } from '@/lib/types';

export const users: User[] = [
  { id: 1, email: 'livreur.indep@test.com', password: '123', role: 'livreur', type: 'independant', status: 'online', equipment: 'vélo' },
  { id: 2, email: 'livreur.emp@test.com', password: '123', role: 'livreur', type: 'employe', organizationId: 101, status: 'offline', equipment: 'voiture' },
  { id: 3, email: 'client.a@test.com', password: '123', role: 'client' },
  { id: 4, email: 'admin.org@test.com', password: '123', role: 'organisation', organizationId: 101 },
];

export const deliveries: Delivery[] = [
  { 
    id: 1, 
    clientId: 3, 
    livreurId: null,
    organizationId: null, // Public
    status: 'pending', 
    origin: { lat: 48.8566, lng: 2.3522 },
    destination: { lat: 48.8666, lng: 2.3322 },
    originAddress: 'Hôtel de Ville, Paris',
    destinationAddress: 'Jardin des Tuileries, Paris',
    urgency: 'high',
    isPerishable: false,
    isFragile: true,
    createdAt: new Date().toISOString(),
  },
  { 
    id: 2, 
    clientId: 4, 
    livreurId: null, 
    organizationId: 101, // Private
    status: 'pending', 
    origin: { lat: 45.7640, lng: 4.8357 },
    destination: { lat: 45.75, lng: 4.85 },
    originAddress: 'Vieux Lyon, Lyon',
    destinationAddress: 'Place Bellecour, Lyon',
    urgency: 'normal',
    isPerishable: true,
    isFragile: false,
    createdAt: new Date().toISOString(),
  },
];