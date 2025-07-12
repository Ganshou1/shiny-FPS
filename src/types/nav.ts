import { Component } from 'vue';

export type ChartType = '作战数据' | '玩家活跃' | '赛事统计' | 
  'KDA趋势' | '武器热度' | '地图胜率' | '在线峰值' | 
  '段位分布' | '新老玩家比例' | '比赛频率' | '战队排名' | '经济效率';

export interface AnalyticsNavItem {
  title: string;
  icon: Component;
  charts: ChartType[];
}

export interface CoreMetric {
  title: string;
  value: string | number;
  trend: number;
  chartData: number[];
  icon?: Component;
} 