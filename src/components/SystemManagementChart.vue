<template>
  <div class="system-management-chart">
    <el-card class="chart-card">
      <template #header>
        <div class="card-header">
          <h3>系统管理统计</h3>
          <el-tag type="primary">管理数据分析</el-tag>
        </div>
      </template>
      
      <div class="chart-container" ref="chartRef"></div>
      
      <div class="data-summary">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in managementData" :key="index">
            <div class="summary-item" :style="{ borderColor: item.color }">
              <div class="summary-title">{{ item.name }}</div>
              <div class="summary-value">{{ item.value }}</div>
              <div class="summary-trend" :class="item.trend > 0 ? 'up' : 'down'">
                <el-icon v-if="item.trend > 0"><ArrowUp /></el-icon>
                <el-icon v-else><ArrowDown /></el-icon>
                {{ Math.abs(item.trend) }}%
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import * as echarts from 'echarts';
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue';

// 图表DOM引用
const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 管理数据
const managementData = reactive([
  {
    name: '用户管理',
    value: 128,
    trend: 5.2,
    color: '#409EFF'
  },
  {
    name: '角色管理',
    value: 24,
    trend: -2.1,
    color: '#67C23A'
  },
  {
    name: '菜单管理',
    value: 42,
    trend: 8.5,
    color: '#E6A23C'
  }
]);

// 模拟数据 - 近6个月的管理操作数据
const monthlyData = [
  { month: '1月', users: 45, roles: 12, menus: 28 },
  { month: '2月', users: 52, roles: 15, menus: 30 },
  { month: '3月', users: 61, roles: 18, menus: 32 },
  { month: '4月', users: 78, roles: 20, menus: 35 },
  { month: '5月', users: 95, roles: 22, menus: 38 },
  { month: '6月', users: 128, roles: 24, menus: 42 }
];

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize);
  }
};

// 更新图表数据
const updateChart = () => {
  if (!chartInstance) return;
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['用户管理', '角色管理', '菜单管理'],
      bottom: '0%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyData.map(item => item.month)
    },
    yAxis: {
      type: 'value',
      name: '操作次数'
    },
    series: [
      {
        name: '用户管理',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: monthlyData.map(item => item.users),
        itemStyle: {
          color: managementData[0].color
        }
      },
      {
        name: '角色管理',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: monthlyData.map(item => item.roles),
        itemStyle: {
          color: managementData[1].color
        }
      },
      {
        name: '菜单管理',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: monthlyData.map(item => item.menus),
        itemStyle: {
          color: managementData[2].color
        }
      }
    ]
  };
  
  chartInstance.setOption(option);
};

// 处理窗口大小变化
const handleResize = () => {
  chartInstance?.resize();
};

// 组件挂载时初始化图表
onMounted(() => {
  initChart();
});

// 组件卸载时清除事件监听和图表实例
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<style scoped>
.system-management-chart {
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

.chart-container {
  height: 350px;
  width: 100%;
}

.data-summary {
  margin-top: 20px;
}

.summary-item {
  padding: 15px;
  border-left: 4px solid;
  border-radius: 4px;
  background-color: #f5f7fa;
  height: 100%;
}

.summary-title {
  font-size: 14px;
  color: #606266;
}

.summary-value {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.summary-trend {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.summary-trend.up {
  color: #67C23A;
}

.summary-trend.down {
  color: #F56C6C;
}

.summary-trend .el-icon {
  margin-right: 4px;
}
</style> 