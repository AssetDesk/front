# # Builder
# FROM node:alpine AS builder
# RUN apk add --no-cache libc6-compat
# RUN apk update

# WORKDIR /app
# RUN yarn global add turbo
# COPY . .
# RUN turbo prune --scope=webapp --docker

# # Installer
# FROM node:alpine AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update

# WORKDIR /app
# RUN yarn global add pnpm
# RUN yarn global add turbo

# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# RUN pnpm install

# COPY --from=builder /app/out/full/ .
# COPY turbo.json turbo.json

# # Uncomment and use build args to enable remote caching
# # ARG TURBO_TEAM
# # ENV TURBO_TEAM=$TURBO_TEAM

# # ARG TURBO_TOKEN
# # ENV TURBO_TOKEN=$TURBO_TOKEN

# RUN turbo build --filter=webapp...

# # Runner
# FROM node:alpine AS runner
# WORKDIR /app

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# COPY --from=installer /app/apps/webapp/next.config.js .
# COPY --from=installer /app/apps/webapp/package.json .

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/.next/standalone ./
# # COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/.next/static ./apps/webapp/.next/static
# COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/public ./apps/webapp/public

# CMD node apps/webapp/server.js

# Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo

COPY . .
RUN turbo prune --scope=webapp --docker


# Installer
FROM node:18-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 make g++
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG NODE
ENV NODE=${NODE}

# COPY ./apps/webapp/.env.${NODE} ./apps/webapp/.env.production
# ENV NODE_ENV=production

RUN turbo build --filter=webapp...

# Runner
FROM node:18-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/webapp/next.config.js .
COPY --from=installer /app/apps/webapp/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/.next/static ./apps/webapp/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/webapp/public ./apps/webapp/public

CMD node apps/webapp/server.js