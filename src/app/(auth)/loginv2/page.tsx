"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("livreur.indep@test.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Échec de la connexion");

      const data = await res.json();

      localStorage.setItem("token", data.token);
      router.push(`/dashboard/${data.user.role}`);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fce4ec]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#f3f4f6] rounded-2xl shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-[#6b7280]">
          Connexion
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e0f2fe] focus:border-[#e0f2fe]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#e0f2fe] focus:border-[#e0f2fe]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#e0f2fe] hover:bg-[#bae6fd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e0f2fe]"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
