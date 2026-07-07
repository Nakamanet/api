# syntax=docker/dockerfile:1

# ============================================================
# base — shared foundation for every stage
# ============================================================
FROM node:24-slim AS base
WORKDIR /app
# NODE_ENV is set explicitly by each final stage (dev/build/prod) so that
# `npm ci` in `deps` installs devDependencies (needed for HMR).

# ============================================================
# deps — all dependencies (incl. dev)
# ============================================================
FROM base AS deps
COPY package*.json ./
RUN npm ci --include=dev

# ============================================================
# prod-deps — production dependencies only
# ============================================================
FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev

# ============================================================
# build — compile TypeScript to ./build
# The inline env values only satisfy AdonisJS env validation while
# `node ace build` boots the framework; they are scoped to this RUN
# and never persisted in the image.
# ============================================================
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN NODE_ENV=production PORT=3333 HOST=0.0.0.0 LOG_LEVEL=info \
    APP_KEY=build-time-placeholder APP_URL=http://localhost:3333 SESSION_DRIVER=cookie \
    DB_HOST=localhost DB_PORT=5432 DB_USER=build DB_DATABASE=build \
    LIMITER_STORE=memory REDIS_HOST=localhost REDIS_PORT=6379 \
    node ace build

# ============================================================
# dev — HMR server; source is bind-mounted by compose so
# host edits reload live without a rebuild.
# ============================================================
FROM base AS dev
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3333
CMD ["npm", "run", "dev"]

# ============================================================
# prod — lean runtime image (no dev deps, no TS source)
# ============================================================
FROM base AS prod
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./
USER node
EXPOSE 3333
CMD ["node", "bin/server.js"]
