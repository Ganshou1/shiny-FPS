import { defineStore } from 'pinia';
import type { GameServer } from '@/types';
import { mockServers } from '@/utils/mockServers';

export const useServerStore = defineStore('servers', {
  state: () => ({
    servers: [] as GameServer[],
    loading: false,
    currentServer: null as GameServer | null
  }),
  
  getters: {
    // 获取所有服务器
    getAllServers: (state) => state.servers,
    
    // 按地区获取服务器
    getServersByRegion: (state) => (region: string) => {
      return state.servers.filter(server => server.region === region);
    },
    
    // 获取在线玩家总数
    getTotalOnlinePlayers: (state) => {
      return state.servers.reduce((total, server) => total + server.players, 0);
    },
    
    // 获取满员的服务器
    getFullServers: (state) => {
      return state.servers.filter(server => server.players >= server.maxPlayers);
    }
  },
  
  actions: {
    // 加载模拟数据
    loadMockData() {
      this.loading = true;
      
      // 模拟API延迟
      setTimeout(() => {
        this.servers = mockServers;
        this.loading = false;
      }, 500);
    },
    
    // 获取服务器详情
    getServerById(id: string) {
      return this.servers.find(server => server.id === id) || null;
    },
    
    // 设置当前选中的服务器
    setCurrentServer(server: GameServer | null) {
      this.currentServer = server;
    },
    
    // 更新服务器玩家数量（模拟实时变化）
    updateServerPlayers() {
      this.servers.forEach(server => {
        // 随机增减玩家数量，但不超过最大值
        const change = Math.floor(Math.random() * 5) - 2;
        server.players = Math.max(0, Math.min(server.maxPlayers, server.players + change));
      });
    }
  }
}); 