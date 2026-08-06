---
name: deploy-cloudflare-pages
description: "Cómo se despliega este sitio (proyecto Pages, direct-upload, deploy manual)"
metadata: 
  node_type: memory
  type: project
  originSessionId: c7034ee4-94d6-4942-8a4b-7bd8db067bb9
---

El sitio de Florencia Serruya ("Ser en el Cuerpo") vive en Cloudflare Pages bajo el proyecto **`ser-en-el-cuerpo`** (→ `ser-en-el-cuerpo.pages.dev`), aunque el repo/carpeta se llama `alma-en-movimiento-biodanza` y el GitHub remoto es `Nitrogonza9/alma-en-movimiento-biodanza`. `wrangler.toml` tiene `name = "ser-en-el-cuerpo"` y `pages_build_output_dir = "."`.

**Clave:** el proyecto es **direct-upload (Git Provider = No)** → pushear a GitHub **NO** despliega producción. Producción solo cambia con `wrangler pages deploy . --project-name=ser-en-el-cuerpo` (rama de producción).

- **Preview/test (URL aparte, no toca producción):** `wrangler pages deploy . --project-name=ser-en-el-cuerpo --branch=<rama-no-prod> --commit-dirty=true` → alias estable `https://<rama>.ser-en-el-cuerpo.pages.dev`.
- Wrangler está autenticado con OAuth bajo **margonartintel@gmail.com** (account **AppsWeb**, ID `4e42713a5767e69771e3581904f06a8b`), con permiso `pages (write)`.
- WhatsApp del sitio: `5492616118455`. IG: `florserruya27_`. i18n en `i18n.js` (es/pt/en) por selectores CSS, no por `data-i18n`. Ver [[rediseno-inscripciones]].
