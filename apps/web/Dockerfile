FROM node:24-slim AS builder
COPY --from=oven/bun:1 /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
ENV SKIP_ENV_VALIDATION=1

COPY . .
RUN bun install

ENV NODE_ENV=production
RUN cd apps/web && bun run build

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/templates ./templates

ENV HOSTNAME=0.0.0.0
ENV PORT=3001
EXPOSE 3001

CMD ["node", "apps/web/server.js"]
