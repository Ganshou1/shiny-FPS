<template>
  <div class="data-analysis-module">
    <h2>数据分析模块</h2>
        
    <div class="section">
          <h3>4.1 核心监控指标</h3>
          
      <el-table :data="monitoringMetrics" border style="width: 100%">
        <el-table-column prop="name" label="指标名称" width="180"></el-table-column>
        <el-table-column prop="frequency" label="采样频率" width="180"></el-table-column>
        <el-table-column prop="threshold" label="预警阈值"></el-table-column>
          </el-table>
    </div>
          
    <div class="section">
      <h3>实时监控面板</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>爆头率监控</span>
                <el-tag type="warning">实时</el-tag>
              </div>
            </template>
            <div ref="headshotChartContainer" class="chart-container"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>经济转化率</span>
                <el-tag type="info">每局</el-tag>
            </div>
            </template>
            <div ref="economyChartContainer" class="chart-container"></div>
          </el-card>
        </el-col>
      </el-row>
      
      <el-row :gutter="20" class="mt-20">
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>位移同步差</span>
                <el-tag type="danger">高频</el-tag>
              </div>
            </template>
            <div ref="syncChartContainer" class="chart-container"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>玩家分布</span>
                <el-tag type="success">每日</el-tag>
              </div>
            </template>
            <div class="chart-container">
              <rank-distribution-chart></rank-distribution-chart>
            </div>
          </el-card>
        </el-col>
      </el-row>
          </div>
          
    <div class="section">
      <h3>异常检测系统</h3>
      <el-card>
        <el-table :data="anomalyData" border style="width: 100%">
          <el-table-column prop="time" label="时间" width="180"></el-table-column>
          <el-table-column prop="player" label="玩家ID" width="180"></el-table-column>
          <el-table-column prop="metric" label="异常指标" width="180"></el-table-column>
          <el-table-column prop="value" label="异常值" width="120"></el-table-column>
          <el-table-column prop="threshold" label="阈值" width="120"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已处理' ? 'success' : 'danger'">{{ scope.row.status }}</el-tag>
                      </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-button 
                size="small" 
                type="primary" 
                @click="handleAnomaly(scope.row)"
                :disabled="scope.row.status === '已处理'"
              >处理</el-button>
                      </template>
          </el-table-column>
        </el-table>
      </el-card>
      </div>
      
    <div class="section">
      <h3>数据分析工具</h3>
      <el-card>
        <el-form :model="analysisForm" label-width="120px">
          <el-form-item label="分析类型">
            <el-select v-model="analysisForm.type" placeholder="选择分析类型">
              <el-option label="玩家行为分析" value="player_behavior"></el-option>
              <el-option label="武器平衡分析" value="weapon_balance"></el-option>
              <el-option label="地图热点分析" value="map_hotspot"></el-option>
              <el-option label="作弊检测分析" value="cheat_detection"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="analysisForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="数据粒度">
            <el-radio-group v-model="analysisForm.granularity">
              <el-radio label="hour">小时</el-radio>
              <el-radio label="day">天</el-radio>
              <el-radio label="week">周</el-radio>
              <el-radio label="month">月</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="过滤条件">
            <el-input v-model="analysisForm.filter" placeholder="输入过滤条件，如：rank='钻石'"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="runAnalysis">运行分析</el-button>
            <el-button @click="resetAnalysisForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import RankDistributionChart from '@/components/analytics/RankDistributionChart.vue';

const headshotChartContainer = ref<HTMLElement | null>(null);
const economyChartContainer = ref<HTMLElement | null>(null);
const syncChartContainer = ref<HTMLElement | null>(null);

const monitoringMetrics = [
  {
    name: '爆头率',
    frequency: '实时',
    threshold: '职业级>40%'
  },
  {
    name: '经济转化率',
    frequency: '每局',
    threshold: '异常值<0.8'
  },
  {
    name: '位移同步差',
    frequency: '每秒20次',
    threshold: '>15%判可疑'
  },
  {
    name: '武器使用分布',
    frequency: '每日',
    threshold: '单一武器>35%'
  },
  {
    name: '地图区域热度',
    frequency: '每小时',
    threshold: '异常聚集>标准差3倍'
  }
];

const anomalyData = [
  {
    time: '2023-12-01 14:32:15',
    player: 'Player8472',
    metric: '爆头率',
    value: '68%',
    threshold: '40%',
    status: '未处理'
  },
  {
    time: '2023-12-01 15:10:22',
    player: 'GamerX123',
    metric: '位移同步差',
    value: '22%',
    threshold: '15%',
    status: '未处理'
  },
  {
    time: '2023-12-01 12:45:30',
    player: 'ProSniper',
    metric: '爆头率',
    value: '52%',
    threshold: '40%',
    status: '已处理'
  },
  {
    time: '2023-12-01 11:20:18',
    player: 'SpeedDemon',
    metric: '位移同步差',
    value: '18%',
    threshold: '15%',
    status: '已处理'
  }
];

const analysisForm = ref({
  type: '',
  dateRange: [],
  granularity: 'day',
  filter: ''
});

const handleAnomaly = (row: any) => {
  console.log('处理异常:', row);
  // 实际项目中这里会调用API来处理异常
  row.status = '已处理';
};

const runAnalysis = () => {
  console.log('运行分析:', analysisForm.value);
  // 实际项目中这里会调用API来执行分析
};

const resetAnalysisForm = () => {
  analysisForm.value = {
    type: '',
    dateRange: [],
    granularity: 'day',
    filter: ''
  };
};

onMounted(() => {
  // 初始化爆头率图表
  if (headshotChartContainer.value) {
    const chart = echarts.init(headshotChartContainer.value);
    
    const option = {
      title: {
        text: '玩家爆头率分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['青铜', '白银', '黄金', '铂金', '钻石', '大师', '职业']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: '平均爆头率',
          type: 'line',
          data: [12, 18, 22, 27, 32, 36, 42],
          markLine: {
            data: [
              {
                name: '可疑阈值',
                yAxis: 40,
                lineStyle: {
                  color: '#ff4949'
                },
                label: {
                  formatter: '可疑阈值: 40%',
                  position: 'insideEndTop'
                }
              }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  // 初始化经济转化率图表
  if (economyChartContainer.value) {
    const chart = echarts.init(economyChartContainer.value);
    
    const option = {
      title: {
        text: '经济转化率趋势',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['第1轮', '第2轮', '第3轮', '第4轮', '第5轮', '第6轮', '第7轮', '第8轮']
      },
      yAxis: {
        type: 'value',
        min: 0.5,
        max: 1.2
      },
      series: [
        {
          name: '经济转化率',
          type: 'line',
          data: [0.95, 0.92, 0.88, 0.93, 0.97, 0.85, 0.79, 0.82],
          markLine: {
            data: [
              {
                name: '异常阈值',
                yAxis: 0.8,
                lineStyle: {
                  color: '#ff4949'
                },
                label: {
                  formatter: '异常阈值: 0.8',
                  position: 'insideEndTop'
                }
              }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
  
  // 初始化位移同步差图表
  if (syncChartContainer.value) {
    const chart = echarts.init(syncChartContainer.value);
    
    const option = {
      title: {
        text: '位移同步差监控',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          name: '同步差百分比',
          type: 'line',
          data: [5, 7, 9, 8, 6, 12, 18, 22, 16, 10, 8, 7],
          markLine: {
            data: [
              {
                name: '可疑阈值',
                yAxis: 15,
                lineStyle: {
                  color: '#ff4949'
                },
                label: {
                  formatter: '可疑阈值: 15%',
                  position: 'insideEndTop'
                }
              }
            ]
          },
          markPoint: {
            data: [
              { type: 'max', name: '最大值' }
            ]
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
});
</script>

<style scoped>
.data-analysis-module {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 300px;
}

.mt-20 {
  margin-top: 20px;
}
</style> 