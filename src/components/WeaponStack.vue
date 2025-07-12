<template>
  <div class="weapon-stack">
    <el-tooltip 
      v-for="weapon in weapons" 
      :key="weapon.name"
      :content="`${weapon.name} | 击杀: ${weapon.kills} | 命中率: ${weapon.accuracy}%`"
    >
      <div class="weapon-icon" :style="getWeaponStyle(weapon)">
        <img :src="`/weapons/${weapon.name.toLowerCase().replace('-', '')}.png`" alt="武器图标" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { WeaponStat } from '../types';

const props = defineProps<{
  weapons: WeaponStat[]
}>();

const getWeaponStyle = (weapon: WeaponStat) => ({
  '--size': `${Math.min(100, weapon.kills / 50 * 24 + 16)}px`,
  '--opacity': weapon.accuracy / 100
});
</script>

<style scoped>
.weapon-stack {
  display: flex;
  gap: 4px;
}

.weapon-icon {
  width: var(--size);
  height: var(--size);
  opacity: var(--opacity);
  transition: all 0.3s ease;
}

.weapon-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.weapon-icon:hover {
  transform: translateY(-4px);
  opacity: 1;
}
</style> 