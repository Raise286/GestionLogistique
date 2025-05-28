import Link from 'next/link'

export default function HomePage() {
  const services = [
    {
      title: "Émettre un colis",
      description: "Enregistrez un nouveau colis à expédier",
      href: "/emit-package",
      icon: "📦",
      color: "bg-blue-500"
    },
    {
      title: "Point de livraison",
      description: "Créez un nouveau point de livraison",
      href: "/register-delivery-point",
      icon: "📍",
      color: "bg-green-500"
    },
    {
      title: "Recevoir un colis",  
      description: "Confirmez la réception d'un colis",
      href: "/receive-package",
      icon: "📥",
      color: "bg-purple-500"
    },
    {
      title: "Retirer un colis",
      description: "Enregistrez le retrait d'un colis",
      href: "/withdraw-package",
      icon: "📤",
      color: "bg-orange-500"
    },
    {
      title: "Payer les frais",
      description: "Réglez les frais d'expédition",
      href: "/payment",
      icon: "💳",
      color: "bg-red-500"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          LogistiColis
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Système complet de gestion logistique pour le suivi et la gestion 
          de vos expéditions de colis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center text-blue-600 font-medium">
                Accéder
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Fonctionnalités principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Traçabilité complète</h4>
                <p className="text-gray-600 text-sm">Suivi en temps réel de tous vos colis</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Gestion des points</h4>
                <p className="text-gray-600 text-sm">Réseau complet de points de livraison</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Paiements sécurisés</h4>
                <p className="text-gray-600 text-sm">Multiple options de paiement</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Interface intuitive</h4>
                <p className="text-gray-600 text-sm">Facilité d'utilisation pour tous</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Notifications</h4>
                <p className="text-gray-600 text-sm">Alertes SMS et email automatiques</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
              <div>
                <h4 className="font-semibold text-gray-800">Rapports détaillés</h4>
                <p className="text-gray-600 text-sm">Statistiques et analyses complètes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
