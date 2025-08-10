# BOOST Website – Live Documentation (v2025-08-10)

> **Repo:** [https://github.com/Blue-code-boost/BoostAgency/tree/main/boost-website](https://github.com/Blue-code-boost/BoostAgency/tree/main/boost-website)
> **Owner:** BOOST Marketing
> **Estado:** LIVE (versión productiva activa)
> **Contacto técnico:** Emanuel (Lead dev & Creative)

---

## 1) Resumen ejecutivo

Esta documentación describe la **versión LIVE** del sitio web de BOOST (frontend estático). Incluye: visión técnica, estructura de carpetas, scripts de desarrollo, configuración, criterios de calidad (UI/UX, performance, a11y), y un **CHANGELOG** de la versión actual. Está pensada para que cualquier miembro del equipo pueda clonar, ejecutar, auditar, mejorar y desplegar el sitio sin fricción.

---

## 2) Stack & decisiones

**Stack actual (frontend-only):**

* **HTML5 + CSS3 (custom properties y utilidades)**
* **JavaScript (ES Modules)** para interacciones y micro-animaciones
* **Assets** en `/assets` (imágenes, SVG, logos) y fonts de marca (THICCCBOI, Poppins)
* **Sin framework** (build opcional con Vite/Parcel si se requiere)

**Racionales:**

* Mantener carga rápida, **TBT** bajo y footprint mínimo.
* Control total de la UI acorde al **brand book** (tipografías, color tokens, espaciados, componentes: Button, Input, Card, Header/Hero).

---

## 3) Requisitos

* **Node.js** >= 18 LTS
* **pnpm** (recomendado) o **npm/yarn**
* Navegador moderno (para pruebas: Chromium/Chrome y Firefox)

> Si usas pnpm: `corepack enable` y luego `pnpm install`.

---

## 4) Setup rápido

```bash
# 1) Clonar
git clone https://github.com/Blue-code-boost/BoostAgency.git
cd BoostAgency/boost-website

# 2) Instalar dependencias (si hay)
pnpm install   # o npm i / yarn

# 3) Levantar entorno local
pnpm dev       # o npm run dev / yarn dev

# 4) Build (para producción)
pnpm build     # o npm run build / yarn build
```

> **Nota:** Si el proyecto está 100% estático sin bundler, puedes servir `/` con cualquier static server: `npx serve .`.

---

## 5) Estructura de carpetas (live)

```
boost-website/
├─ index.html
├─ pages/                # otras secciones (servicios, media, contacto, etc.)
├─ assets/
│  ├─ img/               # imágenes optimizadas
│  ├─ svg/               # íconos y decorativos (ondas, destellos, flechas)
│  └─ fonts/             # THICCCBOI*, Poppins
├─ styles/
│  ├─ base.css           # reset, variables (tokens), tipografías
│  ├─ components.css     # botones, inputs, cards, navbar, modales
│  ├─ layout.css         # grid, containers, spacing utils
│  └─ sections.css       # hero, about, services, boost-media, footer
├─ scripts/
│  ├─ main.js            # inicialización general
│  ├─ ui.js              # micro-interacciones, toggles, navbar, modales
│  └─ media.js           # galería / grid responsive / embeds
└─ README.md
```

> **Tokens clave (ejemplo):** `--purple-blast: #4736C1; --deep-gray: #404041; --black: #000; --white: #fff;`

---

## 6) Guía de diseño (resumen)

* **Tipografías:** Poppins (UI/Body), **THICCCBOI** (titulares/display, identidad). Cargar con `font-display: swap`.
* **Colores de marca:** Purple Blast `#4736C1`, Deep Gray `#404041`, Black, White. Contraste AA mínimo en texto primario.
* **Componentes clave LIVE:**

  * **Header/Hero:** logo, H1/H2, CTA primario (botón negro), onda superior.
  * **Boost Media:** grid responsive 3→2→1; videos/imágenes con `border-radius: 16px` y sombra suave.
  * **Servicios/Plans:** cards con iconografía propia (SVG), hover states y CTA secundario.
  * **Footer:** onda invertida, enlaces útiles, redes y créditos.

**Accesibilidad:**

* Roles ARIA en navbar y menús móviles.
* Focus visible en links/CTAs.
* Labels en formularios; `aria-live` para mensajes de estado en modales.

---

## 7) Buenas prácticas (LIVE)

* **Performance:**

  * Imágenes en formato óptimo (WebP/AVIF si aplica) y `loading="lazy"`.
  * CSS crítico inline en `index.html` (opcional) y resto diferido.
  * JS modular y `defer`.
* **SEO básico:**

  * `<title>` por página, meta `description`, Open Graph/Twitter cards.
  * `alt` significativo en imágenes, sitemap si aplica.
* **Seguridad:**

  * Evitar librerías innecesarias.
  * No exponer llaves en cliente.

---

## 8) Scripts (sugeridos)

Añadir en `package.json` (si se usa bundler):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.mjs",
    "format": "prettier --write .",
    "test": "echo 'No tests yet'"
  }
}
```

---

## 9) Despliegue

* **Host recomendado:** Vercel o Netlify (SSR no requerido).
* **Carpeta de salida:** `/dist` (si hay build). Si es estático, servir raíz.
* **Headers:** habilitar `cache-control` para assets y `Content-Type` correcto en fuentes.
* **CI/CD (GitHub Actions) (opcional):** deploy automatizado en push a `main`.

### Ejemplo (Vercel)

* Conectar repo → Framework: **Other** → Output: `dist/` (o `/` si no hay build).

---

## 10) QA checklist (previo a LIVE)

* [ ] **Responsive**: 1920×1080 y 1366×768 (setup de Emanuel), móvil 360–430px.
* [ ] **Hero**: padding top/bottom correcto; logo ≤ 320px; CTA visible encima del fold.
* [ ] **Boost Media**: grid 3/2/1 y elementos con sombra y radio 16px.
* [ ] **Footer**: onda invertida alineada; sin `margin-top` extra.
* [ ] **Contrast**: texto principal ≥ 4.5:1 sobre fondos.
* [ ] **Lighthouse**: Performance ≥ 90, A11y ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

---

## 11) Mantenimiento & convenciones

* **Ramas:** `main` (live), `dev` (trabajo), `feat/*`, `fix/*`, `chore/*`.
* **Commits:** Conventional Commits (`feat:`, `fix:`, `style:`, `refactor:` …).
* **PRs:** descripción breve, screenshots antes/después, checklist de QA.

---

## 12) Roadmap corto (siguiente release)

1. **Modales informativos** para Services & Boost Plans (con `aria-modal`).
2. **Iconografía SVG** propietaria para cada servicio (ligera y coherente).
3. **Optimización media** (WebP/AVIF + `srcset`).
4. **Docs**: agregar Storybook ligero para componentes UI clave.

---

## 13) CHANGELOG (LIVE)

### \[1.0.0] – 2025-08-10

**Added**

* Documentación LIVE inicial (este archivo).
* Estructura de estilos por secciones y componentes.

**Changed**

* Ajustes de Hero (padding y centrado; botón primario negro).
* `Boost Media` con grid responsive 3→2→1 y radio 16px.
* Footer con onda invertida sin `margin-top` adicional.

**Fixed**

* Pequeñas inconsistencias de espaciado en secciones.

---

## 14) Créditos & Brand

* **Brand book** y assets oficiales en el repositorio de proyecto maestro (tipos: Poppins, THICCCBOI; colores: Purple Blast, Deep Gray, Black, White). Respetar guías de uso del logo y malas prácticas (no deformar, no alterar proporciones/espaciado).

---

## 15) Templates útiles

### 15.1 README.md (para el repo)

````md
# BOOST Website

Live marketing site for BOOST. Built with HTML/CSS/JS and brand-first UI.

## Quickstart
```bash
git clone https://github.com/Blue-code-boost/BoostAgency.git
cd BoostAgency/boost-website
pnpm install && pnpm dev
````

## Build & Deploy

* Local build: `pnpm build`
* Deploy: Vercel/Netlify (static output `dist/`)

## Tech

* HTML5, CSS3, ES Modules
* Brand tokens: Purple Blast (#4736C1), Deep Gray (#404041), Black, White

## License

Proprietary © BOOST Marketing

````

### 15.2 PULL_REQUEST_TEMPLATE.md
```md
## Descripción
Resumen del cambio y propósito.

## Screenshots (antes/después)

## Checklist
- [ ] Responsive (mobile/tablet/desktop)
- [ ] A11y (focus, labels, contrast)
- [ ] Lighthouse ≥ 90 en todo
- [ ] Sin regressions visuales
````

### 15.3 ISSUE\_TEMPLATE – mejora UI

```md
**Descripción**
Breve del problema/mejora.

**Propuesta**
- Cambio 1
- Cambio 2

**Criterios de aceptación**
- [ ] Pasa Lighthouse ≥ 90
- [ ] Mantiene guía de marca
```

---

## 16) Notas de implementación

* **Embeds (YouTube/IG)**: usar contenedor `aspect-ratio` 16/9 y `max-width: 100%`.
* **Ondas SVG**: exportar como SVG limpios (sin metadatos), usar `preserveAspectRatio="none"` para relleno.
* **Fuentes**: auto-hosting en `/assets/fonts/` con `@font-face` y `font-display: swap`.

---

## 17) Contacto

* Incidencias urgentes: abrir **Issue** etiquetado `priority:high` y ping a Emanuel.
* Cambios de copy/marketing: coordinar con Richard (CEO) antes de merge a `main`.
