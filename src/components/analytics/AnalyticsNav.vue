<template>
  <div class="analytics-nav">
    <div class="analytics-title">
      <el-icon><DataAnalysis /></el-icon>
      <span>数据分析中心</span>
    </div>
    
    <div class="nav-items">
      <div 
        v-for="(item, index) in analyticsNavItems" 
        :key="index" 
        class="nav-item"
        :class="{ 'active': activeNav === index }"
        @click="setActiveNav(index)"
      >
        <div class="nav-item-header">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
          <el-icon class="expand-icon" :class="{ 'is-rotate': activeNav === index }">
            <ArrowDown />
          </el-icon>
        </div>
        
        <div class="nav-item-content" v-show="activeNav === index">
          <div 
            v-for="(chart, chartIndex) in item.charts" 
            :key="chartIndex"
            class="chart-option"
            :class="{ 'selected': selectedChart === chart }"
            @click.stop="selectChart(chart)"
          >
            <div class="chart-dot"></div>
            <span>{{ chart }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { markRaw } from 'vue';
import { DataAnalysis, User, Trophy } from '@element-plus/icons-vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { AnalyticsNavItem, ChartType } from '@/types/nav';

const emit = defineEmits(['chart-selected']);

// 默认激活的导航索引
const activeNav = ref(0);
const selectedChart = ref<ChartType>('KDA趋势');

// 导航数据
const analyticsNavItems: AnalyticsNavItem[] = [
  {
    title: '作战数据',
    icon: markRaw(DataAnalysis),
    charts: ['KDA趋势', '武器热度', '地图胜率']
  },
  {
    title: '玩家活跃',
    icon: markRaw(User),
    charts: ['在线峰值', '段位分布', '新老玩家比例']
  },
  {
    title: '赛事统计',
    icon: markRaw(Trophy),
    charts: ['比赛频率', '战队排名', '经济效率']
  }
];

// 设置激活的导航
const setActiveNav = (index: number) => {
  activeNav.value = index;
  // 自动选中该分类下的第一个图表
  if (analyticsNavItems[index] && analyticsNavItems[index].charts.length > 0) {
    selectChart(analyticsNavItems[index].charts[0]);
  }
};

// 选择图表
const selectChart = (chart: ChartType) => {
  selectedChart.value = chart;
  emit('chart-selected', chart);
};
</script>

<style scoped>
.analytics-nav {
  background-color: var(--darker-bg);
  border-radius: 8px;
  border: 1px solid var(--gold-border);
  overflow: hidden;
  height: 100%;
}

.analytics-title {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-color);
  background: linear-gradient(90deg, var(--darkest-bg), var(--darker-bg));
  border-bottom: 1px solid var(--gold-border);
}

.nav-items {
  padding: 10px 0;
}

.nav-item {
  cursor: pointer;
}

.nav-item-header {
  padding: 12px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  transition: all 0.3s;
  position: relative;
}

.nav-item-header:hover {
  background-color: rgba(255, 215, 0, 0.05);
  color: var(--text-primary);
}

.nav-item.active .nav-item-header {
  color: var(--primary-color);
  background-color: rgba(255, 215, 0, 0.1);
}

.expand-icon {
  margin-left: auto;
  transition: transform 0.3s;
}

.expand-icon.is-rotate {
  transform: rotate(180deg);
}

.nav-item-content {
  padding: 5px 0;
}

.chart-option {
  padding: 8px 15px 8px 35px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 14px;
  transition: all 0.3s;
  position: relative;
}

.chart-option:hover {
  background-color: rgba(255, 215, 0, 0.05);
  color: var(--text-primary);
}

.chart-option.selected {
  color: var(--primary-color);
  background-color: rgba(255, 215, 0, 0.05);
}

.chart-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--border-color);
}

.chart-option.selected .chart-dot {
  background-color: var(--primary-color);
}
</style> 