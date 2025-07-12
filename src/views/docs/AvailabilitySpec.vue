<template>
  <div class="availability-spec">
    <h2>可用性要求</h2>
    
    <div class="section">
      <h3>2.1 服务等级协议(SLA)</h3>
      
      <div class="dark-content-box">
        <el-table :data="slaData" border style="width: 100%">
          <el-table-column prop="componentType" label="组件类型" width="150"></el-table-column>
          <el-table-column prop="availabilityTarget" label="可用性目标" width="150"></el-table-column>
          <el-table-column prop="recoveryTime" label="故障恢复时间" width="150"></el-table-column>
          <el-table-column prop="dataGuarantee" label="数据持久化保证"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>服务可用性架构</h3>
      <div ref="availabilityDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>2.2 灾备方案</h3>
      <h4>2.2.1 故障转移策略</h4>
      
      <div class="dark-content-box">
        <el-table :data="failoverData" border style="width: 100%">
          <el-table-column prop="failureType" label="故障类型" width="150"></el-table-column>
          <el-table-column prop="detectionTime" label="检测时间" width="150"></el-table-column>
          <el-table-column prop="switchMethod" label="切换方式" width="150"></el-table-column>
          <el-table-column prop="consistency" label="数据一致性保证"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>心跳检测协议</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="心跳机制">
              <div class="tab-content">
                <h4>分层心跳检测</h4>
                <ul>
                  <li>
                    <strong>L1: 进程级心跳</strong>
                    <p>频率: 1次/秒，超时阈值: 3秒</p>
                    <p>作用: 监控进程是否存活，触发自动重启机制</p>
                  </li>
                  <li>
                    <strong>L2: 服务级心跳</strong>
                    <p>频率: 1次/5秒，超时阈值: 15秒</p>
                    <p>作用: 监控服务是否能正常响应，触发服务切换</p>
                  </li>
                  <li>
                    <strong>L3: 集群级心跳</strong>
                    <p>频率: 1次/30秒，超时阈值: 90秒</p>
                    <p>作用: 监控数据中心状态，触发区域故障转移</p>
                  </li>
                </ul>
                
                <h4 class="mt-20">心跳协议格式</h4>
                <pre class="code-block">
{
  "service_id": "battle-server-001",
  "instance_id": "i-12345abcde",
  "region": "asia-east",
  "timestamp": 1625482938,
  "status": "healthy",
  "metrics": {
    "cpu_load": 0.45,
    "memory_usage": 0.62,
    "active_connections": 128,
    "response_time_ms": 15
  },
  "version": "1.5.2"
}
                </pre>
              </div>
            </el-tab-pane>
            <el-tab-pane label="故障检测">
              <div class="tab-content">
                <h4>多维度故障检测</h4>
                <ul>
                  <li>
                    <strong>基础设施层检测</strong>
                    <p>监控主机、网络设备、存储系统的硬件和操作系统状态</p>
                    <p>指标: CPU负载、内存使用率、磁盘I/O、网络吞吐量</p>
                  </li>
                  <li>
                    <strong>应用层检测</strong>
                    <p>监控游戏服务进程状态、API响应时间、错误率</p>
                    <p>指标: 服务响应延迟、HTTP状态码、业务错误率、队列深度</p>
                  </li>
                  <li>
                    <strong>业务层检测</strong>
                    <p>监控游戏会话创建成功率、匹配时间、游戏进行中断率</p>
                    <p>指标: 会话完整度、玩家掉线率、异常行为模式</p>
                  </li>
                </ul>
                
                <h4 class="mt-20">故障阈值定义</h4>
                <table class="custom-table">
                  <tr>
                    <th>故障等级</th>
                    <th>触发条件</th>
                    <th>响应措施</th>
                  </tr>
                  <tr>
                    <td>P1 - 严重</td>
                    <td>系统不可用 > 30秒</td>
                    <td>立即自动故障转移 + 紧急团队通知</td>
                  </tr>
                  <tr>
                    <td>P2 - 高危</td>
                    <td>部分功能不可用 > 2分钟</td>
                    <td>自动降级 + 工程师介入</td>
                  </tr>
                  <tr>
                    <td>P3 - 中等</td>
                    <td>性能下降 > 50% 超过5分钟</td>
                    <td>负载均衡调整 + 技术支持通知</td>
                  </tr>
                  <tr>
                    <td>P4 - 轻微</td>
                    <td>非关键功能异常</td>
                    <td>记录问题 + 下次更新修复</td>
                  </tr>
                </table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="自愈机制">
              <div class="tab-content">
                <h4>多层次自愈机制</h4>
                <div ref="selfHealingDiagram" class="mini-diagram"></div>
                
                <h4 class="mt-20">自愈策略详情</h4>
                <ul>
                  <li>
                    <strong>进程自愈</strong>
                    <p>监控系统检测到进程崩溃或不响应时，自动重启进程</p>
                    <p>最大重试次数: 3次，重试间隔: 指数退避(5s, 15s, 45s)</p>
                    <p>连续失败后: 标记实例为不健康，触发实例替换</p>
                  </li>
                  <li>
                    <strong>实例自愈</strong>
                    <p>监控系统检测到实例异常时，自动从负载均衡中移除并创建新实例</p>
                    <p>启动新实例后执行健康检查，确认正常后才加入服务</p>
                    <p>保留问题实例供后续分析，但不再分配新流量</p>
                  </li>
                  <li>
                    <strong>服务自愈</strong>
                    <p>监控系统检测到整体服务异常时，自动进行服务降级或切换</p>
                    <p>启用备用路由规则，将流量导向健康区域</p>
                    <p>根据预设的策略执行服务恢复流程</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>数据备份验证流程</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="backup-verification">
            <h4>备份策略</h4>
            <ul>
              <li>
                <strong>增量备份:</strong> 每1小时执行一次
                <p>保存48小时内任意时间点的数据状态，支持精细回滚</p>
              </li>
              <li>
                <strong>全量备份:</strong> 每24小时执行一次
                <p>保存7天内每天的完整数据快照，支持完整恢复</p>
              </li>
              <li>
                <strong>归档备份:</strong> 每周执行一次
                <p>保存90天的历史数据，用于长期追溯和分析</p>
              </li>
            </ul>
            
            <h4 class="mt-20">备份验证流程</h4>
            <div ref="backupVerificationDiagram" class="mini-diagram"></div>
            
            <h4 class="mt-20">备份恢复演练</h4>
            <p>定期进行备份恢复演练，确保备份数据的有效性和恢复流程的可靠性：</p>
            <ol>
              <li><strong>每周演练:</strong> 从增量备份恢复单个玩家数据</li>
              <li><strong>每月演练:</strong> 从全量备份恢复完整游戏分区</li>
              <li><strong>每季度演练:</strong> 模拟灾难场景，执行跨区域恢复</li>
            </ol>
            
            <table class="custom-table mt-20">
              <tr>
                <th>备份类型</th>
                <th>恢复时间目标(RTO)</th>
                <th>恢复点目标(RPO)</th>
                <th>验证频率</th>
              </tr>
              <tr>
                <td>增量备份</td>
                <td>< 30分钟</td>
                <td>< 1小时</td>
                <td>每周</td>
              </tr>
              <tr>
                <td>全量备份</td>
                <td>< 2小时</td>
                <td>< 24小时</td>
                <td>每月</td>
              </tr>
              <tr>
                <td>归档备份</td>
                <td>< 8小时</td>
                <td>< 7天</td>
                <td>每季度</td>
              </tr>
            </table>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>容灾演练清单</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="disaster-recovery-checklist">
            <h4>常规容灾演练项目</h4>
            <el-table :data="disasterDrillData" border style="width: 100%">
              <el-table-column prop="scenario" label="演练场景" width="200"></el-table-column>
              <el-table-column prop="frequency" label="执行频率" width="120"></el-table-column>
              <el-table-column prop="success" label="成功标准"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">容灾演练步骤</h4>
            <ol>
              <li>
                <strong>演练准备</strong>
                <ul>
                  <li>确定演练范围和目标</li>
                  <li>准备演练脚本和工具</li>
                  <li>通知相关团队和利益相关者</li>
                  <li>设置监控和观察点</li>
                </ul>
              </li>
              <li>
                <strong>演练执行</strong>
                <ul>
                  <li>按照预设场景触发故障条件</li>
                  <li>观察系统自动响应行为</li>
                  <li>记录关键指标和时间点</li>
                  <li>必要时执行人工干预步骤</li>
                </ul>
              </li>
              <li>
                <strong>结果评估</strong>
                <ul>
                  <li>评估恢复时间是否达到目标</li>
                  <li>验证数据一致性和完整性</li>
                  <li>识别流程中的瓶颈和问题</li>
                  <li>总结经验和教训</li>
                </ul>
              </li>
              <li>
                <strong>改进优化</strong>
                <ul>
                  <li>更新容灾文档和流程</li>
                  <li>优化自动化工具和脚本</li>
                  <li>培训团队成员</li>
                  <li>调整资源配置和技术架构</li>
                </ul>
              </li>
            </ol>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const availabilityDiagram = ref<HTMLElement | null>(null);
const selfHealingDiagram = ref<HTMLElement | null>(null);
const backupVerificationDiagram = ref<HTMLElement | null>(null);

const slaData = [
  {
    componentType: '匹配服务',
    availabilityTarget: '99.99%',
    recoveryTime: '<1分钟',
    dataGuarantee: '事务日志实时'
  },
  {
    componentType: '战斗服务',
    availabilityTarget: '99.95%',
    recoveryTime: '<30秒',
    dataGuarantee: '内存快照每5秒'
  },
  {
    componentType: '数据存储',
    availabilityTarget: '99.999%',
    recoveryTime: '<5秒',
    dataGuarantee: '多AZ同步'
  },
  {
    componentType: '认证服务',
    availabilityTarget: '99.99%',
    recoveryTime: '<15秒',
    dataGuarantee: '跨区域同步复制'
  },
  {
    componentType: '内容分发',
    availabilityTarget: '99.9%',
    recoveryTime: '<5分钟',
    dataGuarantee: 'CDN多节点缓存'
  }
];

const failoverData = [
  {
    failureType: '服务器宕机',
    detectionTime: '10秒',
    switchMethod: '自动热备',
    consistency: '最后1秒状态'
  },
  {
    failureType: '网络分区',
    detectionTime: '15秒',
    switchMethod: '仲裁切换',
    consistency: '最终一致性'
  },
  {
    failureType: '数据库故障',
    detectionTime: '5秒',
    switchMethod: '只读模式',
    consistency: '事务回滚'
  },
  {
    failureType: '区域性故障',
    detectionTime: '30秒',
    switchMethod: '跨区域转移',
    consistency: '异步复制点'
  },
  {
    failureType: '软件版本问题',
    detectionTime: '60秒',
    switchMethod: '自动回滚',
    consistency: '版本兼容逻辑'
  }
];

const disasterDrillData = [
  {
    scenario: '单节点故障',
    frequency: '每周',
    success: '无感知切换，RTO < 30秒'
  },
  {
    scenario: '数据中心网络中断',
    frequency: '每月',
    success: '区域内容灾切换，RTO < 90秒'
  },
  {
    scenario: '主数据库崩溃',
    frequency: '每月',
    success: '自动切换备库，RTO < 5秒'
  },
  {
    scenario: '区域级灾难',
    frequency: '每季度',
    success: '跨区域容灾，RTO < 5分钟'
  },
  {
    scenario: '数据损坏恢复',
    frequency: '每半年',
    success: '数据恢复完整，RPO < 5分钟'
  }
];

onMounted(() => {
  if (availabilityDiagram.value) {
    const mermaidCode = `
      graph TD
        subgraph 多区域部署
        A[玩家请求] --> B{全局负载均衡}
        B -->|区域1| C1[边缘节点]
        B -->|区域2| C2[边缘节点]
        B -->|区域3| C3[边缘节点]
        
        C1 --> D1[游戏服务集群]
        C2 --> D2[游戏服务集群]
        C3 --> D3[游戏服务集群]
        
        D1 --> E1[(主数据中心)]
        D2 --> E2[(主数据中心)]
        D3 --> E3[(主数据中心)]
        
        E1 -.-> F1[(备份数据中心)]
        E2 -.-> F2[(备份数据中心)]
        E3 -.-> F3[(备份数据中心)]
        end
        
        subgraph 高可用架构
        D1 --> G1[服务实例1]
        D1 --> G2[服务实例2]
        D1 --> G3[服务实例3]
        
        G1 --> H[健康检查]
        G2 --> H
        G3 --> H
        
        H --> I{自动伸缩}
        I -->|扩容| G4[新服务实例]
        I -->|缩容| G3
        end
    `;
    createDiagram(availabilityDiagram.value, mermaidCode);
  }
  
  if (selfHealingDiagram.value) {
    const mermaidCode = `
      graph TD
        A[异常检测] --> B{问题分类}
        B -->|进程级| C[进程自愈]
        B -->|实例级| D[实例自愈]
        B -->|服务级| E[服务自愈]
        
        C -->|进程重启| F[健康检查]
        D -->|实例替换| F
        E -->|服务降级/切换| F
        
        F -->|恢复正常| G[恢复服务]
        F -->|持续异常| H[升级处理]
    `;
    createDiagram(selfHealingDiagram.value, mermaidCode);
  }
  
  if (backupVerificationDiagram.value) {
    const mermaidCode = `
      graph LR
        A[备份执行] --> B[完整性校验]
        B --> C{校验通过?}
        C -->|是| D[测试恢复]
        C -->|否| E[触发报警]
        
        D --> F{恢复成功?}
        F -->|是| G[验证数据]
        F -->|否| H[调查失败原因]
        
        G --> I{数据一致?}
        I -->|是| J[标记备份有效]
        I -->|否| K[修复备份流程]
        
        E --> L[重新执行备份]
        H --> L
        K --> L
    `;
    createDiagram(backupVerificationDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.availability-spec {
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

.tab-content {
  padding: 15px;
}

.tab-content h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.tab-content ul, .tab-content ol {
  padding-left: 20px;
  margin-bottom: 20px;
}

.tab-content li {
  margin-bottom: 15px;
}

.tab-content p {
  margin: 5px 0;
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

.backup-verification ul, .disaster-recovery-checklist ul {
  padding-left: 20px;
  margin: 10px 0;
}

.disaster-recovery-checklist ol > li {
  margin-bottom: 20px;
}

.disaster-recovery-checklist ul > li {
  margin-bottom: 8px;
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