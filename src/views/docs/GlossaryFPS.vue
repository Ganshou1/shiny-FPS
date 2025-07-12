<template>
  <div class="glossary-fps">
    <h2>术语表（FPS专项）</h2>
    
    <div class="section">
      <h3>1.1 核心概念定义</h3>
      <div class="dark-content-box">
        <el-card>
          <el-table :data="coreTerms" border style="width: 100%">
            <el-table-column prop="term" label="术语" width="150"></el-table-column>
            <el-table-column prop="english" label="英文对照" width="150"></el-table-column>
            <el-table-column prop="definition" label="定义说明"></el-table-column>
            <el-table-column prop="unit" label="计量单位" width="120"></el-table-column>
          </el-table>
        </el-card>
      </div>
      
      <div class="concept-diagram-container">
        <div ref="conceptDiagram" class="diagram-container"></div>
      </div>
    </div>
    
    <div class="section">
      <h3>1.2 竞技相关术语</h3>
      <div class="dark-content-box">
        <el-card>
          <el-table :data="competitiveTerms" border style="width: 100%">
            <el-table-column prop="abbreviation" label="缩写" width="120"></el-table-column>
            <el-table-column prop="fullName" label="全称" width="180"></el-table-column>
            <el-table-column prop="usage" label="应用场景"></el-table-column>
            <el-table-column prop="exampleValue" label="示例值" width="150"></el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>1.3 技术实现术语</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="tech-terms">
            <div v-for="(group, index) in techTermGroups" :key="index" class="term-group">
              <h4>{{ group.category }}</h4>
              <el-divider></el-divider>
              <div class="term-list">
                <div v-for="(term, termIndex) in group.terms" :key="termIndex" class="term-item">
                  <div class="term-header">
                    <span class="term-title">{{ term.name }}</span>
                    <span class="term-badge">{{ term.type }}</span>
                  </div>
                  <div class="term-content">
                    <p>{{ term.description }}</p>
                    <p v-if="term.example" class="term-example">
                      <strong>示例：</strong> <code>{{ term.example }}</code>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>1.4 常见缩写对照表</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="abbreviations">
            <el-row :gutter="20">
              <el-col :span="12" v-for="(group, index) in abbreviationGroups" :key="index">
                <h4>{{ group.category }}</h4>
                <el-table :data="group.items" border size="small" style="width: 100%; margin-bottom: 20px;">
                  <el-table-column prop="abbr" label="缩写" width="100"></el-table-column>
                  <el-table-column prop="full" label="全称"></el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const conceptDiagram = ref<HTMLElement | null>(null);

// 核心概念定义数据
const coreTerms = [
  {
    term: 'Tick率',
    english: 'Tick Rate',
    definition: '服务器每秒更新游戏状态的次数，影响游戏延迟和精确度',
    unit: 'Hz'
  },
  {
    term: '命中框',
    english: 'Hitbox',
    definition: '玩家角色模型中用于判定伤害的不可见3D区域',
    unit: '3D坐标'
  },
  {
    term: '压枪',
    english: 'Recoil Control',
    definition: '玩家通过鼠标下拉动作来抵消武器射击时上扬后坐力的技术',
    unit: '像素/秒'
  },
  {
    term: '经济局',
    english: 'Eco Round',
    definition: '团队故意减少当前回合购买以保留资金用于下一回合的战术决策',
    unit: '回合数'
  },
  {
    term: '帧率',
    english: 'FPS (Frames Per Second)',
    definition: '游戏每秒渲染的画面帧数，直接影响游戏流畅度',
    unit: 'fps'
  },
  {
    term: '延迟',
    english: 'Ping/Latency',
    definition: '数据从客户端到服务器再返回的往返时间',
    unit: 'ms'
  },
  {
    term: '子弹轨迹',
    english: 'Bullet Trajectory',
    definition: '子弹从射出到命中目标的运动路径计算',
    unit: '矢量坐标'
  },
  {
    term: '子弹扩散',
    english: 'Bullet Spread',
    definition: '连续射击时子弹偏离准星的随机范围',
    unit: '角度/MOA'
  }
];

// 竞技相关术语数据
const competitiveTerms = [
  {
    abbreviation: 'KDA',
    fullName: 'Kill/Death/Assist',
    usage: '玩家数据统计',
    exampleValue: '1.5-3.0'
  },
  {
    abbreviation: 'RWS',
    fullName: 'Round Win Share',
    usage: '团队贡献评估',
    exampleValue: '0-100'
  },
  {
    abbreviation: 'ADR',
    fullName: 'Average Damage/Round',
    usage: '输出能力指标',
    exampleValue: '80-120'
  },
  {
    abbreviation: 'HS%',
    fullName: 'Headshot Percentage',
    usage: '精准度评估',
    exampleValue: '30%-60%'
  },
  {
    abbreviation: 'KAST',
    fullName: 'Kill/Assist/Survive/Trade',
    usage: '综合表现评估',
    exampleValue: '70%-85%'
  },
  {
    abbreviation: 'TTK',
    fullName: 'Time To Kill',
    usage: '武器效能评估',
    exampleValue: '200-800ms'
  },
  {
    abbreviation: 'DPR',
    fullName: 'Damage Per Round',
    usage: '伤害效率评估',
    exampleValue: '90-150'
  }
];

// 技术实现术语
const techTermGroups = [
  {
    category: '渲染技术',
    terms: [
      {
        name: '动态光照',
        type: '渲染',
        description: '实时计算光源对场景中物体的影响，包括直接光照、间接光照和阴影计算',
        example: 'PBR + GI + Ray-tracing'
      },
      {
        name: '遮挡剔除',
        type: '优化',
        description: '识别并跳过渲染被其他物体完全遮挡的对象，减少渲染负载',
        example: 'Occlusion Culling'
      },
      {
        name: 'LOD系统',
        type: '优化',
        description: '根据物体到摄像机的距离动态调整模型细节等级',
        example: 'Level of Detail: LOD0-LOD4'
      }
    ]
  },
  {
    category: '物理计算',
    terms: [
      {
        name: '命中检测',
        type: '核心',
        description: '计算射击轨迹与目标碰撞的算法，考虑弹道下坠、穿透和反弹',
        example: 'Raycasting + Bullet Drop'
      },
      {
        name: '网络预测',
        type: '网络',
        description: '客户端预测其他玩家移动以减少延迟感知的技术',
        example: 'Client-side Prediction'
      },
      {
        name: '延迟补偿',
        type: '网络',
        description: '服务器回溯玩家位置以公平处理高延迟玩家的射击判定',
        example: 'Lag Compensation: 100-200ms'
      }
    ]
  }
];

// 常见缩写对照表
const abbreviationGroups = [
  {
    category: '游戏机制',
    items: [
      { abbr: 'ADS', full: 'Aim Down Sight (瞄准)' },
      { abbr: 'DPS', full: 'Damage Per Second (每秒伤害)' },
      { abbr: 'DoT', full: 'Damage over Time (持续伤害)' },
      { abbr: 'AoE', full: 'Area of Effect (范围效果)' },
      { abbr: 'CC', full: 'Crowd Control (群体控制)' }
    ]
  },
  {
    category: '技术指标',
    items: [
      { abbr: 'FPS', full: 'Frames Per Second (每秒帧数)' },
      { abbr: 'FOV', full: 'Field of View (视场角)' },
      { abbr: 'LOD', full: 'Level of Detail (细节等级)' },
      { abbr: 'MSAA', full: 'Multi-Sample Anti-Aliasing (多重采样抗锯齿)' },
      { abbr: 'RTT', full: 'Round Trip Time (往返时间)' }
    ]
  }
];

onMounted(() => {
  if (conceptDiagram.value) {
    const mermaidCode = `
      flowchart LR
        A["游戏术语"] --> B["技术实现"]
        B --> C["设计文档"]
        C --> D["玩家手册"]
        
        A --> E["游戏内容"]
        E --> F["武器系统"]
        E --> G["地图设计"]
        E --> H["角色平衡"]
        
        B --> I["渲染技术"]
        B --> J["物理系统"]
        B --> K["网络架构"]
        
        C --> L["接口文档"]
        C --> M["系统规格"]
        
        D --> N["操作指南"]
        D --> O["数值参考"]
    `;
    createDiagram(conceptDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.glossary-fps {
  padding: 20px;
  background-color: #000000;
  color: var(--text-primary);
  min-height: 100%;
}

.section {
  margin-bottom: 30px;
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  margin-top: 15px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 300px;
  padding: 20px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.concept-diagram-container {
  margin-top: 30px;
}

.term-group {
  margin-bottom: 30px;
}

.term-group h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.term-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.term-item {
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 4px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.3);
}

.term-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.term-title {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.05rem;
}

.term-badge {
  background-color: var(--primary-color);
  color: #000;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.term-content p {
  margin: 5px 0;
  line-height: 1.5;
  color: var(--text-secondary);
}

.term-example {
  margin-top: 10px;
}

.term-example code {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: monospace;
  border: 1px solid rgba(255, 215, 0, 0.2);
}

:deep(.el-card) {
  background-color: #000000;
}

:deep(.el-table) {
  background-color: transparent;
  color: var(--text-primary);
}

:deep(.el-table tr) {
  background-color: transparent;
}

:deep(.el-table th) {
  background-color: rgba(255, 215, 0, 0.1);
  color: var(--primary-color);
  border-bottom: 1px solid var(--gold-border);
}

:deep(.el-table td) {
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

:deep(.el-table--border) {
  border: 1px solid rgba(255, 215, 0, 0.2);
}

:deep(.el-table--border th), :deep(.el-table--border td) {
  border-right: 1px solid rgba(255, 215, 0, 0.1);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td) {
  background-color: rgba(255, 215, 0, 0.05);
}

:deep(.el-divider) {
  background-color: rgba(255, 215, 0, 0.2);
}

h2, h3, h4 {
  color: var(--primary-color);
}
</style> 