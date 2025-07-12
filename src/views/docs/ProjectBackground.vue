<template>
  <div class="doc-page">
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/docs/overview' }">系统概述</el-breadcrumb-item>
      <el-breadcrumb-item>项目背景</el-breadcrumb-item>
    </el-breadcrumb>
    
    <doc-template 
      title="项目背景" 
      version="v1.0.0" 
      updated-at="2023-11-10" 
      author="系统设计团队"
    >
      <div class="doc-section">
        <h2>1.1 项目背景</h2>
        
        <div class="content-box">
          <p>随着游戏行业的快速发展，游戏管理系统作为游戏运营的核心支撑平台，对游戏的成功运营和维护起着至关重要的作用。本项目旨在开发一套完整的、高效的、易用的游戏管理系统，满足现代游戏运营的各种需求，包括用户管理、内容管理、数据分析、服务器监控等多方面功能，为游戏运营提供强有力的技术支持。</p>
        </div>
        
        <div class="subsection">
          <h3>行业现状分析</h3>
          
          <div class="content-box">
            <p>当前游戏行业面临以下几个关键挑战：</p>
            
            <el-row :gutter="20" class="stat-cards">
              <el-col :span="8">
                <el-card shadow="hover">
                  <div class="stat-card-content">
                    <el-icon class="stat-icon"><DataLine /></el-icon>
                    <div class="stat-info">
                      <h4>数据量激增</h4>
                      <p>游戏数据量呈指数级增长，传统管理方式难以应对</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="8">
                <el-card shadow="hover">
                  <div class="stat-card-content">
                    <el-icon class="stat-icon"><UserFilled /></el-icon>
                    <div class="stat-info">
                      <h4>用户需求多样化</h4>
                      <p>玩家期望个性化体验和及时响应</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="8">
                <el-card shadow="hover">
                  <div class="stat-card-content">
                    <el-icon class="stat-icon"><Monitor /></el-icon>
                    <div class="stat-info">
                      <h4>服务可靠性要求提升</h4>
                      <p>游戏服务中断将直接影响用户留存和收入</p>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
        
        <div class="subsection">
          <h3>项目目标</h3>
          
          <div class="timeline">
            <el-timeline>
              <el-timeline-item
                timestamp="第一阶段"
                placement="top"
                type="primary"
              >
                <el-card>
                  <h4>基础平台构建</h4>
                  <p>搭建核心管理框架，实现基础用户管理、权限控制功能</p>
                </el-card>
              </el-timeline-item>
              
              <el-timeline-item
                timestamp="第二阶段"
                placement="top"
                type="success"
              >
                <el-card>
                  <h4>功能模块开发</h4>
                  <p>完成五大核心功能模块：用户管理、游戏内容管理、运营管理、数据分析、服务器管理</p>
                </el-card>
              </el-timeline-item>
              
              <el-timeline-item
                timestamp="第三阶段"
                placement="top"
                type="warning"
              >
                <el-card>
                  <h4>系统集成与优化</h4>
                  <p>优化系统性能，提升用户体验，完成与现有游戏系统的集成</p>
                </el-card>
              </el-timeline-item>
              
              <el-timeline-item
                timestamp="第四阶段"
                placement="top"
                type="danger"
              >
                <el-card>
                  <h4>持续迭代更新</h4>
                  <p>根据运营反馈持续优化系统，增加新功能，提升系统稳定性</p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        
        <div class="subsection">
          <h3>预期成果</h3>
          
          <div class="content-box">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="outcome-item">
                  <h4>业务价值</h4>
                  <ul>
                    <li>提升运营效率 30% 以上</li>
                    <li>降低人工管理成本 40%</li>
                    <li>缩短问题响应时间 60%</li>
                    <li>提高数据分析准确性 50%</li>
                  </ul>
                </div>
              </el-col>
              
              <el-col :span="12">
                <div class="outcome-item">
                  <h4>技术价值</h4>
                  <ul>
                    <li>建立统一的游戏管理技术框架</li>
                    <li>实现数据驱动的运营决策支持</li>
                    <li>提供可扩展的模块化架构</li>
                    <li>形成完整的技术文档体系</li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      
      <div class="doc-footer">
        <el-divider>
          <el-icon><Document /></el-icon>
        </el-divider>
        <p class="next-section">
          下一节：<router-link to="/docs/overview/positioning">1.2 系统定位</router-link>
        </p>
      </div>
    </doc-template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DocTemplate from '../../components/DocTemplate.vue';
import { DataLine, UserFilled, Monitor, Document } from '@element-plus/icons-vue';
</script>

<style scoped>
.doc-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  background-color: #000000;
  color: var(--text-primary);
}

.breadcrumb {
  margin: 16px 0;
}

.doc-section {
  margin-bottom: 32px;
}

h2 {
  font-size: 24px;
  color: var(--primary-color);
  border-bottom: 2px solid rgba(255, 215, 0, 0.3);
  padding-bottom: 8px;
  margin-bottom: 24px;
}

.subsection {
  margin-bottom: 30px;
}

h3 {
  font-size: 20px;
  margin-bottom: 16px;
  color: var(--primary-color);
}

h4 {
  font-size: 18px;
  margin: 10px 0;
  color: var(--primary-color);
}

.content-box {
  background-color: #000000;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--gold-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.content-box p {
  line-height: 1.6;
  margin-bottom: 16px;
}

.content-box p:last-child {
  margin-bottom: 0;
}

.stat-cards {
  margin-top: 20px;
}

.stat-card-content {
  display: flex;
  align-items: flex-start;
}

.stat-icon {
  font-size: 24px;
  margin-right: 16px;
  color: var(--primary-color);
}

.stat-info h4 {
  margin-top: 0;
  margin-bottom: 8px;
}

.stat-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.timeline {
  margin: 30px 0;
}

.outcome-item {
  margin-bottom: 20px;
}

.outcome-item h4 {
  border-bottom: 1px solid var(--gold-border);
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.outcome-item ul {
  padding-left: 20px;
}

.outcome-item li {
  margin-bottom: 8px;
}

.doc-footer {
  margin-top: 40px;
  text-align: center;
}

.next-section {
  margin-top: 16px;
  font-size: 16px;
}

:deep(.el-card) {
  background-color: #000000;
  border: 1px solid var(--gold-border);
}

:deep(.el-timeline-item__node) {
  background-color: var(--primary-color);
}

:deep(.el-timeline-item__tail) {
  border-left-color: var(--gold-border);
}

:deep(.el-breadcrumb__item) {
  color: var(--text-secondary);
}

:deep(.el-breadcrumb__inner a) {
  color: var(--primary-color);
}

:deep(.el-divider) {
  background-color: var(--gold-border);
}

:deep(.el-divider__text) {
  background-color: #000000;
  color: var(--primary-color);
}

:deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

:deep(a:hover) {
  text-decoration: underline;
}
</style> 