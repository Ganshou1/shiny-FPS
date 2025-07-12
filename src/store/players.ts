import { defineStore } from 'pinia';
import type { Player } from '@/types';
import { mockPlayers } from '@/utils/mockPlayers';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    players: [] as Player[],
    loading: false,
    currentPlayer: null as Player | null
  }),
  
  getters: {
    // 获取所有玩家
    getAllPlayers: (state) => state.players,
    
    // 获取被封禁的玩家
    getBannedPlayers: (state) => state.players.filter(player => player.banned),
    
    // 获取活跃玩家（最近7天登录）
    getActivePlayers: (state) => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      return state.players.filter(player => 
        new Date(player.lastOnline) >= sevenDaysAgo
      );
    },
    
    // 按段位统计玩家数量
    getPlayersByRank: (state) => {
      const result = {
        Silver: 0,
        Gold: 0,
        Diamond: 0,
        'Global Elite': 0
      };
      
      state.players.forEach(player => {
        result[player.rank]++;
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
        this.players = mockPlayers;
        this.loading = false;
      }, 500);
    },
    
    // 获取玩家详情
    getPlayerById(id: string) {
      return this.players.find(player => player.id === id) || null;
    },
    
    // 设置当前选中的玩家
    setCurrentPlayer(player: Player | null) {
      this.currentPlayer = player;
    },
    
    // 封禁玩家
    banPlayer(playerId: string, reason: string) {
      const playerIndex = this.players.findIndex(p => p.id === playerId);
      
      if (playerIndex !== -1) {
        this.players[playerIndex].banned = true;
        this.players[playerIndex].banReason = reason as any;
      }
    },
    
    // 解封玩家
    unbanPlayer(playerId: string) {
      const playerIndex = this.players.findIndex(p => p.id === playerId);
      
      if (playerIndex !== -1) {
        this.players[playerIndex].banned = false;
        this.players[playerIndex].banReason = undefined;
      }
    },
    
    // 更新玩家状态
    updatePlayerStatus(playerId: string, updates: Partial<Player>) {
      const playerIndex = this.players.findIndex(p => p.id === playerId);
      
      if (playerIndex !== -1) {
        this.players[playerIndex] = { 
          ...this.players[playerIndex], 
          ...updates 
        };
      }
    }
  }
}); 