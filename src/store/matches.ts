import { defineStore } from 'pinia';
import type { Match } from '@/types';
import { mockMatches } from '@/utils/mockMatches';

export const useMatchStore = defineStore('matches', {
  state: () => ({
    matches: [] as Match[],
    loading: false,
    currentMatch: null as Match | null
  }),
  
  getters: {
    // 获取所有比赛
    getAllMatches: (state) => state.matches,
    
    // 获取最近的比赛
    getRecentMatches: (state) => {
      return [...state.matches]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
    },
    
    // 按地图统计比赛数量
    getMatchesByMap: (state) => {
      const result: Record<string, number> = {};
      
      state.matches.forEach(match => {
        if (result[match.map]) {
          result[match.map]++;
        } else {
          result[match.map] = 1;
        }
      });
      
      return result;
    }
  },
  
  actions: {
    // 加载模拟数据
    loadMockData() {
      this.loading = true;
      
      // 模拟API延迟
      setTimeout(() => {
        this.matches = mockMatches;
        this.loading = false;
      }, 500);
    },
    
    // 获取比赛详情
    getMatchById(id: string) {
      return this.matches.find(match => match.id === id) || null;
    },
    
    // 设置当前选中的比赛
    setCurrentMatch(match: Match | null) {
      this.currentMatch = match;
    },
    
    // 获取玩家参与的比赛
    getMatchesByPlayerId(playerId: string) {
      return this.matches.filter(match => 
        match.teams.some(team => 
          team.players.includes(playerId)
        )
      );
    }
  }
}); 