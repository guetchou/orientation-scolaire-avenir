
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EstablishmentFiltersProps {
  selectedCity: string;
  selectedType: string;
  searchTerm: string;
  uniqueCities: string[];
  onCityChange: (city: string) => void;
  onTypeChange: (type: string) => void;
  onSearchChange: (value: string) => void;
}

export const EstablishmentFilters = ({
  selectedCity,
  selectedType,
  searchTerm,
  uniqueCities,
  onCityChange,
  onTypeChange,
  onSearchChange,
}: EstablishmentFiltersProps) => {
  return (
    <div className="mb-8 grid md:grid-cols-3 gap-4">
      <div>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez une ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {uniqueCities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Type d'établissement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="university">Universités</SelectItem>
            <SelectItem value="school">Écoles</SelectItem>
            <SelectItem value="institute">Instituts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Rechercher un établissement..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
