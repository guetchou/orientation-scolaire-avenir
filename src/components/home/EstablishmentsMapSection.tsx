
import { MapDisplay } from "./map/MapDisplay";
import { EstablishmentFilters } from "./map/EstablishmentFilters";
import { EstablishmentList } from "./map/EstablishmentList";

export const EstablishmentsMapSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <div className="space-y-6">
            <EstablishmentFilters />
            <EstablishmentList />
          </div>
          <MapDisplay />
        </div>
      </div>
    </section>
  );
};
