<template>
  <div class="player-activity-chart-container">
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <h3>玩家活跃度分析</h3>
          <el-select v-model="timeRange" placeholder="选择时间范围" size="small">
            <el-option label="今日" value="today" />
            <el-option label="本周" value="week" />
            <el-option label="本月" value="month" />
          </el-select>
        </div>
      </template>
      <div id="player-activity-chart" style="width: 100%; height: 350px;"></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const timeRange = ref('today');

// 图表数据
const chartData = ref({
  today: {
    hours: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    onlinePlayers: Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000))
  },
  week: {
    days: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    onlinePlayers: Array.from({ length: 7 }, () => Math.floor(Math.random() * 5000 + 2000))
  },
  month: {
    days: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    onlinePlayers: Array.from({ length: 30 }, () => Math.floor(Math.random() * 8000 + 3000))
  }
});

let chart: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (!chart) {
    chart = echarts.init(document.getElementById('player-activity-chart'));
  }
  updateChart();
};

// 更新图表数据
const updateChart = () => {
  if (!chart) return;
  
  let xAxisData: string[] = [];
  let seriesData: number[] = [];
  
  if (timeRange.value === 'today') {
    xAxisData = chartData.value.today.hours;
    seriesData = chartData.value.today.onlinePlayers;
  } else if (timeRange.value === 'week') {
    xAxisData = chartData.value.week.days;
    seriesData = chartData.value.week.onlinePlayers;
  } else {
    xAxisData = chartData.value.month.days;
    seriesData = chartData.value.month.onlinePlayers;
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} 玩家'
    },
    title: {
      text: '玩家在线人数',
      left: 'center',
      textStyle: {
        fontSize: 16
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLabel: {
        interval: timeRange.value === 'month' ? 'auto' : 0
      }
    },
    yAxis: {
      type: 'value',
      name: '在线人数'
    },
    series: [
      {
        name: '在线玩家',
        type: 'line',
        smooth: true,
        data: seriesData,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(64, 158, 255, 0.7)' },
              { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
            ]
          }
        },
        itemStyle: {
          color: '#409EFF'
        },
        lineStyle: {
          width: 3
        }
      }
    ]
  };
  
  chart.setOption(option);
};

// 监听时间范围变化
watch(timeRange, () => {
  updateChart();
});

// 监听窗口大小变化
const handleResize = () => {
  chart?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chart?.dispose();
  chart = null;
});
</script>

<style scoped>
.player-activity-chart-container {
  margin-bottom: 20px;
}

.chart-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
}
</style> 