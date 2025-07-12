<template>
  <div class="chart-container">
    <div class="chart-wrapper" ref="chartRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    
    const option = {
      tooltip: { 
        trigger: 'item',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(255,215,0,0.3)',
        textStyle: { color: '#fff' }
      },
      legend: { 
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: 'var(--text-primary)' },
        icon: 'circle'
      },
      series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderWidth: 2, borderColor: 'var(--darker-bg)' },
        label: { show: false },
        emphasis: { 
          scale: false,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(255, 215, 0, 0.5)'
          }
        },
        data: [
          { value: 35, name: 'AK-47', itemStyle: { color: '#EE6666' } },
          { value: 28, name: 'M4A4', itemStyle: { color: '#5470C6' } },
          { value: 22, name: 'AWP', itemStyle: { color: '#91CC75' } },
          { value: 15, name: '其他', itemStyle: { color: '#FAC858' } }
        ]
      }]
    };
    
    chartInstance.setOption(option);
    
    window.addEventListener('resize', handleResize);
  }
};

const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
});
</script>

<style scoped>
.chart-container {
  height: 400px;
  border-radius: 8px;
  padding: 16px;
  background-color: var(--darker-bg);
  border: 1px solid var(--gold-border);
  box-shadow: 0 1px 4px var(--shadow-color);
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}

@media (max-width: 1200px) {
  .chart-container {
    height: 350px;
  }
}
</style> 