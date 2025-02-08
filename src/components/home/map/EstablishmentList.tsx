
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, MapPin, School2 } from "lucide-react";
import { Neighborhood } from "../types/establishments";

interface EstablishmentListProps {
  establishments: Neighborhood[];
}

export const EstablishmentList = ({ establishments }: EstablishmentListProps) => {
  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      {establishments.map((establishment) => (
        <div
          key={establishment.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start">
            {establishment.type === 'university' && <GraduationCap className="w-5 h-5 text-primary mt-1 mr-2" />}
            {establishment.type === 'school' && <School2 className="w-5 h-5 text-primary mt-1 mr-2" />}
            {establishment.type === 'institute' && <Building2 className="w-5 h-5 text-primary mt-1 mr-2" />}
            {!establishment.type && <MapPin className="w-5 h-5 text-primary mt-1 mr-2" />}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {establishment.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">{establishment.city}</p>
              <p className="text-gray-500 text-sm">
                {establishment.description}
              </p>
              <Button variant="link" className="mt-2 p-0 h-auto">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
