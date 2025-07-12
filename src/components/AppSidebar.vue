<template>
  <div class="app-sidebar fps-gradient-bg" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-container" v-if="!isCollapsed">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjRkZENzAwIj48cGF0aCBkPSJNNDI4LjgsMTA5LjJMMzk5LjUsODAgYy0xMy4yLTEzLjItMzQuOS0xMy4yLTQ4LjIsMGwtMzIuMSwzMi4xYy01LjcsNS43LTkuOSwxMy4xLTEyLjQsMjFsLTQ3LjUtNDcuNWMtMTMuMi0xMy4yLTM0LjktMTMuMi00OC4yLDBsLTMyLjEsMzIuMSBjLTEzLjIsMTMuMi0xMy4yLDM0LjksMCw0OC4ybDQ3LjUsNDcuNWMtNy45LDIuNS0xNS4zLDYuNy0yMSwxMi40bC0zMi4xLDMyLjFjLTEzLjIsMTMuMi0xMy4yLDM0LjksMCw0OC4ybDI5LjMsMjkuMyBjMTMuMiwxMy4yLDM0LjksMTMuMiw0OC4yLDBsMzIuMS0zMi4xYzUuNy01LjcsOS45LTEzLjEsMTIuNC0yMWw0Ny41LDQ3LjVjMTMuMiwxMy4yLDM0LjksMTMuMiw0OC4yLDBsMzIuMS0zMi4xIGMxMy4yLTEzLjIsMTMuMi0zNC45LDAtNDguMmwtNDcuNS00Ny41YzcuOS0yLjUsMTUuMy02LjcsMjEtMTIuNGwzMi4xLTMyLjFDNDQyLDE0NC4xLDQ0MiwxMjIuNCw0MjguOCwxMDkuMnoiLz48L3N2Zz4=" 
          alt="Logo" class="sidebar-logo" />
        <span class="sidebar-title gold-text">FPS管理系统</span>
      </div>
      <div class="logo-container" v-else>
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBmaWxsPSIjRkZENzAwIj48cGF0aCBkPSJNNDI4LjgsMTA5LjJMMzk5LjUsODAgYy0xMy4yLTEzLjItMzQuOS0xMy4yLTQ4LjIsMGwtMzIuMSwzMi4xYy01LjcsNS43LTkuOSwxMy4xLTEyLjQsMjFsLTQ3LjUtNDcuNWMtMTMuMi0xMy4yLTM0LjktMTMuMi00OC4yLDBsLTMyLjEsMzIuMSBjLTEzLjIsMTMuMi0xMy4yLDM0LjksMCw0OC4ybDQ3LjUsNDcuNWMtNy45LDIuNS0xNS4zLDYuNy0yMSwxMi40bC0zMi4xLDMyLjFjLTEzLjIsMTMuMi0xMy4yLDM0LjksMCw0OC4ybDI5LjMsMjkuMyBjMTMuMiwxMy4yLDM0LjksMTMuMiw0OC4yLDBsMzIuMS0zMi4xYzUuNy01LjcsOS45LTEzLjEsMTIuNC0yMWw0Ny41LDQ3LjVjMTMuMiwxMy4yLDM0LjksMTMuMiw0OC4yLDBsMzIuMS0zMi4xIGMxMy4yLTEzLjIsMTMuMi0zNC45LDAtNDguMmwtNDcuNS00Ny41YzcuOS0yLjUsMTUuMy02LjcsMjEtMTIuNGwzMi4xLTMyLjFDNDQyLDE0NC4xLDQ0MiwxMjIuNCw0MjguOCwxMDkuMnoiLz48L3N2Zz4=" 
          alt="Logo" class="sidebar-logo-small" />
      </div>
    </div>
    
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      :collapse="isCollapsed"
      :router="true"
      background-color="transparent"
      text-color="var(--text-secondary)"
      active-text-color="var(--primary-color)"
    >
      <!-- Home -->
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      
      <!-- System Overview -->
      <el-menu-item index="/docs/overview">
        <el-icon><Document /></el-icon>
        <template #title>系统概述</template>
      </el-menu-item>
      
      <!-- Players Management -->
      <el-menu-item index="/players">
        <el-icon><User /></el-icon>
        <template #title>玩家管理</template>
      </el-menu-item>
       
      <!-- FPS Game Management Modules -->
      <el-sub-menu index="/modules">
        <template #title>
          <el-icon><Menu /></el-icon>
          <span>FPS游戏管理模块</span>
        </template>
        <el-menu-item index="/modules/user">用户管理模块</el-menu-item>
        <el-menu-item index="/modules/content">游戏内容管理模块</el-menu-item>
        <el-menu-item index="/modules/operation">运营管理模块</el-menu-item>
        <el-menu-item index="/modules/data">数据分析模块</el-menu-item>
        <el-menu-item index="/modules/server">服务器管理模块</el-menu-item>
      </el-sub-menu>
      
      <!-- Technical Architecture -->
      <el-sub-menu index="/docs/architecture">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>技术架构要求</span>
        </template>
        <el-menu-item index="/docs/system-positioning">系统架构</el-menu-item>
        <el-menu-item index="/docs/data-storage">数据存储</el-menu-item>
        <el-menu-item index="/docs/security-regulations">安全规范</el-menu-item>
      </el-sub-menu>
      
      <!-- Interface Specifications -->
      <el-sub-menu index="/docs/interfaces">
        <template #title>
          <el-icon><Connection /></el-icon>
          <span>接口规范</span>
        </template>
        <el-menu-item index="/docs/interfaces/internal">内部接口</el-menu-item>
        <el-menu-item index="/docs/interfaces/external">外部接口</el-menu-item>
      </el-sub-menu>
      
      <!-- Non-functional Requirements -->
      <el-sub-menu index="/docs/requirements">
        <template #title>
          <el-icon><List /></el-icon>
          <span>非功能性需求</span>
        </template>
        <el-menu-item index="/docs/requirements/performance">性能指标</el-menu-item>
        <el-menu-item index="/docs/requirements/availability">可用性要求</el-menu-item>
        <el-menu-item index="/docs/requirements/extensibility">扩展性要求</el-menu-item>
      </el-sub-menu>
      
      <!-- Management Specifications -->
      <el-sub-menu index="/docs/management">
        <template #title>
          <el-icon><Operation /></el-icon>
          <span>管理规范</span>
        </template>
        <el-menu-item index="/docs/management/version">版本管理</el-menu-item>
        <el-menu-item index="/docs/management/documentation">文档要求</el-menu-item>
      </el-sub-menu>
      
      <!-- Appendix -->
      <el-sub-menu index="/docs/appendix">
        <template #title>
          <el-icon><InfoFilled /></el-icon>
          <span>附录</span>
        </template>
        <el-menu-item index="/docs/appendix/glossary">术语表</el-menu-item>
        <el-menu-item index="/docs/appendix/revision">修订记录</el-menu-item>
      </el-sub-menu>
    </el-menu>
    
    <!-- Collapse Button -->
    <div class="collapse-btn gold-border" @click="toggleCollapse">
      <el-icon v-if="isCollapsed"><Expand /></el-icon>
      <el-icon v-else><Fold /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  House, Setting, Document, Message, Tools, Expand, Fold, User, 
  DocumentCopy, Collection, Operation, Connection, List, InfoFilled,
  Menu
} from '@element-plus/icons-vue'

// Get current route for active menu highlight
const route = useRoute()
const activeMenu = computed(() => route.path)

// Collapse state
const isCollapsed = ref(false)

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  // Update CSS variable to adjust main content margin
  document.documentElement.style.setProperty(
    '--sidebar-width', 
    isCollapsed.value ? '64px' : '200px'
  )
}
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  top: var(--header-height);
  left: 0;
  height: calc(100vh - var(--header-height));
  width: var(--sidebar-width);
  background-color: var(--darker-bg);
  transition: all 0.3s;
  z-index: 900;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid var(--gold-border);
}

.app-sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-bottom: 1px solid var(--gold-border);
  background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3));
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.sidebar-logo {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.sidebar-logo-small {
  width: 30px;
  height: 30px;
}

.sidebar-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  white-space: nowrap;
}

.sidebar-menu {
  border-right: none;
  height: calc(100% - 110px);
}

.collapse-btn {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--darkest-bg);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.collapse-btn:hover {
  color: var(--primary-color);
  background-color: var(--light-bg);
  box-shadow: 0 0 10px var(--gold-shadow);
}

/* 自定义菜单样式 */
:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 215, 0, 0.05);
  border-left: 3px solid var(--primary-color);
  padding-left: 17px !important;
}

:deep(.el-menu-item:hover),
:deep(.el-submenu__title:hover) {
  background-color: rgba(255, 215, 0, 0.05) !important;
}

:deep(.el-submenu.is-active .el-submenu__title) {
  color: var(--primary-color) !important;
}

:deep(.el-menu-item) .el-icon,
:deep(.el-submenu__title) .el-icon {
  color: var(--primary-color);
  opacity: 0.7;
}

:deep(.el-menu-item.is-active) .el-icon {
  opacity: 1;
}

:deep(.el-menu--popup) {
  background-color: var(--darker-bg);
  border: 1px solid var(--gold-border);
}

:deep(.el-menu--popup .el-menu-item) {
  background-color: var(--darker-bg);
}

:deep(.el-menu--popup .el-menu-item:hover) {
  background-color: rgba(255, 215, 0, 0.05);
}
</style> 