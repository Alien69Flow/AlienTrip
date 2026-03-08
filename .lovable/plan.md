

## Plan: Mejoras AlienTrip — Orden Alfabético + Categorías Faltantes + Referencia Competidores

### Análisis de Competidores Top

He revisado las funcionalidades de los líderes del sector. Esto es lo que AlienTrip ya cubre vs lo que falta:

```text
Competidor          │ Qué ofrece                          │ AlienTrip tiene?
────────────────────┼─────────────────────────────────────┼─────────────────
Booking.com         │ Hotels, flights, cars, attractions   │ ✅ Parcial
Airbnb              │ Stays, experiences                   │ ✅ Parcial
Kayak/Skyscanner    │ Flights, hotels, cars comparador     │ ✅ Parcial
Trivago             │ Hotel price comparison               │ ✅ En stays
Expedia             │ Packages/bundles, cruises            │ ❌ Paquetes
Google Travel       │ Flights, hotels, things to do        │ ✅ Parcial
TripAdvisor         │ Hotels, restaurants, forums          │ ❌ Restaurantes
GetYourGuide/Viator │ Activities, tours                    │ ✅ Activities
Omio/Trainline      │ Trenes, buses, ferries               │ ❌ Transporte terrestre
NomadList           │ Coliving, city rankings              │ ✅ Coliving
Hopper              │ Price prediction AI                  │ ❌ (AI Tor podría)
SafetyWing          │ Travel insurance                     │ ❌ Seguros
Airalo/Holafly      │ eSIM, connectivity                   │ ❌ Conectividad
Rome2Rio            │ Multi-modal transport planning       │ ❌ Multi-modal
Wise/Revolut        │ Travel money/cards                   │ ❌ Finanzas viaje
```

### Categorías Nuevas a Añadir

Basándome en el análisis, las categorías que harían AlienTrip realmente superior:

1. **Trenes y Buses** — Transporte terrestre (referencia: Omio, Trainline, FlixBus)
2. **Restaurantes** — Gastronomía local (referencia: TripAdvisor, TheFork, Google Maps)
3. **Seguros** — Seguros de viaje (referencia: SafetyWing, World Nomads, Iati)
4. **Paquetes** — Vuelo+Hotel+Actividad combinados (referencia: Expedia, Lastminute)
5. **eSIM** — Conectividad en destino (referencia: Airalo, Holafly)
6. **Transfers** — Traslados aeropuerto/ciudad (referencia: Booking, GetTransfer)

### Cambios Concretos

#### 1. Ordenar todo alfabéticamente

**Navbar** (navLinks): Actividades → AI Planner → Alojamiento → Alquileres → Coliving → eSIM → Paquetes → Restaurantes → Seguros → Transfers → Trenes → Vuelos

Dado que son muchas categorías, agruparé en el navbar con un dropdown "Más" para las secundarias y dejaré las 6 principales visibles.

**Nav principal visible**: Actividades, Alojamiento, Coliving, Paquetes, Vuelos, AI Planner
**Dropdown "Más"**: Alquileres, eSIM, Restaurantes, Seguros, Transfers, Trenes

#### 2. Nuevas páginas (con mock data)
- `/packages` — Paquetes combinados
- `/trains` — Trenes y buses
- `/restaurants` — Restaurantes
- `/insurance` — Seguros de viaje
- `/esim` — Conectividad eSIM
- `/transfers` — Traslados

#### 3. Actualizar componentes afectados
- **Navbar.tsx** — Reorganizar alfabéticamente + dropdown "Más servicios"
- **Footer.tsx** — Todas las categorías listadas alfabéticamente
- **UnifiedSearch.tsx** — Añadir tabs para nuevas categorías
- **CategoryShowcase.tsx** — Expandir grid con las 12 categorías alfabéticamente
- **App.tsx** — Nuevas rutas alfabéticamente
- **Index.tsx** — Sin cambios estructurales

#### 4. Mejoras inspiradas en competidores
- Añadir sección "Paquetes recomendados" en landing (como Expedia)
- Trust badges actualizados con "+X categorías comparadas"

### Archivos a crear
- `src/pages/Packages.tsx`
- `src/pages/Trains.tsx`
- `src/pages/Restaurants.tsx`
- `src/pages/Insurance.tsx`
- `src/pages/Esim.tsx`
- `src/pages/Transfers.tsx`

### Archivos a modificar
- `src/App.tsx` — Rutas nuevas, imports alfabéticos
- `src/components/layout/Navbar.tsx` — Dropdown "Más", orden alfabético
- `src/components/layout/Footer.tsx` — Todas las categorías alfabéticamente
- `src/components/search/UnifiedSearch.tsx` — Tabs adicionales
- `src/components/sections/CategoryShowcase.tsx` — 12 categorías
- `src/components/hero/TrustBadges.tsx` — Actualizar métricas

