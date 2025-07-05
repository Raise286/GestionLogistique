// app/login/page.tsx
'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation'; // Important pour la redirection !

export default function LoginPage() {
  const router = useRouter();

  // FAUSSE LOGIQUE DE CONNEXION :
  // Quand on clique sur le bouton, on redirige directement vers le tableau de bord.
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); // Empêche le rechargement de la page
    console.log("Tentative de connexion (simulation)...");
    // Redirection vers le dashboard
    router.push('/profile/edit'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Connexion à Waka Colis</CardTitle>
          <CardDescription>Entrez vos identifiants pour continuer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="djibrila@waka.cm" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center text-sm">
          <Link href="#" className="font-semibold text-blue-600 hover:underline">
            Mot de passe oublié ?
          </Link>
          <p>Pas encore de compte ? <Link href="/signup" className="font-semibold text-blue-600 hover:underline">Inscrivez-vous</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}