
export interface Establishment {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  type: string;
  city: string;
  coordinates: number[];
  description?: string;
}

export interface EstablishmentFiltersProps {
  selectedCity: string;
  selectedType: string;
  searchTerm: string;
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
  uniqueCities: string[];
  uniqueTypes: string[];
}
