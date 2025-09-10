# Comandos CURL para la API de Description

## Crear una nueva descripción
```bash
curl -X POST \
  "http://localhost:3000/descriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Esta es una descripción de prueba"
  }'
```

## Obtener una descripción por ID
```bash
curl -X GET \
  "http://localhost:3000/descriptions/TU_ID_AQUI" \
  -H "Content-Type: application/json"
```

## Listar todas las descripciones
```bash
curl -X GET \
  "http://localhost:3000/descriptions" \
  -H "Content-Type: application/json"
```

## Flujo completo de pruebas (copiar y pegar en terminal)
```bash
# 1. Crear descripción y guardar ID
RESPONSE=$(curl -s -X POST \
  "http://localhost:3000/descriptions" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descripción para prueba"
  }')
echo "Respuesta de creación: $RESPONSE"
ID=$(echo $RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "ID creado: $ID"

# 2. Obtener la descripción por ID
echo "Obteniendo descripción con ID: $ID"
curl -X GET \
  "http://localhost:3000/descriptions/$ID" \
  -H "Content-Type: application/json"

# 3. Listar todas las descripciones
echo -e "\nListando todas las descripciones:"
curl -X GET \
  "http://localhost:3000/descriptions" \
  -H "Content-Type: application/json"
```
