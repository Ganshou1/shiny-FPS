import { defineStore } from 'pinia';
import type { WeaponStatistic } from '@/types';
import { mockWeaponStats } from '@/utils/mockWeaponStats';

export const useWeaponStore = defineStore('weapons', {
  state: () => ({
    weaponStats: [] as WeaponStatistic[],
    loading: false
  }),
  
  getters: {
    // 获取所有武器统计
    getAllWeaponStats: (state) => state.weaponStats,
    
    // 获取使用率最高的武器
    getMostUsedWeapon: (state) => {
      return [...state.weaponStats].sort((a, b) => b.usageRate - a.usageRate)[0];
    },
    
    // 获取场均击杀最高的武器
    getMostEffectiveWeapon: (state) => {
      return [...state.weaponStats].sort((a, b) => b.avgKills - a.avgKills)[0];
    }
  },
  
  actions: {
    // 加载模拟数据
    loadMockData() {
      this.loading = true;
      
      // 模拟API延迟
      setTimeout(() => {
        this.weaponStats = mockWeaponStats;
        this.loading = false;
      }, 500);
    }
  }
}); 