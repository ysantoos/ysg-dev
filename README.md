# YGS Developer Portfolio

Portfolio personal desarrollado con **Angular 22** y una arquitectura de contenido desacoplada mediante **Decap CMS**.

El objetivo del proyecto es mantener la presentación, diseño y comportamiento dentro de Angular, mientras que el contenido editable del portfolio se administra desde Decap CMS y se almacena como archivos JSON versionados en GitHub.

El proyecto está desplegado en **Netlify**.

---

## 🛠️ Stack tecnológico

### Frontend

- Angular 22
- TypeScript
- Standalone Components
- Angular Signals
- Angular Router
- Angular HttpClient
- SCSS
- HTML5
- CSS3

### CMS

- Decap CMS
- Netlify Identity
- Netlify Git Gateway

### Hosting y repositorio

- GitHub
- Netlify

### Diseño

- Figma
- Archivo
- IBM Plex Mono

El diseño está inspirado en una estética **retro / terminal / web de los años 90**.

---

# 🏗️ Arquitectura

La aplicación separa claramente la presentación del contenido.

```text
Figma
  │
  ▼
Angular
  ├── Layout
  ├── Responsive
  ├── Navegación
  ├── Routing
  ├── Traducciones estructurales
  ├── Estilos
  └── Componentes


Decap CMS
  │
  ▼
Netlify Git Gateway
  │
  ▼
GitHub
  │
  ▼
public/content/*.json
  │
  ▼
ContentService
  │
  ▼
Angular Components
```

La regla principal del proyecto es:

```text
Angular = presentación y comportamiento
Decap   = contenido editable
GitHub  = almacenamiento y versionado
Netlify = hosting y deploy
Figma   = fuente visual
URL     = fuente del idioma
```

---

# 📁 Estructura principal

La estructura general del proyecto es:

```text
.
├── public/
│   │
│   ├── admin/
│   │   ├── index.html
│   │   └── config.yml
│   │
│   ├── content/
│   │   ├── hero.json
│   │   ├── about.json
│   │   ├── skills.json
│   │   ├── courses.json
│   │   └── contact.json
│   │
│   └── images/
│       └── uploads/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── ...
│   │
│   └── styles.scss
│
├── .github/
│   └── copilot-instructions.md
│
├── angular.json
├── package.json
└── README.md
```

La estructura interna de `src/app` puede evolucionar a medida que el proyecto crezca.

---

# 🚀 Ejecutar el proyecto localmente

## Requisitos

Tener instalado:

- Node.js compatible con Angular 22
- npm
- Git

Angular CLI también puede instalarse globalmente, aunque no es obligatorio si se utilizan los scripts de npm.

---

## Clonar el repositorio

```bash
git clone https://github.com/ysantoos/ysg-dev
```

Entrar al proyecto:

```bash
cd ysg-dev
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar en desarrollo

```bash
npm start
```

También puede utilizarse:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

---

# 🏭 Build de producción

Generar el build:

```bash
npm run build
```

También puede utilizarse:

```bash
ng build
```

El output actual utilizado por Netlify es:

```text
dist/ygs-dev/browser
```

Si en el futuro cambia el nombre del proyecto Angular, revisar:

```text
angular.json
```

y verificar nuevamente la carpeta generada dentro de:

```text
dist/
```

---

# 🌐 Netlify

La aplicación está desplegada en Netlify.

La configuración principal del deploy es:

```text
Build command:
ng build

Publish directory:
dist/ygs-dev/browser
```

Netlify está conectado al repositorio de GitHub.

El flujo normal es:

```text
git push
   │
   ▼
GitHub
   │
   ▼
Netlify
   │
   ▼
ng build
   │
   ▼
Deploy
```

Cada push a la rama configurada genera automáticamente un nuevo deploy.

---

# 🌎 Routing e idiomas

La aplicación soporta dos idiomas:

```text
English → /en
Español → /es
```

La URL es la fuente principal de verdad del idioma.

Ejemplos:

```text
/en
/es

/en#about
/es#about

/en#courses
/es#courses

/en#contact
/es#contact
```

---

## Detección automática

Si el visitante entra directamente en:

```text
/
```

la aplicación detecta el idioma del navegador.

Si el idioma comienza por:

```text
es
```

redirige a:

```text
/es
```

Para cualquier otro idioma utiliza:

```text
/en
```

Ejemplos:

```text
es-ES → /es
es-CO → /es
es-MX → /es

en-US → /en
en-GB → /en
fr-FR → /en
de-DE → /en
```

---

# 🧭 Navegación

El portfolio es una **Single Page Application**.

Las principales secciones utilizan anchors:

```text
#home
#about
#courses
#contact
```

Por ejemplo:

```text
/en#about
/es#courses
```

No existen páginas independientes como:

```text
/en/about
/es/courses
```

---

## Navegación retro

La navegación entre secciones es intencionalmente inmediata.

No utilizar:

```css
scroll-behavior: smooth;
```

Ni implementar librerías de smooth scrolling.

Al navegar a:

```text
/en#courses
```

la página debe posicionarse inmediatamente en Courses.

Este comportamiento forma parte de la estética retro del portfolio.

---

# 🌐 Sistema de traducciones

Existen dos tipos diferentes de traducciones.

Es importante mantenerlos separados.

---

## Traducciones estructurales de Angular

Angular administra textos relacionados con la interfaz.

Por ejemplo:

```text
Home / Inicio

About / Sobre mí

Courses / Cursos

Contact / Contacto

ABOUT_ME

CORE_TOOLKIT

COURSES_&_CERTS

GET_IN_TOUCH
```

Estos textos pertenecen al frontend.

No deben almacenarse en Decap CMS.

---

## Traducciones de contenido

El contenido editorial se administra mediante Decap.

Ejemplo:

```json
{
  "description": {
    "en": "English content",
    "es": "Contenido en español"
  }
}
```

Angular selecciona la propiedad correspondiente según el idioma activo.

Conceptualmente:

```text
/en
 ↓
content.en
```

o:

```text
/es
 ↓
content.es
```

---

# 📝 Decap CMS

El panel administrativo está disponible en:

```text
https://yeisongarciasantos.netlify.app/admin/
```

La integración utiliza:

```text
Decap CMS
     │
     ▼
Netlify Identity
     │
     ▼
Git Gateway
     │
     ▼
GitHub
```

La configuración se encuentra en:

```text
public/admin/config.yml
```

El backend utilizado es:

```yaml
backend:
  name: git-gateway
  branch: main
```

---

# ✏️ Modificar contenido

Para modificar contenido sin tocar Angular:

1. Entrar a `/admin/`.
2. Iniciar sesión con el usuario autorizado.
3. Seleccionar la sección.
4. Modificar el contenido.
5. Publicar el cambio.

El flujo será:

```text
Decap
  │
  ▼
Git Gateway
  │
  ▼
Commit en GitHub
  │
  ▼
Netlify detecta el commit
  │
  ▼
Build
  │
  ▼
Nuevo deploy
```

Por lo tanto, modificar contenido normalmente **no requiere cambiar código Angular**.

---

# 📄 Contenido editable

## Hero

Archivo:

```text
public/content/hero.json
```

Estructura:

```text
name

subtitle
 ├── en
 └── es

quote
 ├── en
 └── es
```

---

# About Me

Archivo:

```text
public/content/about.json
```

Estructura:

```text
description
 ├── en
 └── es
```

---

# Core Toolkit / Skills

Archivo:

```text
public/content/skills.json
```

Estructura:

```text
categories[]
   │
   ├── name
   │    ├── en
   │    └── es
   │
   └── skills[]
        ├── name
        └── color
```

Ejemplo:

```json
{
  "categories": [
    {
      "name": {
        "en": "Architecture",
        "es": "Arquitectura"
      },
      "skills": [
        {
          "name": "Clean Architecture",
          "color": "purple"
        }
      ]
    }
  ]
}
```

---

## Categorías

La organización prevista actualmente es:

```text
Frontend

Backend

DevOps & Cloud

AI / IA

Architecture / Arquitectura

Tools

Others / Otros
```

Estas categorías **no deben hardcodearse en Angular**.

Decap/JSON es la fuente de verdad.

Esto permite crear, eliminar o reorganizar categorías sin modificar código.

---

## Traducción de categorías

Las categorías pueden traducirse:

```json
{
  "name": {
    "en": "Architecture",
    "es": "Arquitectura"
  }
}
```

Angular selecciona:

```text
name.en
```

o:

```text
name.es
```

según el idioma activo.

---

## Skills

Las tecnologías normalmente no se traducen.

Ejemplos:

```text
Angular
TypeScript
Java
.NET
Docker
Kubernetes
PostgreSQL
OpenAI
GitHub Actions
```

Por eso una skill mantiene:

```json
{
  "name": "Angular",
  "color": "orange"
}
```

---

# 🎨 Colores de Skills

Cada skill tiene un color configurable desde Decap.

Valores permitidos:

```text
orange
blue
purple
green
cyan
```

Ejemplo:

```json
{
  "name": "Angular",
  "color": "orange"
}
```

La responsabilidad se divide así:

```text
Decap
  ↓
color = orange
  ↓
Angular / SCSS
  ↓
--color-orange
```

Decap decide **qué color lógico utiliza la skill**.

Angular decide **cómo se ve ese color**.

No guardar HEX dentro del JSON.

No asignar colores aleatoriamente.

No inferir colores según el nombre de una tecnología.

---

# 🎓 Courses & Certifications

Archivo:

```text
public/content/courses.json
```

Estructura:

```text
items[]
  ├── title
  ├── institution
  ├── year
  └── color
```

Ejemplo:

```json
{
  "items": [
    {
      "title": "Course name",
      "institution": "Institution",
      "year": 2025,
      "color": "blue"
    }
  ]
}
```

No agregar campos al modelo sin una necesidad real.

Actualmente no existen:

```text
URL
credential ID
description
image
certificate URL
```

---

# 📬 Get In Touch

Archivo:

```text
public/content/contact.json
```

Estructura:

```text
description
 ├── en
 └── es

github
 ├── url
 └── description
      ├── en
      └── es

linkedin
 ├── url
 └── description
      ├── en
      └── es
```

Actualmente el modelo no contiene:

```text
email
phone
contact form
Twitter/X
Instagram
```

No agregar estos campos salvo que el diseño cambie.

---

# 🔌 ContentService

Las peticiones a los JSON deben centralizarse mediante:

```text
ContentService
```

Conceptualmente:

```typescript
getHero()
getAbout()
getSkills()
getCourses()
getContact()
```

Los componentes no deberían duplicar peticiones HTTP.

La arquitectura esperada es:

```text
JSON
 │
 ▼
ContentService
 │
 ▼
Angular Component
```

Mantener interfaces TypeScript para los modelos.

Evitar:

```typescript
any
```

---

# 🌎 LanguageService

El idioma global se administra mediante:

```text
LanguageService
```

y debe mantenerse sincronizado con Angular Router.

Conceptualmente:

```text
URL
 │
 ▼
/en o /es
 │
 ▼
LanguageService
 │
 ├── Navbar
 ├── Hero
 ├── About
 ├── Skills
 ├── Courses
 └── Contact
```

No crear estados independientes de idioma dentro de cada componente.

---

# 🎨 Sistema visual

Los design tokens deben mantenerse centralizados.

Principalmente en:

```text
src/styles.scss
```

o en la ubicación global equivalente.

Conceptualmente:

```scss
:root {
  --color-background: ...;
  --color-surface: ...;

  --color-text-primary: ...;
  --color-text-secondary: ...;

  --color-orange: ...;
  --color-blue: ...;
  --color-purple: ...;
  --color-green: ...;
  --color-cyan: ...;

  --content-max-width: ...;
  --header-height: ...;
}
```

Evitar repetir colores o medidas globales dentro de múltiples componentes.

---

# 🔤 Tipografía

El diseño utiliza principalmente:

```text
Archivo
IBM Plex Mono
```

Mantener las fuentes centralizadas.

No sustituirlas sin revisar primero el diseño original de Figma.

---

# 📱 Responsive

La aplicación debe funcionar aproximadamente desde:

```text
320px
```

en adelante.

Resoluciones recomendadas para revisión:

```text
320px
375px
430px
768px
1024px
1280px
1440px+
```

Preferir:

```text
CSS Grid
Flexbox
clamp()
min()
max()
media queries
CSS custom properties
```

Evitar dimensiones rígidas innecesarias.

---

# ♿ Accesibilidad

Mantener HTML semántico.

Utilizar cuando corresponda:

```html
<header>
<nav>
<main>
<section>
<footer>
```

Mantener una jerarquía correcta de headings.

Debe existir normalmente un solo:

```html
<h1>
```

Los enlaces de navegación deben utilizar:

```html
<a>
```

en lugar de elementos como:

```html
<div (click)>
```

Los controles deben funcionar mediante teclado.

Mantener estados visibles:

```css
:focus-visible
```

---

# 🖥️ Estética retro

El portfolio está inspirado deliberadamente en páginas técnicas y terminales de los años 90.

Evitar introducir automáticamente:

```text
smooth scrolling
glassmorphism
parallax
page transitions
scroll animations
gradientes no presentes en Figma
cards estilo SaaS
animaciones excesivas
```

No modernizar interacciones simplemente porque exista una alternativa moderna.

Figma es la referencia visual.

---

# 🔄 Git workflow

Antes de comenzar a trabajar:

```bash
git pull
```

Realizar los cambios.

Validar:

```bash
npm run build
```

Revisar:

```bash
git status
```

Agregar:

```bash
git add .
```

Commit:

```bash
git commit -m "Descripción del cambio"
```

Push:

```bash
git push
```

Después:

```text
GitHub
  ↓
Netlify
  ↓
Build
  ↓
Deploy
```

---

# 🔧 Mantenimiento habitual

## Quiero cambiar contenido

Usar **Decap CMS**.

Ejemplos:

```text
Hero
About
Skills
Categorías
Courses
Certifications
GitHub URL
LinkedIn URL
Descripciones
```

No debería ser necesario modificar Angular.

---

## Quiero cambiar el diseño

Modificar Angular / SCSS.

Ejemplos:

```text
layout
colores reales
responsive
tipografía
spacing
borders
componentes
iconos
```

---

## Quiero cambiar comportamiento

Modificar Angular.

Ejemplos:

```text
routing
navegación
selector de idioma
anchors
accesibilidad
interacciones
```

---

## Quiero cambiar textos estructurales

Modificar las traducciones Angular.

Ejemplos:

```text
Home
About
Courses
Contact
CORE_TOOLKIT
GET_IN_TOUCH
```

No modificar Decap para estos textos.

---

# ➕ Añadir una nueva Skill

Desde Decap:

```text
Core Toolkit
  ↓
Categoría
  ↓
Skills
  ↓
Add item
```

Configurar:

```text
Nombre
Color
```

Ejemplo:

```text
Name: RabbitMQ
Color: orange
```

No debería ser necesario modificar Angular.

---

# ➕ Añadir una categoría

Desde Decap:

```text
Core Toolkit
  ↓
Categories
  ↓
Add item
```

Configurar:

```text
English
Español
Skills
```

Ejemplo:

```text
English:
Testing

Español:
Pruebas
```

Angular debe renderizarla dinámicamente.

---

# ➕ Añadir un curso o certificación

Desde Decap:

```text
Courses & Certifications
  ↓
Add item
```

Configurar:

```text
Título
Institución
Año
Color
```

No debería requerir cambios en Angular.

---

# 🐛 Troubleshooting

## Decap no refleja un cambio

Comprobar:

1. El cambio fue publicado en Decap.
2. Existe el commit correspondiente en GitHub.
3. Netlify detectó el commit.
4. Se inició un nuevo deploy.
5. El deploy terminó correctamente.
6. El JSON publicado contiene el cambio.

---

## Netlify falla durante el build

Primero ejecutar localmente:

```bash
npm run build
```

Si también falla localmente, resolver primero el error Angular.

Después revisar los logs de Netlify.

Comprobar especialmente:

```text
Build command:
ng build
```

y:

```text
Publish directory:
dist/ygs-dev/browser
```

---

## /en o /es devuelve 404

Angular utiliza routing del lado del cliente.

Netlify debe redirigir las rutas SPA hacia:

```text
/index.html
```

Conceptualmente:

```text
/*    /index.html    200
```

Al modificar redirects verificar que sigan funcionando:

```text
/admin/
/content/
```

---

## Decap no permite iniciar sesión

Revisar:

```text
Netlify Identity
Git Gateway
usuario invitado
public/admin/index.html
public/admin/config.yml
```

El backend esperado es:

```yaml
backend:
  name: git-gateway
  branch: main
```

---

# ✅ Verificaciones antes de publicar

Ejecutar:

```bash
npm run build
```

Después revisar manualmente:

```text
/en
/es

/en#home
/en#about
/en#courses
/en#contact

/es#home
/es#about
/es#courses
/es#contact

/admin/
```

Comprobar también:

- selector EN / ES;
- cambio de idioma conservando la sección;
- navegación inmediata;
- Back / Forward del navegador;
- responsive mobile;
- responsive tablet;
- responsive desktop;
- ausencia de overflow horizontal;
- contenido cargado desde Decap;
- enlaces GitHub y LinkedIn;
- estados de teclado y focus.

---

# 🤖 GitHub Copilot

Las instrucciones permanentes del proyecto se encuentran en:

```text
.github/copilot-instructions.md
```

Antes de pedir una modificación grande al agente de GitHub Copilot, indicarle que lea ese archivo.

El flujo recomendado es trabajar por tareas pequeñas:

```text
1. Explicar objetivo
2. Pedir que inspeccione código existente
3. Implementar solo la tarea solicitada
4. Ejecutar npm run build
5. Revisar resultado
6. Commit
```

Evitar pedir reimplementaciones completas de la aplicación si solo se necesita modificar una sección.

---

# 📌 Regla para recordar

Cuando no esté claro dónde realizar un cambio, utilizar esta regla:

```text
¿Es contenido que quiero editar sin tocar código?
                    │
              Sí ───┴─── No
              │           │
              ▼           ▼
            Decap       Angular
```

Ejemplos:

```text
Cambiar descripción About
→ Decap

Agregar skill
→ Decap

Agregar categoría
→ Decap

Cambiar URL de LinkedIn
→ Decap

Cambiar color real del token "purple"
→ Angular / SCSS

Cambiar layout de Skills
→ Angular / SCSS

Cambiar comportamiento del menú
→ Angular

Cambiar traducción de "Contact"
→ Angular

Cambiar traducción de "Architecture"
→ Decap
```

---

# 🧠 Principios del proyecto

Mantener siempre estas responsabilidades separadas:

```text
Figma
  ↓
Fuente visual

Angular
  ↓
Presentación
Comportamiento
Responsive
Routing
UI translations

Decap
  ↓
Contenido editable

GitHub
  ↓
Código
Contenido
Versionado

Netlify
  ↓
Build
Hosting
Deploy
Identity
Git Gateway
```

Esta separación permite mantener y actualizar el portfolio sin convertir cambios simples de contenido en cambios de código.