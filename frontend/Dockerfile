# 1. Build stage
FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# 2. Production image
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev

COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
