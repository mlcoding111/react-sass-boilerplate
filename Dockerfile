# Production Dockerfile for Vite React App (with pnpm)
# Multi-stage build: Build React app, then serve with nginx

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies and build
FROM base AS builder
WORKDIR /app

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files
COPY apps/client/package.json ./apps/client/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy all source files
COPY apps/client ./apps/client
COPY packages ./packages

# Build shared packages first
RUN pnpm --filter "@repo/shared" build 2>&1 || true
RUN pnpm --filter "@repo/ui" build 2>&1 || true

# Build client (package name is "client", not "@repo/client")
RUN pnpm --filter "client" build

# Verify dist exists
RUN echo "Checking dist folder..." && \
    ls -la /app/apps/client/ && \
    if [ ! -d "/app/apps/client/dist" ]; then \
        echo "ERROR: dist folder not found!"; \
        echo "Build may have failed. Checking for errors..."; \
        ls -la /app/apps/client/; \
        exit 1; \
    fi && \
    echo "✅ Dist folder found! Contents:" && \
    ls -la /app/apps/client/dist/ && \
    if [ ! -f "/app/apps/client/dist/index.html" ]; then \
        echo "ERROR: index.html not found in dist!"; \
        exit 1; \
    fi && \
    echo "✅ index.html found!"

# Production stage with nginx
FROM nginx:alpine AS runner

# Copy built app
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Copy custom nginx config
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf.default

# Ensure proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]