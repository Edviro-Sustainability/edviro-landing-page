# edviro-landing-page

The Edviro marketing site (Vue 3 + Vite, prerendered with vite-ssg, deployed on Netlify at `edviroenergy.com`).

Positioning: Edviro is an **AI-powered facilities operations platform for schools** (technical category: AI-native operations and maintenance platform). Energy management is a major entry point, not the product boundary; the site's energy pages keep their URLs and intent, and the O&M story lives on `/solutions/school-facilities-operations/` and the work-order / CMMS / asset capability pages. Canonical copy lives in `src/seo/site.ts` and the "What is Edviro?" Notion page.

## The Edviro ecosystem

Edviro is an AI-powered facilities operations platform for K-12 school districts — energy monitoring, diagnostics, work orders, assets, and capital planning in one place. Six repos, one shared data plane:

| Repo | What it is |
|------|-----------|
| `flask-server` | Python backend — Cloud Run API + nightly Fargate ML pipeline |
| `edviro-dashboard` | React operator dashboard (Netlify-hosted, Supabase-backed) |
| `edviro-caseagent` | Cloudflare Worker — LLM ResolutionAgent that works anomaly cases end-to-end |
| `edviro-mobile-app` | React Native app — district energy views via Supabase under RLS |
| `edviro-landing-page` | Marketing site — this repo |
| `edviro-blog` | Astro blog |

**Shared data plane:** Supabase (Postgres + Auth + Storage + Edge Functions). District-scoped RLS is the authorization boundary; backend jobs use the service role.

**Architecture source of truth:** the [Edviro Architecture](https://app.notion.com/p/3a1e1e5ee06481c7ab24f4e8db322027) Notion page and its component pages, mirrored as the Monoid canvas "Edviro Architecture" (id `cab10eba-96ba-49ef-aec0-22959c08e5c2`). Agents: fetch pages via the Notion MCP; explore component relationships via the Monoid MCP (`get_canvas`, `get_node_context`).

## Docs map

This repo has no dedicated Notion component page; start from the [Edviro Architecture](https://app.notion.com/p/3a1e1e5ee06481c7ab24f4e8db322027) index. Product positioning lives in the "What is Edviro?" Notion page.

## Vue template notes

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
