<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbItems" :key="index" :to="item.path">
        <el-icon v-if="item.icon" class="breadcrumb-icon"><component :is="item.icon" /></el-icon>
        <span class="breadcrumb-text" :class="{'fps-text-glow': index === breadcrumbItems.length - 1}">{{ item.title }}</span>
      </el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'

const route = useRoute()

interface BreadcrumbItem {
  title: string
  path: string
  icon?: string
}

// Generate breadcrumb items based on route meta
const breadcrumbItems = computed(() => {
  const result: BreadcrumbItem[] = []
  const currentRoute = route as RouteLocationNormalizedLoaded
  
  // Add home as first item
  result.push({
    title: '首页',
    path: '/',
    icon: 'House'
  })
  
  // If route has custom breadcrumb info in meta
  if (currentRoute.meta.breadcrumb) {
    const breadcrumbs = currentRoute.meta.breadcrumb as string[]
    // Start from 1 since we've already added home
    for (let i = 1; i < breadcrumbs.length; i++) {
      // Build partial path for each level
      let pathPrefix = ''
      for (let j = 1; j <= i; j++) {
        pathPrefix += `/${currentRoute.path.split('/')[j]}`
      }
      
      result.push({
        title: breadcrumbs[i],
        path: pathPrefix,
        icon: i === breadcrumbs.length - 1 ? currentRoute.meta.icon as string : undefined
      })
    }
  } 
  // If route doesn't have custom breadcrumb, just use route name
  else if (currentRoute.name && currentRoute.path !== '/') {
    result.push({
      title: currentRoute.meta.title as string || currentRoute.name as string,
      path: currentRoute.path,
      icon: currentRoute.meta.icon as string
    })
  }
  
  return result
})
</script>

<style scoped>
.breadcrumb-container {
  margin-left: 20px;
}

:deep(.el-breadcrumb__inner) {
  color: var(--text-secondary) !important;
  font-weight: normal;
}

:deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: var(--primary-color) !important;
  font-weight: 500;
}

.breadcrumb-icon {
  margin-right: 5px;
  vertical-align: middle;
}

.breadcrumb-text {
  vertical-align: middle;
}
</style> 