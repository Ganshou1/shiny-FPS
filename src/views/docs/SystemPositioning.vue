<template>
  <div class="system-architecture">
    <h2>系统架构设计</h2>
    
    <div class="section">
      <h3>1.1 分布式服务器架构</h3>
      <h4>1.1.1 区域部署方案</h4>
      
      <div class="dark-content-box">
        <el-table :data="deploymentData" border style="width: 100%">
          <el-table-column prop="region" label="区域" width="180"></el-table-column>
          <el-table-column prop="nodes" label="物理节点" width="180"></el-table-column>
          <el-table-column prop="capacity" label="承载容量" width="180"></el-table-column>
          <el-table-column prop="backup" label="热备方案"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>服务器架构图</h3>
      <div ref="architectureDiagram" class="diagram-container dark-content-box"></div>
    </div>
    
    <div class="section">
      <h3>1.2 战斗同步模型</h3>
      <div class="dark-content-box">
        <el-table :data="syncModelData" border style="width: 100%">
          <el-table-column prop="param" label="参数" width="180"></el-table-column>
          <el-table-column prop="standard" label="标准值" width="180"></el-table-column>
          <el-table-column prop="extreme" label="极限值"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>网络传输协议</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="protocol-info">
            <h4>安全传输要求</h4>
            <ul>
              <li><strong>基础协议：</strong> TLS 1.3 + 自定义二进制协议</li>
              <li><strong>网络隔离：</strong> 战斗服需实现物理隔离的网络平面</li>
              <li><strong>验证机制：</strong> 敏感操作需三重验证（设备+行为+生物特征）</li>
              <li><strong>架构模式：</strong> 零信任架构设计关键系统</li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>负载均衡策略</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="全局负载均衡">
              <div class="tab-content">
                <p>采用地理位置感知的DNS解析，将玩家请求路由到最近的区域网关。</p>
                <p>使用Anycast技术广播多个入口IP，自动选择最优路径。</p>
                <p>实现跨区域容量监控，当区域负载超过80%时触发玩家分流机制。</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="区域内均衡">
              <div class="tab-content">
                <p>基于一致性哈希算法分配战斗实例，确保相同玩家组总是路由到相同服务器。</p>
                <p>实现动态权重调整，根据服务器负载状态自动调整分配权重。</p>
                <p>支持热点识别与隔离，防止单一热门游戏模式影响整体服务质量。</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="容灾切换">
              <div class="tab-content">
                <p>亚太区域采用双活架构，两个数据中心同时提供服务，任一中心故障时无缝切换。</p>
                <p>欧美区域采用主备模式，主中心故障时自动激活备用中心，RTO &lt; 5分钟。</p>
                <p>全局数据采用多区域复制，确保关键数据至少在3个物理位置存在副本。</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const architectureDiagram = ref<HTMLElement | null>(null);

const deploymentData = [
  {
    region: '亚太',
    nodes: '东京/新加坡',
    capacity: '50万并发',
    backup: '双活切换'
  },
  {
    region: '欧美',
    nodes: '法兰克福/弗吉尼亚',
    capacity: '30万并发',
    backup: '冷备+自动漂移'
  }
];

const syncModelData = [
  {
    param: '状态同步频率',
    standard: '64Hz',
    extreme: '128Hz'
  },
  {
    param: '指令延迟补偿',
    standard: '150ms',
    extreme: '300ms'
  },
  {
    param: '回滚预测帧数',
    standard: '3帧',
    extreme: '8帧'
  }
];

onMounted(() => {
  if (architectureDiagram.value) {
    const mermaidCode = `
      graph TD
        A[游戏客户端] --> B[区域网关]
        B --> C[战斗实例]
        B --> D[社交实例]
        C --> E[全局数据库]
        D --> E
        
        subgraph 战斗服务集群
        C --> F[状态同步引擎]
        C --> G[物理计算引擎]
        C --> H[AI决策系统]
        end
        
        subgraph 社交服务集群
        D --> I[好友系统]
        D --> J[队伍匹配]
        D --> K[聊天系统]
        end
        
        subgraph 数据存储层
        E --> L[(玩家数据)]
        E --> M[(游戏配置)]
        E --> N[(战斗记录)]
        end
    `;
    createDiagram(architectureDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.system-architecture {
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

.protocol-info {
  padding: 10px;
}

.protocol-info ul {
  padding-left: 20px;
}

.protocol-info li {
  margin-bottom: 10px;
}

.tab-content {
  padding: 15px;
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