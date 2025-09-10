# Comandos Docker para Cotiza360

## Gestión del entorno Docker

### Iniciar servicios

```bash
# Iniciar todos los servicios en primer plano (ver logs en tiempo real)
docker compose up

# Iniciar todos los servicios en segundo plano
docker compose up -d

#
docker compose exec api npx prisma migrate dev

# Iniciar solo la base de datos
docker compose up -d postgres

# Reconstruir e iniciar los servicios (después de cambios en Dockerfile)
docker compose up --build
```

### Detener servicios

```bash
# Detener servicios pero mantener contenedores
docker compose stop

# Detener y eliminar contenedores
docker compose down

# Detener, eliminar contenedores y volúmenes (¡CUIDADO! Borra datos de BD)
docker compose down -v
```

## Prisma y migraciones

```bash
# Crear una nueva migración
docker compose exec api npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones pendientes
docker compose exec api npx prisma migrate deploy

# Resetear la base de datos (¡CUIDADO! Borra todos los datos)
docker compose exec api npx prisma migrate reset --force

# Ver estado de migraciones
docker compose exec api npx prisma migrate status

# Generar cliente Prisma después de cambios en schema
docker compose exec api npx prisma generate

# Abrir Prisma Studio (interfaz visual para datos)
docker compose exec api npx prisma studio
```

## Logs y diagnóstico

```bash
# Ver logs de todos los servicios
docker compose logs

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs api
docker compose logs postgres

# Ver logs de las últimas N líneas
docker compose logs --tail=100
```

## Ejecutar comandos

```bash
# Ejecutar comandos en el contenedor de la API
docker compose exec api sh

# Ejecutar comandos en PostgreSQL
docker compose exec postgres psql -U cotiza360_user -d cotiza360_db

# Ejecutar tests
docker compose exec api npm test

# Verificar estado de los contenedores
docker compose ps
```

## Acceso a base de datos desde host

```bash
# Conectarse a la base de datos desde la máquina host
PGPASSWORD=tu_password_seguro psql -h localhost -U cotiza360_user -d cotiza360_db
```

## Reinicio y mantenimiento

```bash
# Reiniciar un servicio específico
docker compose restart api

# Ver uso de recursos
docker stats

# Limpiar contenedores no utilizados
docker system prune
```
