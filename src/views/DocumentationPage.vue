<template>
  <div class="documentation-page">
    <el-container>
      <el-main class="main-content">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>

<style scoped>
.documentation-page {
  height: 100%;
  background-color: #000000;
}

.el-container {
  height: 100%;
}

.main-content {
  padding: 20px;
  overflow-y: auto;
  background-color: #000000;
}
</style> 