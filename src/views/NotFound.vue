<template>
  <div class="not-found-container">
    <div class="error-content">
      <div class="error-icon">
        <el-icon :size="64"><WarningFilled /></el-icon>
      </div>
      <div class="error-code">404</div>
      <div class="error-title">页面未找到</div>
      <div class="error-description">
        您请求的页面不存在或已被移除
      </div>
      
      <div class="error-suggestions">
        <div class="suggestion-title">您可以尝试以下操作：</div>
        <ul class="suggestion-list">
          <li>检查URL是否正确</li>
          <li>联系系统管理员获取访问权限</li>
          <li>返回管理控制台继续操作</li>
        </ul>
      </div>
      
      <div class="error-actions">
        <el-button type="primary" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          返回控制台
        </el-button>
        <el-button @click="goBack">
          <el-icon><Back /></el-icon>
          返回上一页
        </el-button>
        <el-button type="info" @click="reportIssue">
          <el-icon><Warning /></el-icon>
          报告问题
        </el-button>
      </div>
      
      <div class="system-info">
        <div class="info-title">系统信息</div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">错误代码：</span>
            <span class="info-value">404 Not Found</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务器时间：</span>
            <span class="info-value">{{ currentTime }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">请求路径：</span>
            <span class="info-value">{{ currentPath }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">服务器状态：</span>
            <span class="info-value status-normal">正常运行中</span>
          </div>
        </div>
      </div>
      
      <div class="support-section">
        <div class="support-title">需要帮助？</div>
        <div class="support-content">
          如果您需要访问特定游戏数据或功能，请联系游戏管理员或技术支持团队。
          <div class="support-contact">
            技术支持邮箱：support@fpsgame-admin.com
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { WarningFilled, HomeFilled, Back, Warning } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const currentTime = ref(new Date().toLocaleString())
const currentPath = computed(() => route.fullPath)

// 更新时间
const updateTime = () => {
  currentTime.value = new Date().toLocaleString()
}

// 定时更新时间
let timer: number

function goHome() {
  router.push('/')
}

function goBack() {
  router.go(-1)
}

function reportIssue() {
  ElMessageBox.prompt('请描述您遇到的问题', '报告问题', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    inputPlaceholder: '请输入问题描述...'
  }).then(({ value }) => {
    if (value) {
      ElMessage.success('问题报告已提交，我们将尽快处理')
    }
  }).catch(() => {})
}

onMounted(() => {
  // 设置定时器，每秒更新一次时间
  timer = window.setInterval(updateTime, 1000)
  
  // 添加键盘快捷键
  window.addEventListener('keydown', handleKeyDown)
})

// 组件卸载时清除定时器和事件监听
onUnmounted(() => {
  clearInterval(timer)
  window.removeEventListener('keydown', handleKeyDown)
})

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Home' || event.key === 'h' || event.key === 'H') {
    goHome()
  } else if (event.key === 'Backspace' || event.key === 'b' || event.key === 'B') {
    goBack()
  }
}
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.error-content {
  max-width: 800px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 40px;
  text-align: center;
}

.error-icon {
  color: #e6a23c;
  margin-bottom: 20px;
}

.error-code {
  font-size: 72px;
  font-weight: bold;
  color: #409eff;
  line-height: 1;
  margin-bottom: 10px;
}

.error-title {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 15px;
}

.error-description {
  font-size: 16px;
  color: #606266;
  margin-bottom: 30px;
}

.error-suggestions {
  background-color: #f8f9fb;
  border-left: 4px solid #409eff;
  text-align: left;
  padding: 15px 20px;
  margin-bottom: 30px;
  border-radius: 4px;
}

.suggestion-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
}

.suggestion-list {
  padding-left: 20px;
  margin: 0;
  color: #606266;
}

.suggestion-list li {
  margin-bottom: 5px;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
}

.system-info {
  margin-top: 30px;
  text-align: left;
  border-top: 1px solid #ebeef5;
  padding-top: 20px;
}

.info-title {
  font-weight: bold;
  margin-bottom: 15px;
  color: #303133;
  font-size: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.info-item {
  padding: 8px 0;
}

.info-label {
  font-weight: 500;
  color: #606266;
}

.info-value {
  margin-left: 5px;
  color: #303133;
}

.status-normal {
  color: #67c23a;
  font-weight: 500;
}

.support-section {
  margin-top: 30px;
  text-align: left;
  border-top: 1px solid #ebeef5;
  padding-top: 20px;
}

.support-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #303133;
  font-size: 16px;
}

.support-content {
  color: #606266;
  line-height: 1.6;
}

.support-contact {
  margin-top: 10px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .error-content {
    padding: 25px;
  }
  
  .error-code {
    font-size: 60px;
  }
  
  .error-actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style> 