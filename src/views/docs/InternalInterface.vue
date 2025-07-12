<template>
  <div class="interface-regulations">
    <h2>内部接口规范</h2>
    
    <div class="section">
      <h3>1.1 微服务间通信</h3>
      <h4>1.1.1 核心接口清单</h4>
      
      <div class="dark-content-box">
        <el-table :data="serviceInterfaces" border style="width: 100%">
          <el-table-column prop="serviceGroup" label="服务组" width="150"></el-table-column>
          <el-table-column prop="interfaceName" label="接口名称" width="180"></el-table-column>
          <el-table-column prop="protocol" label="协议" width="120"></el-table-column>
          <el-table-column prop="qpsLimit" label="QPS上限" width="120"></el-table-column>
          <el-table-column prop="timeout" label="超时设置"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>通信流程图</h3>
      <div ref="sequenceDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>1.2 状态同步机制</h3>
      <h4>1.2.1 数据压缩规则</h4>
      
      <div class="dark-content-box">
        <el-table :data="compressionRules" border style="width: 100%">
          <el-table-column prop="dataType" label="数据类型" width="180"></el-table-column>
          <el-table-column prop="algorithm" label="压缩算法" width="180"></el-table-column>
          <el-table-column prop="threshold" label="阈值" width="150"></el-table-column>
          <el-table-column prop="precision" label="精度损失"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>服务发现机制</h3>
      <div ref="serviceDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>消息序列化对比</h3>
      <div class="dark-content-box">
        <el-table :data="serializationData" border style="width: 100%">
          <el-table-column prop="format" label="格式" width="150"></el-table-column>
          <el-table-column prop="size" label="平均大小" width="150"></el-table-column>
          <el-table-column prop="speed" label="序列化速度" width="150"></el-table-column>
          <el-table-column prop="compatibility" label="兼容性"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>压力测试性能指标</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="延迟分布">
              <div class="tab-content">
                <div ref="latencyChart" class="mini-chart"></div>
                <div class="performance-notes">
                  <h4>关键指标</h4>
                  <ul>
                    <li><strong>P50延迟:</strong> 15ms</li>
                    <li><strong>P95延迟:</strong> 45ms</li>
                    <li><strong>P99延迟:</strong> 120ms</li>
                    <li><strong>最大可接受延迟:</strong> 200ms</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="吞吐量">
              <div class="tab-content">
                <div ref="throughputChart" class="mini-chart"></div>
                <div class="performance-notes">
                  <h4>测试结果</h4>
                  <ul>
                    <li><strong>单服务器最大QPS:</strong> 45,000</li>
                    <li><strong>集群最大QPS:</strong> 180,000</li>
                    <li><strong>瓶颈点:</strong> 数据库写入</li>
                    <li><strong>优化方向:</strong> 实现读写分离与异步写入</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="资源消耗">
              <div class="tab-content">
                <div ref="resourceChart" class="mini-chart"></div>
                <div class="performance-notes">
                  <h4>资源占用</h4>
                  <ul>
                    <li><strong>CPU使用率:</strong> 65% (峰值)</li>
                    <li><strong>内存使用:</strong> 4.2GB (单节点)</li>
                    <li><strong>网络带宽:</strong> 1.2Gbps</li>
                    <li><strong>磁盘I/O:</strong> 6000 IOPS</li>
                  </ul>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>特别说明</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="special-notes">
            <ul>
              <li><strong>所有战斗相关接口必须启用UDP冗余校验</strong> - 确保关键数据不会因网络丢包导致状态不一致</li>
              <li><strong>经济系统接口需实现分布式锁</strong> - 防止货币操作重复执行或冲突</li>
              <li><strong>接口版本管理策略</strong> - 内部服务使用语义化版本号(SemVer)管理接口，版本升级时保持向下兼容</li>
              <li><strong>流量突增应对方案</strong> - 服务间通信实现自适应限流与熔断机制，突发流量通过延迟策略平稳处理</li>
              <li><strong>敏感数据脱敏规则</strong> - 内部传输敏感数据（如账号关联信息、IP地址）应使用脱敏规则处理</li>
              <li><strong>接口监控埋点规范</strong> - 所有核心接口都需埋点监控，收集延迟、错误率、调用量等指标</li>
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

const sequenceDiagram = ref<HTMLElement | null>(null);
const serviceDiagram = ref<HTMLElement | null>(null);
const latencyChart = ref<HTMLElement | null>(null);
const throughputChart = ref<HTMLElement | null>(null);
const resourceChart = ref<HTMLElement | null>(null);

const serviceInterfaces = [
  {
    serviceGroup: '战斗服务',
    interfaceName: '/combat/sync',
    protocol: 'gRPC',
    qpsLimit: '50,000',
    timeout: '300ms'
  },
  {
    serviceGroup: '匹配服务',
    interfaceName: '/matchmaking',
    protocol: 'HTTP/2',
    qpsLimit: '20,000',
    timeout: '1s'
  },
  {
    serviceGroup: '数据服务',
    interfaceName: '/stats/update',
    protocol: 'WebSocket',
    qpsLimit: '100,000',
    timeout: '-'
  },
  {
    serviceGroup: '认证服务',
    interfaceName: '/auth/validate',
    protocol: 'gRPC',
    qpsLimit: '30,000',
    timeout: '500ms'
  },
  {
    serviceGroup: '物品服务',
    interfaceName: '/inventory/sync',
    protocol: 'HTTP/2',
    qpsLimit: '15,000',
    timeout: '800ms'
  }
];

const compressionRules = [
  {
    dataType: '位置坐标',
    algorithm: 'Delta+Zstd',
    threshold: '50Hz',
    precision: '±0.01m'
  },
  {
    dataType: '血量状态',
    algorithm: 'Varint',
    threshold: '-',
    precision: '无'
  },
  {
    dataType: '装备状态',
    algorithm: 'Bitmask',
    threshold: '-',
    precision: '无'
  },
  {
    dataType: '玩家动作',
    algorithm: 'Huffman编码',
    threshold: '100Hz',
    precision: '无'
  },
  {
    dataType: '环境状态',
    algorithm: 'LZ4',
    threshold: '10Hz',
    precision: '可配置'
  }
];

const serializationData = [
  {
    format: 'Protobuf',
    size: '45KB',
    speed: '快',
    compatibility: '高'
  },
  {
    format: 'JSON',
    size: '120KB',
    speed: '中',
    compatibility: '极高'
  },
  {
    format: 'MessagePack',
    size: '60KB',
    speed: '快',
    compatibility: '中高'
  },
  {
    format: 'FlatBuffers',
    size: '52KB',
    speed: '极快',
    compatibility: '中'
  }
];

onMounted(() => {
  if (sequenceDiagram.value) {
    const mermaidCode = `
      sequenceDiagram
        participant 客户端
        participant 网关服务
        participant 战斗服务
        participant 数据服务
        
        客户端->>+网关服务: 战斗指令
        网关服务->>+战斗服务: 转发请求
        战斗服务->>+数据服务: 更新统计
        数据服务-->>-战斗服务: 确认响应
        战斗服务-->>-网关服务: 处理结果
        网关服务-->>-客户端: 同步结果
    `;
    createDiagram(sequenceDiagram.value, mermaidCode);
  }
  
  if (serviceDiagram.value) {
    const mermaidCode = `
      graph TD
        A[服务注册] --> B{服务注册中心}
        C[服务发现] --> B
        B --> D[健康检查]
        B --> E[负载均衡]
        
        F[新服务实例] --> A
        C --> G[调用方服务]
        G --> H[被调用服务]
        
        D --> I[实例下线]
        D --> J[实例恢复]
        
        E --> K[轮询策略]
        E --> L[最小连接]
        E --> M[一致性哈希]
        E --> N[区域感知]
    `;
    createDiagram(serviceDiagram.value, mermaidCode);
  }
  
  if (latencyChart.value) {
    const mermaidCode = `
      graph LR
        A["延迟分布<br/>P50: 15ms<br/>P95: 45ms<br/>P99: 120ms"]
        style A fill:#000,stroke:#FFD700,color:#FFD700
    `;
    createDiagram(latencyChart.value, mermaidCode);
  }
  
  if (throughputChart.value) {
    const mermaidCode = `
      graph LR
        A["吞吐量<br/>单节点: 45K QPS<br/>集群: 180K QPS"]
        style A fill:#000,stroke:#FFD700,color:#FFD700
    `;
    createDiagram(throughputChart.value, mermaidCode);
  }
  
  if (resourceChart.value) {
    const mermaidCode = `
      graph LR
        A["资源消耗<br/>CPU: 65%<br/>内存: 4.2GB<br/>网络: 1.2Gbps"]
        style A fill:#000,stroke:#FFD700,color:#FFD700
    `;
    createDiagram(resourceChart.value, mermaidCode);
  }
});
</script>

<style scoped>
.interface-regulations {
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

.mini-chart {
  min-height: 100px;
  padding: 10px;
  border-radius: 4px;
  background-color: #000000;
}

.performance-notes {
  margin-top: 15px;
  padding: 10px;
}

.performance-notes h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.performance-notes ul {
  padding-left: 20px;
  margin-bottom: 0;
}

.performance-notes li {
  margin-bottom: 8px;
}

.tab-content {
  padding: 15px;
}

.special-notes ul {
  padding-left: 20px;
}

.special-notes li {
  margin-bottom: 15px;
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