<template>
  <div class="server-status-container">
    <el-card class="server-status-card">
      <template #header>
        <div class="card-header">
          <h3>服务器状态</h3>
          <el-tag type="success">{{ totalOnlinePlayers }} 玩家在线</el-tag>
        </div>
      </template>
      
      <el-table 
        :data="servers" 
        border 
        stripe 
        class="dark-table"
        :row-class-name="() => 'dark-row'"
        :header-cell-class-name="() => 'dark-header'"
        :cell-class-name="() => 'dark-cell'"
      >
        <el-table-column prop="name" label="服务器名称" width="150" />
        <el-table-column prop="map" label="当前地图" width="120" />
        <el-table-column label="玩家数量" width="150">
          <template #default="{ row }">
            <el-progress 
              :percentage="(row.players / row.maxPlayers) * 100" 
              :format="() => `${row.players}/${row.maxPlayers}`"
              :color="getPlayerCountColor(row.players, row.maxPlayers)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="region" label="地区" width="100">
          <template #default="{ row }">
            <el-tag :type="getRegionTagType(row.region)">{{ row.region }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="延迟" width="100">
          <template #default="{ row }">
            <span :class="getPingClass(row.ping)">{{ row.ping }}ms</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="handleConnect(row)">连接</el-button>
            <el-button size="small" type="info" @click="handleViewDetails(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="refresh-info">
        <span class="refresh-text">自动刷新：</span>
        <el-switch v-model="autoRefresh" />
        <span class="last-updated" v-if="lastUpdated">
          上次更新: {{ lastUpdated }}
        </span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ElMessageBox } from 'element-plus';
import { useServerStore } from '@/store/servers';
import type { GameServer } from '@/types';

const serverStore = useServerStore();
const servers = computed(() => serverStore.getAllServers);
const totalOnlinePlayers = computed(() => serverStore.getTotalOnlinePlayers);

const autoRefresh = ref(true);
const lastUpdated = ref('');
let refreshInterval: number;

// 获取玩家数量颜色
const getPlayerCountColor = (players: number, maxPlayers: number) => {
  const ratio = players / maxPlayers;
  if (ratio >= 0.9) return '#F56C6C'; // 接近满员
  if (ratio >= 0.7) return '#E6A23C'; // 较多玩家
  if (ratio >= 0.3) return '#67C23A'; // 适中玩家
  return '#909399'; // 较少玩家
};

// 获取地区标签类型
const getRegionTagType = (region: string) => {
  switch (region) {
    case 'Asia': return 'success';
    case 'Europe': return 'warning';
    case 'NA': return 'danger';
    default: return 'info';
  }
};

// 获取延迟样式
const getPingClass = (ping: number) => {
  if (ping < 30) return 'ping-excellent';
  if (ping < 60) return 'ping-good';
  if (ping < 100) return 'ping-fair';
  return 'ping-poor';
};

// 连接到服务器
const handleConnect = (server: GameServer) => {
  ElMessageBox.confirm(
    `确定要连接到服务器 ${server.name} (${server.map}) 吗？`,
    '连接服务器',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).catch(() => {});
};

// 查看服务器详情
const handleViewDetails = (server: GameServer) => {
  serverStore.setCurrentServer(server);
  // 这里可以导航到服务器详情页面或打开详情对话框
};

// 刷新服务器数据
const refreshData = () => {
  serverStore.updateServerPlayers();
  lastUpdated.value = new Date().toLocaleTimeString();
};

// 组件挂载时加载数据和设置自动刷新
onMounted(() => {
  // 加载模拟数据
  if (servers.value.length === 0) {
    serverStore.loadMockData();
  }
  
  // 设置自动刷新
  refreshData();
  refreshInterval = window.setInterval(() => {
    if (autoRefresh.value) {
      refreshData();
    }
  }, 5000);
});

// 组件卸载时清除定时器
onUnmounted(() => {
  clearInterval(refreshInterval);
});
</script>

<style scoped>
.server-status-container {
  margin-bottom: 20px;
}

.server-status-card {
  width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  color: var(--primary-color); /* 使用金色强调标题 */
}

/* 黑色表格样式 */
.dark-table {
  --el-table-bg-color: var(--darkest-bg) !important;
  --el-table-tr-bg-color: var(--darkest-bg) !important;
  --el-table-border-color: var(--border-color) !important;
  --el-table-header-bg-color: var(--darker-bg) !important;
  --el-table-header-text-color: var(--primary-color) !important;
  --el-table-text-color: var(--text-primary) !important;
  --el-table-row-hover-bg-color: var(--light-bg) !important;
  background-color: var(--darkest-bg) !important;
}

:deep(.dark-row) {
  background-color: var(--darkest-bg) !important;
}

:deep(.dark-row.el-table__row--striped) {
  background-color: var(--darker-bg) !important;
}

:deep(.dark-cell) {
  background-color: transparent !important;
}

:deep(.dark-header) {
  background-color: var(--darker-bg) !important;
  color: var(--primary-color) !important;
}

:deep(.el-table__header) {
  background-color: var(--darker-bg) !important;
}

:deep(.el-table__body) {
  background-color: var(--darkest-bg) !important;
}

:deep(.el-table__body tr:hover > td) {
  background-color: var(--light-bg) !important;
}

:deep(.el-table--border::after),
:deep(.el-table--group::after),
:deep(.el-table::before) {
  background-color: var(--border-color) !important;
}

:deep(.el-table td), 
:deep(.el-table th.is-leaf) {
  border-bottom: 1px solid var(--border-color) !important;
}

.refresh-info {
  margin-top: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.refresh-text {
  color: var(--text-primary); /* 更改为主要文本颜色 */
}

.last-updated {
  margin-left: 15px;
  color: var(--primary-color); /* 更改为金色，让更新时间更明显 */
}

.ping-excellent {
  color: #67C23A;
  font-weight: bold;
}

.ping-good {
  color: #409EFF;
}

.ping-fair {
  color: #E6A23C;
}

.ping-poor {
  color: #F56C6C;
  font-weight: bold;
}
</style> 