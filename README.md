# Night Survey — React + Vite + shadcn-style UI

A survey website starter built around the requirements you gave:

- React + Vite setup
- dark night theme as the default
- theme toggle included
- Home page with introduction and agreements
- Survey page with a brief intro plus questionnaire
- one question type for now: a 1–10 rating selector
- questions displayed as horizontally scrolling cards
- UI composed with shadcn-style components

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Notes

- The survey answers are stored in local React state as a front-end demo.
- If you deploy with `BrowserRouter`, make sure your hosting platform supports SPA route fallback.
- The shadcn configuration file (`components.json`) is included so you can expand the UI system later.

## Main folders

```text
src/
  components/
    ui/
    rating-question-card.tsx
    site-shell.tsx
    theme-provider.tsx
    theme-toggle.tsx
  data/
    survey-questions.ts
  pages/
    home-page.tsx
    survey-page.tsx
```
