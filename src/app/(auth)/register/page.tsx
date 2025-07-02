// app/(auth)/register/page.tsx
"use client";

import { UserRole, LivreurType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const [livreurType, setLivreurType] = useState<LivreurType>('independant');
  const [orgCode, setOrgCode] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulation d'inscription
    console.log({
      email,
      password,
      role,
      ...(role === 'livreur' && { livreurType }),
      ...(livreurType === 'employe' && { orgCode })
    });
    alert("Inscription réussie ! Vous allez être redirigé vers la page de connexion.");
    router.push('/login');
  }

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Créer un Compte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Je suis un...</label>
            <select value={role} onChange={(e) => setRole(e.target.value as UserRole)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="client">Client</option>
              <option value="livreur">Livreur</option>
            </select>
          </div>

          {role === 'livreur' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Type de livreur</label>
              <select value={livreurType} onChange={(e) => setLivreurType(e.target.value as LivreurType)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option value="independant">Indépendant</option>
                <option value="employe">Employé d'une organisation</option>
              </select>
            </div>
          )}

          {role === 'livreur' && livreurType === 'employe' && (
             <div>
              <label htmlFor="orgCode" className="block text-sm font-medium text-gray-700">Code de l'organisation</label>
              <input id="orgCode" type="text" value={orgCode} onChange={(e) => setOrgCode(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
          )}

          <hr />

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
          </div>

          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}