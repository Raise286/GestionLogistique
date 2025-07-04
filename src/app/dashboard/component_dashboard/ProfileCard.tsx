"use client"
// components/ProfilVerification.tsx
import { useState } from 'react';

interface DonneesProfile {
  nom: string;
  telephone: string;
  estVerifie: boolean;
  urlPhoto?: string;
  statutCNI: 'en_attente' | 'approuve' | 'rejete' | 'non_soumis';
}

export default function ProfilVerification() {
  const [profil, setProfil] = useState<DonneesProfile>({
    nom: 'Jean Dupont',
    telephone: '+123456789',
    estVerifie: true,
    urlPhoto: '',
    statutCNI: 'en_attente'
  });

  const gererTelechargementFichier = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logique de téléchargement de fichier ici
    console.log('Fichier téléchargé:', event.target.files?.[0]);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-8">
        <div className="flex items-center space-x-4">
          <div className="relative h-20 w-20">
            {profil.urlPhoto ? (
              <img
                src={profil.urlPhoto}
                alt="Profil"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{profil.nom}</h2>
            <p className="text-gray-600">{profil.telephone}</p>
            
            <div className="mt-2">
              {profil.estVerifie ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Livreur Vérifié
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Vérification en Attente
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Vérification des Documents</h3>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Statut CNI :</span>
              <span className={`text-sm font-medium ${
                profil.statutCNI === 'approuve' ? 'text-green-600' :
                profil.statutCNI === 'rejete' ? 'text-red-600' :
                profil.statutCNI === 'en_attente' ? 'text-yellow-600' :
                'text-gray-600'
              }`}>
                {profil.statutCNI === 'en_attente' ? 'En Attente' :
                 profil.statutCNI === 'approuve' ? 'Approuvé' :
                 profil.statutCNI === 'rejete' ? 'Rejeté' :
                 'Non Soumis'}
              </span>
            </div>

            <div className="mt-4">
              <label className="block">
                <span className="sr-only">Choisir photo CNI</span>
                <input
                  type="file"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  accept="image/*"
                  onChange={gererTelechargementFichier}
                />
              </label>
            </div>
          </div>
        </div>

        {!profil.estVerifie && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Téléchargez votre photo CNI pour compléter la vérification et commencer à accepter les missions de livraison.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
