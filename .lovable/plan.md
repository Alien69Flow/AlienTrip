

## AlienTrip: La Super-App Definitiva para Viajeros

### Vision

Transformar el proyecto actual en una plataforma de viajes todo-en-uno que combine transporte, alojamiento, actividades, coliving y alquiler, potenciada por la IA de AI Tor (aitor.lovable.app). El objetivo es superar la experiencia fragmentada de usar Booking + Airbnb + Kayak + Trivago por separado.

### Arquitectura General

```text
┌─────────────────────────────────────────────┐
│              AlienTrip Frontend              │
├──────┬──────┬──────┬──────┬──────┬──────────┤
│Search│Flights│Hotels│Activ.│Coliv.│AI Planner│
├──────┴──────┴──────┴──────┴──────┴──────────┤
│           Lovable Cloud (Backend)            │
├──────────┬──────────┬───────────────────────┤
│ Auth     │ Database │ Edge Functions         │
│ (Users)  │ (Trips,  │ (AI Tor integration,  │
│          │  Saves)  │  price comparison,    │
│          │          │  booking proxies)     │
└──────────┴──────────┴───────────────────────┘
```

### Fases de Implementación

#### Fase 1 — Landing + Estructura Base
- Rediseñar la landing con branding AlienTrip (estética dark/alien del ecosistema AlienFlow)
- Navbar con navegación entre secciones: Vuelos, Hoteles, Actividades, Coliving, Alquileres
- Buscador unificado multi-categoría (destino + fechas + viajeros + tipo de búsqueda)
- Footer con links, trust badges, y "Powered by AI Tor"
- Habilitar Lovable Cloud para auth y base de datos

#### Fase 2 — Auth + Perfiles de Usuario
- Registro/login con email y Google OAuth
- Tabla de perfiles con preferencias de viaje (presupuesto, estilo, intereses)
- Dashboard del usuario con viajes guardados, historial, favoritos
- Sistema de roles (usuario, host/anfitrión, admin)

#### Fase 3 — Motor de Búsqueda y Comparador
- **Vuelos**: Cards con comparativa de precios (datos mock inicialmente, preparado para APIs como Amadeus/Skyscanner)
- **Alojamiento**: Hoteles, Airbnb-style, hostels — grid con filtros (precio, rating, ubicación, amenidades)
- **Coliving**: Sección dedicada con estancias largas, coworkings incluidos, comunidad
- **Alquiler**: Coches, motos, bicicletas por destino
- **Actividades**: Experiencias, tours, restaurantes, eventos locales
- Cada categoría con filtros avanzados, ordenamiento, y vista mapa

#### Fase 4 — AI Tor Travel Planner
- Edge function que conecta con AI Tor vía Lovable AI
- Chat conversacional: "Quiero ir a Bali 2 semanas con presupuesto de 2000€"
- La IA genera itinerarios completos: vuelos + hotel + actividades + presupuesto desglosado
- Guardar y editar itinerarios generados
- Recomendaciones personalizadas basadas en perfil del usuario

#### Fase 5 — Monetización
- Comisiones por reserva (links de afiliación a proveedores)
- Plan Premium: acceso a AI Tor avanzado, alertas de precio, itinerarios ilimitados
- Integración Stripe para suscripciones y pagos
- Listados destacados para hosts de coliving/alquileres

### Páginas a Crear

| Ruta | Descripción |
|------|-------------|
| `/` | Landing hero + buscador unificado + destinos trending |
| `/flights` | Buscador y comparador de vuelos |
| `/stays` | Hoteles, hostels, apartamentos |
| `/coliving` | Espacios de coliving con filtros de comunidad |
| `/rentals` | Alquiler de vehículos |
| `/activities` | Experiencias y actividades por destino |
| `/ai-planner` | Chat con AI Tor para planificar viajes |
| `/destination/:id` | Página de destino con todo combinado |
| `/dashboard` | Panel del usuario: viajes, favoritos, reservas |
| `/auth` | Login/registro |

### Stack Técnico

- **Frontend**: React + TypeScript + Tailwind (ya configurado)
- **Backend**: Lovable Cloud (Supabase) — auth, database, edge functions
- **IA**: Lovable AI (gateway) con prompts especializados en viajes, branding AI Tor
- **Pagos**: Stripe para suscripciones premium
- **Datos**: Mix de datos mock (diseño/demo) + preparación para APIs reales (Amadeus, Booking Affiliate, etc.)

### Diseño Visual

Mantener la estética alien/futurista del ecosistema AlienFlow:
- Fondo oscuro (#090909) con acentos verde neón
- Partículas animadas con banderas (ya existente)
- Cards con glassmorphism (backdrop-blur, bordes semi-transparentes)
- Tipografía moderna y espaciada

### Primera Iteración (lo que construiré ahora)

Empezaré con la **Fase 1**: reestructurar la app con la nueva arquitectura, crear la landing profesional, el navbar, el buscador unificado multi-categoría, y las páginas base para cada sección con datos mock atractivos. Esto establecerá la base sobre la que añadir auth, IA y monetización.

