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
  { id: "trenitalia", name: "Trenitalia", color: "#C62828", build: () => "https://www.trenitalia.com/it.html" },
  { id: "ouigo", name: "Ouigo", color: "#E2001A", build: () => "https://www.ouigo.com/es" },
  { id: "eurostar", name: "Eurostar", color: "#003366", build: () => "https://www.eurostar.com/es" },
  { id: "sncf", name: "SNCF", color: "#1A1A2E", build: () => "https://www.sncf-connect.com/" },
];

export const carRentalProviders: Provider[] = [
  { id: "rentalcars", name: "Rentalcars", color: "#EC6B0D", build: (c) => `https://www.rentalcars.com/es/busqueda?query=${enc(c.destination)}` },
  { id: "sixt", name: "Sixt", color: "#0F0F0F", build: () => "https://www.sixt.es/" },
  { id: "europcar", name: "Europcar", color: "#D71920", build: () => "https://www.europcar.es/" },
  { id: "hertz", name: "Hertz", color: "#C4A000", build: () => "https://www.hertz.es/" },
  { id: "avis", name: "Avis", color: "#D01919", build: () => "https://www.avis.es/" },
  { id: "turo", name: "Turo", color: "#5B4BF5", build: (c) => `https://turo.com/es/search?location=${enc(c.destination)}` },
  { id: "getaround", name: "Getaround", color: "#00B36B", build: () => "https://es.getaround.com/" },
];

export const esimProviders: Provider[] = [
  { id: "airalo", name: "Airalo", color: "#1BAA6D", build: () => "https://www.airalo.com/es" },
  { id: "holafly", name: "Holafly", color: "#0FB5AE", build: () => "https://es.holafly.com/" },
  { id: "nomad", name: "Nomad eSIM", color: "#6C5CE7", build: () => "https://es.getnomad.com/" },
  { id: "saily", name: "Saily", color: "#0EA5E9", build: () => "https://saily.com/es/" },
  { id: "maya", name: "Maya Mobile", color: "#F43F5E", build: () => "https://www.mayamobile.co/" },
  { id: "gigsky", name: "GigSky", color: "#3B82F6", build: () => "https://www.gigsky.com/" },
];

export const transferProviders: Provider[] = [
  { id: "gettransfer", name: "GetTransfer", color: "#F59E0B", build: () => "https://gettransfer.com/es" },
  { id: "welcomepickups", name: "Welcome Pickups", color: "#0F766E", build: () => "https://www.welcomepickups.com/" },
  { id: "kiwitaxi", name: "Kiwitaxi", color: "#22C55E", build: (c) => `https://kiwitaxi.es/${enc(c.destination)}` },
  { id: "blacklane", name: "Blacklane", color: "#1F2937", build: () => "https://www.blacklane.com/es" },
  { id: "suntransfers", name: "Suntransfers", color: "#F97316", build: () => "https://www.suntransfers.com/" },
  { id: "shuttledirect", name: "Shuttle Direct", color: "#64748B", build: () => "https://www.shuttledirect.com/es/" },
];

export const restaurantProviders: Provider[] = [
  { id: "thefork", name: "TheFork", color: "#E11D48", build: (c) => `https://www.thefork.es/buscar?q=${enc(c.destination)}` },
  { id: "opentable", name: "OpenTable", color: "#DA3743", build: () => "https://www.opentable.es/" },
  { id: "tripadvisor", name: "TripAdvisor", color: "#34E0A1", build: (c) => `https://www.tripadvisor.es/Restaurants?q=${enc(c.destination)}` },
  { id: "googlemaps", name: "Google Maps", color: "#4285F4", build: (c) => `https://www.google.com/maps/search/restaurantes+${enc(c.destination)}` },
];

export const packageProviders: Provider[] = [
  { id: "expediapackages", name: "Expedia Paquetes", color: "#0F5E8C", build: (c) => `https://www.expedia.es/paquetes-de-vacaciones/${enc(c.destination)}` },
  { id: "lastminute", name: "lastminute.com", color: "#E60A76", build: (c) => `https://www.lastminute.es/vuelo-hotel/${enc(c.destination)}` },
  { id: "travelta", name: "Travelta", color: "#2563EB", build: (c) => `https://www.travelta.es/paquetes?q=${enc(c.destination)}` },
  { id: "kayakpackages", name: "Kayak Paquetes", color: "#FF690F", build: (c) => `https://www.kayak.es/packages?query=${enc(c.destination)}` },
];

export const insuranceProviders: Provider[] = [
  { id: "heymondo", name: "Heymondo", color: "#00A5A8", build: () => "https://www.heymondo.es/" },
  { id: "iati", name: "IATI Seguros", color: "#F7941D", build: () => "https://www.iatseguros.es/" },
  { id: "chapka", name: "Chapka", color: "#E65100", build: () => "https://www.chapkadirect.es/" },
  { id: "safetywing", name: "SafetyWing", color: "#F97316", build: () => "https://safetywing.com/es" },
  { id: "worldnomads", name: "World Nomads", color: "#16A34A", build: () => "https://www.worldnomads.com/es" },
  { id: "axa", name: "AXA Assistance", color: "#0284C7", build: () => "https://www.axa-assistance.es/" },
];

export const colivingProviders: Provider[] = [
  { id: "outsite", name: "Outsite", color: "#0D9488", build: () => "https://outsite.co/" },
  { id: "colive", name: "Selina", color: "#F59E0B", build: (c) => `https://www.selina.com/es/?q=${enc(c.destination)}` },
  { id: "flatio", name: "Flatio", color: "#6366F1", build: (c) => `https://flatio.com/es/${enc(c.destination)}` },
  { id: "nomador", name: "Nomador", color: "#84CC16", build: () => "https://nomador.com/" },
  { id: "spotahome", name: "Spotahome", color: "#FF4E50", build: (c) => `https://www.spotahome.com/es/${enc(c.destination)}` },
  { id: "housinganywhere", name: "HousingAnywhere", color: "#0081C7", build: (c) => `https://housinganywhere.com/es/s/${enc(c.destination)}` },
];
