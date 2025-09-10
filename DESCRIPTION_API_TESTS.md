# Comandos CURL para probar la API de Description en Cotiza360

A continuación se presentan los comandos curl para probar los endpoints de la entidad Description.
Puedes usar estos comandos para verificar que la API está funcionando correctamente.

## Variables de entorno para facilitar las pruebas

```bash
# Establece la URL base de la API (ajusta según tu entorno)
API_URL="http://localhost:3000"

# Guarda un ID de descripción para pruebas posteriores
DESCRIPTION_ID=""
```

## 1. Crear una nueva Description

```bash
# Crear una nueva descripción
curl -X POST \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Esta es una descripción de prueba"
  }' \
  -v

# Crear y guardar el ID para pruebas posteriores
DESCRIPTION_ID=$(curl -s -X POST \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descripción para pruebas posteriores"
  }' | jq -r '.id')

# Muestra el ID guardado para verificar
echo "ID guardado: $DESCRIPTION_ID"
```

## 2. Obtener una Description por ID

```bash
# Obtener descripción por ID (usando el ID guardado)
curl -X GET \
  "$API_URL/descriptions/$DESCRIPTION_ID" \
  -H "Content-Type: application/json" \
  -v

# O especificando un ID directamente
curl -X GET \
  "$API_URL/descriptions/1234-5678-90ab-cdef" \
  -H "Content-Type: application/json" \
  -v
```

## 3. Listar todas las Descriptions

```bash
# Obtener todas las descripciones
curl -X GET \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" \
  -v

# Obtener todas las descripciones y formatear como JSON legible
curl -X GET \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" | jq
```

## Casos de error a probar

```bash
# Crear una descripción con datos inválidos (sin descripción)
curl -X POST \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -v

# Buscar una descripción que no existe
curl -X GET \
  "$API_URL/descriptions/id-que-no-existe" \
  -H "Content-Type: application/json" \
  -v
```

## Script para pruebas completas

```bash
#!/bin/bash
# Este script prueba todos los endpoints de Description

API_URL="http://localhost:3000"
echo "=== Probando API de Descriptions ==="

# 1. Crear una nueva descripción
echo "\n== Creando nueva descripción =="
RESPONSE=$(curl -s -X POST \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descripción de prueba automatizada"
  }')
echo $RESPONSE
DESCRIPTION_ID=$(echo $RESPONSE | jq -r '.id')
echo "ID creado: $DESCRIPTION_ID"

# 2. Obtener descripción por ID
echo "\n== Obteniendo descripción por ID =="
curl -s -X GET \
  "$API_URL/descriptions/$DESCRIPTION_ID" \
  -H "Content-Type: application/json" | jq

# 3. Listar todas las descripciones
echo "\n== Listando todas las descripciones =="
curl -s -X GET \
  "$API_URL/descriptions" \
  -H "Content-Type: application/json" | jq

echo "\n=== Pruebas completadas ==="
```

## Notas:

- Para usar estos comandos, la API debe estar en ejecución (`docker compose up`).
- El comando `jq` se usa para formatear la salida JSON. Si no lo tienes instalado:
  - Mac: `brew install jq`
  - Linux: `sudo apt install jq` o `sudo yum install jq`
  - Windows: `winget install jqlang.jq` o descárgalo desde https://stedolan.github.io/jq/
- Si prefieres no usar `jq`, simplemente elimina la parte `| jq` del comando.
