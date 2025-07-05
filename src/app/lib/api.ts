// app/lib/api.ts
import { User, Delivery, Application } from "./types";

const API_BASE_URL = 'http://localhost:3001';

interface GeoLocation {
    lat: string;
    lon: string;
    display_name: string;
}

export const searchAddress = async (query: string): Promise<GeoLocation[]> => {
    if (query.length < 3) return [];
    // On limite la recherche au Cameroun pour plus de pertinence
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=cm&format=json&limit=5`;
    const response = await fetch(url);
    if (!response.ok) {
        console.error("Erreur de l'API de géocodage");
        return [];
    }
    return response.json();
}
// --- Fonctions Utilisateurs ---

export const loginUser = async (email: string, pass: string): Promise<User | null> => {
    const res = await fetch(`${API_BASE_URL}/users?email=${email}&password=${pass}`);
    if (!res.ok) throw new Error("Erreur serveur lors de la connexion");
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
}

export const registerUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("L'email existe peut-être déjà.");
    return res.json();
}


// --- Fonctions Livraisons ---

export const getAvailableDeliveries = async (user?: User | null): Promise<Delivery[]> => {
    let url = `${API_BASE_URL}/deliveries?status=pending&_sort=createdAt&_order=desc`;
    
    if (user?.role === 'livreur') {
        if (user.type === 'independant') {
            // Un indépendant ne voit que les livraisons publiques (sans organizationId)
            url += `&organizationId_is_null=true$`; // Astuce pour json-server: chercher les valeurs nulles ou vides
        } else if (user.type === 'employe' && user.organizationId) {
            // Un employé voit les livraisons publiques ET celles de son organisation
            // json-server ne gère pas les OR complexes, on doit faire 2 appels
            const publicRes = await fetch(`${API_BASE_URL}/deliveries?status=pending&organizationId_is_null=true`);
            const orgRes = await fetch(`${API_BASE_URL}/deliveries?status=pending&organizationId=${user.organizationId}`);
            const publicDeliveries = await publicRes.json();
            const orgDeliveries = await orgRes.json();
            return [...publicDeliveries, ...orgDeliveries].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }
    // Si pas d'utilisateur ou pas un livreur, on montre seulement les publiques
    else {
         url += `&organizationId_like=^$`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Impossible de récupérer les livraisons.");
    return res.json();
};

export const getDeliveryById = async (id: number): Promise<Delivery | undefined> => {
    const res = await fetch(`${API_BASE_URL}/deliveries/${id}`);
    if (!res.ok) return undefined;
    return res.json();
};

export const getMyMissions = async (userId: number, role: User['role']): Promise<Delivery[]> => {
    const res = await fetch(`${API_BASE_URL}/deliveries?_sort=createdAt&_order=desc`);
    if (!res.ok) throw new Error("Impossible de récupérer les livraisons.");
    const allDeliveries: Delivery[] = await res.json();
    
    // On force la comparaison avec des nombres
    const userIdAsNumber = Number(userId);

    if (role === 'livreur') {
        return allDeliveries.filter(d => Number(d.livreurId) === userIdAsNumber);
    } else if (role === 'client' || role === 'organisation') {
        return allDeliveries.filter(d => Number(d.clientId) === userIdAsNumber);
    }
    
    return [];
}


// --- Fonctions Postulations (Applications) ---

export const getMyApplications = async (livreurId: number): Promise<Application[]> => {
    const res = await fetch(`${API_BASE_URL}/applications?livreurId=${livreurId}&_sort=id&_order=desc`);
    if (!res.ok) throw new Error("Impossible de récupérer les postulations.");
    return res.json();
}

export const applyForDelivery = async (deliveryId: number, livreurId: number, pickupTime: Date): Promise<Application> => {
    // Étape 1 : Créer l'application
    const applicationRes = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryId, livreurId, pickupTime: pickupTime.toISOString(), status: 'accepted' }),
    });
    if (!applicationRes.ok) throw new Error("Échec de la création de la postulation");
    const newApplication = await applicationRes.json();

    // Étape 2 : Mettre à jour (PATCH) la livraison pour l'assigner
    const deliveryUpdateRes = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            livreurId,
            status: 'assigned',
            pickupDeadline: pickupTime.toISOString(),
        }),
    });
    if (!deliveryUpdateRes.ok) throw new Error("Échec de l'assignation de la livraison");

    return newApplication;
}

export const completeDelivery = async (deliveryId: number, isFinal: boolean, intermediateAddress?: string): Promise<Delivery> => {
    const delivery = await getDeliveryById(deliveryId);
    if (!delivery) throw new Error("Livraison non trouvée");

    const newHistoryEntry = { 
        status: isFinal ? `Delivered` : `Dropped at intermediate point: ${intermediateAddress}`,
        timestamp: new Date().toISOString()
    };
    
    if (isFinal) {
        const res = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'delivered', history: [...delivery.history, newHistoryEntry] }),
        });
        return res.json();
    } else {
        // 1. Mark current leg as complete
        await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'intermediate_drop', history: [...delivery.history, newHistoryEntry] }),
        });
        
        // 2. Create new leg
        const newDeliveryLeg: Partial<Delivery> = {
            clientId: delivery.clientId,
            livreurId: null,
            status: 'pending',
            origin: delivery.destination, // Approximation
            destination: delivery.destination,
            originAddress: intermediateAddress,
            destinationAddress: delivery.destinationAddress,
            price: delivery.price * 0.75, // Adjust price logic
            distance: delivery.distance * 0.75,
            createdAt: new Date().toISOString(),
            history: [{ status: 'Created from intermediate drop', timestamp: new Date().toISOString() }],
        };
        const res = await fetch(`${API_BASE_URL}/deliveries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDeliveryLeg),
        });
        return res.json();
    }
};

export const checkAndExpireMission = async (delivery: Delivery): Promise<Delivery | null> => {
    if (delivery.status !== 'assigned' || !delivery.pickupDeadline) {
        return null; // Pas une mission à vérifier
    }

    if (new Date() > new Date(delivery.pickupDeadline)) {
        // La mission est expirée !
        const res = await fetch(`${API_BASE_URL}/deliveries/${delivery.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: 'pending', // On la remet en 'pending'
                livreurId: null,
                pickupDeadline: null,
                history: [...delivery.history, { status: `Expired and re-opened`, timestamp: new Date().toISOString() }],
            }),
        });
        return res.json();
    }
    return null; // Pas encore expirée
};

// src/app/lib/api.ts
// ...

export const createDelivery = async (deliveryData: Partial<Delivery>): Promise<Delivery> => {
    const res = await fetch(`${API_BASE_URL}/deliveries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...deliveryData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            history: [{ status: 'Created', timestamp: new Date().toISOString() }]
        }),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de la livraison.");
    return res.json();
};

export const markAsInProgress = async (deliveryId: number): Promise<Delivery> => {
    const delivery = await getDeliveryById(deliveryId);
    if (!delivery) throw new Error("Livraison non trouvée");

    const res = await fetch(`${API_BASE_URL}/deliveries/${deliveryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'in_progress',
            history: [...delivery.history, { status: `Picked up by driver`, timestamp: new Date().toISOString() }],
        }),
    });
    if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut.");
    return res.json();
};