// app/(auth)/login/page.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState('livreur@test.com');
  const [password, setPassword] = useState('123');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, isLoading: isAuthLoading } = useAuth(); // On récupère l'état de chargement de l'authentification
  const router = useRouter();

  // --- OPTIMISATION CLÉ ---
  // Ce hook redirige si l'utilisateur est déjà connecté.
  // Il ne s'exécute qu'une fois le statut d'authentification connu.
  useEffect(() => {
    if (!isAuthLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isAuthLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast.success("Connexion réussie !");
      router.push('/dashboard');
    } else {
      toast.error('Email ou mot de passe incorrect.');
      setIsSubmitting(false);
    }
  };

  // --- OPTIMISATION CLÉ ---
  // On affiche un loader général UNIQUEMENT si l'authentification est en cours
  // ET qu'on ne sait pas encore s'il y a un utilisateur.
  // Cela empêche l'affichage "flash" de la page de login avant la redirection.
  if (isAuthLoading || user) {
      return (
          <div className="flex items-center justify-center h-screen">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      );
  }

  // Si l'authentification est terminée et qu'il n'y a pas d'utilisateur,
  // on affiche le formulaire de connexion.
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>
            Entrez votre email ci-dessous pour vous connecter à votre compte.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
            <div className="mt-4 text-center text-sm">
              Vous n'avez pas de compte?{" "}
              <Link href="/register" className="underline">
                S'inscrire
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}