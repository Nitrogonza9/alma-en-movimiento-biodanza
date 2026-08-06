---
name: rediseno-inscripciones
description: Rediseño de la web como embudo de inscripción (2 eventos) — estado y pendientes
metadata: 
  node_type: memory
  type: project
  originSessionId: c7034ee4-94d6-4942-8a4b-7bd8db067bb9
---

A pedido de la usuaria (Flor), se rediseñó la web de presentación a **sistema de inscripción** centrado en 2 eventos: **Cambio de Piel** y **Taller de Límites con Euge**. Estrategia: Instagram→deseo, Web→decisión, WhatsApp→cierre.

**Decisiones tomadas (2026-06-05):** estructura "conservar lo bello" (hero con 2 botones-evento → sección Experiencias → Sobre mí corto → Galería → Testimonios → Contacto); inscripción = botón de WhatsApp por evento con mensaje pre-armado (mismo número de Flor `5492616118455`); se mantienen los 3 idiomas (es/pt/en).

**Hecho:** en rama git **`rediseno-inscripciones`** (NO commiteado aún, NO mergeado a main). Editados `index.html` (hero, sección `#experiencias` con 2 cards, nav/footer, secciones `el-camino`/`ser-en-el-cuerpo`/`online`/`proyectos` archivadas con atributo `hidden`, about-features oculto) e `i18n.js` (claves `experiences` + nav/footer en los 3 packs; exención `:not([data-wa-keep])` para que el rewriter de WhatsApp no pise los mensajes por evento). Test desplegado en **https://preview-inscripciones.ser-en-el-cuerpo.pages.dev** (ver [[deploy-cloudflare-pages]]).

**Contenido cargado:** Cambio de Piel ya tiene contenido real (desc, 4 encuentros sábados 4/11/25 jul + 1 ago, lugar Centro de Luz Yo Soy Dorrego). Falta su **precio** (`[Valor a confirmar]`). El subtítulo "Un proceso vivencial de 4 encuentros" se usó como sub-línea de la card (interpretación; podría ir al hero si Flor prefiere).

**Pendiente:** falta TODO el contenido de **Taller de Límites con Euge** (placeholders `[entre corchetes]`) + el precio de Cambio de Piel. Al tener el contenido: actualizar HTML (es) + packs `experiences` en `i18n.js` (en/pt). Los mensajes de WhatsApp de inscripción quedan en español incluso en otros idiomas (decisión OK, localizable luego). Reactivar una sección archivada = quitar `hidden`.
