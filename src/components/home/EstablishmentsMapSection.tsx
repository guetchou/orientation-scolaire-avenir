
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapDisplay } from "./map/MapDisplay";
import { EstablishmentFilters } from "./map/EstablishmentFilters";
import { EstablishmentList } from "./map/EstablishmentList";
import { getMarkerIcon } from "./map/mapUtils";
import { useQuery } from "@tanstack/react-query";
import type { Neighborhood } from "./types/establishments";

export const EstablishmentsMapSection = () => {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const { toast } = useToast();

  const { data: neighborhoods = [] } = useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      try {
        console.log("Fetching neighborhoods...");
        const { data, error } = await supabase
          .from("neighborhoods")
          .select("*")
          .order("city", { ascending: true });

        if (error) {
          console.error("Error fetching neighborhoods:", error);
          toast({
            title: "Erreur",
            description: "Impossible de charger les établissements",
            variant: "destructive",
          });
          return [];
        }

        return data.map(item => ({
          ...item,
          coordinates: item.coordinates ? [item.coordinates[0], item.coordinates[1]] as [number, number] : null
        }));
      } catch (error) {
        console.error("Error in fetchNeighborhoods:", error);
        return [];
      }
    }
  });

  const filteredNeighborhoods = neighborhoods.filter((n) => {
    const matchesCity = selectedCity === "all" || n.city === selectedCity;
    const matchesType = selectedType === "all" || n.type === selectedType;
    const matchesSearch = n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         n.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesType && matchesSearch;
  });

  const uniqueCities = Array.from(new Set(neighborhoods.map(n => n.city)));

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-heading mb-4">
            Établissements Scolaires et Universitaires
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les établissements d'enseignement au Congo. Utilisez la carte interactive
            pour explorer les différentes régions et trouver les institutions près de chez vous.
          </p>
        </div>

        <EstablishmentFilters
          selectedCity={selectedCity}
          selectedType={selectedType}
          searchTerm={searchTerm}
          uniqueCities={uniqueCities}
          onCityChange={setSelectedCity}
          onTypeChange={setSelectedType}
          onSearchChange={setSearchTerm}
        />

        <MapDisplay
          neighborhoods={filteredNeighborhoods}
          getMarkerIcon={getMarkerIcon}
        />

        <EstablishmentList
          establishments={filteredNeighborhoods}
        />
      </div>
    </section>
  );
};
