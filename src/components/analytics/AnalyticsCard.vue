<template>
  <el-card shadow="never" class="analytics-card">
    <template #header>
      <div class="card-header">
        <component :is="icon" class="icon" />
        <span>{{ title }}</span>
        <el-tag v-if="trend !== undefined" :type="trend > 0 ? 'success' : 'danger'" class="trend-tag">
          <el-icon v-if="trend > 0"><ArrowUp /></el-icon>
          <el-icon v-else><ArrowDown /></el-icon>
          {{ trend > 0 ? `${trend}%` : `${Math.abs(trend)}%` }}
        </el-tag>
      </div>
    </template>
    <slot />
    <div v-if="footer" class="card-footer">
      <el-button link type="primary">查看详情</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default: null
  },
  trend: {
    type: Number,
    default: undefined
  },
  footer: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.analytics-card {
  border-radius: 8px;
  height: 100%;
  margin-bottom: 0;
  background-color: var(--darker-bg);
  border: 1px solid var(--gold-border);
  box-shadow: 0 2px 12px 0 var(--shadow-color);
}

:deep(.el-card__header) {
  border-bottom: none;
  padding: 16px 20px;
  background: linear-gradient(90deg, var(--darkest-bg), var(--darker-bg));
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  color: var(--primary-color);
}

.trend-tag {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-footer {
  margin-top: 12px;
  text-align: right;
}

.analytics-card:hover {
  box-shadow: 0 0 15px var(--gold-shadow);
  transform: translateY(-3px);
  transition: all 0.3s ease;
}
</style> 