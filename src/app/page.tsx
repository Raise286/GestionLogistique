// app/page.tsx
import { ArrowRight, Bike, Box, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              PicknDrop Link
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              La livraison, simplifiée et accélérée. Votre plateforme tout-en-un pour gérer et réaliser vos livraisons facilement et rapidement.
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/offres">Voir les offres</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">
                Devenir Livreur <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                Nos Avantages
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Pourquoi nous choisir ?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Une solution complète pensée pour les clients, les livreurs et les organisations.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <FeatureCard
              icon={<Box className="h-8 w-8 text-primary" />}
              title="Soumission Facile"
              description="Décrivez votre colis, les adresses de départ et d'arrivée, et choisissez vos options en quelques clics."
            />
            <FeatureCard
              icon={<Bike className="h-8 w-8 text-primary" />}
              title="Livreurs Réactifs"
              description="Un livreur disponible accepte votre mission et se met en route immédiatement."
            />
            <FeatureCard
              icon={<Rocket className="h-8 w-8 text-primary" />}
              title="Suivi en Temps Réel"
              description="Suivez votre livraison à chaque étape et soyez notifié jusqu'à la destination finale."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Un petit composant helper pour la section des fonctionnalités
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  )
}