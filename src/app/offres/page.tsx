// src/app/offres/page.tsx
"use client";
import { getAvailableDeliveries } from "@/lib/api";
import { Delivery } from "@/lib/types";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Loader2, MapPin, Star, Truck, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Ajoutez le composant Select



const ITEMS_PER_PAGE = 8;

export default function OffersPage() {
    const { user } = useAuth();
    const [allDeliveries, setAllDeliveries] = useState<Delivery[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // États pour le tri et la pagination
    const [sortOption, setSortOption] = useState("createdAt_desc");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getAvailableDeliveries(user)
            .then(setAllDeliveries)
            .finally(() => setIsLoading(false));
    }, [user]);

    // Logique de tri et de pagination
    const sortedAndPaginatedDeliveries = useMemo(() => {
        const sorted = [...allDeliveries].sort((a, b) => {
            switch (sortOption) {
                case "price_asc":
                    return a.price - b.price;
                case "price_desc":
                    return b.price - a.price;
                case "distance_asc":
                    return a.distance - b.distance;
                case "distance_desc":
                    return b.distance - a.distance;
                default: // createdAt_desc
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return sorted.slice(startIndex, endIndex);
    }, [allDeliveries, sortOption, currentPage]);

    const totalPages = Math.ceil(allDeliveries.length / ITEMS_PER_PAGE);

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;
    }

    return (
        <div className="container py-8">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Offres de livraison disponibles</h1>
                {/* Section de Tri */}
                <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="createdAt_desc">Plus récentes</SelectItem>
                            <SelectItem value="price_desc">Prix (décroissant)</SelectItem>
                            <SelectItem value="price_asc">Prix (croissant)</SelectItem>
                            <SelectItem value="distance_asc">Distance (la + courte)</SelectItem>
                            <SelectItem value="distance_desc">Distance (la + longue)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grille des offres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedAndPaginatedDeliveries.map(d => (
                    <Card key={d.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle className="truncate">Livraison #{d.id}</CardTitle>
                            <CardDescription>{d.distance.toFixed(1)} km</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2 text-sm">
                            <p className="flex items-start gap-2"><MapPin size={16} className="text-primary mt-1 flex-shrink-0" /> {d.originAddress}</p>
                            <p className="flex items-start gap-2"><Star size={16} className="text-primary mt-1 flex-shrink-0" /> {d.destinationAddress}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <span className="font-bold text-lg text-green-600">{new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(d.price)}</span>
                            <Button asChild size="sm">
                                <Link href={`/offres/${d.id}`}>
                                    <Truck className="mr-2 h-4 w-4" /> Postuler
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

             {/* Contrôles de Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} sur {totalPages}
                    </span>
                    <Button 
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Suivant
                    </Button>
                </div>
            )}
            
            {allDeliveries.length === 0 && !isLoading && (
                 <div className="text-center py-10 border-2 border-dashed rounded-lg mt-8">
                    <p className="text-muted-foreground">Aucune offre de livraison disponible pour le moment.</p>
                </div>
            )}
        </div>
    );
}