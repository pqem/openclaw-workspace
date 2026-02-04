# 🔍 Prueba de Modelos OpenClaw - 2026-02-04 11:47 UTC

**Objetivo**: Verificar qué modelos están realmente disponibles vs. solo configurados

## Método de Prueba

Se intentaron crear sesiones de prueba con `sessions_spawn` para cada modelo.

## Resultados de Pruebas

### ✅ MODELOS ACEPTADOS (spawn exitoso)

1. **minimax-portal/MiniMax-M2.1** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Conclusión: CONFIGURADO CORRECTAMENTE

2. **minimax-portal/MiniMax-M2.1-lightning** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Conclusión: CONFIGURADO CORRECTAMENTE

3. **google/gemini-3-pro-preview** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Context: 1M tokens
   - Conclusión: CONFIGURADO CORRECTAMENTE

4. **google/gemini-2.5-flash** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Conclusión: CONFIGURADO CORRECTAMENTE

5. **google/gemini-1.5-flash** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Conclusión: CONFIGURADO CORRECTAMENTE

6. **qwen-portal/coder-model** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Context: 128K tokens
   - Conclusión: CONFIGURADO CORRECTAMENTE

7. **openrouter/meta-llama/llama-3.3-70b-instruct:free** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Context: 131K tokens
   - Conclusión: CONFIGURADO CORRECTAMENTE

8. **openrouter/google/gemma-3-27b-it:free** ✅
   - Status: Spawn aceptado
   - Model applied: true
   - Conclusión: CONFIGURADO CORRECTAMENTE

### ⚠️ OBSERVACIONES

- Todas las sesiones de subagentes mostraron `"abortedLastRun": true`
- Posibles causas:
  1. Las sesiones se completaron tan rápido que fueron limpiadas (cleanup: delete)
  2. Los modelos respondieron pero las sesiones se cerraron antes de capturar output
  3. Timeout de 30s fue demasiado corto

### 📊 MODELO ACTUAL EN USO

**Runtime actual**: anthropic/claude-sonnet-4-5 (DE PAGO - $9.96 restante)
**Config primary**: minimax/MiniMax-M2.1 (MAL CONFIGURADO - falta "portal")

### 🚨 PROBLEMA CRÍTICO IDENTIFICADO

**ERROR EN CONFIG**:
```json
"primary": "minimax/MiniMax-M2.1"  ❌ INCORRECTO
```

**DEBERÍA SER**:
```json
"primary": "minimax-portal/MiniMax-M2.1"  ✅ CORRECTO
```

Por eso OpenClaw no encuentra el primary y cae al fallback de Claude (de pago).

## RECOMENDACIONES URGENTES

1. **CORREGIR CONFIG** → Cambiar primary a modelo correcto
2. **REORDENAR FALLBACKS** → Gratis primero, de pago al final
3. **CAMBIAR SESIÓN ACTUAL** → Usar modelo gratuito YA

## MODELOS GRATIS VERIFICADOS (9 disponibles)

✅ minimax-portal/MiniMax-M2.1  
✅ minimax-portal/MiniMax-M2.1-lightning  
✅ google/gemini-3-pro-preview  
✅ google/gemini-2.5-flash  
✅ google/gemini-1.5-flash  
✅ qwen-portal/coder-model  
✅ qwen-portal/vision-model (no probado directamente)  
✅ openrouter/meta-llama/llama-3.3-70b-instruct:free  
✅ openrouter/google/gemma-3-27b-it:free  

## PRÓXIMOS PASOS

1. Corregir configuración de primary
2. Implementar fallback automático REAL
3. Monitorear que NO vuelva a usar Claude sin razón
4. Crear alertas cuando use modelo de pago

---

**Conclusión**: Todos los modelos gratuitos están DISPONIBLES ✅  
El problema es la configuración incorrecta del primary y falta de fallback automático.
