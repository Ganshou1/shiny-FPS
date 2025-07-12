import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import UserManagement from '../views/UserManagement.vue';
import PlayerManagement from '../views/PlayerManagement.vue';
import SystemManagement from '../views/SystemManagement.vue';
import AnalyticsDashboard from '../views/AnalyticsDashboard.vue';
import DocumentationPage from '../views/DocumentationPage.vue';
import ProjectBackground from '../views/docs/ProjectBackground.vue';
import SystemPositioning from '../views/docs/SystemPositioning.vue';
import DataStorage from '../views/docs/DataStorage.vue';
import SecurityRegulations from '../views/docs/SecurityRegulations.vue';
import InternalInterface from '../views/docs/InternalInterface.vue';
import ExternalInterface from '../views/docs/ExternalInterface.vue';

// 模块页面
import UserManagementModule from '../views/modules/UserManagementModule.vue';
import ContentManagementModule from '../views/modules/ContentManagementModule.vue';
import OperationManagementModule from '../views/modules/OperationManagementModule.vue';
import DataAnalysisModule from '../views/modules/DataAnalysisModule.vue';
import ServerManagementModule from '../views/modules/ServerManagementModule.vue';

const router = createRouter({
  history: createWebHashHistory('/shiny-FPS/'),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'UserManagement',
      component: UserManagement
    },
    {
      path: '/players',
      name: 'PlayerManagement',
      component: PlayerManagement
    },
    {
      path: '/system',
      name: 'SystemManagement',
      component: SystemManagement
    },
    {
      path: '/analytics',
      name: 'AnalyticsDashboard',
      component: AnalyticsDashboard
    },
    {
      path: '/docs',
      name: 'Documentation',
      component: DocumentationPage,
      children: [
        {
          path: 'overview',
          name: 'SystemOverview',
          component: () => import('@/views/docs/SystemOverview.vue')
        },
        {
          path: 'background',
          name: 'ProjectBackground',
          component: ProjectBackground
        },
        {
          path: 'system-positioning',
          name: 'SystemPositioning',
          component: SystemPositioning
        },
        {
          path: 'data-storage',
          name: 'DataStorage',
          component: DataStorage
        },
        {
          path: 'security-regulations',
          name: 'SecurityRegulations',
          component: SecurityRegulations
        },
        {
          path: 'interfaces/internal',
          name: 'InternalInterface',
          component: InternalInterface
        },
        {
          path: 'interfaces/external',
          name: 'ExternalInterface',
          component: () => import('@/views/docs/ExternalInterface.vue')
        },
        {
          path: 'requirements/performance',
          name: 'PerformanceSpec',
          component: () => import('@/views/docs/PerformanceSpec.vue')
        },
        {
          path: 'requirements/availability',
          name: 'AvailabilitySpec',
          component: () => import('@/views/docs/AvailabilitySpec.vue')
        },
        {
          path: 'requirements/extensibility',
          name: 'ScalabilitySpec',
          component: () => import('@/views/docs/ScalabilitySpec.vue')
        },
        {
          path: 'management/version',
          name: 'VersionManagement',
          component: () => import('@/views/docs/VersionManagement.vue')
        },
        {
          path: 'management/documentation',
          name: 'DocumentationRequirements',
          component: () => import('@/views/docs/DocumentationRequirements.vue')
        },
        {
          path: 'management/change-control',
          name: 'ChangeControlProcess',
          component: () => import('@/views/docs/ChangeControlProcess.vue')
        },
        {
          path: 'management/compliance',
          name: 'ComplianceAudit',
          component: () => import('@/views/docs/ComplianceAudit.vue')
        },
        {
          path: 'appendix/glossary',
          name: 'GlossaryFPS',
          component: () => import('@/views/docs/GlossaryFPS.vue')
        },
        {
          path: 'appendix/revision',
          name: 'RevisionHistory',
          component: () => import('@/views/docs/RevisionHistory.vue')
        },
      ]
    },
    // 模块路由
    {
      path: '/modules/user',
      name: 'UserManagementModule',
      component: UserManagementModule
    },
    {
      path: '/modules/content',
      name: 'ContentManagementModule',
      component: ContentManagementModule
    },
    {
      path: '/modules/operation',
      name: 'OperationManagementModule',
      component: OperationManagementModule
    },
    {
      path: '/modules/data',
      name: 'DataAnalysisModule',
      component: DataAnalysisModule
    },
    {
      path: '/modules/server',
      name: 'ServerManagementModule',
      component: ServerManagementModule
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
});

export default router; 