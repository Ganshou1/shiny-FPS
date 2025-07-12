<template>
  <el-dialog
    title="玩家详情"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="70%"
  >
    <div v-if="player" class="player-detail">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="玩家ID">{{ player.id }}</el-descriptions-item>
        <el-descriptions-item label="昵称">
          {{ player.name }}
          <el-tag v-if="player.banned" type="danger" effect="dark" size="small" class="ml-2">
            已封禁
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="段位">
          <rank-badge :rank="player.rank" /> {{ player.rank }}
        </el-descriptions-item>
        <el-descriptions-item label="KDA">{{ player.kda.toFixed(2) }}</el-descriptions-item>
        <el-descriptions-item label="爆头率">{{ player.headshotRate }}%</el-descriptions-item>
        <el-descriptions-item label="最近登录">
          {{ new Date(player.lastOnline).toLocaleString() }}
        </el-descriptions-item>
      </el-descriptions>

      <el-divider>武器使用情况</el-divider>
      
      <el-table :data="player.weaponStats" border style="width: 100%">
        <el-table-column prop="name" label="武器名称"></el-table-column>
        <el-table-column prop="kills" label="击杀数"></el-table-column>
        <el-table-column prop="accuracy" label="命中率">
          <template #default="{ row }">
            <el-progress :percentage="row.accuracy" :color="getAccuracyColor(row.accuracy)"></el-progress>
          </template>
        </el-table-column>
      </el-table>

      <el-divider>比赛历史</el-divider>
      
      <el-table :data="player.matchHistory" border style="width: 100%">
        <el-table-column prop="map" label="地图"></el-table-column>
        <el-table-column prop="result" label="结果">
          <template #default="{ row }">
            <el-tag :type="row.result === 'Win' ? 'success' : 'danger'">
              {{ row.result === 'Win' ? '胜利' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="比分"></el-table-column>
        <el-table-column prop="date" label="日期">
          <template #default="{ row }">
            {{ new Date(row.date).toLocaleString() }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">关闭</el-button>
      <el-button v-if="player && !player.banned" type="danger" @click="banPlayer">
        封禁玩家
      </el-button>
      <el-button v-else-if="player && player.banned" type="warning" @click="unbanPlayer">
        解除封禁
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Player } from '../types';
import RankBadge from './RankBadge.vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  player: Player | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'ban', playerId: string, isBanned: boolean): void;
}>();

const banPlayer = () => {
  if (props.player) {
    emit('ban', props.player.id, true);
    emit('update:modelValue', false);
  }
};

const unbanPlayer = () => {
  if (props.player) {
    emit('ban', props.player.id, false);
    emit('update:modelValue', false);
  }
};

const getAccuracyColor = (accuracy: number) => {
  if (accuracy >= 80) return '#67C23A';
  if (accuracy >= 60) return '#409EFF';
  if (accuracy >= 40) return '#E6A23C';
  return '#F56C6C';
};
</script>

<style scoped>
.player-detail {
  padding: 0 20px;
}

.ml-2 {
  margin-left: 8px;
}

.el-divider {
  margin: 24px 0 16px;
}

.el-table {
  margin-bottom: 20px;
}
</style> 