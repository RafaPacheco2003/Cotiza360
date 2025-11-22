# Configuración de Kafka - Cotiza360

## Arquitectura implementada

**Flujo completo:**
```
POST /integration/send 
  → Kafka Producer (topic: echo-data-topic)
    → Kafka Consumer 
      → POST http://localhost:8000/api/v1/echo/
```

## Requisitos

- Docker y Docker Compose
- Servicio echo corriendo en `http://localhost:8000/api/v1/echo/`

## Uso

### 1. Levantar servicios

```bash
docker-compose up -d
```

### 2. Hacer petición al endpoint

**Endpoint:**
```
POST http://localhost:3000/integration/send
```

**Body:**
```json
{
  "branchId": "123e4567-e89b-12d3-a456-426614174000",
  "modelId": "123e4567-e89b-12d3-a456-426614174001",
  "descriptionId": "123e4567-e89b-12d3-a456-426614174002"
}
```

**Ejemplo con curl:**
```bash
curl -X POST http://localhost:3000/integration/send \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "123e4567-e89b-12d3-a456-426614174000",
    "modelId": "123e4567-e89b-12d3-a456-426614174001",
    "descriptionId": "123e4567-e89b-12d3-a456-426614174002"
  }'
```

**Respuesta esperada:**
```json
{
  "message": "Datos enviados a Kafka exitosamente",
  "data": {
    "branchId": "123e4567-e89b-12d3-a456-426614174000",
    "modelId": "123e4567-e89b-12d3-a456-426614174001",
    "descriptionId": "123e4567-e89b-12d3-a456-426614174002"
  }
}
```

### 3. Verificar logs

```bash
# Ver logs del API
docker-compose logs -f api

# Ver logs de Kafka
docker-compose logs -f kafka
```

## Configuración

La configuración de Kafka se encuentra en `src/kafka/kafka.config.ts`:

```typescript
export const KAFKA_CONFIG = {
  clientId: 'cotiza360-client',
  brokers: ['kafka:29092'], // Nombre del servicio en Docker
  topic: 'echo-data-topic',
  groupId: 'echo-consumer-group',
};
```

**Nota importante:** El consumer usa `host.docker.internal:8000` para acceder al servicio echo en el host desde el contenedor Docker.

## Detener servicios

```bash
# Detener Kafka de Homebrew (si está corriendo)
brew services stop kafka

# Detener contenedores
docker-compose down
```
