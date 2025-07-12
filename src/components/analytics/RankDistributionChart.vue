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
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(255,215,0,0.3)',
        textStyle: { color: '#fff' }
      },
      legend: {
        bottom: 10,
        textStyle: { color: 'var(--text-primary)' },
        icon: 'circle',
        itemWidth: 12,
        itemHeight: 12
      },
      series: [
        {
          name: '段位分布',
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          data: [
            { value: 120, name: 'Silver', itemStyle: { color: '#C0C0C0' } },
            { value: 310, name: 'Gold', itemStyle: { color: '#FFD700' } },
            { value: 150, name: 'Diamond', itemStyle: { color: '#B9F2FF' } },
            { value: 50, name: 'Global Elite', itemStyle: { color: '#FF6B6B' } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 215, 0, 0.5)'
            }
          },
          labelLine: {
            lineStyle: {
              color: 'var(--border-color)'
            }
          },
          label: {
            color: 'var(--text-primary)',
            formatter: '{b}\n{d}%'
          }
        }
      ]
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