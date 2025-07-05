// src/app/components/livreur/CompleteMissionDialog.tsx
"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Delivery } from "@/lib/types";
import { completeDelivery } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface CompleteMissionDialogProps {
    delivery: Delivery;
    onMissionUpdate: () => void;
}

export function CompleteMissionDialog({ delivery, onMissionUpdate }: CompleteMissionDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [completionType, setCompletionType] = useState<"final" | "intermediate">("final");
    const [intermediateAddress, setIntermediateAddress] = useState("");

    const handleConfirm = async () => {
        if (completionType === "intermediate" && !intermediateAddress) {
            toast.error("Veuillez entrer une adresse pour le point intermédiaire.");
            return;
        }
        setIsLoading(true);
        try {
            await completeDelivery(delivery.id, completionType === "final", intermediateAddress);
            toast.success("Mission terminée avec succès !");
            onMissionUpdate(); // Rafraîchit la liste
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {/* CORRECTION : On enlève la condition 'disabled' d'ici.
                    Le bouton s'appellera simplement "Terminer la mission". */}
                <Button>Terminer la mission</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Terminer la mission #{delivery.id}</DialogTitle>
                    <DialogDescription>
                        Indiquez où vous déposez le colis. Cette action est finale.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <RadioGroup defaultValue="final" value={completionType} onValueChange={(value: any) => setCompletionType(value)}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="final" id="r1" />
                            <Label htmlFor="r1">Je dépose à la destination finale</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="intermediate" id="r2" />
                            <Label htmlFor="r2">Je dépose à un point intermédiaire</Label>
                        </div>
                    </RadioGroup>

                    {completionType === "intermediate" && (
                        <div className="grid grid-cols-4 items-center gap-4 mt-4">
                            <Label htmlFor="address" className="text-right col-span-1">Adresse</Label>
                            <Input
                                id="address"
                                value={intermediateAddress}
                                onChange={(e) => setIntermediateAddress(e.target.value)}
                                className="col-span-3"
                                placeholder="Ex: Agence de voyage Buca"
                            />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Annuler</Button>
                    <Button onClick={handleConfirm} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirmer le dépôt
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}