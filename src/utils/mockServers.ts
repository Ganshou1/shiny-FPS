import type { GameServer } from '@/types';

export const mockServers: GameServer[] = [
  {
    id: 'SRV-1',
    name: '竞技 #1',
    map: 'de_dust2',
    players: Math.floor(Math.random() * 10) + 5,
    maxPlayers: 10,
    ping: Math.floor(Math.random() * 50) + 20,
    region: 'Asia'
  },
  {
    id: 'SRV-2',
    name: '竞技 #2',
    map: 'de_mirage',
    players: Math.floor(Math.random() * 10) + 3,
    maxPlayers: 10,
    ping: Math.floor(Math.random() * 50) + 15,
    region: 'Asia'
  },
  {
    id: 'SRV-3',
    name: '休闲 #1',
    map: 'de_inferno',
    players: Math.floor(Math.random() * 12) + 8,
    maxPlayers: 20,
    ping: Math.floor(Math.random() * 40) + 30,
    region: 'Europe'
  },
  {
    id: 'SRV-4',
    name: '休闲 #2',
    map: 'de_nuke',
    players: Math.floor(Math.random() * 15) + 5,
    maxPlayers: 20,
    ping: Math.floor(Math.random() * 60) + 40,
    region: 'NA'
  },
  {
    id: 'SRV-5',
    name: '死亡竞赛 #1',
    map: 'de_dust2',
    players: Math.floor(Math.random() * 8) + 12,
    maxPlayers: 20,
    ping: Math.floor(Math.random() * 30) + 25,
    region: 'Asia'
  }
]; 