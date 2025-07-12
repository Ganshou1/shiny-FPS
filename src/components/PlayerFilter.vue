<template>
  <el-collapse v-model="activeFilters">
    <el-collapse-item title="高级筛选" name="filter">
      <el-form label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="段位范围">
              <el-select v-model="filters.ranks" multiple>
                <el-option label="Silver" value="Silver" />
                <el-option label="Gold" value="Gold" />
                <el-option label="Diamond" value="Diamond" />
                <el-option label="Global Elite" value="Global Elite" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="KDA范围">
              <el-slider
                v-model="filters.kdaRange"
                range
                :min="0"
                :max="5"
                :step="0.1"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="封禁状态">
              <el-radio-group v-model="filters.banned">
                <el-radio-button :label="null">全部</el-radio-button>
                <el-radio-button :label="true">已封禁</el-radio-button>
                <el-radio-button :label="false">正常</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right;">
            <el-button @click="resetFilters">重置</el-button>
            <el-button type="primary" @click="applyFilters">应用</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const emit = defineEmits<{
  (e: 'filter', filters: {
    ranks: string[],
    minKda: number,
    maxKda: number,
    banned: boolean | null
  }): void
}>();

const activeFilters = ref(['filter']);
const filters = reactive({
  ranks: [] as string[],
  kdaRange: [0, 5],
  banned: null as boolean | null
});

const applyFilters = () => {
  emit('filter', {
    ranks: filters.ranks,
    minKda: filters.kdaRange[0],
    maxKda: filters.kdaRange[1],
    banned: filters.banned
  });
};

const resetFilters = () => {
  filters.ranks = [];
  filters.kdaRange = [0, 5];
  filters.banned = null;
  applyFilters();
};
</script>

<style scoped>
.el-collapse {
  margin-bottom: 16px;
  border: 1px solid #EBEEF5;
  border-radius: 4px;
}

.el-form {
  padding: 8px;
}

.el-select {
  width: 100%;
}
</style> 