
export const getMarkerIcon = (type?: string) => {
  switch (type) {
    case 'university':
      return '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 14l9-5-9-5-9 5 9 5z" fill="currentColor"/></svg>';
    case 'school':
      return '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    default:
      return '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  }
};

export const getCityCoordinates = (city: string): [number, number] => {
  const cityCoordinates: { [key: string]: [number, number] } = {
    "Brazzaville": [15.2832, -4.2699],
    "Pointe-Noire": [11.8635, -4.7761],
    "Dolisie": [12.6666, -4.2],
  };

  return cityCoordinates[city] || [15.2832, -4.2699];
};
