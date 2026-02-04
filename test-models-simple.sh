#!/bin/bash
# Script simple para probar modelos OpenClaw

echo "🔍 PRUEBA DE MODELOS DISPONIBLES"
echo "================================="
echo ""
echo "Fecha: $(date)"
echo ""

# Lista de modelos a probar (gratis primero)
declare -A models=(
  ["minimax-m2.1"]="minimax-portal/MiniMax-M2.1"
  ["minimax-lightning"]="minimax-portal/MiniMax-M2.1-lightning"
  ["gemini3"]="google/gemini-3-pro-preview"
  ["gemini2.5-flash"]="google/gemini-2.5-flash"
  ["gemini1.5-flash"]="google/gemini-1.5-flash"
  ["qwen-coder"]="qwen-portal/coder-model"
  ["qwen-vision"]="qwen-portal/vision-model"
  ["llama-free"]="openrouter/meta-llama/llama-3.3-70b-instruct:free"
  ["gemma-free"]="openrouter/google/gemma-3-27b-it:free"
)

# Función para verificar si un modelo está en la config
check_model() {
  local alias=$1
  local full_name=$2
  
  echo "Testing: $alias ($full_name)"
  
  # Verificar en la config
  if grep -q "$full_name" ~/.openclaw/openclaw.json 2>/dev/null; then
    echo "  ✅ Configurado en openclaw.json"
    return 0
  else
    echo "  ❌ NO encontrado en config"
    return 1
  fi
}

# Probar cada modelo
for alias in "${!models[@]}"; do
  check_model "$alias" "${models[$alias]}"
  echo ""
done

echo "================================="
echo "Verificación básica completada"
