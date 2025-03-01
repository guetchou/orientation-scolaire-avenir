import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapDisplay } from "./map/MapDisplay";
import { EstablishmentFilters } from "./map/EstablishmentFilters";
import { EstablishmentList } from "./map/EstablishmentList";
import { Establishment } from "@/types/establishments";
import { fetchEstablishments } from "./map/mapUtils";
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export const EstablishmentsMapSection = () => {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  useEffect(() => {
    const fetchedEstablishments = fetchEstablishments().map(est => ({
      ...est,
      coordinates: [est.coordinates.lng, est.coordinates.lat] as [number, number],
      neighborhood: est.neighborhood || "",
      website: est.website || "",
      phone: est.phone || "",
      email: est.email || "",
      programs: est.programs || [],
      fees: est.fees || "",
      admissionProcess: est.admissionProcess || "",
      facilities: est.facilities || [],
      images: est.images || []
    }));
    
    setEstablishments(fetchedEstablishments);
    setFilteredEstablishments(fetchedEstablishments);
  }, []);

  useEffect(() => {
    let filtered = establishments;

    if (selectedType !== 'all') {
      filtered = filtered.filter(est => est.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(est => 
        est.name.toLowerCase().includes(query) || 
        est.description.toLowerCase().includes(query) ||
        (est.neighborhood && est.neighborhood.toLowerCase().includes(query))
      );
    }

    setFilteredEstablishments(filtered);
  }, [selectedType, searchQuery, establishments]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'university':
        return '🎓';
      case 'vocational':
        return '🔧';
      case 'highschool':
        return '🏫';
      default:
        return '📍';
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">
            Découvrez les Établissements d'Enseignement
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez la carte interactive des établissements d'enseignement au Congo et trouvez celui qui correspond à vos aspirations académiques et professionnelles.
          </p>
        </motion.div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8 relative">
          <div className="lg:col-span-1 mb-8 lg:mb-0">
            <div className="sticky top-24 space-y-6">
              <EstablishmentFilters 
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              
              <div className="block lg:hidden">
                <Button 
                  onClick={() => setIsMobileListOpen(!isMobileListOpen)}
                  className="w-full"
                >
                  {isMobileListOpen ? 'Masquer la liste' : 'Afficher la liste d\'établissements'}
                </Button>
              </div>
              
              <div className={`lg:block ${isMobileListOpen ? 'block' : 'hidden'}`}>
                <EstablishmentList 
                  establishments={filteredEstablishments}
                  onSelectEstablishment={(est) => {
                    setSelectedEstablishment(est);
                    setIsMobileListOpen(false);
                  }}
                  selectedEstablishment={selectedEstablishment}
                />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 h-[500px] rounded-xl overflow-hidden shadow-lg">
            <MapDisplay 
              establishments={filteredEstablishments} 
              selectedEstablishment={selectedEstablishment}
              onSelectEstablishment={setSelectedEstablishment}
              getMarkerIcon={getMarkerIcon}
            />
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Button variant="outline" className="gap-2">
            Voir tous les établissements
          </Button>
        </div>
      </div>
    </section>
  );
};
