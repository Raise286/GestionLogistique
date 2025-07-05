"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { registerUser } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [type, settype] = useState<type>('independant');
    const [orgCode, setOrgCode] = useState(''); // Pour une future validation

    const handleSubmit = async (role: UserRole) => {
      setIsSubmitting(true);
      try {
          const userData: Partial<User> = { email, password, role, name };
          if (role === 'livreur') {
              userData.type = type;
              if (type === 'employe') {
                  // Ici, on validerait le code d'organisation et on trouverait l'ID
                  // Pour la démo, on assigne un ID au hasard
                  userData.organizationId = 4; // L'ID de notre orga de test
              }
          }
          await registerUser(userData);
          toast.success(`Compte ${role} créé avec succès !`);
          router.push('/login');
      } catch (error: any) {
          toast.error(error.message || "Une erreur est survenue.");
      } finally {
          setIsSubmitting(false);
      }
  };

    return (
        <div className="container flex items-center justify-center py-12">
            <Tabs defaultValue="client" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="client">Client</TabsTrigger>
                    <TabsTrigger value="livreur">Livreur</TabsTrigger>
                    <TabsTrigger value="organisation">Organisation</TabsTrigger>
                </TabsList>
                
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Créer un compte</CardTitle>
                        <CardDescription>Entrez vos informations pour commencer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <TabsContent value="client" className="space-y-4">
                            <InputField id="name-client" label="Votre Nom Complet" value={name} onChange={setName} />
                        </TabsContent>
                        <TabsContent value="livreur" className="space-y-4">
                            <InputField id="name-livreur" label="Votre Nom Complet" value={name} onChange={setName} />
                            <div className="space-y-2">
                              <Label>Quel type de livreur êtes-vous ?</Label>
                              <RadioGroup defaultValue="independant" onValueChange={(v) => settype(v as type)}>
                                  <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="independant" id="r-indep" />
                                      <Label htmlFor="r-indep">Indépendant</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="employe" id="r-emp" />
                                      <Label htmlFor="r-emp">Employé d'une organisation</Label>
                                  </div>
                              </RadioGroup>
                            </div>
                          {type === 'employe' && (
                              <InputField id="org-code" label="Code de l'organisation" value={orgCode} onChange={setOrgCode} />
                          )}
                        </TabsContent>
                        <TabsContent value="organisation" className="space-y-4">
                            <InputField id="name-org" label="Nom de l'entreprise" value={name} onChange={setName} />
                        </TabsContent>

                        <InputField id="email" label="Adresse e-mail" type="email" value={email} onChange={setEmail} />
                        <InputField id="password" label="Mot de passe" type="password" value={password} onChange={setPassword} />
                        
                        <TabsContent value="client">
                            <SubmitButton role="client" isSubmitting={isSubmitting} onClick={handleSubmit} />
                        </TabsContent>
                         <TabsContent value="livreur">
                            <SubmitButton role="livreur" isSubmitting={isSubmitting} onClick={handleSubmit} />
                        </TabsContent>
                         <TabsContent value="organisation">
                            <SubmitButton role="organisation" isSubmitting={isSubmitting} onClick={handleSubmit} />
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}

// Helpers pour éviter la répétition
const InputField = ({ id, label, type = "text", value, onChange }: any) => (
    <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required />
    </div>
);

const SubmitButton = ({ role, isSubmitting, onClick }: any) => (
     <Button className="w-full" disabled={isSubmitting} onClick={() => onClick(role)}>
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Créer mon compte {role}
    </Button>
);