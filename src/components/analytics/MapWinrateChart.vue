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
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(255,215,0,0.3)',
        textStyle: { color: '#fff' }
      },
      legend: {
        data: ['胜率', '场次'],
        textStyle: { color: 'var(--text-primary)' },
        icon: 'circle',
        top: 0,
        right: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        top: '15%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Dust II', 'Mirage', 'Inferno', 'Nuke', 'Overpass'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: { 
            color: 'var(--text-secondary)',
            interval: 0,
            rotate: 30
          },
          axisLine: { lineStyle: { color: 'var(--border-color)' } }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '场次',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            color: 'var(--text-secondary)'
          },
          axisLine: { lineStyle: { color: 'var(--border-color)' } },
          splitLine: { lineStyle: { color: 'var(--border-color)', opacity: 0.1 } }
        },
        {
          type: 'value',
          name: '胜率',
          min: 0,
          max: 100,
          interval: 20,
          axisLabel: {
            formatter: '{value}%',
            color: 'var(--text-secondary)'
          },
          axisLine: { lineStyle: { color: 'var(--border-color)' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '场次',
          type: 'bar',
          barWidth: 20,
          itemStyle: { 
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(91, 143, 249, 0.9)' },
              { offset: 1, color: 'rgba(91, 143, 249, 0.4)' }
            ])
          },
          data: [65, 80, 45, 35, 30]
        },
        {
          name: '胜率',
          type: 'line',
          yAxisIndex: 1,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#FFC72C' },
          lineStyle: { width: 3, color: '#FFC72C' },
          emphasis: {
            scale: true,
            focus: 'series'
          },
          data: [63, 58, 72, 45, 67]
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