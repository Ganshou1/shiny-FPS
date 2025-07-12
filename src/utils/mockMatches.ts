import type { Match } from '@/types';
import { mockPlayers } from './mockPlayers';

// 获取随机玩家ID数组
const getRandomPlayerIds = (count: number) => {
  const shuffled = [...mockPlayers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(player => player.id);
};

export const mockMatches: Match[] = Array.from({ length: 10 }, (_, i) => {
  const mapPool = ['de_dust2', 'de_mirage', 'de_inferno', 'de_nuke'];
  const team1Score = Math.floor(Math.random() * 16);
  const team2Score = Math.floor(Math.random() * 16);
  
  return {
    id: `MATCH_${i + 1000}`,
    map: mapPool[Math.floor(Math.random() * mapPool.length)],
    duration: Math.floor(Math.random() * 45 + 15),
    date: new Date(Date.now() - Math.random() * 30 * 24 * 3600 * 1000),
    teams: [
      {
        name: `Team ${String.fromCharCode(65 + i % 3)}`,
        score: team1Score,
        players: getRandomPlayerIds(5)
      },
      {
        name: `Team ${String.fromCharCode(68 + i % 3)}`,
        score: team2Score,
        players: getRandomPlayerIds(5)
      }
    ]
  };
}); 