<template>
  <el-card class="table-card">
    <div class="table-header">
      <el-input
        v-model="searchText"
        placeholder="搜索玩家ID/名称"
        clearable
        style="width: 240px"
        @change="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <div class="table-actions">
        <el-button type="primary" @click="exportData">
          <el-icon><Download /></el-icon>导出CSV
        </el-button>
        <el-dropdown @command="handleBulkAction">
          <el-button>
            批量操作<el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="ban">批量封禁</el-dropdown-item>
              <el-dropdown-item command="unban">批量解封</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-table
      :data="filteredPlayersList"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45" />
      <el-table-column prop="id" label="玩家ID" width="180" />
      <el-table-column prop="name" label="昵称" width="120">
        <template #default="{ row }">
          <el-tag v-if="row.banned" effect="dark" type="danger">已封禁</el-tag>
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rank" label="段位" width="100">
        <template #default="{ row }">
          <rank-badge :rank="row.rank" />
        </template>
      </el-table-column>
      <el-table-column prop="kda" label="KDA" sortable width="100">
        <template #default="{ row }">
          <el-tooltip :content="`击杀: ${Math.round(row.kda * 3)} 死亡: ${Math.round(row.kda * 1.2)}`">
            <div class="kda-progress">
              <el-progress 
                :percentage="Math.min(100, row.kda * 20)" 
                :color="getKdaColor(row.kda)"
              />
              <span class="kda-value">{{ row.kda.toFixed(2) }}</span>
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="headshotRate" label="爆头率" sortable width="120">
        <template #default="{ row }">
          <el-tag :type="row.headshotRate > 50 ? 'success' : 'info'">
            {{ row.headshotRate }}%
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="常用武器" width="180">
        <template #default="{ row }">
          <weapon-stack :weapons="row.weaponStats.slice(0, 3)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="showDetail(row)">详情</el-button>
          <el-dropdown trigger="click">
            <el-button size="small">
              <el-icon><More /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="banPlayer(row.id)">
                  {{ row.banned ? '解封' : '封禁' }}
                </el-dropdown-item>
                <el-dropdown-item @click="showMatchHistory(row.id)">比赛记录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="totalPlayers"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      class="pagination"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Search, Download, ArrowDown, More } from '@element-plus/icons-vue';
import { Player, WeaponStat } from '../types';
import { ElMessage } from 'element-plus';
import RankBadge from './RankBadge.vue';
import WeaponStack from './WeaponStack.vue';

const props = defineProps<{
  players: Player[]
}>();

const emits = defineEmits<{
  (e: 'ban', playerId: string, isBanned: boolean): void
  (e: 'detail', player: Player): void
}>();

// 数据逻辑
const searchText = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const loading = ref(false);
const selectedPlayers = ref<Player[]>([]);

const filteredPlayersList = computed(() => {
  const filtered = props.players.filter(p => 
    p.name.toLowerCase().includes(searchText.value.toLowerCase()) || 
    p.id.toLowerCase().includes(searchText.value.toLowerCase())
  );
  
  return filtered.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});

const totalPlayers = computed(() => {
  return props.players.filter(p => 
    p.name.toLowerCase().includes(searchText.value.toLowerCase()) || 
    p.id.toLowerCase().includes(searchText.value.toLowerCase())
  ).length;
});

// 交互方法
const handleSearch = () => {
  currentPage.value = 1;
};

const handleSelectionChange = (val: Player[]) => {
  selectedPlayers.value = val;
};

const showDetail = (player: Player) => {
  emits('detail', player);
};

const banPlayer = (playerId: string) => {
  const player = props.players.find(p => p.id === playerId);
  if (player) {
    emits('ban', playerId, !player.banned);
  }
};

const showMatchHistory = (playerId: string) => {
  const player = props.players.find(p => p.id === playerId);
  if (player) {
    // 实际项目中可以导航到比赛记录页面
    console.log('显示玩家比赛记录', player.matchHistory);
  }
};

const handleBulkAction = (command: string) => {
  if (selectedPlayers.value.length === 0) {
    ElMessage.warning('请先选择玩家');
    return;
  }

  const isBan = command === 'ban';
  selectedPlayers.value.forEach(player => {
    emits('ban', player.id, isBan);
  });
  
  ElMessage.success(`已${isBan ? '封禁' : '解封'}${selectedPlayers.value.length}名玩家`);
};

const exportData = () => {
  // 导出逻辑实现
  const csvContent = 'data:text/csv;charset=utf-8,' + 
    'ID,昵称,段位,KDA,爆头率,封禁状态\n' + 
    props.players.map(p => {
      return `${p.id},"${p.name}",${p.rank},${p.kda},${p.headshotRate}%,${p.banned ? '已封禁' : '正常'}`;
    }).join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', '玩家数据.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getKdaColor = (kda: number) => {
  if (kda >= 4) return '#67C23A';
  if (kda >= 2) return '#409EFF';
  if (kda >= 1) return '#E6A23C';
  return '#F56C6C';
};
</script>

<style scoped>
.table-card {
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.table-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

.kda-progress {
  position: relative;
  width: 100%;
}

.kda-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: bold;
}
</style> 