// app/components/ui/NewDeliveryButton.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function NewDeliveryButton() {
    const { user } = useAuth();

    // Le bouton change de destination en fonction du statut de l'utilisateur
    const href = user ? `/dashboard/missions` : '/login';
    const text = user ? "Aller à mon Dashboard" : "Envoyer un colis";

    return (
        <Link href={href} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-transform hover:scale-105">
            {text}
        </Link>
    )
}

export function BecomeDriverButton() {
     return (
         <Link href="/register" className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-transform hover:scale-105">
            Devenir Livreur <ArrowRight className="inline ml-1" size={16} />
        </Link>
     )
}