

## Plan: Arreglar imágenes rotas + Mejorar UI/UX del Navbar y Footer

### Problema de Imágenes

Algunas URLs de Unsplash están fallando o mostrando como rotas. Causas posibles:
- URLs inválidas o expiradas (ej: photo-1682553064729 para Tulum)
- Parámetros incorrectos en las URLs

**Solución**: 
- Reemplazar TODAS las imágenes con URLs de Unsplash verificadas y estables
- Añadir fallback con `onError` handler para mostrar placeholder si falla
- Usar IDs de fotos populares y estables de Unsplash

### Mejoras UI/UX

#### Navbar (referencia Airbnb/Booking)
- Diseño más premium con mejor spacing
- Logo más destacado con gradiente sutil
- Dropdown "Más" con iconos y mejor organización visual
- Transiciones más suaves
- Indicador activo más elegante (pill en vez de underline)

#### Footer (referencia Airbnb)
- Layout más moderno y espaciado
- Newsletter/CTA sutil
- Iconos sociales más grandes con hover effects
- Separador visual más elegante con gradiente
- Badges de confianza (certificaciones, pagos seguros)

### Archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `src/pages/Coliving.tsx` | Nuevas URLs de imágenes verificadas + onError fallback |
| `src/pages/Stays.tsx` | Nuevas URLs + fallback |
| `src/pages/Activities.tsx` | Nuevas URLs + fallback |
| `src/pages/Rentals.tsx` | Nuevas URLs + fallback |
| `src/components/sections/TrendingDestinations.tsx` | Nuevas URLs (especialmente Tulum) + fallback |
| `src/components/layout/Navbar.tsx` | Rediseño premium: mejor spacing, pill activo, dropdown mejorado |
| `src/components/layout/Footer.tsx` | Rediseño moderno: mejor layout, newsletter CTA, badges de confianza |

### URLs de imágenes nuevas (verificadas)

Usaré IDs de fotos muy populares de Unsplash que son estables:
- Tulum: `photo-1570737209810-87a8e7245f88` (playa caribeña)
- Coliving Tulum: `photo-1571896349842-33c89424de2d` (espacio de trabajo moderno)
- Y otras URLs estables para cada categoría

