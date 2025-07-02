// app/page.tsx
import { Bike, Box, Rocket } from "lucide-react";
import {
  NewDeliveryButton,
  BecomeDriverButton,
} from "@/components/ui/NewDeliveryButton";

export default function HomePage() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="py-20">
        <Rocket className="mx-auto h-16 w-16 text-blue-600" />
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
          La livraison, simplifiée et accélérée.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Que vous soyez un client, un livreur indépendant ou une entreprise,
          notre plateforme connecte vos besoins avec une efficacité redoutable.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {/* On utilise nos nouveaux composants intelligents */}
          <NewDeliveryButton />
          <BecomeDriverButton />
        </div>
      </section>

      {/* ... reste de la page inchangé ... */}
      <section className="py-20 bg-white rounded-xl shadow-sm">
        <h2 className="text-3xl font-bold">Comment ça marche ?</h2>
        <p className="mt-2 text-gray-500">En trois étapes simples.</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-4 rounded-full">
              <Box className="h-8 w-8 text-blue-700" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              1. Soumettez votre livraison
            </h3>
            <p className="mt-2 text-gray-600">
              Décrivez votre colis, les adresses de départ et d'arrivée, et
              choisissez vos options.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Bike className="h-8 w-8 text-green-700" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              2. Un livreur prend en charge
            </h3>
            <p className="mt-2 text-gray-600">
              Un livreur disponible accepte votre mission et se met en route
              immédiatement.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full">
              <Rocket className="h-8 w-8 text-purple-700" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">
              3. Suivez et recevez !
            </h3>
            <p className="mt-2 text-gray-600">
              Suivez votre livraison en temps réel et soyez notifié à chaque
              étape jusqu'à la destination finale.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
