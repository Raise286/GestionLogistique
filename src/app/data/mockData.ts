// app/data/mockData.ts
import { User, Delivery, Application } from '@/lib/types';

export const users: User[] = [
  { id: 1, email: 'livreur.indep@test.com', password: '123', role: 'livreur' },
  { id: 3, email: 'client.a@test.com', password: '123', role: 'client' },
  { id: 5, email: 'admin@pickndrop.link', password: '123', role: 'admin' },
];

export let deliveries: Delivery[] = [
  { 
    id: 1, 
    clientId: 3, 
    livreurId: null,
    status: 'pending', 
    origin: { lat: 48.8566, lng: 2.3522 },
    destination: { lat: 48.8666, lng: 2.3322 },
    originAddress: 'Hôtel de Ville, Paris',
    destinationAddress: 'Jardin des Tuileries, Paris',
    price: 12.50,
    distance: 2.1,
    createdAt: new Date().toISOString(),
    history: [{ status: 'Created', timestamp: new Date().toISOString() }]
  },
  { 
    id: 2, 
    clientId: 3, 
    livreurId: null, 
    status: 'pending', 
    origin: { lat: 45.7640, lng: 4.8357 },
    destination: { lat: 45.75, lng: 4.85 },
    originAddress: 'Vieux Lyon, Lyon',
    destinationAddress: 'Place Bellecour, Lyon',
    price: 15.00,
    distance: 3.5,
    createdAt: new Date().toISOString(),
    history: [{ status: 'Created', timestamp: new Date().toISOString() }]
  },
];

export let applications: Application[] = [];