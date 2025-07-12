<template>
  <div class="weapon-stats-container">
    <el-card class="weapon-stats-card">
      <template #header>
        <div class="card-header">
          <h3>武器热度排行榜</h3>
          <el-button type="primary" size="small">查看详情</el-button>
        </div>
      </template>
      <el-table :data="weaponStats" border stripe>
        <el-table-column prop="name" label="武器" width="180" />
        <el-table-column prop="usageRate" label="使用率" sortable>
          <template #default="{ row }">
            <el-progress :percentage="row.usageRate" :color="getColor(row.usageRate)" />
          </template>
        </el-table-column>
        <el-table-column prop="avgKills" label="场均击杀" sortable />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { WeaponStatistic } from '@/types';
import { mockWeaponStats } from '@/utils/mockWeaponStats';

const weaponStats = ref<WeaponStatistic[]>(mockWeaponStats);

// 根据使用率返回不同的颜色
const getColor = (percentage: number) => {
  if (percentage < 30) return '#909399';
  if (percentage < 50) return '#67c23a';
  if (percentage < 70) return '#e6a23c';
  return '#f56c6c';
};
</script>

<style scoped>
.weapon-stats-container {
  margin-bottom: 20px;
}

.weapon-stats-card {
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
}
</style> 