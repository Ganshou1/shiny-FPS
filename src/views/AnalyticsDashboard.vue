<template>
  <div class="dashboard-container">
    <h1 class="page-title">数据分析中心</h1>
    
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="6" :lg="5" class="nav-col">
        <AnalyticsNav @chart-selected="handleChartSelected" />
      </el-col>
      
      <el-col :xs="24" :sm="24" :md="18" :lg="19">
        <!-- 核心指标 -->
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12" :lg="6" v-for="(metric, i) in coreMetrics" :key="i">
            <analytics-card :title="metric.title" :icon="metric.icon" :trend="metric.trend">
              <div class="metric-value">{{ metric.value }}</div>
              <mini-chart :data="metric.chartData" />
            </analytics-card>
          </el-col>
        </el-row>

        <!-- 主图表区 -->
        <el-row :gutter="16" class="mt-4">
          <el-col :xs="24" :lg="16">
            <analytics-card title="KDA趋势分析" :icon="DataLine" v-if="selectedChart === 'KDA趋势'">
              <kda-trend-chart />
            </analytics-card>
            <analytics-card title="在线峰值" :icon="User" v-else-if="selectedChart === '在线峰值'">
              <kda-trend-chart />
            </analytics-card>
            <analytics-card title="比赛频率" :icon="Trophy" v-else-if="selectedChart === '比赛频率'">
              <kda-trend-chart />
            </analytics-card>
            <analytics-card :title="selectedChart" :icon="DataAnalysis" v-else>
              <div class="placeholder-chart">
                <el-empty description="图表数据开发中" />
              </div>
            </analytics-card>
          </el-col>
          <el-col :xs="24" :lg="8">
            <analytics-card title="武器热度分布" :icon="Aim" v-if="selectedChart === '武器热度'">
              <weapon-popularity-chart />
            </analytics-card>
            <analytics-card title="段位分布" :icon="Trophy" v-else-if="selectedChart === '段位分布'">
              <rank-distribution-chart />
            </analytics-card>
            <analytics-card :title="selectedChart" :icon="DataAnalysis" v-else>
              <div class="placeholder-chart">
                <el-empty description="图表数据开发中" />
              </div>
            </analytics-card>
          </el-col>
        </el-row>

        <!-- 次级图表 -->
        <el-row :gutter="16" class="mt-4">
          <el-col :xs="24" :lg="12">
            <analytics-card title="地图胜率" :icon="Location" v-if="selectedChart === '地图胜率'">
              <map-winrate-chart />
            </analytics-card>
            <analytics-card title="新老玩家比例" :icon="UserFilled" v-else-if="selectedChart === '新老玩家比例'">
              <rank-distribution-chart />
            </analytics-card>
            <analytics-card :title="selectedChart" :icon="DataAnalysis" v-else>
              <div class="placeholder-chart">
                <el-empty description="图表数据开发中" />
              </div>
            </analytics-card>
          </el-col>
          <el-col :xs="24" :lg="12">
            <analytics-card title="战队排名" :icon="Trophy" v-if="selectedChart === '战队排名'">
              <map-winrate-chart />
            </analytics-card>
            <analytics-card title="经济效率" :icon="Money" v-else-if="selectedChart === '经济效率'">
              <weapon-popularity-chart />
            </analytics-card>
            <analytics-card :title="selectedChart" :icon="DataAnalysis" v-else>
              <div class="placeholder-chart">
                <el-empty description="图表数据开发中" />
              </div>
            </analytics-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { markRaw } from 'vue';
import { DataAnalysis, DataLine, User, Trophy, Location, UserFilled, Aim, Money } from '@element-plus/icons-vue';
import AnalyticsNav from '@/components/analytics/AnalyticsNav.vue';
import AnalyticsCard from '@/components/analytics/AnalyticsCard.vue';
import MiniChart from '@/components/analytics/MiniChart.vue';
import KdaTrendChart from '@/components/analytics/KdaTrendChart.vue';
import WeaponPopularityChart from '@/components/analytics/WeaponPopularityChart.vue';
import RankDistributionChart from '@/components/analytics/RankDistributionChart.vue';
import MapWinrateChart from '@/components/analytics/MapWinrateChart.vue';
import { ChartType, CoreMetric } from '@/types/nav';

// 选中的图表
const selectedChart = ref<ChartType>('KDA趋势');

// 核心指标数据
const coreMetrics = reactive<CoreMetric[]>([
  {
    title: '平均KDA',
    value: '2.35',
    trend: 8.4,
    chartData: [1.5, 1.8, 1.9, 2.2, 2.3, 2.5, 2.35],
    icon: markRaw(Trophy)
  },
  {
    title: '玩家在线',
    value: '4,892',
    trend: 12.6,
    chartData: [3200, 3600, 4100, 4300, 4500, 4700, 4892],
    icon: markRaw(User)
  },
  {
    title: '胜率',
    value: '58.2%',
    trend: -3.1,
    chartData: [62, 61, 60, 59.5, 58.6, 58.2, 58.2],
    icon: markRaw(DataLine)
  },
  {
    title: '日均比赛',
    value: '1,235',
    trend: 5.8,
    chartData: [850, 920, 1050, 1120, 1180, 1205, 1235],
    icon: markRaw(DataAnalysis)
  }
]);

// 处理图表选择
const handleChartSelected = (chart: ChartType) => {
  selectedChart.value = chart;
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: var(--primary-color);
}

.nav-col {
  margin-bottom: 20px;
}

.mt-4 {
  margin-top: 16px;
}

.metric-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-family: 'Orbitron', sans-serif;
}

.placeholder-chart {
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .placeholder-chart {
    height: 320px;
  }
}

@media (min-width: 992px) {
  .nav-col {
    margin-bottom: 0;
  }
}
</style> 