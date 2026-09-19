# syntax=docker/dockerfile:1

# ---------- Stage 1: build the static site ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first so this layer is cached until package files change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Only change this if you serve the site from a sub-path (e.g. /portfolio/)
ARG VITE_BASE=/
ENV VITE_BASE=$VITE_BASE
RUN npm run build

# ---------- Stage 2: serve with nginx (runs as a non-root user) ----------
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
