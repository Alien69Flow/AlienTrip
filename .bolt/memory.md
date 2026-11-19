# Project memory

## Product intent & audience

- App de planificación y reserva de viajes.
- Usuario final busca destinos, consulta itinerarios y presupuestos, marca favoritos y realiza reservas.
- Asistente conversacional "Aitor" para recomendaciones de destinos, itinerarios y presupuestos.

## Brand personality & voice

- Tono cercano y directo en español.
- Comunicación orientada a acción (resumenes con bullets, pasos concretos).
- Marca asociada al nombre "Aitor" para el asistente.

## Visual design & UX direction

- Navegación principal con menú superior; enlace "AI Planner" visible.
- Buscador principal con campos: categoría, destino, fechas y viajeros.
- Página de chat para Aitor con sugerencias rápidas e historial de conversaciones guardado.
- Estado persistente: favoritos, reservas y viajes no se pierden al recargar.

## Decisions, constraints & rationale

- Backend: Supabase (cliente central configurado).
- Tablas: viajes, reservas, favoritos, búsquedas, chat_Aitor.
- RLS activado para control de acceso.
- Asistente Aitor usa respuestas preparadas, no LLM externo todavía.
- Build debe compilar sin errores tras cada cambio.
- Cambios aplicados en lotes para minimizar iteraciones.

## Open questions & assumptions

- ¿Conectar un modelo de lenguaje real para Aitor? (próximo paso sugerido, pendiente de confirmación).
- Se asume que el usuario trabaja en español como idioma principal del producto.
- Se asume que las búsquedas registradas se usaran luego para analytics o recomendaciones.