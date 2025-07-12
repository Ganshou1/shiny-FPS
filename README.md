# FPS管理系统

这是一个专业级第一人称射击游戏管理平台，用于支持游戏的全生命周期管理。

## 功能特点

- 用户管理：管理系统用户和权限
- 玩家管理：查看和管理游戏玩家数据
- 系统管理：监控和管理系统状态
- 数据分析：提供游戏数据的可视化分析
- 文档系统：完整的系统文档

## 技术栈

- Vue 3
- TypeScript
- Vite
- Element Plus
- Vue Router
- Pinia

## 开发指南

### 安装依赖

```
npm install
```

### 启动开发服务器

```
npm run dev
```

### 构建生产版本

```
npm run build
```

### 预览生产版本

```
npm run preview
```

## 部署到GitHub Pages

1. 修改 `vite.config.ts` 文件，确保 `base` 设置为 `/shiny-FPS/`
2. 运行 `npm run build` 命令构建项目
3. 运行 `deploy-to-github.bat` 脚本部署到GitHub Pages

## 访问地址

部署后，您可以通过以下地址访问系统：

https://ganshou1.github.io/shiny-FPS/

## 文件结构说明

- `src/` - 源代码目录
  - `assets/` - 静态资源
  - `components/` - Vue组件
  - `router/` - 路由配置
  - `store/` - 状态管理
  - `styles/` - CSS样式
  - `types/` - TypeScript类型定义
  - `utils/` - 工具函数
  - `views/` - 页面视图
- `public/` - 公共资源目录
- `dist/` - 构建输出目录（不需要上传到版本控制）
- `node_modules/` - 依赖包目录（不需要上传到版本控制） 