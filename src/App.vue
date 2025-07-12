<template>
  <div class="app-container">
    <template v-if="!isLoginPage">
      <AppHeader />
      <AppSidebar />
      <div class="app-content">
        <RouterView />
      </div>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useAuthStore } from '@/store/auth'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const auth = useAuthStore()
const route = useRoute()

// 检查当前路由是否为登录页
const isLoginPage = computed(() => route.path === '/')
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');

.app-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--dark-bg);
}

.app-content {
  position: relative;
  margin-left: var(--sidebar-width);
  margin-top: var(--header-height);
  padding: var(--content-padding);
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  transition: all 0.3s;
  background-color: var(--dark-bg);
  background-image: none;
  background-size: 100px 100px;
}

/* 当侧边栏折叠时的内容区域 */
.app-sidebar.collapsed + .app-content {
  margin-left: 64px;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--darker-bg);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
  transition: all 0.3s;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--gold-border);
  box-shadow: 0 0 5px var(--gold-shadow);
}

/* 全局过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 全局加载动画 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid transparent;
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 全局按钮悬浮效果 */
.el-button:not(.is-disabled):hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}

/* 全局卡片悬浮效果 */
.fps-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* 金色边框闪烁效果 */
@keyframes borderPulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0); }
}

.pulse-border {
  animation: borderPulse 2s infinite;
}

/* 文字发光效果 */
@keyframes textGlow {
  0% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
  50% { text-shadow: 0 0 15px rgba(255, 215, 0, 0.6); }
  100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
}

.glow-text {
  animation: textGlow 3s infinite;
  color: var(--primary-color);
}
</style> 