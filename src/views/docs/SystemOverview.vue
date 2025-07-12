<template>
  <div class="system-overview">
    <h2>系统概述</h2>
    
    <div class="section">
      <h3>1. 系统定位</h3>
      <div class="dark-content-box">
        <el-card>
          <p>本系统是为专业级第一人称射击游戏设计的全生命周期管理平台，主要服务于：</p>
          
          <div class="service-areas">
            <div class="service-area">
              <div class="service-icon">
                <el-icon><Tools /></el-icon>
              </div>
              <div class="service-content">
                <h4>研发阶段</h4>
                <p>支持200+武器参数和地图元素的动态调整</p>
              </div>
            </div>
            
            <div class="service-area">
              <div class="service-icon">
                <el-icon><Operation /></el-icon>
              </div>
              <div class="service-content">
                <h4>运营阶段</h4>
                <p>承载日均50万活跃玩家的高强度竞技对战</p>
              </div>
            </div>
            
            <div class="service-area">
              <div class="service-icon">
                <el-icon><Trophy /></el-icon>
              </div>
              <div class="service-content">
                <h4>电竞赛事</h4>
                <p>提供亚毫秒级判定的专业竞技环境</p>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>2. 核心特性</h3>
      
      <div class="subsection">
        <h4>2.1 竞技级技术架构</h4>
        <div class="dark-content-box">
          <el-card>
            <el-table :data="technicalFeatures" border style="width: 100%">
              <el-table-column prop="dimension" label="维度" width="180"></el-table-column>
              <el-table-column prop="capability" label="能力指标" width="230"></el-table-column>
              <el-table-column prop="advantage" label="行业对比优势"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
      
      <div class="subsection">
        <h4>2.2 智能运营能力</h4>
        <div ref="operationCapabilityChart" class="diagram-container"></div>
        
        <div class="dark-content-box mt-20">
          <el-card>
            <pre class="code-block">
// 智能运营系统核心架构
class IntelligentOperationSystem {
  constructor() {
    this.modules = {
      realTimeMonitoring: new RealTimeMonitor({
        refreshRate: 1000, // 毫秒
        metricsCollectionRate: 128, // Hz
        alertThreshold: 0.75 // 百分比
      }),
      
      matchmaking: new MatchmakingEngine({
        skillBasedParams: {
          eloWeight: 0.65,
          recentPerformanceWeight: 0.25,
          playstyleCompatibilityWeight: 0.1
        },
        maxMatchmakingTime: 45 // 秒
      }),
      
      anomalyDetection: new AnomalyDetector({
        detectionAlgorithms: ['movementAnalysis', 'aimPatternRecognition', 'statisticalOutliers'],
        falsePositiveThreshold: 0.001, // 0.1%
        mlModelUpdateFrequency: 86400 // 秒 (每日)
      }),
      
      playerRetention: new RetentionOptimizer({
        segmentation: ['skillLevel', 'playFrequency', 'monetizationTier'],
        interventionChannels: ['inGameRewards', 'matchDifficulty', 'personalizedContent'],
        abTestGroups: 5
      })
    };
    
    // 系统互联初始化
    this.initializeIntegrations();
  }
  
  // 各系统协同工作
  async analyzeGameState() {
    const metrics = await this.modules.realTimeMonitoring.collectMetrics();
    const matchData = await this.modules.matchmaking.getCurrentMatches();
    const anomalies = await this.modules.anomalyDetection.scan(metrics, matchData);
    
    if (anomalies.length > 0) {
      this.handleAnomalies(anomalies);
    }
    
    return {
      serverLoad: metrics.serverLoad,
      activeMatches: matchData.count,
      avgMatchQuality: matchData.averageQualityScore,
      detectedAnomalies: anomalies.length
    };
  }
}
            </pre>
          </el-card>
        </div>
      </div>
    </div>
    <div class="section">
      <h3>3. 系统架构</h3>
      
      <div class="subsection">
        <h4>3.1 逻辑架构</h4>
        <div ref="logicalArchitectureChart" class="diagram-container"></div>
      </div>
      
      <div class="subsection">
        <h4>3.2 物理部署</h4>
        <div class="dark-content-box">
          <el-card>
            <el-table :data="deploymentInfo" border style="width: 100%">
              <el-table-column prop="region" label="区域" width="150"></el-table-column>
              <el-table-column prop="configuration" label="服务器配置" width="250"></el-table-column>
              <el-table-column prop="latency" label="网络延迟" width="150"></el-table-column>
              <el-table-column prop="coverage" label="覆盖范围"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3>4. 设计原则</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="design-principles">
            <div class="principle">
              <h4>竞技公平性</h4>
              <p>所有关键战斗计算均在服务端验证</p>
            </div>
            
            <div class="principle">
              <h4>专业级精度</h4>
              <p>核心操作0.25毫秒响应标准</p>
            </div>
            
            <div class="principle">
              <h4>弹性扩展</h4>
              <p>5分钟内完成200%容量扩容</p>
            </div>
            
            <div class="principle">
              <h4>安全合规</h4>
              <p>符合ISO27001和PCI DSS认证要求</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>5. 典型应用场景</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="scenario-list">
            <div class="scenario">
              <div class="scenario-header">
                <h4>赛季更新</h4>
                <el-tag type="warning">复杂场景</el-tag>
              </div>
              <p>同时调整上百项武器参数且保证零停机</p>
            </div>
            
            <div class="scenario">
              <div class="scenario-header">
                <h4>全球赛事</h4>
                <el-tag type="success">核心业务</el-tag>
              </div>
              <p>支持多支战队跨大洲实时对战</p>
            </div>
            
            <div class="scenario">
              <div class="scenario-header">
                <h4>安全防护</h4>
                <el-tag type="danger">关键能力</el-tag>
              </div>
              <p>自动识别并拦截DDoS攻击</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>6. 发展路线</h3>
      <div ref="developmentRoadmapChart" class="diagram-container"></div>
      
      <div class="dark-content-box mt-20">
        <el-card>
          <p class="conclusion-text">本系统设计遵循电子竞技行业最高标准，其架构方案已成为竞技射击游戏后台系统的行业参考范例。</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';
import { Trophy, Tools, Operation } from '@element-plus/icons-vue';

const operationCapabilityChart = ref<HTMLElement | null>(null);
const logicalArchitectureChart = ref<HTMLElement | null>(null);
const developmentRoadmapChart = ref<HTMLElement | null>(null);

// 竞技级技术架构数据
const technicalFeatures = [
  {
    dimension: '同步精度',
    capability: '128Hz服务器刷新率',
    advantage: '超过主流64Hz标准'
  },
  {
    dimension: '反作弊',
    capability: '三重检测体系（客户端/网络/服务器）',
    advantage: '比行业平均多2层防护'
  },
  {
    dimension: '容灾能力',
    capability: '50毫秒内完成故障切换',
    advantage: '快于标准200毫秒响应'
  }
];

// 物理部署数据
const deploymentInfo = [
  {
    region: '东亚区',
    configuration: '东京/首尔节点',
    latency: '<30ms',
    coverage: '中日韩等地区'
  },
  {
    region: '欧洲区',
    configuration: '法兰克福节点',
    latency: '<50ms',
    coverage: '欧盟国家'
  },
  {
    region: '北美区',
    configuration: '弗吉尼亚节点',
    latency: '<40ms',
    coverage: '美洲地区'
  }
];

onMounted(() => {
  // 智能运营能力图表
  if (operationCapabilityChart.value) {
    const mermaidCode = `
      flowchart TB
        subgraph "智能运营核心能力"
        A["实时监控"] --> B["智能分析"]
        B --> C["自动干预"]
        C --> D["效果评估"]
        D --> A
        end
        
        subgraph "数据处理管道"
        E["游戏事件采集"] --> F["实时流处理"]
        F --> G["多维数据仓库"]
        G --> H["机器学习预测"]
        end
        
        subgraph "运营决策支持"
        I["玩家行为分析"] --> J["匹配质量优化"]
        J --> K["内容推荐系统"]
        K --> L["留存风险预警"]
        end
        
        A --> E
        H --> B
        C --> K
    `;
    createDiagram(operationCapabilityChart.value, mermaidCode);
  }
  
  // 逻辑架构图表
  if (logicalArchitectureChart.value) {
    const mermaidCode = `
      flowchart TB
        subgraph "前端层"
        A["玩家客户端"] --- B["管理控制台"]
        B --- C["数据可视化"]
        end
        
        subgraph "API网关"
        D["认证鉴权"] --- E["请求路由"]
        E --- F["限流控制"]
        F --- G["数据转换"]
        end
        
        subgraph "微服务集群"
        H["用户服务"] --- I["武器系统"]
        I --- J["匹配服务"]
        J --- K["对战服务"]
        K --- L["排行榜"]
        L --- M["内容管理"]
        end
        
        subgraph "基础设施"
        N["分布式存储"] --- O["消息队列"]
        O --- P["缓存集群"]
        P --- Q["搜索引擎"]
        end
        
        A --> D
        B --> D
        C --> D
        G --> H
        M --> N
    `;
    createDiagram(logicalArchitectureChart.value, mermaidCode);
  }
  
  // 发展路线图表
  if (developmentRoadmapChart.value) {
    const mermaidCode = `
      timeline
        title FPS管理系统发展路线
        section 阶段一：基础建设
          2024 Q1 : 核心框架搭建
          2024 Q2 : 基础功能实现
          2024 Q3 : 内部测试优化
        section 阶段二：功能完善
          2024 Q4 : 电竞核心功能
          2025 Q1 : 智能匹配系统
          2025 Q2 : 反作弊系统升级
        section 阶段三：全球部署
          2025 Q3 : 全球服务器部署
          2025 Q4 : 跨区域联赛支持
          2026 Q1 : 全球电竞标准对接
        section 阶段四：生态扩展
          2026 Q2 : 开放API接口
          2026 Q3 : 第三方工具集成
          2026 Q4 : 生态合作伙伴计划
    `;
    createDiagram(developmentRoadmapChart.value, mermaidCode);
  }
});
</script>

<style scoped>
.system-overview {
  padding: 20px;
  background-color: #000000;
  color: var(--text-primary);
  min-height: 100%;
}

.section {
  margin-bottom: 30px;
}

.subsection {
  margin-bottom: 25px;
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  margin-top: 15px;
}

.mt-20 {
  margin-top: 20px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 400px;
  padding: 20px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.service-areas {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.service-area {
  flex: 1;
  min-width: 250px;
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 4px;
}

.service-icon {
  background-color: var(--primary-color);
  color: #000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.service-icon .el-icon {
  font-size: 20px;
}

.service-content {
  flex: 1;
}

.service-content h4 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
}

.service-content p {
  margin: 0;
  color: var(--text-secondary);
}

.design-principles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 10px;
}

.principle {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 4px;
  padding: 15px;
}

.principle h4 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.principle p {
  margin: 0;
  color: var(--text-secondary);
}

.scenario-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.scenario {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 4px;
  padding: 15px;
}

.scenario-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.scenario-header h4 {
  margin: 0;
  color: var(--primary-color);
}

.scenario p {
  margin: 0;
  color: var(--text-secondary);
}

.conclusion-text {
  text-align: center;
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1.1rem;
  font-style: italic;
  padding: 10px 0;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.code-block {
  background-color: #111111;
  border-radius: 4px;
  padding: 12px;
  margin: 12px 0;
  font-family: monospace;
  white-space: pre;
  color: #e6e6e6;
  border-left: 3px solid var(--primary-color);
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.4;
}

:deep(.el-card) {
  background-color: #000000;
  border-color: var(--border-color);
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

h2, h3, h4 {
  color: var(--primary-color);
}
</style> 