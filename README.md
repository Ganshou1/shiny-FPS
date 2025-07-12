# 管理系统框架

基于 Vue 3 + TypeScript + Vite + Element Plus 的企业级管理系统框架。

## 技术栈

- Node.js
- Vue 3 (Composition API)
- Vite 4
- TypeScript
- Element Plus
- Vue Router
- Pinia (状态管理)

## 目录结构

```
src/
├── assets/        # 静态资源
│   └── images/    # 图片
├── components/    # 公共组件
├── views/         # 页面视图
├── store/         # 状态管理
│   └── auth.ts    # 认证状态
├── types/         # TypeScript 类型定义
│   └── index.ts
├── styles/        # 全局样式
│   └── main.css
├── router/        # 路由配置
│   └── index.ts
├── App.vue        # 根组件
└── main.ts        # 入口文件
```

## 功能特性

- 响应式布局
- 用户认证与授权
- 路由守卫
- 状态管理
- 组件按需加载
- TypeScript 类型支持

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 布局规范

- 采用「顶部导航 + 左侧菜单 + 右侧内容区」布局模式
- 顶部标题栏：固定定位，高度60px
- 左侧导航栏：固定定位，宽度200px
- 主内容区：自适应宽高

## 登录信息

- 用户名：admin
- 密码：123456 