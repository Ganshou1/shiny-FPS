<template>
  <div class="operation-management-module">
    <h2>运营管理模块</h2>
        
    <div class="section">
      <h3>3.1 赛事活动配置</h3>
          
      <el-table :data="eventParams" border style="width: 100%">
        <el-table-column prop="type" label="活动类型" width="180"></el-table-column>
        <el-table-column prop="warmup" label="预热期" width="180"></el-table-column>
        <el-table-column prop="active" label="进行期" width="180"></el-table-column>
        <el-table-column prop="cooldown" label="冷却期"></el-table-column>
      </el-table>
    </div>
          
    <div class="section">
      <h3>赛事活动流程图</h3>
      <div ref="diagramContainer" class="diagram-container"></div>
    </div>
        
    <div class="section">
      <h3>活动日历</h3>
      <el-card class="calendar-card">
        <template #header>
          <div class="card-header">
            <span>活动排期</span>
            <div>
              <el-button size="small" type="primary" @click="previousMonth">上个月</el-button>
              <span class="current-month">{{ currentMonth }}</span>
              <el-button size="small" type="primary" @click="nextMonth">下个月</el-button>
            </div>
          </div>
        </template>
        <div class="calendar-container">
          <div class="calendar-header">
            <div class="calendar-cell" v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>
          <div class="calendar-body">
            <div 
              v-for="(day, index) in calendarDays" 
              :key="index" 
              class="calendar-cell"
              :class="{ 'other-month': day.otherMonth, 'has-events': day.events.length > 0 }"
            >
              <div class="day-number">{{ day.day }}</div>
              <div class="day-events">
                <div 
                  v-for="(event, eventIndex) in day.events" 
                  :key="eventIndex"
                  class="event-dot"
                  :style="{ backgroundColor: getEventColor(event.type) }"
                  @click="viewEvent(event)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
        
    <div class="section">
      <h3>赛事活动管理</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="event-card">
            <template #header>
              <div class="card-header">
                <span>当前活动</span>
                <el-tag type="success">进行中</el-tag>
              </div>
            </template>
            <div class="event-info">
              <h4>冬季锦标赛 2023</h4>
              <el-progress :percentage="65" :format="format" />
              <p>开始时间: 2023-12-01</p>
              <p>结束时间: 2023-12-10</p>
              <p>参与人数: 12,458</p>
              <div class="event-stats">
                <div class="stat-item">
                  <span class="stat-label">匹配场次</span>
                  <span class="stat-value">3,245</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">观战人数</span>
                  <span class="stat-value">8,129</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">完成率</span>
                  <span class="stat-value">65%</span>
                </div>
              </div>
              <div class="event-actions">
                <el-button type="primary" size="small">查看详情</el-button>
                <el-button type="danger" size="small">紧急终止</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="event-card">
            <template #header>
              <div class="card-header">
                <span>即将开始</span>
                <el-tag type="warning">预热中</el-tag>
              </div>
            </template>
            <div class="event-info">
              <h4>新年特别赛</h4>
              <p>开始时间: 2024-01-01</p>
              <p>结束时间: 2024-01-05</p>
              <p>预约人数: 8,745</p>
              <div class="event-stats">
                <div class="stat-item">
                  <span class="stat-label">预热进度</span>
                  <span class="stat-value">45%</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">宣传点击</span>
                  <span class="stat-value">24,567</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">分享次数</span>
                  <span class="stat-value">1,342</span>
                </div>
              </div>
              <div class="event-actions">
                <el-button type="primary" size="small">编辑活动</el-button>
                <el-button type="info" size="small">发送预热通知</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <div class="section">
      <h3>创建新活动</h3>
      <el-card>
        <el-form :model="eventForm" label-width="120px" :rules="eventRules" ref="eventFormRef">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="eventForm.name" placeholder="输入活动名称"></el-input>
          </el-form-item>
          <el-form-item label="活动类型" prop="type">
            <el-select v-model="eventForm.type" placeholder="选择活动类型">
              <el-option label="锦标赛" value="tournament"></el-option>
              <el-option label="天梯赛季" value="ladder"></el-option>
              <el-option label="限时活动" value="limited"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" prop="dateRange">
            <el-date-picker
              v-model="eventForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item label="预热期" prop="warmupDays">
            <el-input-number v-model="eventForm.warmupDays" :min="0" :max="30" />
            <span class="form-hint">天</span>
          </el-form-item>
          <el-form-item label="冷却期" prop="cooldownDays">
            <el-input-number v-model="eventForm.cooldownDays" :min="0" :max="14" />
            <span class="form-hint">天</span>
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input v-model="eventForm.description" type="textarea" :rows="3" placeholder="描述活动内容"></el-input>
          </el-form-item>
          <el-form-item label="参与条件">
            <el-checkbox-group v-model="eventForm.requirements">
              <el-checkbox label="level">等级要求</el-checkbox>
              <el-checkbox label="rank">段位要求</el-checkbox>
              <el-checkbox label="honor">荣誉等级</el-checkbox>
              <el-checkbox label="team">组队要求</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="等级要求" v-if="eventForm.requirements.includes('level')">
            <el-input-number v-model="eventForm.minLevel" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="段位要求" v-if="eventForm.requirements.includes('rank')">
            <el-select v-model="eventForm.minRank" placeholder="选择最低段位">
              <el-option label="青铜" value="bronze"></el-option>
              <el-option label="白银" value="silver"></el-option>
              <el-option label="黄金" value="gold"></el-option>
              <el-option label="铂金" value="platinum"></el-option>
              <el-option label="钻石" value="diamond"></el-option>
              <el-option label="大师" value="master"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="奖励设置">
            <el-switch v-model="eventForm.hasRewards" />
          </el-form-item>
          <el-form-item label="奖励内容" v-if="eventForm.hasRewards">
            <el-input v-model="eventForm.rewardDesc" type="textarea" :rows="3" placeholder="描述奖励内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEventForm">创建活动</el-button>
            <el-button @click="resetEventForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    
    <div class="section">
      <h3>活动数据分析</h3>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>活动参与度分析</span>
            <el-select v-model="selectedEvent" placeholder="选择活动" @change="changeSelectedEvent">
              <el-option 
                v-for="event in pastEvents" 
                :key="event.id" 
                :label="event.name" 
                :value="event.id"
              ></el-option>
            </el-select>
          </div>
        </template>
        <div ref="eventAnalyticsContainer" class="analytics-container"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';

const diagramContainer = ref<HTMLElement | null>(null);
const eventAnalyticsContainer = ref<HTMLElement | null>(null);
const eventFormRef = ref<any>(null);

// 赛事活动参数
const eventParams = [
  {
    type: '锦标赛',
    warmup: '7天',
    active: '3天',
    cooldown: '2天'
  },
  {
    type: '天梯赛季',
    warmup: '-',
    active: '8周',
    cooldown: '1周'
  },
  {
    type: '限时活动',
    warmup: '3天',
    active: '5天',
    cooldown: '1天'
  }
];

// 日历数据
const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const currentDate = ref(new Date());
const currentMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth() + 1;
  return `${year}年${month}月`;
});

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  // 获取当前月第一天是周几
  const firstDay = new Date(year, month, 1).getDay();
  
  // 获取当前月有多少天
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // 获取上个月有多少天
  const daysInLastMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  // 添加上个月的天数
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInLastMonth - i,
      otherMonth: true,
      events: []
    });
  }
  
  // 添加当前月的天数
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      otherMonth: false,
      events: getEventsForDay(year, month, i)
    });
  }
  
  // 添加下个月的天数
  const remainingDays = 42 - days.length; // 6行7列的日历
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      otherMonth: true,
      events: []
    });
  }
  
  return days;
});

// 模拟活动数据
const calendarEvents = [
  { id: 1, name: '冬季锦标赛', type: 'tournament', startDate: new Date(2023, 11, 1), endDate: new Date(2023, 11, 10) },
  { id: 2, name: '新年特别赛', type: 'limited', startDate: new Date(2024, 0, 1), endDate: new Date(2024, 0, 5) },
  { id: 3, name: '第一赛季', type: 'ladder', startDate: new Date(2023, 11, 15), endDate: new Date(2024, 1, 15) }
];

// 获取指定日期的活动
const getEventsForDay = (year: number, month: number, day: number) => {
  const date = new Date(year, month, day);
  return calendarEvents.filter(event => {
    return date >= event.startDate && date <= event.endDate;
  });
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'tournament': return '#409EFF'; // 蓝色
    case 'ladder': return '#67C23A';      // 绿色
    case 'limited': return '#E6A23C';     // 橙色
    default: return '#909399';            // 灰色
  }
};

const viewEvent = (event: any) => {
  ElMessage.info(`查看活动：${event.name}`);
};

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

// 新建活动表单
const eventForm = ref({
  name: '',
  type: '',
  dateRange: [],
  warmupDays: 7,
  cooldownDays: 2,
  description: '',
  requirements: [],
  minLevel: 1,
  minRank: 'bronze',
  hasRewards: false,
  rewardDesc: ''
});

// 表单验证规则
const eventRules = {
  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择活动类型', trigger: 'change' }],
  dateRange: [{ type: 'array', required: true, message: '请选择活动时间范围', trigger: 'change' }],
  warmupDays: [{ required: true, message: '请设置预热期', trigger: 'blur' }],
  cooldownDays: [{ required: true, message: '请设置冷却期', trigger: 'blur' }]
};

const format = (percentage: number) => {
  return `${percentage}%`;
};

const submitEventForm = () => {
  eventFormRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('提交活动表单:', eventForm.value);
      // 实际项目中这里会调用API来创建活动
      ElMessage.success('活动创建成功');
      resetEventForm();
    } else {
      ElMessage.error('请完善表单信息');
      return false;
    }
  });
};

const resetEventForm = () => {
  eventFormRef.value?.resetFields();
  eventForm.value = {
    name: '',
    type: '',
    dateRange: [],
    warmupDays: 7,
    cooldownDays: 2,
    description: '',
    requirements: [],
    minLevel: 1,
    minRank: 'bronze',
    hasRewards: false,
    rewardDesc: ''
  };
};

// 活动分析
const selectedEvent = ref('');
const pastEvents = [
  { id: 'event1', name: '秋季锦标赛 2023' },
  { id: 'event2', name: '夏季嘉年华' },
  { id: 'event3', name: '第四赛季' }
];

const changeSelectedEvent = () => {
  renderEventAnalytics();
};

const renderEventAnalytics = () => {
  if (!eventAnalyticsContainer.value) return;
  
  const chart = echarts.init(eventAnalyticsContainer.value);
  
  const option = {
    title: {
      text: '活动参与度数据',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['日参与人数', '观战人数', '匹配场次'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '日参与人数',
        type: 'line',
        data: [3200, 4500, 5800, 7200, 6400, 5900, 8500]
      },
      {
        name: '观战人数',
        type: 'line',
        data: [2800, 3900, 5200, 6500, 5700, 5200, 7800]
      },
      {
        name: '匹配场次',
        type: 'line',
        data: [520, 750, 940, 1220, 980, 850, 1450]
      }
    ]
  };
  
  chart.setOption(option);
};

onMounted(() => {
  if (diagramContainer.value) {
    const mermaidCode = `
      graph TD
        A[创建活动] --> B{活动类型}
        B -->|锦标赛| C[预热期:7天]
        B -->|天梯赛季| D[无预热期]
        C --> E[进行期:3天]
        D --> F[进行期:8周]
        E --> G[冷却期:2天]
        F --> H[冷却期:1周]
        G --> I[活动结算]
        H --> I
        I --> J[发放奖励]
        J --> K[数据归档]
    `;
    createDiagram(diagramContainer.value, mermaidCode);
  }
  
  renderEventAnalytics();
});
</script>

<style scoped>
.operation-management-module {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.diagram-container, .analytics-container {
  margin-top: 20px;
  min-height: 300px;
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-card {
  margin-bottom: 20px;
  height: 100%;
}

.event-info {
  padding: 10px;
}

.event-info h4 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
}

.event-actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.form-hint {
  margin-left: 10px;
  color: #909399;
}

.calendar-container {
  width: 100%;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: var(--el-color-primary-light-9);
  font-weight: bold;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.calendar-cell {
  height: 80px;
  padding: 5px;
  border: 1px solid #ebeef5;
  position: relative;
}

.day-number {
  position: absolute;
  top: 5px;
  left: 5px;
  font-weight: bold;
}

.other-month {
  color: #C0C4CC;
  background-color: #F5F7FA;
}

.has-events {
  background-color: #f0f9eb;
}

.day-events {
  position: absolute;
  bottom: 5px;
  right: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 3px;
}

.event-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.current-month {
  margin: 0 10px;
  font-weight: bold;
}

.event-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 15px 0;
}

.stat-item {
  background-color: var(--el-fill-color-light);
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: var(--el-color-primary);
}
</style> 