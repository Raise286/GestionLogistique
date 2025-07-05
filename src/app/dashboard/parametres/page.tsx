// src/app/dashboard/parametres/page.tsx
"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User as UserIcon, Bike, KeyRound, Building, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EquipmentType, User } from "@/lib/types";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Composant pour le profil de base (Client & Organisation)
function BasicProfileForm({ user }: { user: User }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // Logique API pour sauvegarder...
        setTimeout(() => {
            toast.success("Profil mis à jour !");
            setIsSaving(false);
        }, 1000);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" /> Enregistrer
            </Button>
        </form>
    );
}

// Composant pour le profil avancé du Livreur
function LivreurProfileForm({ user }: { user: User }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [equipment, setEquipment] = useState<EquipmentType>(user.equipment || 'vélo');
    const [isSaving, setIsSaving] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            toast.success("Profil mis à jour !");
            setIsSaving(false);
        }, 1000);
    }
    
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("Le nouveau mot de passe doit faire au moins 6 caractères.");
            return;
        }
        // Logique API pour changer le mot de passe...
        toast.success("Mot de passe changé avec succès !");
        setOldPassword('');
        setNewPassword('');
    }

    return (
        <div className="space-y-8">
            {/* Section Informations Personnelles */}
            <form onSubmit={handleProfileSubmit} className="space-y-6">
                 <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-primary/20">
                      {/* 1. Shadcn essaie de charger cette image. */}
                      {/*    On passe une chaîne vide si user.photoUrl est null/undefined pour éviter les erreurs. */}
                      <AvatarImage src={user.photoUrl || ''} alt={`Photo de ${user.name}`} />

                      {/* 2. Si AvatarImage échoue, ce Fallback s'affiche automatiquement. */}
                      <AvatarFallback>
                        <UserIcon className="h-10 w-10 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-grow">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                 </div>
                 <div className="space-y-1">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="equipment">Matériel principal</Label>
                    <Select value={equipment} onValueChange={(v) => setEquipment(v as EquipmentType)}>
                        <SelectTrigger id="equipment" className="w-[280px]">
                            <SelectValue placeholder="Sélectionnez votre matériel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vélo">Vélo</SelectItem>
                            <SelectItem value="scooter">Scooter</SelectItem>
                            <SelectItem value="voiture">Voiture</SelectItem>
                            <SelectItem value="camion">Camion</SelectItem>
                            <SelectItem value="avion">Avion</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" /> Enregistrer le profil
                </Button>
            </form>

            <Separator />

            {/* Section Mot de Passe */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2"><KeyRound className="h-5 w-5"/>Changer le mot de passe</h3>
                <div className="space-y-1">
                    <Label htmlFor="old-password">Ancien mot de passe</Label>
                    <Input id="old-password" type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="new-password">Nouveau mot de passe</Label>
                    <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <Button type="submit" variant="secondary">Changer mon mot de passe</Button>
            </form>
        </div>
    );
}


export default function SettingsPage() {
    const { user, isLoading } = useAuth();
    
    if (isLoading) return <div className="flex justify-center mt-10"><Loader2 className="animate-spin h-8 w-8" /></div>;
    if (!user) return <p>Utilisateur non trouvé.</p>;

    const getIcon = () => {
        switch (user.role) {
            case 'livreur': return <Bike className="h-6 w-6" />;
            case 'organisation': return <Building className="h-6 w-6" />;
            default: return <UserIcon className="h-6 w-6" />;
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        {getIcon()}
                        <div>
                            <CardTitle>Mon Profil ({user.role})</CardTitle>
                            <CardDescription>Gérez vos informations personnelles et vos préférences.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {user.role === 'livreur' 
                        ? <LivreurProfileForm user={user} />
                        : <BasicProfileForm user={user} />
                    }
                </CardContent>
            </Card>
        </div>
    );
}