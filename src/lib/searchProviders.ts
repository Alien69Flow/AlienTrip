export type SearchCategory =
  | "flights"
  | "stays"
  | "cars"
  | "trains"
  | "esim"
  | "insurance"
  | "coliving"
  | "activities"
  | "restaurants"
  | "packages"
  | "transfers"
  | "all";

export interface SearchParams {
  destination: string;
  dates?: string;
  startDate?: string;
  endDate?: string;
  travelers?: string;
  category: SearchCategory;
}

interface Provider {
  name: string;
  color: string;
  build: (p: SearchParams) => string;
}

const enc = encodeURIComponent;

const dateOr = (p: SearchParams): string => p.startDate || "";

export const CATEGORY_LABELS: Record<SearchCategory, string> = {
  all: "Todo",
  flights: "Vuelos",
  stays: "Alojamiento",
  cars: "Alquiler de coches",
  trains: "Trenes y buses",
  esim: "eSIM",
  insurance: "Seguros",
  coliving: "Coliving",
  activities: "Actividades",
  restaurants: "Restaurantes",
  packages: "Paquetes",
  transfers: "Transfers",
};

const providers: Record<Exclude<SearchCategory, "all">, Provider[]> = {
  flights: [
    {
      name: "Vueling",
      color: "text-yellow-400",
      build: (p) => `https://www.vueling.com/es/busca-vuelos?origin=&destination=${enc(p.destination)}&date1=${dateOr(p)}`,
    },
    {
      name: "Skyscanner",
      color: "text-sky-400",
      build: (p) => `https://www.skyscanner.es/transporte/vuelos/${enc(p.destination)}/?adults=${p.travelers || 1}`,
    },
    {
      name: "Kayak",
      color: "text-orange-400",
      build: (p) => `https://www.kayak.es/flights?dest=${enc(p.destination)}&sort=bestflight_a`,
    },
    {
      name: "Google Flights",
      color: "text-blue-400",
      build: (p) => `https://www.google.com/travel/flights?q=Vuelos%20a%20${enc(p.destination)}`,
    },
    {
      name: "Ryanair",
      color: "text-blue-300",
      build: (p) => `https://www.ryanair.com/es/es/search/trips/${enc(p.destination)}`,
    },
    {
      name: "Kiwi",
      color: "text-teal-400",
      build: (p) => `https://www.kiwi.com/es/search/flights?to=${enc(p.destination)}`,
    },
  ],
  stays: [
    {
      name: "Airbnb",
      color: "text-rose-400",
      build: (p) => `https://es.airbnb.com/s/${enc(p.destination)}/homes`,
    },
    {
      name: "Booking",
      color: "text-blue-500",
      build: (p) => `https://www.booking.com/searchresults.es.html?ss=${enc(p.destination)}&group_adults=${p.travelers || 1}${p.startDate ? `&checkin=${p.startDate}` : ""}${p.endDate ? `&checkout=${p.endDate}` : ""}`,
    },
    {
      name: "Trivago",
      color: "text-orange-300",
      build: (p) => `https://www.trivago.es/sr?query=${enc(p.destination)}`,
    },
    {
      name: "Expedia",
      color: "text-yellow-300",
      build: (p) => `https://www.expedia.es/Hotel?destination=${enc(p.destination)}`,
    },
    {
      name: "Hostelworld",
      color: "text-pink-400",
      build: (p) => `https://www.hostelworld.com/findabed.php/ChosenCity/${enc(p.destination)}`,
    },
  ],
  cars: [
    {
      name: "Kayak Coches",
      color: "text-orange-400",
      build: (p) => `https://www.kayak.es/cars?location=${enc(p.destination)}`,
    },
    {
      name: "Rentcars",
      color: "text-green-400",
      build: (p) => `https://www.rentcars.com/es/?location=${enc(p.destination)}`,
    },
    {
      name: "Discover Cars",
      color: "text-amber-400",
      build: (p) => `https://www.discovercars.com/es?pickup=${enc(p.destination)}`,
    },
  ],
  trains: [
    {
      name: "Trainline",
      color: "text-blue-400",
      build: (p) => `https://www.thetrainline.com/es/resultados?destination=${enc(p.destination)}`,
    },
    {
      name: "Omio",
      color: "text-indigo-400",
      build: (p) => `https://www.omio.es/busca/${enc(p.destination)}`,
    },
    {
      name: "FlixBus",
      color: "text-green-500",
      build: (p) => `https://www.flixbus.es/busca?cities=${enc(p.destination)}`,
    },
  ],
  esim: [
    {
      name: "Airalo",
      color: "text-teal-400",
      build: () => `https://www.airalo.com/es`,
    },
    {
      name: "Holafly",
      color: "text-cyan-400",
      build: () => `https://www.holafly.com/es`,
    },
    {
      name: "Nomad",
      color: "text-emerald-400",
      build: () => `https://www.getnomad.com/es`,
    },
  ],
  insurance: [
    {
      name: "SafetyWing",
      color: "text-emerald-400",
      build: () => `https://safetywing.com/es`,
    },
    {
      name: "Heymondo",
      color: "text-teal-300",
      build: () => `https://www.heymondo.com`,
    },
    {
      name: "IATI",
      color: "text-lime-400",
      build: () => `https://www.iatiseguros.com`,
    },
  ],
  coliving: [
    {
      name: "Coliving.com",
      color: "text-green-400",
      build: (p) => `https://coliving.com/?search=${enc(p.destination)}`,
    },
    {
      name: "Outsite",
      color: "text-emerald-300",
      build: (p) => `https://outsite.co/pages/locations`,
    },
    {
      name: "Selina",
      color: "text-lime-300",
      build: () => `https://www.selina.com`,
    },
  ],
  activities: [
    {
      name: "GetYourGuide",
      color: "text-red-400",
      build: (p) => `https://www.getyourguide.es/s/?q=${enc(p.destination)}`,
    },
    {
      name: "Civitatis",
      color: "text-orange-400",
      build: (p) => `https://www.civitatis.com/es/buscar/?q=${enc(p.destination)}`,
    },
    {
      name: "Viator",
      color: "text-amber-300",
      build: (p) => `https://www.viator.com/es/searchResults?text=${enc(p.destination)}`,
    },
    {
      name: "Musement",
      color: "text-yellow-400",
      build: (p) => `https://www.musement.com/es/s/${enc(p.destination)}/`,
    },
  ],
  restaurants: [
    {
      name: "TheFork",
      color: "text-red-400",
      build: (p) => `https://www.thefork.es/busqueda?q=${enc(p.destination)}`,
    },
    {
      name: "TripAdvisor",
      color: "text-green-400",
      build: (p) => `https://www.tripadvisor.es/Restaurants`,
    },
    {
      name: "Google Maps",
      color: "text-blue-400",
      build: (p) => `https://www.google.com/maps/search/restaurantas+${enc(p.destination)}`,
    },
  ],
  packages: [
    {
      name: "Kayak Paquetes",
      color: "text-orange-400",
      build: (p) => `https://www.kayak.es/packages?dest=${enc(p.destination)}`,
    },
    {
      name: "eDreams",
      color: "text-blue-400",
      build: (p) => `https://www.edreams.es/vuelo+y-hotel/?destination=${enc(p.destination)}`,
    },
    {
      name: "Expedia Paquetes",
      color: "text-yellow-300",
      build: (p) => `https://www.expedia.es/Paquetes?destination=${enc(p.destination)}`,
    },
    {
      name: "Lastminute",
      color: "text-pink-400",
      build: (p) => `https://www.lastminute.es/hoteles?destination=${enc(p.destination)}`,
    },
  ],
  transfers: [
    {
      name: "GetTransfer",
      color: "text-indigo-400",
      build: (p) => `https://gettransfer.com/es?destination=${enc(p.destination)}`,
    },
    {
      name: "Welcome Pickups",
      color: "text-violet-400",
      build: () => `https://www.welcomepickups.com`,
    },
    {
      name: "KiwiTaxi",
      color: "text-purple-400",
      build: (p) => `https://kiwitaxi.es?to=${enc(p.destination)}`,
    },
  ],
};

export const getProviders = (category: SearchCategory): Provider[] => {
  if (category !== "all") return providers[category];
  return [
    ...providers.flights.slice(0, 3),
    ...providers.stays.slice(0, 3),
    ...providers.cars.slice(0, 2),
    ...providers.trains.slice(0, 2),
  ];
};
