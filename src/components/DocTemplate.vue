<template>
  <div class="doc-template">
    <el-card class="doc-card">
      <template #header>
        <div class="doc-header">
          <h1 class="doc-title">{{ title }}</h1>
          <div class="doc-actions">
            <el-button type="text">
              <el-icon><Printer /></el-icon> 打印
            </el-button>
            <el-button type="text">
              <el-icon><Share /></el-icon> 分享
            </el-button>
          </div>
        </div>
      </template>
      
      <div class="doc-content">
        <slot></slot>
      </div>
      
      <div class="doc-footer">
        <el-divider></el-divider>
        <div class="doc-meta">
          <span>文档版本：{{ version || 'v1.0.0' }}</span>
          <span>最后更新：{{ updatedAt || '未知' }}</span>
          <span>作者：{{ author || '系统管理员' }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Printer, Share } from '@element-plus/icons-vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  version: String,
  updatedAt: String,
  author: String
});
</script>

<style scoped>
.doc-template {
  padding: 24px;
  background-color: #000000;
}

.doc-card {
  margin-bottom: 24px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
}

.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000000;
}

.doc-title {
  margin: 0;
  font-size: 24px;
  color: var(--primary-color);
  font-weight: 600;
}

.doc-actions {
  display: flex;
  gap: 12px;
}

.doc-content {
  padding: 16px 0;
  min-height: 400px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: #000000;
}

.doc-meta {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 14px;
}

.doc-footer {
  background-color: #000000;
}

/* 媒体查询，在小屏幕上调整元数据为垂直布局 */
@media (max-width: 768px) {
  .doc-meta {
    flex-direction: column;
    gap: 8px;
  }
  
  .doc-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .doc-actions {
    align-self: flex-end;
  }
}

:deep(.el-card__header) {
  background-color: #000000;
  border-bottom: 1px solid var(--gold-border);
}

:deep(.el-card__body) {
  background-color: #000000;
}

:deep(.el-divider) {
  background-color: var(--gold-border);
}

:deep(.el-button--text) {
  color: var(--primary-color);
}

:deep(.el-button--text:hover) {
  color: var(--primary-hover);
}
</style> 