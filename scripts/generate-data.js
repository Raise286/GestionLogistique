const { faker } = require('@faker-js/faker/locale/fr');
const fs = require('fs');

const NUM_USERS = 20;
const NUM_DELIVERIES = 50;
const NUM_ORGS = 5;

// Coordonnées approximatives de Yaoundé
const YDE_LAT_MIN = 3.8;
const YDE_LAT_MAX = 3.9;
const YDE_LNG_MIN = 11.45;
const YDE_LNG_MAX = 11.55;

const users = [];
const deliveries = [];
const applications = [];

// Utilisateurs de base
users.push(
    { id: 1, email: 'livreur@test.com', password: '123', role: 'livreur', name: 'Jean Livreur' },
    { id: 2, email: 'client@test.com', password: '123', role: 'client', name: 'Marie Cliente' },
    { id: 3, email: 'admin@pickndrop.link', password: '123', role: 'admin', name: 'Admin PNDL' },
    { id: 4, email: 'org@test.com', password: '123', role: 'organisation', name: 'Super U Mvog-Mbi' }
);

// Générer des organisations
for (let i = 5; i < 5 + NUM_ORGS; i++) {
    users.push({
        id: i,
        email: faker.internet.email(),
        password: '123',
        role: 'organisation',
        name: faker.company.name()
    });
}

// Générer des livreurs
for (let i = 5 + NUM_ORGS; i < 5 + NUM_ORGS + NUM_USERS; i++) {
    const isEmployee = faker.datatype.boolean();
    users.push({
        id: i,
        email: faker.internet.email(),
        password: '123',
        role: 'livreur',
        name: faker.person.fullName(),
        // NOUVEAU
        type: isEmployee ? 'employe' : 'independant',
        organizationId: isEmployee ? faker.helpers.arrayElement(users.filter(u => u.role === 'organisation')).id : null,
        photoUrl: faker.image.avatar(), // Génère une URL de photo d'avatar
        equipment: faker.helpers.arrayElement(['vélo', 'scooter', 'voiture'])
    });
}

// Générer des livraisons
for (let i = 1; i <= NUM_DELIVERIES; i++) {
    const origin = { lat: faker.location.latitude({ min: YDE_LAT_MIN, max: YDE_LAT_MAX }), lng: faker.location.longitude({ min: YDE_LNG_MIN, max: YDE_LNG_MAX }) };
    const destination = { lat: faker.location.latitude({ min: YDE_LAT_MIN, max: YDE_LAT_MAX }), lng: faker.location.longitude({ min: YDE_LNG_MIN, max: YDE_LNG_MAX }) };
    const isPrivate = faker.datatype.boolean({ probability: 0.3 }); // 30% de livraisons privées

    deliveries.push({
        id: i,
        clientId: 2,
        livreurId: null,
        status: 'pending',
        organizationId: isPrivate ? faker.helpers.arrayElement(users.filter(u => u.role === 'organisation')).id : null,
        origin,
        destination,
        currentPosition: origin,
        originAddress: `${faker.location.streetAddress(false)}, ${faker.helpers.arrayElement(['Bastos', 'Mokolo', 'Essos', 'Mvan', 'Biyem-Assi'])}`,
        destinationAddress: `${faker.location.streetAddress(false)}, ${faker.helpers.arrayElement(['Nlongkak', 'Elig-Essono', 'Mendong', 'Etoa-Meki'])}`,
        price: parseFloat(faker.commerce.price({ min: 1000, max: 5000 })), // Prix en XAF
        distance: parseFloat(faker.number.float({ min: 1, max: 15, precision: 0.1 })),
        pickupDeadline: null,
        createdAt: faker.date.recent({ days: 10 }).toISOString(),
        history: [{ status: 'Created', timestamp: new Date().toISOString() }]
    });
}

const db = { users, deliveries, applications };
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('✅ Base de données (Yaoundé) générée avec succès dans db.json !');