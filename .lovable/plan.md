

## Plan: Filtros Avanzados + Dashboard de Usuario + Sistema de Reservas

### Contexto importante

No hay backend ni autenticación configurados. Este plan implementa **todo el frontend funcional con datos mock** y estado local. El dashboard, favoritos e historial persisten en `localStorage`. La confirmación por email requiere Lovable Cloud (se indicará al usuario como siguiente paso).

---

### 1. Filtros Avanzados + Mapa Interactivo

**Componente reutilizable** `src/components/filters/FilterSidebar.tsx`:
- Slider de rango de precio (min/max) usando Radix Slider
- Selector de rating mínimo (estrellas clicables)
- Date picker de rango (check-in / check-out) usando el Calendar de shadcn
- Checkboxes de categorías/tipos (varían por página)
- Botón "Limpiar filtros"

**Componente** `src/components/filters/MapView.tsx`:
- Mapa interactivo con markers usando **Leaflet** (gratuito, sin API key) via CDN
- Markers con precio flotante (estilo Airbnb)
- Click en marker → scroll al resultado correspondiente
- Toggle vista lista / mapa / split

**Layout de páginas con filtros** — cada página de categoría se refactorizará con:
```text
┌─────────────────────────────────────────┐
│ Header + Barra filtros rápidos          │
├──────────┬──────────────────────────────┤
│ Sidebar  │ Resultados (lista o mapa)    │
│ Filtros  │ Toggle: Lista | Mapa | Split │
│          │                              │
└──────────┴──────────────────────────────┘
```

**Páginas a actualizar**: Flights, Stays, Activities, Coliving, Restaurants, Rentals (las 6 con datos de items). Las otras (Esim, Insurance, Packages, Trains, Transfers) se actualizan con filtros básicos relevantes.

**Dependencia nueva**: `leaflet` + `react-leaflet` para el mapa.

---

### 2. Dashboard de Usuario

**Sin auth real** — simularemos un usuario logueado con localStorage. Se añade un icono de usuario en el Navbar que abre el dashboard.

**Nuevas páginas/componentes**:

- `src/pages/Dashboard.tsx` — Layout con tabs:
  - **Mis Reservas**: Lista de reservas mock con estado (confirmada, pendiente, completada)
  - **Favoritos**: Grid de items guardados con corazón
  - **Perfil**: Form editable (nombre, email, avatar, preferencias de viaje)

- `src/hooks/useUserStore.ts` — Estado global con React Context + localStorage:
  - `bookings[]` — historial de reservas
  - `favorites[]` — items favoritos
  - `profile` — datos del usuario

- `src/components/FavoriteButton.tsx` — Corazón toggle reutilizable en todas las cards

**Ruta nueva**: `/dashboard` con sub-navegación por tabs.

---

### 3. Sistema de Reservas Funcional

**Flujo de reserva**:
```text
Card "Reservar" → Modal de reserva → Selección fechas/viajeros 
→ Resumen con precio dinámico → Confirmar → Toast + guardar en historial
```

**Componentes nuevos**:

- `src/components/booking/BookingModal.tsx`:
  - Calendar de rango para fechas (shadcn DatePicker)
  - Selector de número de viajeros (+/-)
  - **Precio dinámico**: base × noches × viajeros, con descuento por estancia larga
  - Resumen detallado antes de confirmar
  - Al confirmar: guarda en `useUserStore`, muestra toast de éxito

- `src/components/booking/BookingConfirmation.tsx`:
  - Pantalla de confirmación con número de reserva generado
  - Detalles completos de la reserva
  - Botón "Ver en mis reservas" → `/dashboard`
  - Nota: "Confirmación por email disponible al activar Lovable Cloud"

- `src/components/booking/PriceSummary.tsx`:
  - Desglose: precio base, noches, viajeros, tasas, descuentos
  - Total dinámico que se actualiza en tiempo real

---

### Archivos a crear

| Archivo | Descripción |
|---------|-------------|
| `src/components/filters/FilterSidebar.tsx` | Filtros reutilizables (precio, rating, fechas, categorías) |
| `src/components/filters/MapView.tsx` | Mapa Leaflet con markers de precio |
| `src/components/filters/FilterBar.tsx` | Barra horizontal de filtros rápidos |
| `src/components/booking/BookingModal.tsx` | Modal completo de reserva con calendario y precio dinámico |
| `src/components/booking/BookingConfirmation.tsx` | Pantalla post-reserva |
| `src/components/booking/PriceSummary.tsx` | Desglose de precio |
| `src/components/FavoriteButton.tsx` | Botón corazón toggle |
| `src/contexts/UserContext.tsx` | Context + Provider para estado usuario (bookings, favs, perfil) |
| `src/pages/Dashboard.tsx` | Dashboard con tabs reservas/favoritos/perfil |

### Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/App.tsx` | Ruta `/dashboard`, UserProvider wrapper |
| `src/components/layout/Navbar.tsx` | Icono de usuario → link a dashboard |
| `src/pages/Flights.tsx` | Layout con FilterSidebar + MapView + filtrado funcional |
| `src/pages/Stays.tsx` | Idem + BookingModal en botón Reservar |
| `src/pages/Activities.tsx` | Idem |
| `src/pages/Coliving.tsx` | Idem |
| `src/pages/Restaurants.tsx` | Idem (sin mapa, con filtros) |
| `src/pages/Rentals.tsx` | Idem |
| `src/pages/Packages.tsx` | BookingModal |
| `index.html` | CDN de Leaflet CSS |

### Dependencias nuevas
- `leaflet` + `react-leaflet` — mapa interactivo gratuito

