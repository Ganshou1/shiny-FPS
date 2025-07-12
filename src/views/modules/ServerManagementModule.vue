<template>
  <div class="server-management-module">
    <h2>服务器管理模块</h2>
        
    <div class="section">
          <h3>5.1 战斗服集群规范</h3>
          
      <el-table :data="serverSpecs" border style="width: 100%">
        <el-table-column prop="type" label="服务器类型" width="180"></el-table-column>
        <el-table-column prop="capacity" label="承载人数" width="180"></el-table-column>
        <el-table-column prop="region" label="部署区域" width="180"></el-table-column>
        <el-table-column prop="heartbeat" label="心跳间隔"></el-table-column>
          </el-table>
          </div>
          
    <div class="section">
      <h3>服务器架构图</h3>
      <div ref="diagramContainer" class="diagram-container"></div>
                  </div>
    
    <div class="section">
      <h3>服务器监控面板</h3>
      <el-row :gutter="20">
            <el-col :span="8">
          <el-card class="status-card">
                <template #header>
                  <div class="card-header">
                <span>服务器状态</span>
                  </div>
                </template>
            <div class="status-content">
              <div class="status-item">
                <span class="status-label">在线服务器:</span>
                <span class="status-value success">42/45</span>
              </div>
              <div class="status-item">
                <span class="status-label">当前玩家:</span>
                <span class="status-value">12,458</span>
              </div>
              <div class="status-item">
                <span class="status-label">平均负载:</span>
                <span class="status-value normal">68%</span>
              </div>
              <div class="status-item">
                <span class="status-label">平均延迟:</span>
                <span class="status-value success">32ms</span>
              </div>
              <div class="status-item">
                <span class="status-label">异常服务器:</span>
                <span class="status-value warning">3</span>
              </div>
            </div>
              </el-card>
            </el-col>
        <el-col :span="16">
          <el-card class="chart-card">
                <template #header>
                  <div class="card-header">
                <span>系统性能监控</span>
                  </div>
                </template>
            <div class="chart-container">
              <system-management-chart></system-management-chart>
            </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        
    <div class="section">
      <h3>服务器列表</h3>
      <el-card>
        <template #header>
          <div class="card-header">
            <div class="search-bar">
              <el-input 
                v-model="searchQuery" 
                placeholder="搜索服务器" 
                prefix-icon="Search"
                clearable
                @input="filterServers"
              ></el-input>
              <el-select v-model="regionFilter" placeholder="区域筛选" @change="filterServers">
                <el-option label="全部区域" value=""></el-option>
                <el-option label="亚洲" value="Asia"></el-option>
                <el-option label="欧洲" value="Europe"></el-option>
                <el-option label="北美" value="North America"></el-option>
              </el-select>
              <el-select v-model="typeFilter" placeholder="类型筛选" @change="filterServers">
                <el-option label="全部类型" value=""></el-option>
                <el-option label="竞技服" value="Competitive"></el-option>
                <el-option label="休闲服" value="Casual"></el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="addServer">添加服务器</el-button>
          </div>
        </template>
        <el-table :data="filteredServers" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="100"></el-table-column>
          <el-table-column prop="name" label="服务器名称" width="180"></el-table-column>
          <el-table-column prop="type" label="类型" width="120"></el-table-column>
          <el-table-column prop="region" label="区域" width="120"></el-table-column>
          <el-table-column prop="ip" label="IP地址" width="150"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="players" label="在线玩家" width="100"></el-table-column>
          <el-table-column prop="load" label="负载" width="120">
                      <template #default="scope">
              <el-progress :percentage="scope.row.load" :status="getLoadStatus(scope.row.load)"></el-progress>
                      </template>
                    </el-table-column>
          <el-table-column label="操作">
                      <template #default="scope">
              <el-button size="small" @click="viewServer(scope.row)">查看</el-button>
              <el-button size="small" type="primary" @click="editServer(scope.row)">编辑</el-button>
              <el-button 
                size="small" 
                :type="scope.row.status === '运行中' ? 'danger' : 'success'"
                @click="toggleServerStatus(scope.row)"
              >
                {{ scope.row.status === '运行中' ? '停止' : '启动' }}
              </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalServers"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-card>
          </div>
          
    <div class="section">
      <h3>服务器配置</h3>
      <el-card>
        <el-form :model="serverConfig" label-width="120px">
          <el-form-item label="最大连接数">
            <el-input-number v-model="serverConfig.maxConnections" :min="10" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="超时时间">
            <el-input-number v-model="serverConfig.timeout" :min="1000" :max="60000"></el-input-number>
            <span class="form-hint">毫秒</span>
          </el-form-item>
          <el-form-item label="心跳检测间隔">
            <el-input-number v-model="serverConfig.heartbeatInterval" :min="100" :max="10000"></el-input-number>
            <span class="form-hint">毫秒</span>
          </el-form-item>
          <el-form-item label="自动扩容">
            <el-switch v-model="serverConfig.autoScaling"></el-switch>
          </el-form-item>
          <el-form-item label="负载阈值" v-if="serverConfig.autoScaling">
            <el-slider v-model="serverConfig.loadThreshold" :min="50" :max="95" :step="5"></el-slider>
            <span class="form-hint">{{ serverConfig.loadThreshold }}% 时触发扩容</span>
          </el-form-item>
          <el-form-item label="日志级别">
            <el-select v-model="serverConfig.logLevel">
              <el-option label="DEBUG" value="debug"></el-option>
              <el-option label="INFO" value="info"></el-option>
              <el-option label="WARN" value="warn"></el-option>
              <el-option label="ERROR" value="error"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveServerConfig">保存配置</el-button>
            <el-button @click="resetServerConfig">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { createDiagram } from '@/utils/diagramUtil';
import SystemManagementChart from '@/components/SystemManagementChart.vue';

const diagramContainer = ref<HTMLElement | null>(null);

const serverSpecs = [
  {
    type: '竞技服',
    capacity: '64人',
    region: '全球8区',
    heartbeat: '1s'
  },
  {
    type: '休闲服',
    capacity: '128人',
    region: '主要国家',
    heartbeat: '3s'
  },
  {
    type: '训练服',
    capacity: '32人',
    region: '主要国家',
    heartbeat: '2s'
  }
];

// 服务器列表数据
const servers = ref([
  { id: 'SV001', name: '亚洲竞技服-1', type: 'Competitive', region: 'Asia', ip: '192.168.1.1', status: '运行中', players: 58, load: 90 },
  { id: 'SV002', name: '亚洲竞技服-2', type: 'Competitive', region: 'Asia', ip: '192.168.1.2', status: '运行中', players: 45, load: 70 },
  { id: 'SV003', name: '欧洲竞技服-1', type: 'Competitive', region: 'Europe', ip: '192.168.2.1', status: '运行中', players: 62, load: 95 },
  { id: 'SV004', name: '欧洲休闲服-1', type: 'Casual', region: 'Europe', ip: '192.168.2.2', status: '运行中', players: 110, load: 85 },
  { id: 'SV005', name: '北美竞技服-1', type: 'Competitive', region: 'North America', ip: '192.168.3.1', status: '运行中', players: 50, load: 78 },
  { id: 'SV006', name: '北美休闲服-1', type: 'Casual', region: 'North America', ip: '192.168.3.2', status: '维护中', players: 0, load: 0 },
  { id: 'SV007', name: '亚洲训练服-1', type: 'Training', region: 'Asia', ip: '192.168.1.3', status: '故障', players: 0, load: 0 },
  { id: 'SV008', name: '北美竞技服-2', type: 'Competitive', region: 'North America', ip: '192.168.3.3', status: '运行中', players: 48, load: 75 }
]);

// 筛选和分页
const searchQuery = ref('');
const regionFilter = ref('');
const typeFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(5);

const filteredServers = computed(() => {
  let result = servers.value;
  
  if (searchQuery.value) {
    result = result.filter(server => 
      server.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      server.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (regionFilter.value) {
    result = result.filter(server => server.region === regionFilter.value);
  }
  
  if (typeFilter.value) {
    result = result.filter(server => server.type === typeFilter.value);
  }
  
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return result.slice(startIndex, startIndex + pageSize.value);
});

const totalServers = computed(() => {
  let result = servers.value;
  
  if (searchQuery.value) {
    result = result.filter(server => 
      server.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      server.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (regionFilter.value) {
    result = result.filter(server => server.region === regionFilter.value);
  }
  
  if (typeFilter.value) {
    result = result.filter(server => server.type === typeFilter.value);
  }
  
  return result.length;
});

// 服务器配置
const serverConfig = ref({
  maxConnections: 200,
  timeout: 5000,
  heartbeatInterval: 1000,
  autoScaling: true,
  loadThreshold: 80,
  logLevel: 'info'
});

const filterServers = () => {
  currentPage.value = 1;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const getStatusType = (status: string) => {
  switch (status) {
    case '运行中': return 'success';
    case '维护中': return 'warning';
    case '故障': return 'danger';
    default: return 'info';
  }
};

const getLoadStatus = (load: number) => {
  if (load >= 90) return 'exception';
  if (load >= 70) return 'warning';
  return 'success';
};

const viewServer = (server: any) => {
  console.log('查看服务器:', server);
  // 实际项目中这里会打开服务器详情页面
};

const editServer = (server: any) => {
  console.log('编辑服务器:', server);
  // 实际项目中这里会打开服务器编辑对话框
};

const toggleServerStatus = (server: any) => {
  console.log('切换服务器状态:', server);
  // 实际项目中这里会调用API来启动/停止服务器
  server.status = server.status === '运行中' ? '维护中' : '运行中';
  server.players = server.status === '运行中' ? Math.floor(Math.random() * 50) + 10 : 0;
  server.load = server.status === '运行中' ? Math.floor(Math.random() * 50) + 40 : 0;
};

const addServer = () => {
  console.log('添加服务器');
  // 实际项目中这里会打开添加服务器对话框
};

const saveServerConfig = () => {
  console.log('保存服务器配置:', serverConfig.value);
  // 实际项目中这里会调用API来保存配置
};

const resetServerConfig = () => {
  serverConfig.value = {
    maxConnections: 200,
    timeout: 5000,
    heartbeatInterval: 1000,
    autoScaling: true,
    loadThreshold: 80,
    logLevel: 'info'
  };
};

onMounted(() => {
  if (diagramContainer.value) {
    const mermaidCode = `
      graph TD
        A[负载均衡器] --> B[亚洲区服务器集群]
        A --> C[欧洲区服务器集群]
        A --> D[北美区服务器集群]
        
        subgraph 亚洲区
        B --> B1[竞技服-1]
        B --> B2[竞技服-2]
        B --> B3[休闲服-1]
        end
        
        subgraph 欧洲区
        C --> C1[竞技服-1]
        C --> C2[休闲服-1]
        end
        
        subgraph 北美区
        D --> D1[竞技服-1]
        D --> D2[竞技服-2]
        D --> D3[休闲服-1]
        end
        
        E[数据中心] --- A
        E --- F[匹配服务]
        E --- G[账号服务]
        E --- H[排行榜服务]
    `;
    createDiagram(diagramContainer.value, mermaidCode);
  }
});
</script>

<style scoped>
.server-management-module {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 400px;
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-card, .chart-card {
  margin-bottom: 20px;
  height: 100%;
}

.status-content {
  padding: 10px;
}

.status-item {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.status-label {
  font-weight: bold;
}

.status-value {
  font-size: 16px;
}

.status-value.success {
  color: #67c23a;
}

.status-value.warning {
  color: #e6a23c;
}

.status-value.danger {
  color: #f56c6c;
}

.status-value.normal {
  color: #409eff;
}

.chart-container {
  height: 300px;
}

.search-bar {
  display: flex;
  gap: 10px;
  flex: 1;
  margin-right: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.form-hint {
  margin-left: 10px;
  color: #909399;
}
</style> 