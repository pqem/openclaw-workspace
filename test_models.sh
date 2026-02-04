#!/bin/bash
# Test de disponibilidad de modelos OpenClaw

echo "🔍 PRUEBA DE MODELOS DISPONIBLES"
echo "================================="
echo ""

models=(
  "qwen-portal/coder-model"
  "minimax-portal/MiniMax-M2.1"
  "google/gemini-3-pro-preview"
  "google/gemini-2.5-flash"
  "google/gemini-1.5-flash"
  "openrouter/meta-llama/llama-3.3-70b-instruct:free"
  "openrouter/google/gemma-3-27b-it:free"
  "anthropic/claude-sonnet-4-5"
)

for model in "${models[@]}"; do
  echo "Testing: $model"
  # Aquí necesitaríamos una forma de probar cada modelo
  # OpenClaw no tiene un comando directo de test, pero podemos ver los logs
done
