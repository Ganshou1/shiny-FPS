<template>
  <div class="home-container">
    <!-- FPS模块导航 -->
    <div class="modules-section">
      <h2 class="section-title">FPS游戏管理系统模块</h2>
      <el-row :gutter="20">
        <el-col :span="4" v-for="module in fpsModules" :key="module.path">
          <router-link :to="module.path" class="module-link">
            <el-card class="module-card" :body-style="{ padding: '0' }" shadow="hover">
              <div class="module-card-content">
                <el-icon :size="32"><component :is="module.icon" /></el-icon>
                <div class="module-title">{{ module.title }}</div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
    
    <!-- Statistics Cards -->
    <div class="stats-section">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(card, index) in statCards" :key="index">
          <el-card class="stat-card" :body-style="{ padding: '20px' }">
            <div class="stat-card-content" :style="{ color: card.color }">
              <div class="stat-icon">
                <el-icon :size="32"><component :is="card.icon" /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ card.value }}</div>
                <div class="stat-title">{{ card.title }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    
    <!-- Charts Section -->
    <div class="charts-section">
      <el-row :gutter="20">
        <!-- 玩家活跃度图表 -->
        <el-col :span="12">
          <PlayerActivityChart />
        </el-col>
        
        <!-- 武器使用统计 -->
        <el-col :span="12">
          <WeaponStats />
        </el-col>
      </el-row>
    </div>
    
    <!-- 服务器状态 -->
    <div class="server-section">
      <ServerStatus />
    </div>
    
    <!-- 最近比赛记录 -->
    <div class="matches-section">
      <el-card>
        <template #header>
          <div class="matches-header">
            <span>最近比赛</span>
            <el-button type="primary" size="small">查看所有比赛</el-button>
          </div>
        </template>
        <el-table :data="recentMatches" style="width: 100%">
          <el-table-column prop="id" label="比赛ID" width="120" />
          <el-table-column prop="map" label="地图" width="120" />
          <el-table-column label="比分" width="120">
            <template #default="{ row }">
              <span class="match-score">
                {{ row.teams[0].score }} : {{ row.teams[1].score }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="队伍" min-width="200">
            <template #default="{ row }">
              <div class="teams-info">
                <el-tag type="success">{{ row.teams[0].name }}</el-tag>
                <span class="vs-text">vs</span>
                <el-tag type="danger">{{ row.teams[1].name }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时长" width="100">
            <template #default="{ row }">
              {{ row.duration }}分钟
            </template>
          </el-table-column>
          <el-table-column label="日期" width="180">
            <template #default="{ row }">
              {{ formatDate(row.date) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button size="small" type="primary" @click="viewMatchDetails(row)">
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    
    <!-- 玩家管理 -->
    <div class="players-section">
      <el-card>
        <template #header>
          <div class="players-header">
            <span>玩家管理</span>
            <div class="header-actions">
              <el-input
                v-model="playerSearch"
                placeholder="搜索玩家"
                prefix-icon="Search"
                clearable
                style="width: 200px; margin-right: 10px;"
              />
              <el-button type="success" size="small">添加玩家</el-button>
            </div>
          </div>
        </template>
        <el-table :data="filteredPlayers" style="width: 100%">
          <el-table-column prop="name" label="玩家名称" width="150" />
          <el-table-column prop="id" label="Steam ID" width="180" />
          <el-table-column prop="rank" label="段位" width="120">
            <template #default="{ row }">
              <el-tag :type="getRankTagType(row.rank)">{{ row.rank }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="kda" label="KDA" width="100" sortable />
          <el-table-column prop="headshotRate" label="爆头率" width="120" sortable>
            <template #default="{ row }">
              {{ row.headshotRate }}%
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.banned ? 'danger' : 'success'">
                {{ row.banned ? '封禁' : '正常' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="最后在线" width="180">
            <template #default="{ row }">
              {{ formatDate(row.lastOnline) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button size="small" type="primary" @click="viewPlayerDetails(row)">
                详情
              </el-button>
              <el-button 
                size="small" 
                :type="row.banned ? 'success' : 'danger'"
                @click="row.banned ? unbanPlayer(row) : banPlayer(row)"
              >
                {{ row.banned ? '解封' : '封禁' }}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="totalPlayers"
            layout="total, prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </el-card>
    </div>
    
    <!-- 封禁玩家对话框 -->
    <BanPlayerDialog
      v-if="selectedPlayer"
      v-model:visible="banDialogVisible"
      :player-id="selectedPlayer.id"
      :player-name="selectedPlayer.name"
      @ban-confirmed="handleBanConfirmed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { StatCard } from '@/types';
import { usePlayerStore } from '@/store/players';
import { useMatchStore } from '@/store/matches';
import { useServerStore } from '@/store/servers';
import PlayerActivityChart from '@/components/PlayerActivityChart.vue';
import WeaponStats from '@/components/WeaponStats.vue';
import ServerStatus from '@/components/ServerStatus.vue';
import BanPlayerDialog from '@/components/BanPlayerDialog.vue';
import dayjs from 'dayjs';

// FPS模块导航数据
const fpsModules = [
  {
    title: '用户管理',
    path: '/modules/user',
    icon: 'User'
  },
  {
    title: '游戏内容',
    path: '/modules/content',
    icon: 'Files'
  },
  {
    title: '运营管理',
    path: '/modules/operation',
    icon: 'Trophy'
  },
  {
    title: '数据分析',
    path: '/modules/data',
    icon: 'DataAnalysis'
  },
  {
    title: '服务器管理',
    path: '/modules/server',
    icon: 'Monitor'
  }
];

// 初始化Store
const playerStore = usePlayerStore();
const matchStore = useMatchStore();
const serverStore = useServerStore();

// 统计卡片数据
const statCards = computed<StatCard[]>(() => [
  {
    title: '玩家总数',
    value: playerStore.getAllPlayers.length.toString(),
    icon: 'User',
    color: '#409EFF'
  },
  {
    title: '在线玩家',
    value: serverStore.getTotalOnlinePlayers.toString(),
    icon: 'VideoPlay',
    color: '#67C23A'
  },
  {
    title: '比赛场次',
    value: matchStore.getAllMatches.length.toString(),
    icon: 'Trophy',
    color: '#E6A23C'
  },
  {
    title: '封禁玩家',
    value: playerStore.getBannedPlayers.length.toString(),
    icon: 'CircleClose',
    color: '#F56C6C'
  }
]);

// 最近比赛数据
const recentMatches = computed(() => matchStore.getRecentMatches);

// 玩家分页数据
const playerSearch = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const totalPlayers = computed(() => playerStore.getAllPlayers.length);

// 根据搜索和分页过滤玩家
const filteredPlayers = computed(() => {
  const allPlayers = playerStore.getAllPlayers;
  
  // 搜索过滤
  const searchResult = playerSearch.value
    ? allPlayers.filter(p => 
        p.name.toLowerCase().includes(playerSearch.value.toLowerCase()) ||
        p.id.toLowerCase().includes(playerSearch.value.toLowerCase())
      )
    : allPlayers;
  
  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  
  return searchResult.slice(start, end);
});

// 封禁玩家相关
const banDialogVisible = ref(false);
const selectedPlayer = ref(null);

// 处理页面变化
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 查看比赛详情
const viewMatchDetails = (match) => {
  matchStore.setCurrentMatch(match);
  ElMessageBox.alert(
    `比赛ID: ${match.id}<br>
    地图: ${match.map}<br>
    时长: ${match.duration}分钟<br>
    日期: ${formatDate(match.date)}<br>
    队伍1: ${match.teams[0].name} (${match.teams[0].score})<br>
    队伍2: ${match.teams[1].name} (${match.teams[1].score})`,
    '比赛详情',
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '关闭'
    }
  );
};

// 查看玩家详情
const viewPlayerDetails = (player) => {
  playerStore.setCurrentPlayer(player);
  // 这里可以导航到玩家详情页面或打开详情对话框
};

// 封禁玩家
const banPlayer = (player) => {
  selectedPlayer.value = player;
  banDialogVisible.value = true;
};

// 解封玩家
const unbanPlayer = (player) => {
  ElMessageBox.confirm(
    `确定要解除对玩家 ${player.name} 的封禁吗？`,
    '解除封禁',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    playerStore.unbanPlayer(player.id);
    ElMessage.success('玩家已解封');
  }).catch(() => {});
};

// 处理封禁确认
const handleBanConfirmed = (data) => {
  playerStore.banPlayer(data.playerId, data.reason);
};

// 获取段位标签类型
const getRankTagType = (rank) => {
  switch (rank) {
    case 'Silver': return 'info';
    case 'Gold': return 'warning';
    case 'Diamond': return 'success';
    case 'Global Elite': return 'danger';
    default: return '';
  }
};

// 格式化日期
const formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};
</script>

<style scoped>
.home-container {
  padding: 20px 0;
}

.stats-section, .charts-section, .server-section, .matches-section, .players-section {
  margin-bottom: 20px;
}

.stat-card {
  height: 100%;
}

.stat-card-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  margin-right: 15px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
}

.stat-title {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.matches-header, .players-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.matches-header span, .players-header span {
  color: var(--primary-color);
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
}

.teams-info {
  display: flex;
  align-items: center;
}

.vs-text {
  margin: 0 10px;
  color: var(--text-secondary);
}

.match-score {
  font-weight: bold;
  font-size: 16px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 模块卡片样式 */
.modules-section {
  margin-bottom: 20px;
}

.section-title {
  margin-bottom: 15px;
  color: var(--primary-color, #409EFF);
  font-weight: bold;
  font-size: 20px;
}

.module-link {
  text-decoration: none;
}

.module-card {
  height: 120px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.module-card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-color, #409EFF);
  padding: 15px;
}

.module-title {
  margin-top: 10px;
  font-weight: bold;
}

:deep(.el-table) {
  color: var(--text-primary);
}

:deep(.el-pagination .el-pagination__total) {
  color: var(--text-secondary);
}

:deep(.el-pagination button) {
  color: var(--text-secondary);
}
</style> 