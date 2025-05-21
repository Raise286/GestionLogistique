import { useState } from 'react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'authentification à implémenter
    console.log(isLogin ? 'Connexion' : 'Inscription', { email, password, name, phone });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">ExpressLivraison</h1>
          <p className="text-gray-600">Gestion de colis simplifiée</p>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 text-center ${
              isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            } rounded-l-lg transition-colors`}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              !isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            } rounded-r-lg transition-colors`}
            onClick={() => setIsLogin(false)}
          >
            Inscription
          </button>
        </div>

        <div>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                  Nom complet
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre numéro de téléphone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isLogin && (
            <div className="flex justify-end mb-6">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Mot de passe oublié ?
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isLogin ? 'Se connecter' : 'S\'inscrire'}
          </button>
        </div>
      </div>
    </div>
  );
}