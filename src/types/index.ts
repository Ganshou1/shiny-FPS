import { RouteRecordRaw } from 'vue-router'

// Route meta information
export interface RouteMeta {
  requiresAuth?: boolean
  requiresLayout?: boolean
  isPublic?: boolean
  title?: string
  icon?: string
  breadcrumb?: string[]
}

// Extend the route record to include our custom meta
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}

// User type for authentication
export interface User {
  id: number
  name: string
  avatar?: string
  email?: string
  role?: string
}

// Auth store state
export interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: User | null
}

// Statistics card data
export interface StatCard {
  title: string
  value: string | number
  icon: string
  color: string
}

// Activity record
export interface ActivityRecord {
  id: number
  time: string
  user: string
  action: string
  status: 'success' | 'error' | 'warning' | 'info'
}

// Chart data
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
  }>
}

// 玩家相关类型
export type Rank = 'Silver' | 'Gold' | 'Diamond' | 'Global Elite';
export type WeaponType = 'AK-47' | 'M4A4' | 'AWP' | 'Desert Eagle' | 'P250';
export type BanReason = '作弊' | '辱骂' | '消极比赛';
export type MatchResult = 'Win' | 'Loss';
export type ServerRegion = 'Asia' | 'Europe' | 'NA';

export interface WeaponStat {
  name: WeaponType;
  kills: number;
  accuracy: number;
}

export interface MatchRecord {
  map: string;
  result: MatchResult;
  score: string;
  date: Date;
}

export interface Player {
  id: string;
  name: string;
  rank: Rank;
  kda: number;
  headshotRate: number;
  lastOnline: Date;
  banned: boolean;
  banReason?: BanReason;
  weaponStats: WeaponStat[];
  matchHistory: MatchRecord[];
}

// 比赛相关类型
export interface Team {
  name: string;
  score: number;
  players: string[]; // 玩家ID
}

export interface Match {
  id: string;
  map: string;
  duration: number; // 分钟
  date: Date;
  teams: Team[];
}

// 服务器相关类型
export interface GameServer {
  id: string;
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  ping: number;
  region: ServerRegion;
}

// 武器统计类型
export interface WeaponStatistic {
  name: WeaponType;
  usageRate: number;
  avgKills: number;
} 