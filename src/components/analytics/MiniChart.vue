<template>
  <div class="mini-chart" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Array as () => number[],
    required: true
  },
  color: {
    type: String,
    default: '#5470C6'
  },
  areaColor: {
    type: String,
    default: 'rgba(84, 112, 198, 0.2)'
  }
});

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
    
    window.addEventListener('resize', handleResize);
  }
};

const updateChart = () => {
  if (!chartInstance) return;
  
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      show: false,
      data: Array.from({ length: props.data.length }, (_, i) => i)
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: props.data,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: props.color,
          width: 2
        },
        areaStyle: {
          color: props.areaColor
        },
        emphasis: {
          focus: 'series'
        }
      }
    ]
  };
  
  chartInstance.setOption(option);
};

const handleResize = () => {
  chartInstance?.resize();
};

watch(() => props.data, updateChart, { deep: true });

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
});
</script>

<style scoped>
.mini-chart {
  width: 100%;
  height: 70px;
}
</style> 