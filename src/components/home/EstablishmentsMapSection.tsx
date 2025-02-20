
import { useState } from "react";
import { MapDisplay } from "./map/MapDisplay";
import { EstablishmentFilters } from "./map/EstablishmentFilters";
import { EstablishmentList } from "./map/EstablishmentList";
import { Establishment } from "./types/establishments";

export const EstablishmentsMapSection = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const mockEstablishments: Establishment[] = [
    {
      id: "1",
      name: "Université Marien Ngouabi",
      type: "université",
      city: "Brazzaville",
      address: "Avenue Patrice Lumumba",
      coordinates: { lat: -4.2634, lng: 15.2429 },
      description: "Principale université publique du Congo"
    }
  ];

  const uniqueCities = [...new Set(mockEstablishments.map(e => e.city))];
  const uniqueTypes = [...new Set(mockEstablishments.map(e => e.type))];

  const getMarkerIcon = (type: string) => {
    return "default-marker";
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <div className="space-y-6">
            <EstablishmentFilters
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              uniqueCities={uniqueCities}
              uniqueTypes={uniqueTypes}
            />
            <EstablishmentList
              establishments={mockEstablishments}
            />
          </div>
          <MapDisplay
            neighborhoods={[]}
            getMarkerIcon={getMarkerIcon}
          />
        </div>
      </div>
    </section>
  );
};
