//PAGE D'ACCUEIL DE WAKA COLIS
// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Truck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-gray-800">Waka Colis</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Se connecter
          </Link>
          <Button asChild>
            <Link href="/signup">S'inscrire</Link>
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Devenez votre propre patron.
            <br />
            <span className="text-blue-600">Livrez avec Waka Colis.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            La plateforme conçue pour les livreurs indépendants et professionnels au Cameroun.
            Gérez vos courses et suivez vos gains, en toute simplicité.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Commencer maintenant <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              En savoir plus
            </Button>
          </div>
        </section>

        {/* On ajoutera les autres sections ici plus tard */}
        
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t">
        <div className="container mx-auto px-4 sm:px-6 py-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Waka Colis. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
} 