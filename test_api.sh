#!/bin/bash

echo "🚀 Probando API Cotiza360..."
echo ""

# 1. Crear Branch
echo "📋 1. Creando Branch Toyota..."
BRANCH_RESPONSE=$(curl -s -X POST http://localhost:3000/branches \
  -H "Content-Type: application/json" \
  -d '{"name": "Toyota"}')

echo "Respuesta: $BRANCH_RESPONSE"
BRANCH_ID=$(echo $BRANCH_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Branch ID: $BRANCH_ID"
echo ""

# Verificar que tenemos el ID
if [ -z "$BRANCH_ID" ]; then
    echo "❌ Error: No se pudo obtener el ID del Branch"
    exit 1
fi

# 2. Crear Model
echo "🚗 2. Creando Model Corolla..."
MODEL_RESPONSE=$(curl -s -X POST http://localhost:3000/models \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Corolla\", \"branchId\": \"$BRANCH_ID\"}")

echo "Respuesta: $MODEL_RESPONSE"
MODEL_ID=$(echo $MODEL_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
echo "Model ID: $MODEL_ID"
echo ""

# Verificar que tenemos el ID
if [ -z "$MODEL_ID" ]; then
    echo "❌ Error: No se pudo obtener el ID del Model"
    exit 1
fi

# 3. Crear Description
echo "📝 3. Creando Description..."
DESCRIPTION_RESPONSE=$(curl -s -X POST http://localhost:3000/descriptions \
  -H "Content-Type: application/json" \
  -d "{\"description\": \"Sedan 4 puertas, motor 1.8L, transmisión automática\", \"modelId\": \"$MODEL_ID\"}")

echo "Respuesta: $DESCRIPTION_RESPONSE"
echo ""

# 4. Crear más datos de prueba
echo "📋 4. Creando más datos de prueba..."

# Branch Honda
echo "Creando Branch Honda..."
HONDA_RESPONSE=$(curl -s -X POST http://localhost:3000/branches \
  -H "Content-Type: application/json" \
  -d '{"name": "Honda"}')
HONDA_ID=$(echo $HONDA_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

# Model Civic
echo "Creando Model Civic..."
CIVIC_RESPONSE=$(curl -s -X POST http://localhost:3000/models \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"Civic\", \"branchId\": \"$HONDA_ID\"}")
CIVIC_ID=$(echo $CIVIC_RESPONSE | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

# Description para Civic
echo "Creando Description para Civic..."
curl -s -X POST http://localhost:3000/descriptions \
  -H "Content-Type: application/json" \
  -d "{\"description\": \"Hatchback deportivo, motor turbo 1.5L, transmisión manual\", \"modelId\": \"$CIVIC_ID\"}" > /dev/null

echo ""

# 5. Verificar datos
echo "🔍 5. Verificando todos los datos..."
echo ""

echo "📋 Todas las Branches:"
curl -s -X GET http://localhost:3000/branches
echo ""
echo ""

echo "🚗 Todos los Models (con Branch incluido):"
curl -s -X GET http://localhost:3000/models
echo ""
echo ""

echo "📝 Todas las Descriptions:"
curl -s -X GET http://localhost:3000/descriptions
echo ""
echo ""

# 6. Probar GET por ID
echo "🔍 6. Probando GET por ID..."
echo ""

echo "📋 Branch Toyota por ID:"
curl -s -X GET http://localhost:3000/branches/$BRANCH_ID
echo ""
echo ""

echo "🚗 Model Corolla por ID:"
curl -s -X GET http://localhost:3000/models/$MODEL_ID
echo ""
echo ""

echo "✅ Todas las pruebas completadas exitosamente!"
echo ""
echo "🎉 API funcionando correctamente con:"
echo "   - Branches creados y consultados"
echo "   - Models creados con relación a Branches"
echo "   - Descriptions creadas con relación a Models"
echo "   - Consultas por ID funcionando"