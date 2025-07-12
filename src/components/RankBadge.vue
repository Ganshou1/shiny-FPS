<template>
  <el-tooltip :content="rank">
    <div class="rank-badge" :class="rank.toLowerCase().replace(' ', '-')">
      {{ rank.charAt(0) }}
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { Rank } from '../types';

defineProps({
  rank: {
    type: String as () => Rank,
    required: true,
    validator: (val: string) => 
      ['Silver', 'Gold', 'Diamond', 'Global Elite'].includes(val)
  }
});
</script>

<style scoped>
.rank-badge {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  margin-right: 8px;
}

.silver {
  background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
}
.gold {
  background: linear-gradient(135deg, #FFD700, #D4AF37);
}
.diamond {
  background: linear-gradient(135deg, #4EE2EC, #2AB7D8);
}
.global-elite {
  background: linear-gradient(135deg, #FF4E50, #F9D423);
}
</style> 