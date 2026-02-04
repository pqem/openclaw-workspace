# Sistema de Automatización N8N - Moltbot 🦀

Este paquete incluye dos componentes principales para mejorar tu productividad con N8N:

## 1. Plantilla de Flujo de Trabajo: "Task Automation Manager"

### Características:
- **Monitoreo automático**: Verifica tareas pendientes en intervalos regulares
- **Filtrado inteligente**: Identifica tareas que requieren atención
- **Notificaciones**: Envía alertas por Telegram/WhatsApp sobre tareas pendientes
- **Actualización automática**: Marca tareas como notificadas para evitar duplicados
- **Escalabilidad**: Fácilmente adaptable a diferentes tipos de tareas

### Componentes del flujo:
1. **Schedule Trigger**: Disparador programado para ejecución periódica
2. **Get Tasks**: Obtiene todas las tareas desde tu sistema
3. **Filter Pending Tasks**: Filtra solo las tareas pendientes
4. **Set Variables**: Prepara variables para la notificación
5. **Send Notification**: Envía notificación por Telegram/WhatsApp
6. **Update Task Status**: Actualiza el estado de la tarea

## 2. Script de Monitoreo: "N8N Monitor"

### Características:
- **Análisis de flujos**: Evalúa la salud de todos tus flujos de trabajo
- **Puntuación de eficiencia**: Calcula una puntuación de eficiencia para cada flujo
- **Reporte automático**: Genera reportes detallados de salud del sistema
- **Alertas inteligentes**: Detecta problemas y envía alertas prioritarias
- **Recomendaciones**: Sugiere mejoras basadas en el análisis

### Métricas monitoreadas:
- Tiempo promedio de ejecución
- Tasa de errores
- Eficiencia general
- Flujos inactivos
- Rendimiento histórico

## Instalación y Configuración

### Para la plantilla N8N:
1. Importa el archivo `n8n-task-automation-template.json` en tu instancia de N8N
2. Configura las credenciales de Telegram/WhatsApp
3. Ajusta la URL del endpoint de tareas según tu sistema
4. Activa el flujo de trabajo

### Para el script de monitoreo:
1. Coloca `n8n-monitoring-script.js` en tu directorio de scripts
2. Asegúrate de tener Node.js instalado
3. Configura la variable de entorno `N8N_WORKFLOWS_DIR` apuntando a tu directorio de flujos
4. Ejecuta: `node n8n-monitoring-script.js`

## Personalización

Ambas herramientas están diseñadas para ser fácilmente adaptables:

- **Plantilla N8N**: Cambia los endpoints, ajusta condiciones de filtrado, modifica formatos de notificación
- **Script de monitoreo**: Ajusta umbrales de alerta, añade métricas personalizadas, integra con tus sistemas de logging

## Beneficios

- **Automatización de tareas repetitivas**
- **Visibilidad del estado de tus flujos**
- **Detección proactiva de problemas**
- **Optimización del rendimiento**
- **Reducción de errores manuales**

---

*Desarrollado por Moltbot 🦀 - Tu asistente experto en automatización*