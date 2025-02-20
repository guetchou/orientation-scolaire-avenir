
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Neighborhood } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import MapDisplay from './map/MapDisplay';
import EstablishmentFilters from './map/EstablishmentFilters';
import EstablishmentList from './map/EstablishmentList';

export const EstablishmentsMapSection = () => {
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const fetchNeighborhoods = async () => {
    try {
      const { data, error } = await supabase
        .from('neighborhoods')
        .select('*');

      if (error) throw error;

      setNeighborhoods(data);
    } catch (error) {
      console.error('Error fetching neighborhoods:', error);
      toast.error('Erreur lors du chargement des établissements');
    } finally {
      setLoading(false);
    }
  };

  const filteredNeighborhoods = selectedType
    ? neighborhoods.filter(n => n.type === selectedType)
    : neighborhoods;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Découvrez les établissements près de chez vous
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MapDisplay neighborhoods={filteredNeighborhoods} />
          </div>
          <div className="space-y-6">
            <EstablishmentFilters 
              onTypeSelect={setSelectedType}
              selectedType={selectedType}
            />
            <EstablishmentList 
              neighborhoods={filteredNeighborhoods}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
