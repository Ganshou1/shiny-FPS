<template>
  <div class="doc-requirements">
    <h2>文档管理体系</h2>
    
    <div class="section">
      <h3>2.1 文档分类标准</h3>
      <h4>2.1.1 核心文档清单</h4>
      
      <div class="dark-content-box">
        <el-table :data="coreDocuments" border style="width: 100%">
          <el-table-column prop="docType" label="文档类型" width="150"></el-table-column>
          <el-table-column prop="updateFrequency" label="更新频率" width="120"></el-table-column>
          <el-table-column prop="retentionPeriod" label="保存期限" width="120"></el-table-column>
          <el-table-column prop="accessPermission" label="访问权限"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>2.2 文档状态机</h3>
      <div ref="docStatusDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>文档模板库</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="doc-templates">
            <h4>标准模板类型</h4>
            <el-tabs type="border-card">
              <el-tab-pane label="设计文档">
                <div class="tab-content">
                  <div class="template-card">
                    <div class="template-header">
                      <h5>游戏系统设计文档</h5>
                      <span class="template-tag">GDD</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 详细描述游戏系统、玩法机制和功能设计</p>
                      <p><strong>必填章节:</strong></p>
                      <ol>
                        <li>系统概述与目标</li>
                        <li>功能详细说明</li>
                        <li>UI/UX流程</li>
                        <li>玩家交互设计</li>
                        <li>数值平衡设计</li>
                        <li>技术实现约束</li>
                        <li>测试标准</li>
                      </ol>
                      <p><strong>格式要求:</strong> Markdown + 图表 + 原型图</p>
                    </div>
                  </div>
                  
                  <div class="template-card">
                    <div class="template-header">
                      <h5>技术架构设计文档</h5>
                      <span class="template-tag">TDD</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 描述系统技术架构、组件关系和实现方案</p>
                      <p><strong>必填章节:</strong></p>
                      <ol>
                        <li>架构概述</li>
                        <li>系统组件设计</li>
                        <li>数据模型</li>
                        <li>接口设计</li>
                        <li>扩展性考虑</li>
                        <li>性能与安全设计</li>
                        <li>部署拓扑</li>
                      </ol>
                      <p><strong>格式要求:</strong> Markdown + UML图 + 序列图</p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="API文档">
                <div class="tab-content">
                  <div class="template-card">
                    <div class="template-header">
                      <h5>RESTful API文档</h5>
                      <span class="template-tag">API</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 描述HTTP API接口规范和使用方法</p>
                      <p><strong>自动生成工具:</strong> Swagger / OpenAPI</p>
                      <p><strong>必填内容:</strong></p>
                      <ul>
                        <li>接口URL与HTTP方法</li>
                        <li>请求参数与格式</li>
                        <li>响应状态与数据结构</li>
                        <li>错误码与描述</li>
                        <li>鉴权要求</li>
                        <li>限流策略</li>
                        <li>使用示例</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="template-card">
                    <div class="template-header">
                      <h5>SDK集成文档</h5>
                      <span class="template-tag">SDK</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 指导第三方开发者使用系统SDK</p>
                      <p><strong>自动生成工具:</strong> JSDoc / Doxygen</p>
                      <p><strong>必填内容:</strong></p>
                      <ul>
                        <li>安装与配置指南</li>
                        <li>API参考</li>
                        <li>常见用例</li>
                        <li>错误处理</li>
                        <li>性能优化建议</li>
                        <li>安全最佳实践</li>
                        <li>版本兼容性说明</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="运营文档">
                <div class="tab-content">
                  <div class="template-card">
                    <div class="template-header">
                      <h5>运营数据报表</h5>
                      <span class="template-tag">OPS</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 游戏运营数据统计与分析</p>
                      <p><strong>生成周期:</strong> 每日/每周/每月</p>
                      <p><strong>必填指标:</strong></p>
                      <ul>
                        <li>新增用户数据</li>
                        <li>留存与流失</li>
                        <li>付费转化</li>
                        <li>道具消耗</li>
                        <li>玩家行为分析</li>
                        <li>匹配与游戏时长</li>
                        <li>异常行为监控</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="template-card">
                    <div class="template-header">
                      <h5>活动策划方案</h5>
                      <span class="template-tag">EVENT</span>
                    </div>
                    <div class="template-content">
                      <p><strong>用途:</strong> 规划游戏活动内容与实施方案</p>
                      <p><strong>必填内容:</strong></p>
                      <ul>
                        <li>活动目标与KPI</li>
                        <li>活动机制设计</li>
                        <li>奖励设置与平衡</li>
                        <li>时间规划与里程碑</li>
                        <li>技术实现需求</li>
                        <li>风险评估</li>
                        <li>数据跟踪计划</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>自动生成工具链</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="tool-chain">
            <h4>文档自动化工具集成</h4>
            <div ref="toolChainDiagram" class="mini-diagram"></div>
            
            <h4 class="mt-20">文档生成流程</h4>
            <ul class="process-list">
              <li>
                <div class="process-step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h5>代码文档生成</h5>
                    <p>从代码注释和类型定义自动生成API参考文档</p>
                    <p><strong>工具:</strong> JSDoc/Typedoc (前端), Swagger (后端)</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="process-step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h5>接口测试文档</h5>
                    <p>基于测试用例自动生成接口使用示例和测试报告</p>
                    <p><strong>工具:</strong> Postman, Jest-Documentation</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="process-step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h5>静态网站构建</h5>
                    <p>将各种格式文档整合为统一的静态文档网站</p>
                    <p><strong>工具:</strong> VuePress, Docusaurus</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="process-step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h5>版本归档</h5>
                    <p>自动对文档进行版本控制和归档</p>
                    <p><strong>工具:</strong> Git, Document Version Manager</p>
                  </div>
                </div>
              </li>
            </ul>
            
            <h4 class="mt-20">文档CI/CD流水线</h4>
            <pre class="code-block">
# .github/workflows/docs.yml
name: Documentation Pipeline

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'docs/**'
      - 'src/**/*.ts'
      - 'src/**/*.js'
      - 'src/**/*.vue'
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate API docs
        run: npm run docs:api
      
      - name: Build static site
        run: npm run docs:build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: "GITHUB_TOKEN_PLACEHOLDER"
          publish_dir: ./docs/dist
            </pre>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>多语言支持方案</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="multilingual-support">
            <h4>文档国际化策略</h4>
            <el-table :data="languageSupportData" border style="width: 100%">
              <el-table-column prop="docCategory" label="文档类别" width="150"></el-table-column>
              <el-table-column prop="languages" label="支持语言" width="180"></el-table-column>
              <el-table-column prop="updateStrategy" label="更新策略" width="150"></el-table-column>
              <el-table-column prop="toolSupport" label="工具支持"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">翻译工作流程</h4>
            <div ref="translationWorkflow" class="mini-diagram"></div>
            
            <h4 class="mt-20">多语言资源管理</h4>
            <p>采用基于键值对的国际化资源文件系统，支持模块化管理：</p>
            <pre class="code-block">
// 资源文件结构
docs/
  ├── i18n/
  │   ├── zh-CN/
  │   │   ├── common.json
  │   │   ├── api.json
  │   │   └── ui.json
  │   ├── en-US/
  │   │   ├── common.json
  │   │   ├── api.json
  │   │   └── ui.json
  │   └── ja-JP/
  │       ├── common.json
  │       ├── api.json
  │       └── ui.json
  ├── templates/
  │   ├── api-docs.md
  │   └── user-guide.md
  └── config.js
            </pre>
            
            <h4 class="mt-20">翻译质量保证</h4>
            <ul>
              <li>
                <strong>术语库维护</strong>
                <p>建立项目特定术语库，确保专业术语翻译一致性</p>
              </li>
              <li>
                <strong>机器翻译+人工审核</strong>
                <p>使用AI辅助翻译初稿，专业翻译人员审核修正</p>
              </li>
              <li>
                <strong>上下文提示</strong>
                <p>为翻译者提供界面截图和功能说明，确保翻译符合实际场景</p>
              </li>
              <li>
                <strong>变更检测</strong>
                <p>自动检测源文档变更，标记需要更新的翻译内容</p>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const docStatusDiagram = ref<HTMLElement | null>(null);
const toolChainDiagram = ref<HTMLElement | null>(null);
const translationWorkflow = ref<HTMLElement | null>(null);

const coreDocuments = [
  {
    docType: 'API文档',
    updateFrequency: '实时同步',
    retentionPeriod: '永久',
    accessPermission: '研发全员'
  },
  {
    docType: '设计原稿',
    updateFrequency: '版本冻结',
    retentionPeriod: '3年',
    accessPermission: '美术/策划'
  },
  {
    docType: '运营报表',
    updateFrequency: '每日生成',
    retentionPeriod: '1年',
    accessPermission: '管理层'
  },
  {
    docType: '需求文档',
    updateFrequency: '版本规划',
    retentionPeriod: '5年',
    accessPermission: '产品/研发'
  },
  {
    docType: '故障报告',
    updateFrequency: '事件触发',
    retentionPeriod: '2年',
    accessPermission: '运维/研发'
  },
  {
    docType: '安全审计',
    updateFrequency: '季度更新',
    retentionPeriod: '7年',
    accessPermission: '安全团队'
  }
];

const languageSupportData = [
  {
    docCategory: '开发者文档',
    languages: '英文(主要)、中文',
    updateStrategy: '英文先行，定期同步中文',
    toolSupport: 'Crowdin, VSCode i18n插件'
  },
  {
    docCategory: '用户指南',
    languages: '中文、英文、日文、韩文',
    updateStrategy: '完整多语言同步更新',
    toolSupport: '本地化管理平台'
  },
  {
    docCategory: '运营报告',
    languages: '中文(主要)、英文',
    updateStrategy: '按需翻译关键内容',
    toolSupport: '自动翻译+人工校对'
  },
  {
    docCategory: '技术架构',
    languages: '英文',
    updateStrategy: '仅英文维护',
    toolSupport: 'Markdown + PlantUML'
  }
];

onMounted(() => {
  if (docStatusDiagram.value) {
    const mermaidCode = `
      stateDiagram-v2
        [*] --> 草稿
        草稿 --> 审核中: 提交审核
        审核中 --> 草稿: 审核不通过
        审核中 --> 已发布: 审核通过
        已发布 --> 需更新: 发现问题/需求变更
        需更新 --> 草稿: 开始修订
        已发布 --> 归档: 版本过期
        归档 --> [*]
        
        state 已发布 {
          [*] --> 正常
          正常 --> 需注意: 部分内容过时
          需注意 --> 正常: 内容更新
          需注意 --> 严重过时: 长期未更新
          严重过时 --> [*]
        }
        
        note right of 草稿
          可多人协作编辑
          必须关联JIRA工单
        end note
        
        note right of 已发布
          必须通过自动化检查
          需完成版本号标记
        end note
    `;
    createDiagram(docStatusDiagram.value, mermaidCode);
  }
  
  if (toolChainDiagram.value) {
    const mermaidCode = `
      flowchart LR
        A["源代码"] --> B["代码注释"]
        B --> C["JSDoc/Typedoc"]
        
        D["API定义"] --> E["OpenAPI/Swagger"]
        
        F["Markdown文档"] --> G["静态站点生成"]
        
        C --> G
        E --> G
        
        G --> H["文档网站"]
        
        I["CI/CD"] --> J{"触发条件"}
        J -->|"代码提交"| K["自动构建文档"]
        J -->|"定时任务"| K
        K --> L["自动部署"]
        L --> H
    `;
    createDiagram(toolChainDiagram.value, mermaidCode);
  }
  
  if (translationWorkflow.value) {
    const mermaidCode = `
      flowchart LR
        A["源文档变更"] --> B{"检测变更"}
        B --> C["提取待翻译内容"]
        C --> D["机器翻译初稿"]
        D --> E["专业翻译审核"]
        E --> F["技术人员审核"]
        F --> G["合并翻译内容"]
        G --> H["构建多语言文档"]
    `;
    createDiagram(translationWorkflow.value, mermaidCode);
  }
});
</script>

<style scoped>
.doc-requirements {
  padding: 20px;
  background-color: #000000;
  color: var(--text-primary);
  min-height: 100%;
}

.section {
  margin-bottom: 30px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 400px;
  padding: 20px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.mini-diagram {
  margin-top: 20px;
  min-height: 200px;
  padding: 15px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
}

.tab-content {
  padding: 15px 0;
}

.template-card {
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.template-header {
  padding: 10px 15px;
  background-color: rgba(255, 215, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.template-header h5 {
  margin: 0;
  color: var(--primary-color);
  font-size: 16px;
}

.template-tag {
  background-color: var(--primary-color);
  color: var(--darkest-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.template-content {
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.2);
}

.template-content p {
  margin: 8px 0;
}

.template-content ul, .template-content ol {
  margin: 8px 0;
  padding-left: 20px;
}

.template-content li {
  margin-bottom: 5px;
}

.process-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.process-step {
  display: flex;
  margin-bottom: 20px;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: var(--primary-color);
  color: var(--darkest-bg);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h5 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
}

.step-content p {
  margin: 5px 0;
}

.mt-20 {
  margin-top: 20px;
}

.code-block {
  background-color: #111111;
  border-radius: 4px;
  padding: 12px;
  margin: 12px 0;
  font-family: monospace;
  white-space: pre;
  color: #e6e6e6;
  border-left: 3px solid var(--primary-color);
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.4;
}

.multilingual-support ul {
  padding-left: 20px;
  margin: 15px 0;
}

.multilingual-support li {
  margin-bottom: 15px;
}

.multilingual-support li p {
  margin: 5px 0;
  margin-left: 5px;
  color: var(--text-secondary);
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

:deep(.el-card) {
  background-color: #000000;
}

:deep(.el-tabs--border-card) {
  background-color: #000000;
  border-color: var(--border-color);
}

:deep(.el-tabs--border-card > .el-tabs__header) {
  background-color: rgba(255, 215, 0, 0.05);
  border-bottom: 1px solid var(--border-color);
}

:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active) {
  background-color: #000000;
  border-right-color: var(--border-color);
  border-left-color: var(--border-color);
  color: var(--primary-color);
}

:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item) {
  border-right: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
}

:deep(.el-tabs--border-card > .el-tabs__content) {
  background-color: #000000;
}

:deep(h2), :deep(h3), :deep(h4) {
  color: var(--primary-color);
}
</style> 