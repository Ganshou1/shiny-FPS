<template>
  <div class="data-storage">
    <h2>数据存储规范</h2>
    
    <div class="section">
      <h3>2.1 存储分层设计</h3>
      <h4>2.1.1 数据生命周期</h4>
      
      <div class="dark-content-box">
        <el-table :data="dataLifecycleData" border style="width: 100%">
          <el-table-column prop="type" label="数据类型" width="180"></el-table-column>
          <el-table-column prop="storage" label="存储介质" width="180"></el-table-column>
          <el-table-column prop="policy" label="保留策略"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>存储架构图</h3>
      <div ref="storageDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>2.2 关键数据表结构</h3>
      <div class="dark-content-box">
        <el-table :data="dataTableData" border style="width: 100%">
          <el-table-column prop="name" label="表名" width="180"></el-table-column>
          <el-table-column prop="qps" label="QPS要求" width="180"></el-table-column>
          <el-table-column prop="sharding" label="分片策略" width="180"></el-table-column>
          <el-table-column prop="index" label="索引方案"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>数据库ER关系图</h3>
      <div ref="erDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>缓存策略</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="多级缓存架构">
              <div class="tab-content">
                <h4>缓存层级</h4>
                <ol>
                  <li>
                    <strong>L1: 客户端缓存</strong>
                    <p>用于存储非敏感的静态资源和配置数据，减少网络请求</p>
                    <p>有效期: 根据资源类型，从1小时到7天不等</p>
                  </li>
                  <li>
                    <strong>L2: CDN缓存</strong>
                    <p>用于全局静态资源分发，提高访问速度</p>
                    <p>有效期: 根据资源更新频率，一般为24小时，支持主动刷新</p>
                  </li>
                  <li>
                    <strong>L3: 应用层缓存 (Redis)</strong>
                    <p>用于存储热点数据，如排行榜、在线状态、会话信息等</p>
                    <p>有效期: 从30秒到12小时不等，根据数据更新频率设置</p>
                  </li>
                  <li>
                    <strong>L4: 数据库查询缓存</strong>
                    <p>用于缓存频繁执行的数据库查询结果</p>
                    <p>有效期: 通常为5-15分钟，或基于数据变更事件失效</p>
                  </li>
                </ol>
              </div>
            </el-tab-pane>
            <el-tab-pane label="缓存更新策略">
              <div class="tab-content">
                <h4>更新模式</h4>
                <ul>
                  <li>
                    <strong>写透模式 (Write-Through)</strong>
                    <p>同时更新缓存和数据库，确保一致性，适用于高一致性要求场景</p>
                  </li>
                  <li>
                    <strong>写回模式 (Write-Back)</strong>
                    <p>先更新缓存，异步更新数据库，提高写入性能，适用于高并发写入场景</p>
                  </li>
                  <li>
                    <strong>写旁模式 (Write-Around)</strong>
                    <p>直接写入数据库，使缓存失效，适用于写入后不立即读取的数据</p>
                  </li>
                </ul>
                <h4>失效策略</h4>
                <ul>
                  <li>
                    <strong>基于时间的失效 (TTL)</strong>
                    <p>为不同类型的缓存数据设置合适的过期时间</p>
                  </li>
                  <li>
                    <strong>基于事件的失效</strong>
                    <p>通过消息队列通知相关缓存节点进行数据失效</p>
                  </li>
                  <li>
                    <strong>版本控制</strong>
                    <p>使用版本号标记缓存数据，确保读取最新版本</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="数据一致性保障">
              <div class="tab-content">
                <h4>一致性策略</h4>
                <ul>
                  <li>
                    <strong>最终一致性</strong>
                    <p>适用于大部分游戏数据，允许短时间的不一致，降低系统复杂度</p>
                  </li>
                  <li>
                    <strong>强一致性</strong>
                    <p>适用于关键交易数据，如充值、消费等，确保数据准确性</p>
                  </li>
                </ul>
                <h4>数据同步机制</h4>
                <ul>
                  <li>
                    <strong>实时同步</strong>
                    <p>通过变更数据捕获(CDC)技术，实时同步关键数据变更</p>
                  </li>
                  <li>
                    <strong>批量同步</strong>
                    <p>定期执行批量同步任务，处理大量非实时数据</p>
                  </li>
                  <li>
                    <strong>冲突解决</strong>
                    <p>实现基于时间戳或版本号的冲突检测与解决机制</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>备份与恢复策略</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="backup-strategy">
            <h4>备份计划</h4>
            <el-table :data="backupPlanData" border style="width: 100%">
              <el-table-column prop="type" label="备份类型" width="180"></el-table-column>
              <el-table-column prop="frequency" label="频率" width="180"></el-table-column>
              <el-table-column prop="retention" label="保留期" width="180"></el-table-column>
              <el-table-column prop="storage" label="存储位置"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">恢复目标</h4>
            <ul>
              <li><strong>RTO (恢复时间目标):</strong> &lt; 30分钟</li>
              <li><strong>RPO (恢复点目标):</strong> &lt; 5分钟</li>
            </ul>
            
            <h4 class="mt-20">验证机制</h4>
            <p>每周执行一次备份恢复演练，验证备份数据的完整性和恢复流程的有效性。演练包括：</p>
            <ul>
              <li>随机选择备份数据进行恢复测试</li>
              <li>验证数据完整性和一致性</li>
              <li>测量实际恢复时间，确保符合RTO要求</li>
              <li>生成演练报告，记录问题和改进建议</li>
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

const storageDiagram = ref<HTMLElement | null>(null);
const erDiagram = ref<HTMLElement | null>(null);

const dataLifecycleData = [
  {
    type: '战斗回放',
    storage: '对象存储',
    policy: '30天自动归档'
  },
  {
    type: '玩家档案',
    storage: 'Redis+MySQL',
    policy: '永久+冷备'
  },
  {
    type: '行为日志',
    storage: 'Elasticsearch',
    policy: '滚动删除(180天)'
  }
];

const dataTableData = [
  {
    name: 'player_stats',
    qps: '50,000',
    sharding: '按玩家ID哈希',
    index: '复合索引(season+rank)'
  },
  {
    name: 'weapon_meta',
    qps: '1,000',
    sharding: '不分片',
    index: '全内存缓存'
  },
  {
    name: 'match_history',
    qps: '20,000',
    sharding: '按时间范围',
    index: '倒排索引'
  }
];

const backupPlanData = [
  {
    type: '全量备份',
    frequency: '每日一次',
    retention: '30天',
    storage: '对象存储 + 异地备份'
  },
  {
    type: '增量备份',
    frequency: '每小时一次',
    retention: '7天',
    storage: '本地存储 + 对象存储'
  },
  {
    type: '事务日志',
    frequency: '实时',
    retention: '48小时',
    storage: '高性能存储'
  },
  {
    type: '配置备份',
    frequency: '每次变更',
    retention: '永久',
    storage: '版本控制系统'
  }
];

onMounted(() => {
  if (storageDiagram.value) {
    const mermaidCode = `
      flowchart TD
        A[游戏数据] --> B{数据类型}
        B -->|实时数据| C[内存数据库]
        B -->|热数据| D[Redis集群]
        B -->|温数据| E[MySQL集群]
        B -->|冷数据| F[对象存储]
        
        C --> G[战斗状态]
        C --> H[在线玩家]
        
        D --> I[排行榜]
        D --> J[会话信息]
        D --> K[临时活动数据]
        
        E --> L[玩家档案]
        E --> M[游戏配置]
        E --> N[交易记录]
        
        F --> O[战斗回放]
        F --> P[历史日志]
        F --> Q[归档数据]
        
        R[数据同步服务] --> C
        R --> D
        R --> E
        R --> F
    `;
    createDiagram(storageDiagram.value, mermaidCode);
  }
  
  if (erDiagram.value) {
    const mermaidCode = `
      erDiagram
        PLAYER {
            string player_id PK
            string username
            int rank
            datetime created_at
            datetime last_login
            boolean is_banned
        }
        
        PLAYER_STATS {
            string player_id PK, FK
            int season PK
            int kills
            int deaths
            float kda
            float headshot_rate
            int matches_played
            int matches_won
        }
        
        WEAPON {
            string weapon_id PK
            string name
            string type
            int damage
            float fire_rate
            int magazine_size
        }
        
        PLAYER_WEAPON_STATS {
            string player_id PK, FK
            string weapon_id PK, FK
            int kills
            int headshots
            float accuracy
            int usage_time
        }
        
        MATCH {
            string match_id PK
            string map_id FK
            datetime start_time
            datetime end_time
            string match_type
            string server_id
        }
        
        MATCH_PLAYER {
            string match_id PK, FK
            string player_id PK, FK
            string team
            int score
            int kills
            int deaths
            int assists
        }
        
        PLAYER ||--o{ PLAYER_STATS : has
        PLAYER ||--o{ PLAYER_WEAPON_STATS : has
        WEAPON ||--o{ PLAYER_WEAPON_STATS : tracked_for
        PLAYER ||--o{ MATCH_PLAYER : participates_in
        MATCH ||--o{ MATCH_PLAYER : includes
    `;
    createDiagram(erDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.data-storage {
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
}

.tab-content ul, .tab-content ol {
  padding-left: 20px;
}

.tab-content li {
  margin-bottom: 15px;
}

.tab-content p {
  margin: 5px 0;
}

.backup-strategy {
  padding: 10px;
}

.mt-20 {
  margin-top: 20px;
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