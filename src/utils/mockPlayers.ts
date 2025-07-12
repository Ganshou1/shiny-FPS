import type { Player, Rank, WeaponType, BanReason } from '@/types';

export const generateMockPlayers = (count: number): Player[] => {
  const ranks: Rank[] = ['Silver', 'Gold', 'Diamond', 'Global Elite'];
  const weapons: WeaponType[] = ['AK-47', 'M4A4', 'AWP', 'Desert Eagle', 'P250'];
  const banReasons: BanReason[] = ['作弊', '辱骂', '消极比赛'];
  const maps = ['de_dust2', 'de_mirage', 'de_inferno'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `STEAM_${Math.random().toString(36).substr(2, 8)}`,
    name: `Player_${i + 1}`,
    rank: ranks[Math.floor(Math.random() * ranks.length)],
    kda: Number((Math.random() * 5).toFixed(2)),
    headshotRate: Number((Math.random() * 100).toFixed(1)),
    lastOnline: new Date(Date.now() - Math.random() * 7 * 24 * 3600 * 1000),
    banned: Math.random() > 0.8,
    banReason: Math.random() > 0.8 ? banReasons[Math.floor(Math.random() * banReasons.length)] : undefined,
    weaponStats: weapons.map(weapon => ({
      name: weapon,
      kills: Math.floor(Math.random() * 500),
      accuracy: Number((Math.random() * 100).toFixed(1))
    })),
    matchHistory: Array.from({ length: 5 }, () => ({
      map: maps[Math.floor(Math.random() * maps.length)],
      result: Math.random() > 0.5 ? 'Win' : 'Loss',
      score: `${Math.floor(Math.random() * 16)}:${Math.floor(Math.random() * 16)}`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 3600 * 1000)
    }))
  }));
};

// 初始化20名玩家
export const mockPlayers = generateMockPlayers(20); 