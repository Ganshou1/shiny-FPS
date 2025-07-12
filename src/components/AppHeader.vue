<template>
  <header class="app-header fps-gradient-bg">
    <div class="header-left">
      <div class="logo">
        <el-icon :size="28" color="#FFD700"><Monitor /></el-icon>
      </div>
      <h1 class="system-name fps-title fps-text-glow">FPS游戏管理系统</h1>
      <AppBreadcrumb />
    </div>
    
    <div class="header-right">
      <el-badge :value="4" class="notification-badge">
        <el-icon :size="22" color="#FFD700"><Bell /></el-icon>
      </el-badge>
      
      <div class="user-dropdown" @click="toggleDropdown">
        <el-avatar :size="32" :src="userAvatar" />
        <span class="username gold-text">{{ userName }}</span>
        <el-icon color="#FFD700"><CaretBottom /></el-icon>
        
        <div class="dropdown-menu cool-border" v-if="dropdownVisible" @click.stop>
          <div class="dropdown-item">
            <el-icon color="#FFD700"><User /></el-icon>
            <span>个人信息</span>
          </div>
          <div class="dropdown-item">
            <el-icon color="#FFD700"><Setting /></el-icon>
            <span>账号设置</span>
          </div>
          <div class="divider"></div>
          <div class="dropdown-item" @click="logout">
            <el-icon color="#FFD700"><SwitchButton /></el-icon>
            <span>退出登录</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
import AppBreadcrumb from './AppBreadcrumb.vue'

const auth = useAuthStore()
const userAvatar = auth.userAvatar || 'https://dummyimage.com/100x100/1890ff/ffffff&text=U'
const userName = auth.userName

const dropdownVisible = ref(false)

function toggleDropdown() {
  dropdownVisible.value = !dropdownVisible.value
}

function logout() {
  auth.logout()
  dropdownVisible.value = false
}

// Close dropdown when clicking outside
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.user-dropdown')) {
    dropdownVisible.value = false
  }
}

// Add and remove event listener
window.addEventListener('click', handleClickOutside)
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding: 0 20px;
  background-color: var(--darkest-bg);
  border-bottom: 1px solid var(--gold-border);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
}

.system-name {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: var(--primary-color);
  margin-right: 30px;
}

.header-right {
  display: flex;
  align-items: center;
}

.notification-badge {
  margin-right: 20px;
  cursor: pointer;
}

.notification-badge :deep(.el-badge__content) {
  background-color: var(--danger-color);
  box-shadow: 0 0 5px rgba(255, 69, 0, 0.5);
}

.user-dropdown {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 5px 10px;
  border-radius: 20px;
  transition: all 0.3s;
  background: rgba(255, 215, 0, 0.05);
}

.user-dropdown:hover {
  background: rgba(255, 215, 0, 0.1);
}

.username {
  margin: 0 8px;
  color: var(--primary-color);
}

.dropdown-menu {
  position: absolute;
  top: 45px;
  right: 0;
  width: 160px;
  background-color: var(--darker-bg);
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
  z-index: 100;
  border: 1px solid var(--gold-border);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: var(--light-bg);
  color: var(--primary-color);
}

.dropdown-item .el-icon {
  margin-right: 10px;
}

.divider {
  height: 1px;
  background-color: var(--gold-border);
  margin: 5px 0;
}
</style> 