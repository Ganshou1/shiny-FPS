<template>
  <div class="player-management">
    <h1>玩家管理</h1>
    
    <el-card class="filter-card">
      <div class="filter-placeholder">
        <p>玩家筛选功能将在此处实现</p>
      </div>
    </el-card>
    
    <el-card class="data-card">
      <el-table :data="players" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="name" label="玩家名称" width="180"></el-table-column>
        <el-table-column prop="rank" label="段位"></el-table-column>
        <el-table-column prop="kda" label="KDA"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button size="small" type="danger" @click="handleBan(scope.row)">封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 模拟数据
const players = ref([
  {
    id: '1001',
    name: '玩家1',
    rank: '钻石',
    kda: 2.5,
    status: '在线'
  },
  {
    id: '1002',
    name: '玩家2',
    rank: '黄金',
    kda: 1.8,
    status: '离线'
  },
  {
    id: '1003',
    name: '玩家3',
    rank: '白银',
    kda: 1.2,
    status: '游戏中'
  }
]);

// 处理详情查看
const handleDetail = (player: any) => {
  console.log('查看详情:', player);
};

// 处理封禁
const handleBan = (player: any) => {
  console.log('封禁玩家:', player);
};
</script>

<style scoped>
.player-management {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.filter-placeholder {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.data-card {
  margin-bottom: 20px;
}
</style> 