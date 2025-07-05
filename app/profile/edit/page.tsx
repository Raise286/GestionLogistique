// app/profile/edit/page.tsx
'use client'; 

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ArrowLeft, Camera, Car, Bike, PlusCircle, Trash2, Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- TYPES DE DONNÉES ---
type Vehicle = {
  id: number; type: 'Moto' | 'Voiture'; brand: string; model: string; seats: number; imageUrl: string;
};
type Pricing = {
  baseFee: number; // Tarif de base par course
  perKmFee: number; // Tarif par kilomètre
  heavyPackageFee: number; // Supplément en % pour colis lourd
};

// --- DONNÉES FICTIVES ---
const initialVehicles: Vehicle[] = [
  { id: 1, type: 'Moto', brand: 'Haojue', model: 'HJ150', seats: 1, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, type: 'Voiture', brand: 'Toyota', model: 'Yaris', seats: 4, imageUrl: 'https://via.placeholder.com/150' },
];
const user = {
  firstName: 'Djibrila', lastName: 'Indépendant', email: 'djibrila.indep@test.com', avatarUrl: 'https://github.com/shadcn.png',
};
const initialPricing: Pricing = {
  baseFee: 1500, // en XAF
  perKmFee: 250, // en XAF
  heavyPackageFee: 20, // en %
};


// --- COMPOSANT DE LA PAGE ---
export default function EditProfilePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [pricing, setPricing] = useState<Pricing>(initialPricing);

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="h-8 w-8 text-slate-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
              <p className="text-slate-500">Mettez à jour vos informations ici.</p>
            </div>
          </div>
          <Button asChild variant="outline"><Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Retour</Link></Button>
        </div>

        <div className="space-y-8">
          {/* CARTE 1: Informations Personnelles */}
          <Card>
            <CardHeader><CardTitle>Informations Personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20"><AvatarImage src={user.avatarUrl} alt={user.firstName} /><AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback></Avatar>
                <Button variant="outline"><Camera className="mr-2 h-4 w-4" /> Changer la photo</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="firstName">Prénom</Label><Input id="firstName" defaultValue={user.firstName} /></div>
                <div className="space-y-2"><Label htmlFor="lastName">Nom</Label><Input id="lastName" defaultValue={user.lastName} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="email">Adresse Email</Label><Input id="email" type="email" defaultValue={user.email} disabled /><p className="text-xs text-slate-500">L'email ne peut pas être modifié.</p></div>
            </CardContent>
          </Card>

          {/* CARTE 2: Mes Véhicules */}
          <Card>
            <CardHeader><CardTitle>Mes Véhicules</CardTitle><CardDescription>Gérez la liste des véhicules que vous utilisez.</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-4">
                    {vehicle.type === 'Moto' ? <Bike className="h-8 w-8 text-slate-500" /> : <Car className="h-8 w-8 text-slate-500" />}
                    <div><p className="font-semibold">{vehicle.brand} {vehicle.model}</p><p className="text-sm text-slate-500">{vehicle.type} - {vehicle.seats} place(s)</p></div>
                  </div>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              ))}
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="w-full mt-4"><PlusCircle className="mr-2 h-4 w-4" /> Ajouter un véhicule</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Ajouter un nouveau véhicule</DialogTitle><DialogDescription>Remplissez les informations de votre véhicule.</DialogDescription></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2"><Label htmlFor="type">Type de véhicule</Label><Select><SelectTrigger><SelectValue placeholder="Sélectionnez un type" /></SelectTrigger><SelectContent><SelectItem value="Moto">Moto</SelectItem><SelectItem value="Voiture">Voiture</SelectItem></SelectContent></Select></div>
                    <div className="space-y-2"><Label htmlFor="brand">Marque</Label><Input id="brand" placeholder="ex: Toyota" /></div>
                    <div className="space-y-2"><Label htmlFor="model">Modèle</Label><Input id="model" placeholder="ex: Yaris" /></div>
                    <div className="space-y-2"><Label htmlFor="seats">Nombre de places</Label><Input id="seats" type="number" placeholder="ex: 4" /></div>
                    <div className="space-y-2"><Label htmlFor="picture">Photo du véhicule</Label><Input id="picture" type="file" /></div>
                  </div>
                  <DialogFooter><Button type="submit">Enregistrer le véhicule</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* CARTE 3: Mes Tarifs */}
          <Card>
            <CardHeader>
              <CardTitle>Mes Tarifs</CardTitle>
              <CardDescription>Définissez comment vous êtes rémunéré pour vos courses.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="baseFee">Tarif de base (XAF)</Label>
                <Input id="baseFee" type="number" defaultValue={pricing.baseFee} placeholder="ex: 1500" />
                <p className="text-xs text-slate-500">Montant fixe pour chaque course.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="perKmFee">Tarif par kilomètre (XAF)</Label>
                <Input id="perKmFee" type="number" defaultValue={pricing.perKmFee} placeholder="ex: 250" />
                <p className="text-xs text-slate-500">Montant ajouté pour chaque km parcouru.</p>
              </div>
               <div className="space-y-2 md:col-span-2">
                <Label htmlFor="heavyPackageFee">Supplément colis lourd (%)</Label>
                <Input id="heavyPackageFee" type="number" defaultValue={pricing.heavyPackageFee} placeholder="ex: 20" />
                <p className="text-xs text-slate-500">Pourcentage ajouté au total pour les colis spéciaux.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button size="lg">
            <Wallet className="mr-2 h-4 w-4" />
            Enregistrer Toutes les Modifications
          </Button>
        </div>

      </div>
    </div>
  );
}