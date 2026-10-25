# YGS Developer Portfolio — GitHub Copilot Instructions

## 1. Project overview

This repository contains a personal developer portfolio built with **Angular 22**.

The visual design is based on a custom Figma design inspired by **retro developer / terminal / 1990s web aesthetics**.

The application is deployed using **Netlify**.

Content is managed using:

* Decap CMS
* Netlify Identity
* Netlify Git Gateway
* GitHub

The application supports:

* English (`en`)
* Spanish (`es`)

The portfolio is fundamentally a **single-page website**. Sections such as About, Courses and Contact are not separate Angular pages.

When implementing features, preserve this architecture unless explicitly instructed otherwise.

---

# 2. Technology stack

Use:

* Angular 22
* Standalone Components
* TypeScript
* Angular Signals
* Angular Router
* Angular HttpClient
* SCSS
* Modern CSS
* Decap CMS
* Netlify
* GitHub

Prefer modern Angular APIs.

Avoid legacy Angular patterns unless required by an existing part of the project.

Do not introduce unnecessary dependencies.

Do not replace existing architecture or working functionality without a clear technical reason.

---

# 3. General development rules

Before modifying code:

1. Inspect the existing project.
2. Understand the current architecture.
3. Identify existing components and services.
4. Inspect the relevant JSON content files.
5. Reuse existing functionality whenever possible.
6. Review the provided Figma reference when the task affects UI.

Do not recreate functionality that already exists.

Do not rewrite large parts of the application unnecessarily.

Changes should be incremental and easy to review.

When completing a task:

1. run the appropriate Angular build;
2. fix TypeScript errors;
3. fix template errors;
4. fix relevant build warnings;
5. report the files created or modified.

Do not automatically implement unrelated sections.

---

# 4. Fundamental architecture: Presentation vs Content

The application has a strict separation between:

**Presentation / UI**

and

**Editable Content**

Angular owns presentation.

Decap CMS owns editable portfolio content.

Do not mix these responsibilities.

---

# 5. Angular responsibilities

Angular is responsible for:

* layout;
* responsive behavior;
* navigation;
* routing;
* language routing;
* structural UI translations;
* typography;
* colors;
* spacing;
* animations;
* accessibility;
* icons;
* component composition;
* visual states;
* design tokens;
* loading states;
* error states.

Angular must NOT contain hardcoded copies of editable content already stored in Decap JSON files.

---

# 6. Decap CMS responsibilities

Decap CMS manages editable portfolio content.

Content files are located under:

`public/content/`

Angular consumes them through HTTP.

Decap does NOT control:

* layout;
* CSS;
* typography;
* breakpoints;
* component structure;
* responsive behavior;
* application routing;
* UI translations;
* animations.

Decap should only provide content/data.

---

# 7. ContentService

Content HTTP requests must be centralized through the existing `ContentService`.

Components should not independently duplicate HTTP calls to content JSON files.

The service should expose typed methods such as:

* `getHero()`
* `getAbout()`
* `getSkills()`
* `getCourses()`
* `getContact()`

Create TypeScript interfaces for content structures.

Do not use `any`.

Prefer strongly typed data throughout the application.

If content loading fails, avoid crashing the entire page.

Handle loading/error states appropriately without overengineering the application.

---

# 8. Internationalization architecture

There are TWO different categories of translated text.

They must remain separate.

## 8.1 Angular UI translations

Structural UI text belongs to Angular.

Examples include:

* Home / Inicio
* About / Sobre mí
* Courses / Cursos
* Contact / Contacto
* ABOUT_ME / SOBRE_MÍ
* COURSES_&_CERTS / CURSOS_Y_CERTIFICACIONES
* GET_IN_TOUCH / CONTACTO
* CORE_TOOLKIT
* navigation labels;
* accessibility labels;
* UI-only buttons;
* other structural labels.

These values must NOT come from Decap CMS.

Centralize UI translations.

Do not spread expressions such as:

`language === 'en' ? 'Home' : 'Inicio'`

throughout templates and components.

If a translation library is used, prefer a lightweight Angular-compatible runtime solution such as Transloco.

Do not move editable Decap content into Angular translation files.

---

# 9. Decap content translations

Editable content translations live inside the Decap JSON files.

The current convention is:

```json
{
  "description": {
    "en": "English content",
    "es": "Contenido español"
  }
}
```

Angular must select the correct value based on the globally active language.

Do NOT duplicate these strings in Angular translation files.

---

# 10. Language URLs

The application supports exactly two languages:

* English: `/en`
* Spanish: `/es`

The language must be represented in the URL.

Examples:

`/en`

`/es`

The URL is the primary source of truth for the active language.

If the user opens:

`/en`

the application must initialize in English.

If the user opens:

`/es`

the application must initialize in Spanish.

---

# 11. Root language detection

When the user visits:

`/`

there is no language in the URL.

In that case detect the preferred browser language.

If the browser language starts with:

`es`

redirect immediately to:

`/es`

For all other browser languages redirect to:

`/en`

English is the fallback language.

Do not leave `/` as the final application URL.

Conceptually:

`/`
→ browser language
→ `/es` or `/en`

---

# 12. Language priority

Use this priority:

1. valid language in URL;
2. browser language when entering `/`;
3. English fallback.

Once the application is running under `/en` or `/es`, the URL determines the language.

Do not allow `localStorage` to override an explicit language contained in the URL.

The application does not require localStorage for language persistence because the language is represented directly by the URL.

---

# 13. Manual language switching

The UI contains an:

`EN / ES`

language selector.

Changing language must update the URL using Angular Router.

Example:

`/en`

select ES:

`/es`

Do not perform a complete browser reload.

The change must immediately update:

* Angular UI translations;
* Hero content;
* About content;
* Contact content;
* any other translated content.

---

# 14. Preserve current section when changing language

If the user is currently viewing a specific section, changing language must preserve that section.

Example:

`/en#courses`

select Spanish:

`/es#courses`

Another example:

`/es#about`

select English:

`/en#about`

Do not automatically send the user back to the top of the page when changing language.

---

# 15. Single-page navigation

The portfolio is a single-page website.

The main sections are:

* Home
* About
* Courses
* Contact

Do NOT create routes such as:

`/en/about`

`/es/about`

`/en/courses`

`/es/courses`

Instead use URL fragments.

Correct:

`/en#about`

`/es#about`

`/en#courses`

`/es#contact`

The language belongs to the route.

The section belongs to the fragment.

---

# 16. Section IDs

Use stable semantic IDs.

Use:

`home`

`about`

`courses`

`contact`

Example:

```html
<section id="about">
```

Do not generate random IDs.

Do not translate section IDs.

For example, Spanish must still use:

`/es#about`

not:

`/es#sobre-mi`

This keeps routing stable across languages.

---

# 17. Retro navigation behavior

The website intentionally simulates aspects of a **retro 1990s website**.

Navigation between sections must therefore be immediate.

DO NOT implement smooth scrolling.

DO NOT use:

`scroll-behavior: smooth`

DO NOT install smooth-scroll libraries.

DO NOT animate scrolling between sections.

When the user selects:

`ABOUT`

the viewport must immediately jump to:

`#about`

The expected experience is similar to traditional HTML anchor navigation.

Example:

`/en`

click ABOUT:

`/en#about`

and immediately position the viewport at the About section.

There must be no animated transition between positions.

---

# 18. Retro design philosophy

Do not automatically modernize interactions simply because modern alternatives exist.

The Figma design intentionally uses a retro developer / terminal / 1990s-inspired visual language.

Avoid adding unsolicited:

* smooth scrolling;
* parallax;
* page transitions;
* section fade transitions;
* glassmorphism;
* excessive rounded cards;
* gradients not present in the design;
* floating animations;
* scroll-driven animations;
* modern SaaS-style UI patterns.

Visual fidelity to Figma takes priority over current design trends.

---

# 19. Browser history

Navigation must integrate correctly with browser Back and Forward.

Example:

`/en`

→ `/en#about`

→ `/en#courses`

Pressing Back should return to:

`/en#about`

and immediately position the viewport at the About section.

Prefer Angular Router and native browser behavior.

Avoid unnecessary manual manipulation of:

`window.location`

or browser history.

---

# 20. Deep linking

Direct links must work.

Examples:

`/en#courses`

`/es#contact`

If the user opens or refreshes one of these URLs:

1. Angular must initialize the correct language;
2. content must load;
3. the corresponding section must exist;
4. the browser must position itself at that section.

The positioning must be immediate.

No scrolling animation.

---

# 21. Netlify routing

The application is hosted on Netlify.

Angular Router routes must work when directly refreshing:

`/en`

`/es`

Netlify must serve the Angular application for client-side routes.

Maintain or configure an SPA fallback equivalent to:

`/*    /index.html    200`

Do not break Decap CMS routes such as:

`/admin/`

When modifying Netlify redirects, verify that:

* Angular language routes work;
* `/admin/` still loads Decap CMS;
* static content under `/content/` remains accessible.

---

# 22. Header and anchor positioning

If the navbar/header is sticky or fixed, ensure anchor navigation does not hide section headings behind it.

Prefer CSS solutions such as:

`scroll-margin-top`

using a reusable header-height design token.

Example concept:

```scss
section {
  scroll-margin-top: var(--header-height);
}
```

This must NOT introduce smooth scrolling.

Avoid repeated JavaScript offset calculations when CSS can solve the problem.

---

# 23. Hero content

Hero content comes exclusively from:

`/content/hero.json`

Expected structure:

* `name`
* `subtitle.en`
* `subtitle.es`
* `quote.en`
* `quote.es`

The name is not translated.

The subtitle and quote use the active language.

Do not hardcode these values in Angular components.

---

# 24. About content

About content comes exclusively from:

`/content/about.json`

Expected structure:

* `description.en`
* `description.es`

The structural heading for the section belongs to Angular translations.

The description belongs to Decap.

---

# 25. Skills / Core Toolkit content

Skills come exclusively from:

`/content/skills.json`

Expected conceptual structure:

```text
categories[]
    name
    skills[]
        name
        color
```

Render categories dynamically.

Render skills dynamically.

Do NOT hardcode:

* skill names;
* category contents;
* number of skills;
* number of categories;
* skill ordering.

If a new skill is created through Decap, Angular must display it without requiring a code change.

---

# 26. Skill color responsibility

Skill colors are configurable through Decap.

Each skill contains a `color` property.

Allowed design-token values are:

* `orange`
* `blue`
* `purple`
* `green`
* `cyan`

The CMS decides WHICH token a skill uses.

Angular/SCSS decides HOW that token looks.

Example:

Decap:

`"color": "purple"`

Angular:

`purple → CSS design token`

Do NOT store hexadecimal colors in Decap.

Do NOT assign colors randomly.

Do NOT determine colors from skill names.

Do NOT create mappings such as:

`Angular → red`

`React → blue`

The JSON content is the source of truth for the selected token.

---

# 27. Design token implementation

Use reusable CSS custom properties for the visual system.

Conceptually:

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

Determine actual values from the provided Figma reference.

Do not scatter arbitrary color values throughout component styles.

---

# 28. Courses & Certifications content

Courses and certifications come exclusively from:

`/content/courses.json`

Expected structure:

```text
items[]
    title
    institution
    year
    color
```

Render all items dynamically.

Do not assume a fixed number of entries.

Do not invent properties such as:

* URL;
* credential ID;
* description;
* image;
* certificate URL;
* type;
* configurable icon.

Only use fields that actually exist in the content model and design.

The `color` property uses the same design-token system as skills.

Allowed values:

* orange
* blue
* purple
* green
* cyan

---

# 29. Contact content

Contact content comes exclusively from:

`/content/contact.json`

Expected content:

* `description.en`
* `description.es`
* `github.url`
* `github.description.en`
* `github.description.es`
* `linkedin.url`
* `linkedin.description.en`
* `linkedin.description.es`

Do NOT add:

* email;
* phone number;
* contact form;
* Twitter/X;
* Instagram;
* additional social networks.

These are intentionally absent from the current design.

GitHub and LinkedIn icons belong to Angular presentation code.

---

# 30. Component architecture

Prefer focused components.

Expected high-level structure:

* `NavbarComponent`
* `HeroComponent`
* `AboutComponent`
* `SkillsComponent`
* `CoursesComponent`
* `ContactComponent`
* `FooterComponent`

Reusable presentational components may be introduced when useful, for example:

* `SkillBadgeComponent`
* `CourseItemComponent`

Do not create abstractions simply for the sake of abstraction.

Avoid giant components.

Avoid excessive fragmentation into trivial components.

Components should have clear responsibilities.

---

# 31. Angular Signals

Use Angular Signals when they improve state management.

The active language should be reactive.

Changing language must automatically update components that depend on it.

Do not introduce an external state-management library for this portfolio.

Do not introduce NgRx unless explicitly requested.

---

# 32. Figma is the visual source of truth

When Figma screenshots or exports are provided, treat them as the primary visual reference.

Reproduce as accurately as reasonably possible:

* layout;
* proportions;
* spacing;
* typography;
* font weights;
* line heights;
* colors;
* borders;
* alignment;
* visual hierarchy;
* section spacing;
* badge appearance;
* navigation appearance.

Do not redesign the page.

Do not replace the visual language with a component library aesthetic.

When something cannot be reliably inferred from the image, preserve consistency with the existing design rather than inventing elaborate UI.

---

# 33. Responsive design

The desktop Figma design is NOT the only supported viewport.

The implementation must be responsive.

Support at minimum:

* mobile;
* tablet;
* desktop;
* large desktop.

The layout should work from approximately:

`320px`

and upward.

Do not implement only the exact dimensions of the Figma screenshot.

---

# 34. Responsive CSS strategy

Prefer modern CSS.

Use when appropriate:

* Flexbox;
* CSS Grid;
* `clamp()`;
* `min()`;
* `max()`;
* relative units;
* media queries;
* container queries when genuinely useful.

Avoid unnecessary fixed dimensions.

Avoid absolute positioning for primary layout unless clearly required by Figma.

Prefer fluid spacing and typography where appropriate.

---

# 35. Main content container

Use a consistent responsive content container.

Conceptually:

```text
viewport
   │
   └── responsive horizontal padding
          │
          └── max-width content
```

Avoid repeating arbitrary widths across sections.

Use shared design tokens for:

* maximum content width;
* horizontal padding;
* section spacing.

---

# 36. Navbar responsive behavior

Desktop navigation should follow Figma.

On smaller screens:

* prevent horizontal overflow;
* maintain accessible navigation;
* adapt layout appropriately;
* preserve the retro visual identity.

If a mobile navigation control is required, implement it accessibly.

Do not automatically introduce a modern animated drawer unless justified by the design.

Navigation between sections must remain immediate.

---

# 37. Hero responsive behavior

Hero typography must scale appropriately.

Use techniques such as:

`clamp()`

when appropriate.

Prevent:

* name overflow;
* horizontal scrolling;
* excessively long line lengths.

Maintain the visual hierarchy shown in Figma.

---

# 38. Skills responsive behavior

Skills must adapt dynamically to available width.

Badges must:

* wrap;
* remain readable;
* never create horizontal overflow.

Categories should reorganize naturally on tablet/mobile.

Do not assume the number of skills shown in the original Figma will remain constant because Decap can modify them.

---

# 39. Courses responsive behavior

Maintain hierarchy between:

* title;
* institution;
* year;
* color indicator.

Adapt the layout to narrow screens.

Do not allow long certification names to break the layout.

---

# 40. Contact responsive behavior

Follow Figma on desktop.

On narrow screens, GitHub and LinkedIn elements may stack vertically if necessary.

Do not force desktop positioning onto mobile screens.

---

# 41. Accessibility

Use semantic HTML.

Prefer:

* `<header>`
* `<nav>`
* `<main>`
* `<section>`
* `<footer>`

Maintain a correct heading hierarchy.

There should normally be one primary `h1`.

Navigation links should use actual `<a>` elements when they represent navigation.

Do not use clickable `<div>` elements when a semantic native element exists.

---

# 42. Keyboard accessibility

All interactive elements must work with keyboard navigation.

Provide visible:

`:focus-visible`

states.

The EN / ES selector must be keyboard accessible.

The currently selected language must be understandable to assistive technology.

External links must have meaningful accessible names.

---

# 43. Icons

For general UI icons, `@lucide/angular` may be used.

Import only required icons.

Do not use emojis as replacements for design icons.

For brand logos such as GitHub or LinkedIn, use appropriate accessible SVG assets if Lucide does not accurately represent the design.

Do not install a large icon library solely for two brand icons.

---

# 44. Images

When real content images are introduced, prefer Angular's image optimization capabilities where appropriate.

Use `NgOptimizedImage` when it provides value.

Avoid unnecessarily large assets.

Specify image dimensions/aspect ratios when possible to reduce layout shifts.

Do not introduce images that are not present in the design or content model.

---

# 45. Animations

The site intentionally has a retro, direct interaction style.

Do not add animations merely to make the application feel more modern.

Never animate navigation scroll.

Small visual interactions may be used where appropriate, such as:

* hover;
* focus;
* very small state transitions.

Avoid:

* entrance animations for every section;
* scroll-triggered animation;
* parallax;
* animated page transitions;
* excessive motion.

When motion is used, respect:

`prefers-reduced-motion`.

---

# 46. Styling

Use SCSS and modern CSS.

Do not introduce Angular Material, Bootstrap, Tailwind or another UI framework unless explicitly requested.

The custom Figma design should be implemented directly.

Avoid inline styles when reusable SCSS is more appropriate.

Avoid excessive use of `!important`.

Prefer component-scoped styles plus shared global design tokens.

---

# 47. Typography

Typography is an important part of the retro developer aesthetic.

Use the fonts indicated by the design or existing project assets.

Do not substitute fonts casually.

If the exact font is unavailable, choose a technically appropriate fallback while preserving the intended visual character.

Define font families centrally.

Do not repeat font-family declarations unnecessarily across components.

---

# 48. Performance

Avoid unnecessary dependencies.

Do not install packages for functionality easily implemented with Angular or native CSS.

Keep bundle size reasonable.

Do not introduce an external state management system.

Do not add heavy animation libraries.

Do not add large UI component frameworks.

Use lazy/deferred rendering only when it provides measurable or meaningful value.

Do not over-optimize a small portfolio at the cost of maintainability.

---

# 49. Recommended dependencies

When needed, preferred optional dependencies are:

### UI translations

`@jsverse/transloco`

Use it only for Angular structural/UI translations.

Do NOT use Transloco to duplicate editable Decap content.

### Icons

`@lucide/angular`

Use it for lightweight UI icons when appropriate.

Do not install additional packages without first determining whether Angular or native browser APIs already solve the problem.

---

# 50. Decap CMS protection

The existing Decap integration is working.

Do NOT unnecessarily modify:

* Netlify Identity;
* Git Gateway;
* Decap authentication;
* `/admin/index.html`;
* backend configuration;
* Git branch configuration.

Do not break:

`/admin/`

The CMS should continue to be able to edit content and commit it to GitHub.

---

# 51. Do not invent CMS fields

The current content model reflects the Figma design.

Do not add CMS fields because they "might be useful".

In particular, do not introduce:

* email;
* phone;
* additional social networks;
* course URLs;
* certification IDs;
* skill icons;
* descriptions that do not exist;
* images that do not exist;
* arbitrary metadata.

If a new field appears necessary, explain why before changing the content model.

---

# 52. Content must remain dynamic

Never assume the current JSON data is permanent.

Decap can change:

* descriptions;
* skills;
* skill categories;
* skill ordering;
* courses;
* course ordering;
* colors;
* social URLs.

Angular must render the current content rather than reproducing the example JSON manually.

---

# 53. Do not hardcode collection lengths

Never write UI logic that assumes:

* exactly 6 skill categories;
* exactly 4 skills per category;
* exactly 3 courses;
* exactly 2 social links because of array indexes.

Render content according to the actual data model.

Where GitHub and LinkedIn are explicit object properties, access them by property name rather than array position.

---

# 54. Error resilience

If one content request fails, avoid making the entire application unusable.

Handle errors at an appropriate level.

Do not expose technical stack traces to visitors.

During development, log useful diagnostics where appropriate.

Avoid excessive defensive architecture for simple static JSON.

---

# 55. Code quality

Use strict TypeScript typing.

Do not use `any`.

Prefer readable names.

Keep methods focused.

Avoid deeply nested logic.

Avoid duplicated language logic.

Avoid duplicated HTTP logic.

Avoid duplicated design-token mappings.

Follow the project's existing formatting and linting rules.

---

# 56. Testing and validation

After meaningful implementation changes:

* run the Angular build;
* verify there are no TypeScript compilation errors;
* verify templates compile;
* verify language routes;
* verify `/admin/` remains available when routing changes affect Netlify;
* check for obvious responsive overflow.

When working on navigation, test conceptually:

`/`

`/en`

`/es`

`/en#about`

`/es#courses`

`/en#contact`

and browser Back/Forward behavior.

---

# 57. Responsive validation targets

When performing a responsive review, consider at least approximately:

* 320px
* 375px
* 430px
* 768px
* 1024px
* 1280px
* 1440px+

Do not create breakpoint-specific hacks for every width.

Use fluid layout first and introduce breakpoints when the design genuinely needs them.

---

# 58. Implementation workflow

When asked to implement a section:

1. inspect existing relevant code;
2. inspect the corresponding content JSON;
3. inspect the provided Figma reference;
4. identify which text belongs to Angular translations;
5. identify which content comes from Decap;
6. describe the intended changes briefly;
7. implement only the requested section;
8. ensure responsive behavior;
9. ensure accessibility;
10. run the Angular build;
11. fix compilation issues;
12. stop and report the result.

Do not automatically proceed to another section.

---

# 59. Completion report

At the end of each implementation task, provide a concise report containing:

### Created

Files created.

### Modified

Files modified.

### Decisions

Important architectural or visual decisions.

### Validation

Build/test commands executed and their result.

### Visual review

Anything the developer should manually compare against Figma.

### Uncertainties

Anything that could not be reliably inferred from the available design.

Do not claim pixel-perfect accuracy when the reference image does not provide sufficient measurements.

---

# 60. Priority order

When requirements conflict, prioritize:

1. functional correctness;
2. Figma visual fidelity;
3. Angular / Decap responsibility separation;
4. responsive behavior;
5. accessibility;
6. maintainability;
7. performance;
8. minimal dependencies.

Do not sacrifice the project's intentional retro design merely to make it look more like a modern application.

---

# 61. Core principle

The final application should behave as:

```text
Figma
  ↓
Angular presentation
  ↓
Responsive retro portfolio

Decap CMS
  ↓
JSON content
  ↓
ContentService
  ↓
Angular components

URL
  ↓
/en or /es
  ↓
Language state

URL fragment
  ↓
#home / #about / #courses / #contact
  ↓
Immediate anchor navigation
```

Keep these responsibilities separate throughout the project.
