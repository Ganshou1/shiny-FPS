<template>
  <div class="scalability-spec">
    <h2>扩展性要求</h2>
    
    <div class="section">
      <h3>3.1 弹性伸缩规则</h3>
      
      <div class="dark-content-box">
        <el-table :data="scalingRules" border style="width: 100%">
          <el-table-column prop="metricType" label="指标类型" width="150"></el-table-column>
          <el-table-column prop="scaleOutThreshold" label="扩容阈值" width="180"></el-table-column>
          <el-table-column prop="scaleInThreshold" label="缩容阈值" width="180"></el-table-column>
          <el-table-column prop="maxInstances" label="最大实例数"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>弹性伸缩架构</h3>
      <div ref="scalabilityDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>3.2 热更新能力</h3>
      
      <div class="dark-content-box">
        <el-table :data="hotUpdateCapabilities" border style="width: 100%">
          <el-table-column prop="updateType" label="更新类型" width="150"></el-table-column>
          <el-table-column prop="effectTime" label="生效时间" width="150"></el-table-column>
          <el-table-column prop="rollbackTime" label="回滚时限" width="150"></el-table-column>
          <el-table-column prop="scopeControl" label="影响范围控制"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>微服务拆分原则</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="microservice-principles">
            <h4>领域驱动设计(DDD)拆分策略</h4>
            <p>基于业务领域拆分微服务，确保每个服务职责单一、边界清晰：</p>
            <ul>
              <li>
                <strong>战斗服务域</strong>
                <ul>
                  <li>战斗物理引擎服务</li>
                  <li>伤害计算服务</li>
                  <li>状态同步服务</li>
                  <li>AI行为服务</li>
                </ul>
              </li>
              <li>
                <strong>玩家服务域</strong>
                <ul>
                  <li>账号管理服务</li>
                  <li>角色管理服务</li>
                  <li>道具管理服务</li>
                  <li>成就进度服务</li>
                </ul>
              </li>
              <li>
                <strong>匹配服务域</strong>
                <ul>
                  <li>队列管理服务</li>
                  <li>技能评分服务</li>
                  <li>队伍形成服务</li>
                  <li>服务器分配服务</li>
                </ul>
              </li>
            </ul>
            
            <h4 class="mt-20">接口设计原则</h4>
            <ul>
              <li><strong>版本化API:</strong> 所有服务API必须包含版本号，支持多版本并行运行</li>
              <li><strong>向后兼容:</strong> 新版本API必须兼容至少前两个版本的客户端</li>
              <li><strong>无状态设计:</strong> 服务接口设计为无状态，确保可随时扩展</li>
              <li><strong>故障隔离:</strong> 使用熔断器模式，防止故障级联传播</li>
              <li><strong>异步通信:</strong> 非实时操作使用消息队列实现异步通信</li>
            </ul>
            
            <h4 class="mt-20">服务大小准则</h4>
            <div ref="serviceSizingDiagram" class="mini-diagram"></div>
            <table class="custom-table mt-20">
              <tr>
                <th>服务类型</th>
                <th>代码规模</th>
                <th>团队规模</th>
                <th>更新频率</th>
              </tr>
              <tr>
                <td>核心游戏逻辑</td>
                <td>5-10K行代码</td>
                <td>3-5人</td>
                <td>1-2周/次</td>
              </tr>
              <tr>
                <td>基础服务组件</td>
                <td>10-20K行代码</td>
                <td>4-6人</td>
                <td>2-4周/次</td>
              </tr>
              <tr>
                <td>基础设施服务</td>
                <td>20-50K行代码</td>
                <td>6-8人</td>
                <td>1-2月/次</td>
              </tr>
            </table>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>配置热加载方案</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="hot-config-loading">
            <h4>配置层次结构</h4>
            <div ref="configHierarchyDiagram" class="mini-diagram"></div>
            
            <h4 class="mt-20">配置分发流程</h4>
            <ol>
              <li>
                <strong>配置更改提交</strong>
                <p>开发人员将配置变更提交到配置中心</p>
                <p>变更记录版本化并添加审计日志</p>
              </li>
              <li>
                <strong>配置验证</strong>
                <p>自动验证配置格式和约束条件</p>
                <p>运行单元测试验证功能影响</p>
              </li>
              <li>
                <strong>金丝雀发布</strong>
                <p>将配置应用到1%的服务实例</p>
                <p>监控关键指标变化</p>
              </li>
              <li>
                <strong>全量发布</strong>
                <p>逐步扩大配置应用范围(10% → 50% → 100%)</p>
                <p>每一步监控性能和错误率</p>
              </li>
            </ol>
            
            <h4 class="mt-20">配置类型与刷新策略</h4>
            <table class="custom-table">
              <tr>
                <th>配置类型</th>
                <th>更新方式</th>
                <th>刷新频率</th>
                <th>版本控制</th>
              </tr>
              <tr>
                <td>游戏平衡性参数</td>
                <td>热更新</td>
                <td>实时</td>
                <td>语义版本</td>
              </tr>
              <tr>
                <td>匹配算法参数</td>
                <td>热更新</td>
                <td>每小时</td>
                <td>语义版本</td>
              </tr>
              <tr>
                <td>服务连接配置</td>
                <td>半热更新</td>
                <td>每日</td>
                <td>增量版本</td>
              </tr>
              <tr>
                <td>底层架构配置</td>
                <td>冷更新</td>
                <td>计划维护</td>
                <td>主版本号</td>
              </tr>
            </table>
            
            <h4 class="mt-20">热更新代码示例</h4>
            <pre class="code-block">
// 配置监听器示例
class ConfigWatcher implements ConfigChangeListener {
  // 热更新回调
  @Override
  public void onChange(ConfigChangedEvent event) {
    if (event.isTypeOf(ConfigType.GAME_BALANCE)) {
      // 原子性更新游戏平衡参数
      updateWeaponStats(event.getConfig());
      updateMovementParams(event.getConfig());
      updateAbilityCooldowns(event.getConfig());
      
      // 广播更新通知
      notifyConfigChanged(ConfigType.GAME_BALANCE, event.getVersion());
      
      // 记录更新日志
      logger.info("Game balance updated to version: {}", event.getVersion());
    }
  }
  
  // 版本兼容性检查
  private boolean isCompatible(String version) {
    SemanticVersion current = SemanticVersion.parse(getCurrentVersion());
    SemanticVersion target = SemanticVersion.parse(version);
    return target.getMajor() == current.getMajor();
  }
}
            </pre>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>压力测试增长模型</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="stress-testing">
            <h4>容量规划模型</h4>
            <div ref="capacityPlanningDiagram" class="mini-diagram"></div>
            
            <h4 class="mt-20">负载测试方法论</h4>
            <ul>
              <li>
                <strong>基准测试</strong>
                <p>标准化压测场景，包括：</p>
                <ul>
                  <li>1v1小规模对战 (模拟高精度物理计算)</li>
                  <li>10v10中规模对战 (模拟标准竞技场景)</li>
                  <li>32v32大规模战役 (模拟极限负载场景)</li>
                </ul>
              </li>
              <li>
                <strong>递增负载测试</strong>
                <p>从基准负载开始，每5分钟增加10%负载，直到系统性能下降</p>
                <p>记录每一级负载下的关键性能指标</p>
              </li>
              <li>
                <strong>突发负载测试</strong>
                <p>模拟活动上线或媒体曝光带来的突发流量</p>
                <p>在5秒内将负载提升至基准的300%，观察系统响应</p>
              </li>
              <li>
                <strong>长时间稳定性测试</strong>
                <p>在80%峰值负载下持续运行72小时</p>
                <p>观察内存泄漏、响应时间漂移等长期稳定性问题</p>
              </li>
            </ul>
            
            <h4 class="mt-20">性能指标分析</h4>
            <table class="custom-table">
              <tr>
                <th>指标</th>
                <th>预期增长率</th>
                <th>触发扩容阈值</th>
                <th>临界值</th>
              </tr>
              <tr>
                <td>服务器CPU使用率</td>
                <td>线性</td>
                <td>70%</td>
                <td>90%</td>
              </tr>
              <tr>
                <td>内存使用率</td>
                <td>阶梯型</td>
                <td>80%</td>
                <td>95%</td>
              </tr>
              <tr>
                <td>网络带宽</td>
                <td>平方增长</td>
                <td>70%</td>
                <td>85%</td>
              </tr>
              <tr>
                <td>响应时间</td>
                <td>指数增长</td>
                <td>2x基准</td>
                <td>5x基准</td>
              </tr>
              <tr>
                <td>每秒事务数</td>
                <td>线性</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            </table>
            
            <h4 class="mt-20">特别说明</h4>
            <ul class="special-notes">
              <li><strong>战斗服务必须实现无状态设计</strong>, 确保可随时扩展或替换实例</li>
              <li><strong>所有扩展操作需通过金丝雀发布验证</strong>, 先应用到少量实例观察效果</li>
              <li><strong>监控系统需具备预测性扩容能力</strong>, 基于历史数据预测负载峰值提前扩容</li>
              <li><strong>版本兼容性至少维护3个历史大版本</strong>, 确保平滑升级和回滚能力</li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const scalabilityDiagram = ref<HTMLElement | null>(null);
const serviceSizingDiagram = ref<HTMLElement | null>(null);
const configHierarchyDiagram = ref<HTMLElement | null>(null);
const capacityPlanningDiagram = ref<HTMLElement | null>(null);

const scalingRules = [
  {
    metricType: 'CPU使用率',
    scaleOutThreshold: '70%持续5分钟',
    scaleInThreshold: '30%持续10分钟',
    maxInstances: '500'
  },
  {
    metricType: '在线玩家数',
    scaleOutThreshold: '80%容量',
    scaleInThreshold: '40%容量',
    maxInstances: '按区域配置'
  },
  {
    metricType: '网络带宽',
    scaleOutThreshold: '85%占用',
    scaleInThreshold: '50%占用',
    maxInstances: '10Gbps'
  },
  {
    metricType: '匹配队列深度',
    scaleOutThreshold: '队列等待>30秒',
    scaleInThreshold: '队列等待<5秒',
    maxInstances: '200'
  },
  {
    metricType: '内存使用率',
    scaleOutThreshold: '75%持续3分钟',
    scaleInThreshold: '40%持续15分钟',
    maxInstances: '按实例类型配置'
  }
];

const hotUpdateCapabilities = [
  {
    updateType: '武器参数',
    effectTime: '立即',
    rollbackTime: '15分钟',
    scopeControl: '按分区分批'
  },
  {
    updateType: '地图资源',
    effectTime: '下一局游戏',
    rollbackTime: '1小时',
    scopeControl: '版本标记'
  },
  {
    updateType: '核心逻辑',
    effectTime: '维护窗口',
    rollbackTime: '需停机',
    scopeControl: '全服同步'
  },
  {
    updateType: '匹配算法',
    effectTime: '10分钟',
    rollbackTime: '30分钟',
    scopeControl: '灰度发布'
  },
  {
    updateType: '活动配置',
    effectTime: '立即',
    rollbackTime: '5分钟',
    scopeControl: '全服生效'
  }
];

onMounted(() => {
  if (scalabilityDiagram.value) {
    const mermaidCode = `
      graph TD
        subgraph 监控系统
        A[负载监控] --> B{触发扩容?}
        B -->|是| C[扩容决策]
        B -->|否| D{触发缩容?}
        D -->|是| E[缩容决策]
        D -->|否| A
        end
        
        subgraph 自动伸缩系统
        C --> F[创建新实例]
        E --> G[移除实例]
        
        F --> H[预热新实例]
        G --> I[优雅关闭]
        
        H --> J[加入负载均衡]
        I --> K[从负载均衡移除]
        end
        
        subgraph 资源控制
        J --> L[增加资源分配]
        K --> M[释放资源]
        
        L --> N[更新容量指标]
        M --> N
        N --> A
        end
    `;
    createDiagram(scalabilityDiagram.value, mermaidCode);
  }
  
  if (serviceSizingDiagram.value) {
    const mermaidCode = `
      graph TD
        A[服务规模决策] --> B{核心功能?}
        B -->|是| C[小型服务]
        B -->|否| D{状态复杂?}
        D -->|是| E[中型服务]
        D -->|否| F{高性能要求?}
        F -->|是| E
        F -->|否| C
        
        C --> G[单一职责]
        E --> H[相关职责组合]
        
        G --> I[快速迭代]
        H --> J[定期发布]
    `;
    createDiagram(serviceSizingDiagram.value, mermaidCode);
  }
  
  if (configHierarchyDiagram.value) {
    const mermaidCode = `
      graph TD
        A[全局配置] --> B[区域配置]
        B --> C[服务集群配置]
        C --> D[服务实例配置]
        
        A --> E[默认参数]
        B --> F[区域特定参数]
        C --> G[负载相关参数]
        D --> H[实例特定参数]
        
        I[配置中心] --> A
        I --> J[版本控制]
        I --> K[配置历史]
        I --> L[回滚能力]
    `;
    createDiagram(configHierarchyDiagram.value, mermaidCode);
  }
  
  if (capacityPlanningDiagram.value) {
    const mermaidCode = `
      graph LR
        A[容量规划] --> B{负载类型}
        B -->|基础负载| C[线性增长]
        B -->|峰值负载| D[指数增长]
        B -->|活动负载| E[阶跃增长]
        
        C --> F[缓慢扩容]
        D --> G[预先扩容]
        E --> H[弹性扩容]
        
        F --> I[成本优化]
        G --> J[可靠性保障]
        H --> K[突发应对]
        
        I --> L[总体容量计划]
        J --> L
        K --> L
    `;
    createDiagram(capacityPlanningDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.scalability-spec {
  padding: 20px;
  background-color: #000000;
  color: var(--text-primary);
  min-height: 100%;
}

.section {
  margin-bottom: 30px;
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

.mini-diagram {
  margin-top: 10px;
  min-height: 200px;
  padding: 10px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
}

.microservice-principles ul, .hot-config-loading ul, .stress-testing ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.microservice-principles ul ul {
  margin-top: 5px;
  margin-bottom: 10px;
}

.microservice-principles li {
  margin-bottom: 10px;
}

.microservice-principles ul ul li {
  margin-bottom: 3px;
}

.hot-config-loading ol {
  padding-left: 20px;
  margin: 15px 0;
}

.hot-config-loading ol > li {
  margin-bottom: 15px;
}

.hot-config-loading p, .stress-testing p {
  margin: 5px 0;
  margin-left: 5px;
}

.mt-20 {
  margin-top: 20px;
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

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  color: var(--text-primary);
}

.custom-table th {
  background-color: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--gold-border);
  padding: 8px;
  text-align: left;
  color: var(--primary-color);
}

.custom-table td {
  border: 1px solid var(--border-color);
  padding: 8px;
}

.custom-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.03);
}

.special-notes {
  margin-top: 15px;
  padding: 15px;
  border-left: 3px solid var(--primary-color);
  background-color: rgba(255, 215, 0, 0.05);
}

.special-notes li {
  margin-bottom: 10px;
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

:deep(.el-card) {
  background-color: #000000;
}

:deep(.el-tabs--border-card) {
  background-color: #000000;
}

:deep(.el-tabs--border-card > .el-tabs__content) {
  background-color: #000000;
}

:deep(h2), :deep(h3), :deep(h4) {
  color: var(--primary-color);
}
</style> 