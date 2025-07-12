<template>
  <div class="performance-spec">
    <h2>性能指标</h2>
    
    <div class="section">
      <h3>1.1 核心性能参数</h3>
      <h4>1.1.1 实时性指标</h4>
      
      <div class="dark-content-box">
        <el-table :data="realTimeMetrics" border style="width: 100%">
          <el-table-column prop="metricName" label="指标名称" width="180"></el-table-column>
          <el-table-column prop="standardValue" label="标准值" width="150"></el-table-column>
          <el-table-column prop="threshold" label="极限阈值" width="150"></el-table-column>
          <el-table-column prop="measureMethod" label="测量方式"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>延迟处理流程图</h3>
      <div ref="latencyFlowchart" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>1.2 负载指标</h3>
      
      <div class="dark-content-box">
        <el-table :data="loadMetrics" border style="width: 100%">
          <el-table-column prop="scenarioType" label="场景类型" width="150"></el-table-column>
          <el-table-column prop="playerCapacity" label="单服玩家容量" width="150"></el-table-column>
          <el-table-column prop="cpuLimit" label="CPU占用上限" width="150"></el-table-column>
          <el-table-column prop="memoryLimit" label="内存消耗限制"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>帧同步时序图</h3>
      <div ref="frameSyncDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>网络抖动处理算法</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="延迟预测">
              <div class="tab-content">
                <h4>RTT预测算法</h4>
                <p>使用加权移动平均法对RTT进行预测：</p>
                <pre class="code-block">
predicted_rtt = (1 - α) * previous_predicted_rtt + α * measured_rtt
rtt_variance = (1 - β) * previous_rtt_variance + β * |measured_rtt - predicted_rtt|
timeout = predicted_rtt + 4 * rtt_variance

其中：α = 0.125, β = 0.25
                </pre>
                <p>当实际RTT超过timeout阈值时，进入网络延迟补偿模式。</p>
                
                <h4 class="mt-20">网络延迟分级处理</h4>
                <ul>
                  <li><strong>优良网络(RTT &lt; 50ms):</strong> 正常处理，无需特殊补偿</li>
                  <li><strong>轻度延迟(50ms - 100ms):</strong> 客户端预测补偿，状态过渡平滑处理</li>
                  <li><strong>中度延迟(100ms - 200ms):</strong> 启用时间补偿，服务器增加状态容忍度</li>
                  <li><strong>严重延迟(&gt; 200ms):</strong> 触发延迟告警，客户端显示网络状态提示，采用更激进的预测模型</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="丢包处理">
              <div class="tab-content">
                <h4>可靠UDP实现</h4>
                <p>为战斗关键数据实现自定义可靠UDP协议：</p>
                <ul>
                  <li><strong>序列号机制:</strong> 每个数据包分配唯一递增序列号</li>
                  <li><strong>选择性重传:</strong> 仅重传丢失的数据包，而非整个窗口</li>
                  <li><strong>冗余发送:</strong> 关键操作数据（如开火、技能释放）进行2次发送</li>
                  <li><strong>优先级队列:</strong> 按数据重要性划分传输优先级</li>
                </ul>
                
                <h4 class="mt-20">丢包率处理策略</h4>
                <ul>
                  <li><strong>轻微丢包(&lt; 1%):</strong> 正常重传机制</li>
                  <li><strong>中度丢包(1% - 5%):</strong> 增加冗余包，提高关键数据重传优先级</li>
                  <li><strong>严重丢包(&gt; 5%):</strong> 降低非关键数据更新频率，只传输最关键状态</li>
                  <li><strong>极端丢包(&gt; 15%):</strong> 触发连接质量警告，可能导致游戏暂停</li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="预测补偿">
              <div class="tab-content">
                <h4>客户端预测模型</h4>
                <p>客户端实现状态预测模型，在服务器确认前预测游戏状态：</p>
                <ul>
                  <li><strong>移动预测:</strong> 基于物理引擎预测角色位置，收到服务器确认后平滑修正</li>
                  <li><strong>动作预测:</strong> 本地立即执行动作，同时发送至服务器验证</li>
                  <li><strong>命中判定:</strong> 本地先做初步判定，服务器返回最终结果后调整</li>
                </ul>
                
                <h4 class="mt-20">回滚与状态修正</h4>
                <p>当服务器状态与客户端预测不符时，使用状态回滚与修正：</p>
                <pre class="code-block">
if (|server_state - client_predicted_state| > tolerance) {
    // 计算平滑修正插值
    correction_weight = min(1.0, delta_time * correction_speed);
    
    // 平滑过渡到正确状态
    current_state = lerp(client_predicted_state, server_state, correction_weight);
    
    // 更新预测模型参数
    update_prediction_model(server_state, client_predicted_state);
}
                </pre>
                <p>修正速度根据偏差大小动态调整，确保玩家体验平滑。</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>硬件资源配置矩阵</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="hardware-matrix">
            <el-table :data="hardwareMatrix" border style="width: 100%">
              <el-table-column prop="serverType" label="服务器类型" width="180"></el-table-column>
              <el-table-column prop="cpu" label="CPU规格" width="180"></el-table-column>
              <el-table-column prop="memory" label="内存配置" width="150"></el-table-column>
              <el-table-column prop="network" label="网络要求" width="150"></el-table-column>
              <el-table-column prop="storage" label="存储配置"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">资源监控指标</h4>
            <ul>
              <li><strong>CPU使用率告警阈值:</strong> 70% (持续5分钟)</li>
              <li><strong>内存使用告警阈值:</strong> 85% (持续3分钟)</li>
              <li><strong>磁盘I/O饱和度:</strong> 80% (持续10分钟)</li>
              <li><strong>网络带宽利用率:</strong> 75% (持续5分钟)</li>
            </ul>
            
            <h4 class="mt-20">监控指标采集</h4>
            <p>所有性能指标通过Prometheus采集，关键指标定义：</p>
            <pre class="code-block">
# 服务器帧率监控
fps_server_frame_rate{server_id="$server_id",region="$region"} 

# 客户端延迟分布
fps_client_latency_ms{percentile="50",region="$region"}
fps_client_latency_ms{percentile="95",region="$region"}
fps_client_latency_ms{percentile="99",region="$region"}

# 命中判定误差
fps_hit_detection_error_ms{weapon_type="$type",region="$region"}

# 资源使用率
fps_server_cpu_usage_percent{server_id="$server_id",region="$region"}
fps_server_memory_usage_bytes{server_id="$server_id",region="$region"}
            </pre>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const latencyFlowchart = ref<HTMLElement | null>(null);
const frameSyncDiagram = ref<HTMLElement | null>(null);

const realTimeMetrics = [
  {
    metricName: '客户端帧同步延迟',
    standardValue: '≤50ms',
    threshold: '>100ms告警',
    measureMethod: '时间戳差值统计'
  },
  {
    metricName: '服务器Tick率',
    standardValue: '128Hz',
    threshold: '最低64Hz',
    measureMethod: '引擎内置计数器'
  },
  {
    metricName: '命中判定误差',
    standardValue: '≤0.5ms',
    threshold: '>2ms丢弃',
    measureMethod: '客户端-服务器比对'
  },
  {
    metricName: '输入响应延迟',
    standardValue: '≤16ms',
    threshold: '>30ms告警',
    measureMethod: '输入到渲染时间差'
  },
  {
    metricName: '状态同步频率',
    standardValue: '20Hz',
    threshold: '最低10Hz',
    measureMethod: '网络包监控'
  }
];

const loadMetrics = [
  {
    scenarioType: '竞技模式',
    playerCapacity: '10v10',
    cpuLimit: '60%',
    memoryLimit: '16GB'
  },
  {
    scenarioType: '休闲模式',
    playerCapacity: '16v16',
    cpuLimit: '75%',
    memoryLimit: '24GB'
  },
  {
    scenarioType: '观战模式',
    playerCapacity: '50观众',
    cpuLimit: '30%',
    memoryLimit: '8GB'
  },
  {
    scenarioType: '大型战役',
    playerCapacity: '32v32',
    cpuLimit: '85%',
    memoryLimit: '32GB'
  }
];

const hardwareMatrix = [
  {
    serverType: '战斗服务器',
    cpu: '32核 3.4GHz',
    memory: '64GB DDR4',
    network: '10Gbps 冗余',
    storage: 'NVMe SSD 500GB'
  },
  {
    serverType: '匹配服务器',
    cpu: '16核 2.8GHz',
    memory: '32GB DDR4',
    network: '5Gbps',
    storage: 'SSD 250GB'
  },
  {
    serverType: '数据处理节点',
    cpu: '64核 2.6GHz',
    memory: '128GB DDR4',
    network: '25Gbps',
    storage: 'NVMe RAID 2TB'
  },
  {
    serverType: '内容分发节点',
    cpu: '8核 2.4GHz',
    memory: '16GB DDR4',
    network: '40Gbps',
    storage: 'SSD 1TB'
  }
];

onMounted(() => {
  if (latencyFlowchart.value) {
    const mermaidCode = `
      flowchart TD
        A[客户端输入] --> B[网络传输]
        B --> C{延迟检测}
        C -->|≤50ms| D[正常处理]
        C -->|>50ms| E[预测补偿]
        D --> F[状态更新]
        E --> G[本地预测]
        G --> H[状态校验]
        H --> I{偏差检测}
        I -->|可接受范围内| F
        I -->|超出容忍度| J[强制同步]
        J --> F
        
        subgraph 客户端
        A
        G
        end
        
        subgraph 服务器
        D
        F
        J
        end
    `;
    createDiagram(latencyFlowchart.value, mermaidCode);
  }
  
  if (frameSyncDiagram.value) {
    const mermaidCode = `
      sequenceDiagram
        participant Client as 客户端
        participant Server as 服务器
        
        Client->>+Server: 输入指令(t0)
        Server->>Server: 处理指令(t0+n)
        Server-->>-Client: 状态更新(t0+n+m)
        Client->>Client: 本地渲染(t0+n+m+p)
        
        note over Client,Server: 理想情况: n+m+p < 50ms
        
        Client->>+Server: 新输入指令(t1)
        
        alt 网络正常
          Server->>Server: 处理指令(t1+n)
          Server-->>-Client: 状态更新(t1+n+m)
        else 网络延迟
          Client->>Client: 本地预测(t1+k)
          Server->>Server: 处理指令(t1+n')
          Server-->>Client: 延迟状态更新(t1+n'+m')
          Client->>Client: 状态校正(平滑过渡)
        end
    `;
    createDiagram(frameSyncDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.performance-spec {
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
  margin: 8px 0;
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

.hardware-matrix ul {
  padding-left: 20px;
  margin: 15px 0;
}

.hardware-matrix li {
  margin-bottom: 10px;
  line-height: 1.6;
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