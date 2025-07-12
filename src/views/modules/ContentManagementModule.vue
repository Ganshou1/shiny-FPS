<template>
  <div class="content-management-module">
    <h2>游戏内容管理模块</h2>
        
    <div class="section">
      <h3>2.1 武器平衡系统</h3>
      <h4>2.1.1 枪械动态调整参数</h4>
            
      <el-table :data="weaponParams" border style="width: 100%">
        <el-table-column prop="type" label="武器类型" width="180"></el-table-column>
        <el-table-column prop="winRate" label="基准胜率" width="180"></el-table-column>
        <el-table-column prop="threshold" label="调整阈值" width="180"></el-table-column>
        <el-table-column prop="maxFluctuation" label="最大波动"></el-table-column>
      </el-table>
    </div>
            
    <div class="section">
      <h3>武器流派图表</h3>
      <div ref="diagramContainer" class="diagram-container"></div>
    </div>

    <div class="section">
      <h3>武器数据分析</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>武器流行度</span>
              </div>
            </template>
            <div ref="popularityChartContainer" class="chart-container"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>武器胜率</span>
              </div>
            </template>
            <div class="chart-container">
              <weapon-stats></weapon-stats>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
      
    <div class="section">
      <h3>武器平衡监控</h3>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="monitor-card">
            <template #header>
              <div class="card-header">
                <span>平衡状态监控</span>
                <el-tag :type="balanceStatus.type">{{ balanceStatus.text }}</el-tag>
              </div>
            </template>
            <div class="balance-monitor">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="balance-item">
                    <h4>使用率最高武器</h4>
                    <div class="balance-value">
                      <span class="weapon-name">AK-47</span>
                      <span class="weapon-value">35%</span>
                      <el-tag size="small" type="warning">接近阈值</el-tag>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="balance-item">
                    <h4>胜率最高武器</h4>
                    <div class="balance-value">
                      <span class="weapon-name">AWP</span>
                      <span class="weapon-value">53%</span>
                      <el-tag size="small" type="danger">超过阈值</el-tag>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="mt-20">
                <el-col :span="12">
                  <div class="balance-item">
                    <h4>使用率最低武器</h4>
                    <div class="balance-value">
                      <span class="weapon-name">MP5</span>
                      <span class="weapon-value">2%</span>
                      <el-tag size="small" type="danger">低于阈值</el-tag>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="balance-item">
                    <h4>胜率最低武器</h4>
                    <div class="balance-value">
                      <span class="weapon-name">USP</span>
                      <span class="weapon-value">42%</span>
                      <el-tag size="small" type="info">正常范围</el-tag>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
      
    <div class="section">
      <h3>武器平衡调整</h3>
      <el-card>
        <el-tabs v-model="activeTab" class="balance-tabs">
          <el-tab-pane label="手动调整" name="manual">
            <el-form :model="balanceForm" label-width="120px">
              <el-form-item label="武器类型">
                <el-select v-model="balanceForm.weaponType" placeholder="选择武器类型">
                  <el-option label="狙击枪" value="sniper"></el-option>
                  <el-option label="步枪" value="rifle"></el-option>
                  <el-option label="手枪" value="pistol"></el-option>
                  <el-option label="霰弹枪" value="shotgun"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="具体武器">
                <el-select v-model="balanceForm.weapon" placeholder="选择武器" :disabled="!balanceForm.weaponType">
                  <el-option v-for="weapon in weaponsByType" :key="weapon.id" :label="weapon.name" :value="weapon.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="调整参数">
                <el-select v-model="balanceForm.param" placeholder="选择调整参数">
                  <el-option label="伤害" value="damage"></el-option>
                  <el-option label="后坐力" value="recoil"></el-option>
                  <el-option label="射速" value="fireRate"></el-option>
                  <el-option label="弹匣容量" value="magazineSize"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="调整值">
                <el-slider v-model="balanceForm.value" :min="-10" :max="10" :step="1" :format-tooltip="formatTooltip"></el-slider>
              </el-form-item>
              <el-form-item label="调整原因">
                <el-input v-model="balanceForm.reason" type="textarea" :rows="2" placeholder="描述调整原因"></el-input>
              </el-form-item>
              <el-form-item label="生效时间">
                <el-radio-group v-model="balanceForm.effectTime">
                  <el-radio label="immediate">立即生效</el-radio>
                  <el-radio label="nextUpdate">下次更新</el-radio>
                  <el-radio label="scheduled">计划时间</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="计划时间" v-if="balanceForm.effectTime === 'scheduled'">
                <el-date-picker v-model="balanceForm.scheduleTime" type="datetime" placeholder="选择日期和时间"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitBalanceAdjustment">应用调整</el-button>
                <el-button @click="resetBalanceForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="自动调整设置" name="auto">
            <el-form :model="autoBalanceForm" label-width="120px">
              <el-form-item label="启用自动平衡">
                <el-switch v-model="autoBalanceForm.enabled"></el-switch>
              </el-form-item>
              <el-form-item label="分析频率" v-if="autoBalanceForm.enabled">
                <el-select v-model="autoBalanceForm.frequency">
                  <el-option label="每天" value="daily"></el-option>
                  <el-option label="每周" value="weekly"></el-option>
                  <el-option label="每月" value="monthly"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="胜率阈值" v-if="autoBalanceForm.enabled">
                <el-input-number v-model="autoBalanceForm.winRateThreshold" :min="1" :max="10" :step="0.5"></el-input-number>
                <span class="form-hint">基准胜率±该值触发调整</span>
              </el-form-item>
              <el-form-item label="使用率阈值" v-if="autoBalanceForm.enabled">
                <el-input-number v-model="autoBalanceForm.usageRateThreshold" :min="5" :max="50" :step="5"></el-input-number>
                <span class="form-hint">单一武器超过该使用率触发调整</span>
              </el-form-item>
              <el-form-item label="调整强度" v-if="autoBalanceForm.enabled">
                <el-slider v-model="autoBalanceForm.adjustmentStrength" :min="1" :max="10" :step="1"></el-slider>
                <span class="form-hint">值越大调整幅度越大</span>
              </el-form-item>
              <el-form-item label="需要审批" v-if="autoBalanceForm.enabled">
                <el-switch v-model="autoBalanceForm.requireApproval"></el-switch>
                <span class="form-hint">是否需要管理员审批后生效</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveAutoBalanceSettings">保存设置</el-button>
                <el-button @click="resetAutoBalanceSettings">重置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="调整历史" name="history">
            <el-table :data="adjustmentHistory" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="weapon" label="武器" width="120"></el-table-column>
              <el-table-column prop="param" label="参数" width="100"></el-table-column>
              <el-table-column prop="value" label="调整值" width="100"></el-table-column>
              <el-table-column prop="type" label="调整类型" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.type === '自动' ? 'info' : 'primary'">{{ scope.row.type }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="reason" label="调整原因"></el-table-column>
              <el-table-column prop="operator" label="操作员" width="120"></el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';
import WeaponStats from '@/components/WeaponStats.vue';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';

const diagramContainer = ref<HTMLElement | null>(null);
const popularityChartContainer = ref<HTMLElement | null>(null);
const activeTab = ref('manual');

// 武器平衡参数
const weaponParams = [
  {
    type: '狙击枪',
    winRate: '50%',
    threshold: '±3%',
    maxFluctuation: '伤害±5%'
  },
  {
    type: '步枪',
    winRate: '52%',
    threshold: '±2%',
    maxFluctuation: '后坐力±10%'
  },
  {
    type: '手枪',
    winRate: '45%',
    threshold: '±4%',
    maxFluctuation: '射速±8%'
  },
  {
    type: '霰弹枪',
    winRate: '48%',
    threshold: '±3%',
    maxFluctuation: '扩散±12%'
  }
];

// 武器库
const weapons = ref([
  { id: 'ak47', name: 'AK-47', type: 'rifle', winRate: 52, usageRate: 35 },
  { id: 'm4a4', name: 'M4A4', type: 'rifle', winRate: 50, usageRate: 25 },
  { id: 'awp', name: 'AWP', type: 'sniper', winRate: 53, usageRate: 15 },
  { id: 'deagle', name: 'Desert Eagle', type: 'pistol', winRate: 48, usageRate: 10 },
  { id: 'mp5', name: 'MP5', type: 'smg', winRate: 44, usageRate: 2 },
  { id: 'usp', name: 'USP', type: 'pistol', winRate: 42, usageRate: 8 },
  { id: 'nova', name: 'Nova', type: 'shotgun', winRate: 46, usageRate: 5 }
]);

// 根据选择的武器类型筛选武器
const weaponsByType = computed(() => {
  if (!balanceForm.value.weaponType) return [];
  return weapons.value.filter(w => w.type === balanceForm.value.weaponType);
});

// 平衡状态
const balanceStatus = ref({
  text: '需要平衡调整',
  type: 'warning'
});

// 手动调整表单
const balanceForm = ref({
  weaponType: '',
  weapon: '',
  param: '',
  value: 0,
  reason: '',
  effectTime: 'nextUpdate',
  scheduleTime: null
});

// 自动调整设置
const autoBalanceForm = ref({
  enabled: false,
  frequency: 'weekly',
  winRateThreshold: 3,
  usageRateThreshold: 30,
  adjustmentStrength: 5,
  requireApproval: true
});

// 调整历史
const adjustmentHistory = ref([
  { date: '2023-12-01 15:30', weapon: 'AWP', param: '伤害', value: '-3%', type: '手动', reason: '胜率过高', operator: 'Admin' },
  { date: '2023-12-01 10:45', weapon: 'AK-47', param: '后坐力', value: '+5%', type: '手动', reason: '使用率过高', operator: 'Admin' },
  { date: '2023-11-30 14:20', weapon: 'Desert Eagle', param: '精准度', value: '-2%', type: '自动', reason: '数据异常', operator: 'System' },
  { date: '2023-11-28 09:10', weapon: 'MP5', param: '伤害', value: '+4%', type: '自动', reason: '使用率过低', operator: 'System' }
]);

const formatTooltip = (value: number) => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value}%`;
};

const submitBalanceAdjustment = () => {
  if (!balanceForm.value.weaponType || !balanceForm.value.weapon || !balanceForm.value.param) {
    ElMessage.warning('请完善调整信息');
    return;
  }
  
  console.log('提交武器平衡调整:', balanceForm.value);
  
  // 添加到历史记录
  const weaponName = weapons.value.find(w => w.id === balanceForm.value.weapon)?.name || '';
  const paramMap: {[key: string]: string} = {
    damage: '伤害',
    recoil: '后坐力',
    fireRate: '射速',
    magazineSize: '弹匣容量'
  };
  
  adjustmentHistory.value.unshift({
    date: new Date().toLocaleString(),
    weapon: weaponName,
    param: paramMap[balanceForm.value.param] || balanceForm.value.param,
    value: `${balanceForm.value.value > 0 ? '+' : ''}${balanceForm.value.value}%`,
    type: '手动',
    reason: balanceForm.value.reason || '手动调整',
    operator: 'Admin'
  });
  
  ElMessage.success('武器平衡调整已提交');
  resetBalanceForm();
};

const resetBalanceForm = () => {
  balanceForm.value = {
    weaponType: '',
    weapon: '',
    param: '',
    value: 0,
    reason: '',
    effectTime: 'nextUpdate',
    scheduleTime: null
  };
};

const saveAutoBalanceSettings = () => {
  console.log('保存自动平衡设置:', autoBalanceForm.value);
  ElMessage.success('自动平衡设置已保存');
};

const resetAutoBalanceSettings = () => {
  autoBalanceForm.value = {
    enabled: false,
    frequency: 'weekly',
    winRateThreshold: 3,
    usageRateThreshold: 30,
    adjustmentStrength: 5,
    requireApproval: true
  };
};

onMounted(() => {
  // 初始化武器流派图表
  if (diagramContainer.value) {
    const mermaidCode = `
      graph TD
        A[武器系统] --> B[近战武器]
        A --> C[远程武器]
        B --> D[匕首]
        B --> E[近战近卫]
        C --> F[轻型武器]
        C --> G[重型武器]
        F --> H[手枪]
        F --> I[冲锋枪]
        G --> J[步枪]
        G --> K[狙击枪]
        G --> L[霰弹枪]
        H --> M[单发手枪]
        H --> N[连发手枪]
        J --> O[全自动步枪]
        J --> P[半自动步枪]
    `;
    createDiagram(diagramContainer.value, mermaidCode);
  }

  // 初始化武器流行度图表
  if (popularityChartContainer.value) {
    const chart = echarts.init(popularityChartContainer.value);
    
    const option = {
      title: {
        text: '武器使用率统计',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '使用率',
          type: 'pie',
          radius: '50%',
          data: weapons.value.map(w => ({ value: w.usageRate, name: w.name })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    
    chart.setOption(option);
  }
});
</script>

<style scoped>
.content-management-module {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 300px;
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}

.chart-card, .monitor-card {
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

.balance-monitor {
  padding: 10px;
}

.balance-item {
  padding: 15px;
  background-color: var(--el-fill-color-light);
  border-radius: 4px;
}

.balance-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.balance-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.weapon-name {
  font-weight: bold;
}

.weapon-value {
  font-size: 18px;
  font-weight: bold;
  color: var(--el-color-primary);
}

.form-hint {
  margin-left: 10px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
}

.balance-tabs {
  margin-top: 10px;
}
</style> 