FROM golang:1.26-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
COPY vendor ./vendor
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -mod=vendor -o /out/excel-service .

FROM alpine:3.22 AS runner

WORKDIR /app

COPY --from=builder /out/excel-service ./excel-service
COPY --from=builder /src/templates /templates

ENV PORT=3002
ENV TEMPLATE_PATH=/templates
EXPOSE 3002

CMD ["./excel-service"]
