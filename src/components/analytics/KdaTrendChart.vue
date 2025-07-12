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

// 模拟数据
const xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const kdaData = [1.2, 1.8, 2.3, 2.1, 1.9, 2.4, 2.0];
const playerData = [120, 200, 150, 80, 70, 110, 130];

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    const option = {
      grid: { top: 40, right: 30, bottom: 30, left: 40 },
      tooltip: { 
        trigger: 'axis',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(255,215,0,0.3)',
        textStyle: { color: '#fff' }
      },
      legend: {
        data: ['平均KDA', '活跃玩家'],
        textStyle: { color: 'var(--text-primary)' },
        icon: 'circle',
        right: 10,
        top: 0
      },
      xAxis: { 
        type: 'category',
        data: xAxisData,
        axisLine: { lineStyle: { color: 'var(--border-color)' } },
        axisLabel: { color: 'var(--text-secondary)' }
      },
      yAxis: [
        { 
          type: 'value', 
          name: 'KDA', 
          min: 0, 
          max: 5,
          axisLabel: { color: 'var(--text-secondary)' },
          axisLine: { lineStyle: { color: 'var(--border-color)' } },
          splitLine: { lineStyle: { color: 'var(--border-color)', opacity: 0.2 } }
        },
        { 
          type: 'value', 
          name: '玩家数', 
          axisLabel: { color: 'var(--text-secondary)' },
          axisLine: { lineStyle: { color: 'var(--border-color)' } },
          splitLine: { show: false }
        }
      ],
      series: [
        {
          name: '平均KDA',
          type: 'line',
          smooth: true,
          lineStyle: { width: 3, color: '#5470C6' },
          symbol: 'circle',
          symbolSize: 8,
          data: kdaData,
          emphasis: {
            scale: true,
            focus: 'self'
          },
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        },
        {
          name: '活跃玩家',
          type: 'bar',
          barWidth: 12,
          itemStyle: { 
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(84, 112, 198, 0.8)' },
                { offset: 1, color: 'rgba(84, 112, 198, 0.2)' }
              ]
            }
          },
          yAxisIndex: 1,
          data: playerData,
          animationDuration: 1000,
          animationEasing: 'cubicOut'
        }
      ],
      animation: true
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