# Portfolio

React + Vite + Tailwind CSS single-page portfolio.

## Edit your details
Everything personal (name, WhatsApp number, email, links) is in the `CONFIG` object at the top of `src/App.jsx`.
Put your CV at `public/cv.pdf`.

## Run locally
```bash
npm install
npm run dev          # http://localhost:5173
```

## Docker
```bash
docker build -t portfolio .
docker run -d --name portfolio -p 8080:8080 portfolio     # http://localhost:8080
# or
docker compose up -d --build
```

## Deploy
- **Vercel:** import the repo, framework preset "Vite" (build `npm run build`, output `dist`).
- **GitHub Pages:** push to `main`; the workflow in `.github/workflows/deploy.yml` builds and publishes.
  Set Settings → Pages → Source to "GitHub Actions" once.
