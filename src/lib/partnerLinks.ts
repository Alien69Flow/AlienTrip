// Real, live market search deep-links per provider.
// These open the provider's own search with the user's criteria prefilled,
// so prices and availability are always real and live.

export type SearchCriteria = {
  destination: string;
  dates?: string;
  travelers?: string;
};

const enc = encodeURIComponent;

export type Provider = {
  id: string;
  name: string;
  color: string;
  build: (c: SearchCriteria) => string;
};

export const flightProviders: Provider[] = [
  {
    id: "kayak",
    name: "Kayak",
    color: "#FF690F",
    build: (c) => `https://www.kayak.es/flights${c.destination ? `/${enc(c.destination)}` : ""}`,
  },
  { id: "skyscanner", name: "Skyscanner", color: "#0770E3", build: (c) => `https://www.skyscanner.es/transporte/vuelos/${enc(c.destination || "espana")}.html` },
  { id: "vueling", name: "Vueling", color: "#F5B600", build: () => "https://www.vueling.com/es/vuelos-baratos" },
  { id: "googleflights", name: "Google Vuelos", color: "#4285F4", build: (c) => `https://www.google.com/travel/flights?q=vuelos%20a%20${enc(c.destination)}` },
  { id: "ryanair", name: "Ryanair", color: "#073590", build: () => "https://www.ryanair.com/es/es/vuelos-baratos" },
  { id: "momondo", name: "Momondo", color: "#E62A7B", build: (c) => `https://www.momondo.es/flight-search/${enc(c.destination)}` },
];

export const stayProviders: Provider[] = [
  {
    id: "airbnb",
    name: "Airbnb",
    color: "#FF5A5F",
    build: (c) => `https://es.airbnb.es/s/${enc(c.destination || "cualquier-lugar")}/homes`,
  },
  {
    id: "booking",
    name: "Booking.com",
    color: "#003B95",
    build: (c) => `https://www.booking.com/searchresults.es.html?ss=${enc(c.destination)}`,
  },
  { id: "expedia", name: "Expedia", color: "#0F5E8C", build: (c) => `https://www.expedia.es/hoteles/${enc(c.destination)}` },
  { id: "hostelworld", name: "Hostelworld", color: "#F4511E", build: (c) => `https://www.hostelworld.com/find/hoteles/es/${enc(c.destination)}` },
  { id: "hotels", name: "Hotels.com", color: "#D32F2F", build: (c) => `https://es.hotels.com/search.do?q-destination=${enc(c.destination)}` },
  { id: "paradiserefound", name: "Google Hoteles", color: "#34A853", build: (c) => `https://www.google.com/travel/hotels/${enc(c.destination)}?hl=es` },
];

export const activityProviders: Provider[] = [
  { id: "getyourguide", name: "GetYourGuide", color: "#FF5533", build: (c) => `https://www.getyourguide.es/s/?q=${enc(c.destination)}` },
  { id: "civitatis", name: "Civitatis", color: "#E63946", build: (c) => `https://www.civitatis.com/es/buscar/?q=${enc(c.destination)}` },
  { id: "viator", name: "Viator", color: "#6B4FBB", build: (c) => `https://www.viator.com/es-ES/searchResults?text=${enc(c.destination)}` },
  { id: "tiqets", name: "Tiqets", color: "#00A3E0", build: (c) => `https://www.tiqets.com/es/?q=${enc(c.destination)}` },
  { id: "musement", name: "Musement", color: "#E91E63", build: (c) => `https://www.musement.com/es/s/${enc(c.destination)}/` },
  { id: "tripadvisor", name: "TripAdvisor", color: "#34E0A1", build: (c) => `https://www.tripadvisor.es/Attractions?q=${enc(c.destination)}` },
];

export const transportProviders: Provider[] = [
  { id: "trainline", name: "Trainline", color: "#24D36C", build: (c) => `https://www.thetrainline.com/es/resultados-tren?destino=${enc(c.destination)}` },
  { id: "renfe", name: "Renfe", color: "#B71C1C", build: () => "https://www.renfe.com/es/es/viajar" },
  { id: "flixbus", name: "FlixBus", color: "#73D700", build: (c) => `https://www.flixbus.es/buscar?query=${enc(c.destination)}` },
  { id: "omio", name: "Omio", color: "#0A7EFE", build: (c) => `https://www.omio.es/autocomplete?q=${enc(c.destination)}` },
  { id: "blablacar", name: "BlaBlaCar", color: "#00B4C8", build: (c) => `https://www.blablacar.es/search?q=${enc(c.destination)}` },
];

export const insuranceProviders: Provider[] = [
  { id: "heymondo", name: "Heymondo", color: "#00A5A8", build: () => "https://www.heymondo.es/" },
  { id: "axonusitcas", name: "IATI Seguros", color: "#F7941D", build: () => "https://www.iatseguros.es/" },
  { id: "interrail", name: "Chapka", color: "#E65100", build: () => "https://www.chapkadirect.es/" },
];
