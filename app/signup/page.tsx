// app/signup/page.tsx
'use client'; // On a besoin d'interactivité, donc c'est un composant client

import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Building, Mail, User, Lock } from 'lucide-react';

// On définit le type de rôle pour être clair
type Role = 'INDEPENDENT' | 'AGENCY_MEMBER';

export default function SignupPage() {
  // On utilise useState pour suivre le rôle sélectionné par l'utilisateur
  const [role, setRole] = useState<Role>('INDEPENDENT');

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Créer votre compte Waka Colis</h1>
          <CardDescription>Rejoignez notre réseau de livreurs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Sélecteur de rôle */}
            <div className="space-y-2">
              <Label>Quel type de livreur êtes-vous ?</Label>
              <RadioGroup
                defaultValue="INDEPENDENT"
                onValueChange={(value: Role) => setRole(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="INDEPENDENT" id="independent" className="peer sr-only" />
                  <Label
                    htmlFor="independent"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Truck className="mb-3 h-6 w-6" />
                    Indépendant
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="AGENCY_MEMBER" id="agency" className="peer sr-only" />
                  <Label
                    htmlFor="agency"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    Membre d'agence
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Champs communs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Djibrila" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Waka" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="djibrila@waka.cm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" />
            </div>

            {/* Champ conditionnel pour le membre d'agence */}
            {role === 'AGENCY_MEMBER' && (
              <div className="space-y-2 transition-all duration-300 animate-in fade-in">
                <Label htmlFor="agencyCode">Code de l'agence</Label>
                <Input id="agencyCode" placeholder="Entrez le code de votre agence" />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              Créer mon compte
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>Vous avez déjà un compte ? <Link href="/login" className="font-semibold text-blue-600 hover:underline">Connectez-vous</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}