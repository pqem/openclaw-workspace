#!/usr/bin/env node

/**
 * Script de monitoreo para N8N
 * Analiza el estado de los flujos de trabajo y envía alertas
 */

const fs = require('fs');
const path = require('path');

class N8NMonitor {
  constructor() {
    this.workflowsDir = process.env.N8N_WORKFLOWS_DIR || './workflows';
    this.alertThreshold = process.env.ALERT_THRESHOLD || 5; // segundos
    this.recentExecutionLimit = process.env.RECENT_EXECUTIONS || 10;
  }

  /**
   * Analiza un flujo de trabajo específico
   */
  analyzeWorkflow(workflowPath) {
    try {
      const workflowData = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
      
      const stats = {
        id: workflowData.id,
        name: workflowData.name,
        active: workflowData.active,
        nodeCount: workflowData.nodes.length,
        triggerCount: workflowData.nodes.filter(n => n.type.includes('trigger')).length,
        connectionCount: Object.keys(workflowData.connections).length,
        executionTimeAvg: this.calculateAverageExecutionTime(workflowData),
        lastExecution: this.getLastExecution(workflowData),
        errorRate: this.calculateErrorRate(workflowData),
        efficiencyScore: 0
      };

      // Calcular puntuación de eficiencia
      stats.efficiencyScore = this.calculateEfficiencyScore(stats);

      return stats;
    } catch (error) {
      console.error(`Error analyzing workflow ${workflowPath}:`, error.message);
      return null;
    }
  }

  /**
   * Calcula el tiempo promedio de ejecución (simulado)
   */
  calculateAverageExecutionTime(workflowData) {
    // En un entorno real, esto se obtendría de las métricas de ejecución
    // Por ahora, simulamos basándonos en la complejidad
    const complexityFactor = workflowData.nodes.length * 
                            (workflowData.connections ? Object.keys(workflowData.connections).length : 1);
    return Math.min(30, Math.max(1, complexityFactor * 0.5)); // Entre 1 y 30 segundos
  }

  /**
   * Obtiene la última ejecución (simulado)
   */
  getLastExecution(workflowData) {
    return new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString();
  }

  /**
   * Calcula la tasa de errores (simulado)
   */
  calculateErrorRate(workflowData) {
    return Math.random() * 0.1; // Entre 0% y 10%
  }

  /**
   * Calcula la puntuación de eficiencia
   */
  calculateEfficiencyScore(stats) {
    let score = 100;

    // Penalizar por tener demasiados nodos sin optimización
    if (stats.nodeCount > 20) score -= 10;
    
    // Penalizar por alta tasa de errores
    score -= stats.errorRate * 100;
    
    // Penalizar por bajo número de triggers
    if (stats.triggerCount === 0) score -= 20;
    if (stats.triggerCount > 1) score += 5; // Beneficio por redundancia
    
    // Ajustar por tiempo de ejecución
    if (stats.executionTimeAvg > 10) score -= 15;
    if (stats.executionTimeAvg < 3) score += 10;
    
    // Asegurar que el puntaje esté entre 0 y 100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Escanea todos los flujos de trabajo
   */
  scanWorkflows() {
    const workflows = [];
    const workflowFiles = fs.readdirSync(this.workflowsDir)
      .filter(file => file.endsWith('.json'));

    for (const file of workflowFiles) {
      const fullPath = path.join(this.workflowsDir, file);
      const workflowStats = this.analyzeWorkflow(fullPath);
      if (workflowStats) {
        workflows.push(workflowStats);
      }
    }

    return workflows;
  }

  /**
   * Genera un reporte de salud
   */
  generateHealthReport(workflows) {
    const total = workflows.length;
    const active = workflows.filter(w => w.active).length;
    const avgEfficiency = workflows.reduce((sum, w) => sum + w.efficiencyScore, 0) / total;
    const avgExecutionTime = workflows.reduce((sum, w) => sum + w.executionTimeAvg, 0) / total;
    const errorRate = workflows.reduce((sum, w) => sum + w.errorRate, 0) / total;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalWorkflows: total,
        activeWorkflows: active,
        inactiveWorkflows: total - active,
        averageEfficiency: Math.round(avgEfficiency),
        averageExecutionTime: Math.round(avgExecutionTime * 100) / 100,
        averageErrorRate: Math.round(errorRate * 10000) / 100 + '%'
      },
      recommendations: this.generateRecommendations(workflows),
      alerts: this.generateAlerts(workflows)
    };

    return report;
  }

  /**
   * Genera recomendaciones
   */
  generateRecommendations(workflows) {
    const recommendations = [];

    // Recomendar activar flujos inactivos importantes
    const inactiveImportant = workflows.filter(w => !w.active && w.name.toLowerCase().includes('critical'));
    if (inactiveImportant.length > 0) {
      recommendations.push({
        type: 'warning',
        message: `Hay ${inactiveImportant.length} flujos críticos inactivos`,
        workflows: inactiveImportant.map(w => w.name)
      });
    }

    // Recomendar optimizar flujos lentos
    const slowWorkflows = workflows.filter(w => w.executionTimeAvg > 10);
    if (slowWorkflows.length > 0) {
      recommendations.push({
        type: 'optimization',
        message: `Hay ${slowWorkflows.length} flujos que tardan más de 10 segundos`,
        workflows: slowWorkflows.map(w => w.name)
      });
    }

    // Recomendar revisar flujos con alta tasa de errores
    const errorProneWorkflows = workflows.filter(w => w.errorRate > 0.05);
    if (errorProneWorkflows.length > 0) {
      recommendations.push({
        type: 'fix',
        message: `Hay ${errorProneWorkflows.length} flujos con alta tasa de errores (>5%)`,
        workflows: errorProneWorkflows.map(w => w.name)
      });
    }

    return recommendations;
  }

  /**
   * Genera alertas
   */
  generateAlerts(workflows) {
    const alerts = [];

    // Alertas de eficiencia baja
    const lowEfficiency = workflows.filter(w => w.efficiencyScore < 50);
    if (lowEfficiency.length > 0) {
      alerts.push({
        severity: 'high',
        message: `${lowEfficiency.length} flujos tienen baja eficiencia (<50%)`,
        workflows: lowEfficiency.map(w => w.name)
      });
    }

    // Alertas de inactividad
    const inactiveTooLong = workflows.filter(w => {
      const lastExec = new Date(w.lastExecution);
      const daysSince = (Date.now() - lastExec.getTime()) / (1000 * 60 * 60 * 24);
      return !w.active && daysSince > 30;
    });
    if (inactiveTooLong.length > 0) {
      alerts.push({
        severity: 'medium',
        message: `${inactiveTooLong.length} flujos han estado inactivos por más de 30 días`,
        workflows: inactiveTooLong.map(w => w.name)
      });
    }

    return alerts;
  }

  /**
   * Exporta el reporte en formato JSON
   */
  exportReport(report, outputPath = './n8n-health-report.json') {
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`Reporte exportado a: ${outputPath}`);
  }

  /**
   * Ejecuta el monitoreo completo
   */
  run() {
    console.log('🔍 Iniciando análisis de flujos de trabajo N8N...');
    
    const workflows = this.scanWorkflows();
    const report = this.generateHealthReport(workflows);
    
    console.log('\n📊 Reporte de Salud N8N');
    console.log('=====================');
    console.log(`Total de flujos: ${report.summary.totalWorkflows}`);
    console.log(`Flujos activos: ${report.summary.activeWorkflows}`);
    console.log(`Eficiencia promedio: ${report.summary.averageEfficiency}%`);
    console.log(`Tiempo de ejecución promedio: ${report.summary.averageExecutionTime}s`);
    console.log(`Tasa de error promedio: ${report.summary.averageErrorRate}`);

    if (report.recommendations.length > 0) {
      console.log('\n💡 Recomendaciones:');
      report.recommendations.forEach(rec => {
        console.log(`  - ${rec.type.toUpperCase()}: ${rec.message}`);
      });
    }

    if (report.alerts.length > 0) {
      console.log('\n🚨 Alertas:');
      report.alerts.forEach(alert => {
        console.log(`  - ${alert.severity.toUpperCase()}: ${alert.message}`);
      });
    }

    this.exportReport(report);
    return report;
  }
}

// Si se ejecuta directamente
if (require.main === module) {
  const monitor = new N8NMonitor();
  monitor.run();
}

module.exports = N8NMonitor;