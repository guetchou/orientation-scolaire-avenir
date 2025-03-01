// Add the fetchEstablishments function
export function fetchEstablishments() {
  // This is a mock function that returns sample data
  // In a real application, this would fetch data from an API
  return [
    {
      id: "1",
      name: "Université Marien Ngouabi",
      type: "university",
      city: "Brazzaville",
      address: "Avenue Patrice Lumumba, Brazzaville",
      coordinates: {
        lat: -4.2633,
        lng: 15.2428
      },
      neighborhood: "Centre-ville",
      description: "La plus grande université publique du Congo, offrant des programmes dans diverses disciplines.",
      website: "https://www.umng.cg",
      phone: "+242 06 665 5566",
      email: "contact@umng.cg",
      programs: ["Sciences", "Lettres", "Droit", "Médecine", "Économie"],
      fees: "150 000 - 300 000 FCFA par an",
      admissionProcess: "Baccalauréat requis, concours d'entrée pour certaines filières",
      facilities: ["Bibliothèque", "Laboratoires", "Résidences universitaires"],
      images: []
    },
    {
      id: "2",
      name: "Institut Supérieur de Technologie",
      type: "vocational",
      city: "Pointe-Noire",
      address: "Avenue Charles de Gaulle, Pointe-Noire",
      coordinates: {
        lat: -4.7885,
        lng: 11.8635
      },
      neighborhood: "Centre-ville",
      description: "Institut spécialisé dans les formations techniques et technologiques.",
      website: "https://www.ist-congo.org",
      phone: "+242 05 553 3344",
      email: "info@ist-congo.org",
      programs: ["Génie informatique", "Génie civil", "Électronique", "Mécanique"],
      fees: "250 000 FCFA par an",
      admissionProcess: "Baccalauréat technique ou scientifique requis",
      facilities: ["Ateliers", "Laboratoires informatiques", "Centre de ressources"],
      images: []
    },
    {
      id: "3",
      name: "Lycée Savorgnan de Brazza",
      type: "highschool",
      city: "Brazzaville",
      address: "Avenue de la Paix, Brazzaville",
      coordinates: {
        lat: -4.2700,
        lng: 15.2500
      },
      neighborhood: "Bacongo",
      description: "Un des plus anciens et prestigieux lycées du Congo.",
      website: "https://www.lyceebrazza.cg",
      phone: "+242 06 778 8899",
      email: "direction@lyceebrazza.cg",
      programs: ["Série A", "Série C", "Série D"],
      fees: "15 000 FCFA par an",
      admissionProcess: "Concours d'entrée après le BEPC",
      facilities: ["Salles informatiques", "Terrain de sport", "Bibliothèque"],
      images: []
    },
    {
      id: "4",
      name: "École Supérieure de Commerce",
      type: "university",
      city: "Brazzaville",
      address: "Boulevard Denis Sassou Nguesso, Brazzaville",
      coordinates: {
        lat: -4.2550,
        lng: 15.2650
      },
      neighborhood: "Plateau des 15 ans",
      description: "École spécialisée dans les formations en commerce, management et finance.",
      website: "https://www.esc-congo.com",
      phone: "+242 05 566 7788",
      email: "contact@esc-congo.com",
      programs: ["Commerce international", "Marketing", "Finance", "Gestion"],
      fees: "400 000 FCFA par an",
      admissionProcess: "Baccalauréat et entretien de motivation",
      facilities: ["Salles modernes", "Centre de documentation", "Espace entrepreneuriat"],
      images: []
    },
    {
      id: "5",
      name: "Centre de Formation Professionnelle",
      type: "vocational",
      city: "Pointe-Noire",
      address: "Rue de l'Industrie, Pointe-Noire",
      coordinates: {
        lat: -4.7950,
        lng: 11.8550
      },
      neighborhood: "Zone industrielle",
      description: "Centre de formation aux métiers industriels et artisanaux.",
      website: "https://www.cfp-pointenoire.cg",
      phone: "+242 06 433 2211",
      email: "info@cfp-pointenoire.cg",
      programs: ["Soudure", "Menuiserie", "Électricité", "Plomberie", "Mécanique auto"],
      fees: "100 000 FCFA par formation",
      admissionProcess: "Ouvert à tous, avec ou sans diplôme",
      facilities: ["Ateliers pratiques", "Salles de cours", "Partenariats entreprises"],
      images: []
    }
  ];
}

// Add the flyToEstablishment function if it doesn't exist
export function flyToEstablishment(map: any, establishment: any) {
  if (map && establishment && establishment.coordinates) {
    map.flyTo({
      center: [establishment.coordinates.lng, establishment.coordinates.lat],
      zoom: 15,
      essential: true,
      duration: 1000
    });
  }
}

// Define the initializeMap function if it doesn't exist
export function initializeMap(container: HTMLElement, center: [number, number], zoom: number) {
  // This should be implemented with a mapping library like mapbox-gl
  // For now, we'll return a mock object
  console.log("Map initialized with center:", center, "and zoom:", zoom);
  return {
    on: (event: string, callback: () => void) => {
      console.log(`Map event ${event} registered`);
      if (event === 'load') {
        // Immediately call the callback for the load event in this mock
        setTimeout(callback, 0);
      }
    }
  };
}

// Define the addEstablishmentsToMap function if it doesn't exist
export function addEstablishmentsToMap(map: any, establishments: any[]) {
  console.log("Adding", establishments.length, "establishments to map");
  // This would add markers to the map in a real implementation
  // For now, return an empty object
  return {};
}
