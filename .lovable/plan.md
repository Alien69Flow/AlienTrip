

## Plan: Eliminar barra lateral, hacer funcional el buscador y mejorar UI/UX

### 1. Eliminar la barra de categorías que se desplaza horizontalmente

El problema es la barra de tabs de categorías en `UnifiedSearch.tsx` que usa `overflow-x-auto` y genera un scroll horizontal molesto. La solución:

- Reemplazar los tabs scrollables por un **dropdown/select de categoría** integrado dentro del propio buscador (como hace Booking.com y Kayak)
- Esto limpia la UI y elimina el scroll horizontal

### 2. Hacer funcional el buscador

Actualmente los inputs no tienen state ni hacen nada al pulsar "Buscar". Cambios:

- **UnifiedSearch.tsx**: Añadir state para `destination`, `dates`, `travelers`, `category`
- Al pulsar "Buscar", usar `useNavigate` para redirigir a la página de la categoría seleccionada con query params (ej: `/flights?destination=Bali&dates=2026-03-15`)
- En cada página de categoría, leer los query params con `useSearchParams` y mostrar resultados mock filtrados
- Añadir **sugerencias de destinos** con un dropdown que aparece al escribir (autocompletado mock)
- Añadir **ScrollToTop** component para scroll restoration al navegar

### 3. Mejorar UI/UX (referencias: Booking, Airbnb, Kayak)

**Navbar** (referencia Booking.com):
- Diseño más limpio y compacto
- Iconos solo en hover/mobile, texto siempre visible en desktop
- Indicador activo más sutil (underline animado en vez de border glow)
- Logo más prominente con tagline

**Footer** (referencia Airbnb):
- Layout en 4 columnas: Explorar | Servicios | Compañía | Legal
- Añadir links de Compañía (Sobre nosotros, Blog, Contacto) y Legal (Privacidad, Términos)
- Redes sociales con iconos
- Separador visual más elegante

**Hero y Landing** (referencia Kayak/Skyscanner):
- Buscador más prominente y centrado, sin la barra de tabs encima
- Selector de categoría integrado como primer campo del buscador
- Stats/trust badges más compactos
- Cards de destinos trending con hover effects mejorados (precio destacado, CTA visible)

**Cards de categorías** (referencia Google Travel):
- Hover con elevación y sombra en vez de solo border glow
- Iconos más grandes y coloridos
- Badge de "Nuevo" en categorías recién añadidas

### Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/components/search/UnifiedSearch.tsx` | Rediseño completo: dropdown categoría integrado, state funcional, navegación, autocompletado destinos |
| `src/components/layout/Navbar.tsx` | UI mejorada: underline activo, más compacto, mejor spacing |
| `src/components/layout/Footer.tsx` | 4 columnas, links empresa/legal, redes sociales |
| `src/components/sections/TrendingDestinations.tsx` | Cards mejoradas con CTA y hover effects |
| `src/components/sections/CategoryShowcase.tsx` | Cards con elevación, badges "Nuevo" |
| `src/components/hero/TrustBadges.tsx` | Layout más compacto |
| `src/pages/Index.tsx` | Hero simplificado sin barra tabs |
| `src/App.tsx` | Añadir ScrollToTop component |

### Archivo a crear

| Archivo | Contenido |
|---------|-----------|
| `src/components/ScrollToTop.tsx` | Scroll restoration al cambiar de ruta |

