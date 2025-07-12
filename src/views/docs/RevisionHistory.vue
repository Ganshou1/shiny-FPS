<template>
  <div class="revision-history">
    <h2>修订记录</h2>
    
    <div class="section">
      <h3>文档修订历史</h3>
      <div class="dark-content-box">
        <el-card>
          <el-table :data="revisionHistory" border style="width: 100%">
            <el-table-column prop="version" label="版本号" width="100"></el-table-column>
            <el-table-column prop="date" label="日期" width="120"></el-table-column>
            <el-table-column prop="author" label="修订人" width="120"></el-table-column>
            <el-table-column prop="description" label="修订内容"></el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>2.1 版本变更说明</h3>
      
      <div class="subsection">
        <h4>2.1.1 记录模板</h4>
        <div class="dark-content-box">
          <el-card>
            <el-table :data="versionChangeRecords" border style="width: 100%">
              <el-table-column prop="version" label="版本号" width="100"></el-table-column>
              <el-table-column prop="changeType" label="变更类型" width="120">
                <template #default="scope">
                  <el-tag :type="getChangeTypeTag(scope.row.changeType)">{{ scope.row.changeType }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="affectedModule" label="影响模块" width="150"></el-table-column>
              <el-table-column prop="modifier" label="修改人" width="100"></el-table-column>
              <el-table-column prop="reviewer" label="审核人" width="100"></el-table-column>
            </el-table>
          </el-card>
        </div>
      </div>
      
      <div class="subsection">
        <h4>2.1.2 变更类型分布</h4>
        <div ref="changeTypeChart" class="diagram-container"></div>
      </div>
      
      <div class="subsection">
        <h4>2.1.3 变更记录代码示例</h4>
        <div class="dark-content-box">
          <el-card>
            <pre class="code-block">
// 版本变更记录对象结构
interface VersionChange {
  version: string;
  changeType: 'feature' | 'bugfix' | 'improvement' | 'refactor';
  affectedModule: string;
  modifier: string;
  reviewer: string;
  date: Date;
  details: string;
  commitHash: string;
}

// 记录新版本变更
function recordVersionChange(change: VersionChange): Promise&lt;boolean&gt; {
  // 1. 验证变更记录完整性
  validateChangeRecord(change);
  
  // 2. 将变更写入版本数据库
  return database.versionChanges.insert(change)
    .then(result => {
      // 3. 触发通知钩子
      notifyStakeholders(change);
      
      // 4. 更新关联文档
      updateRelatedDocuments(change);
      
      return result.success;
    })
    .catch(error => {
      logger.error(`Failed to record version change: ${error.message}`);
      return false;
    });
}
            </pre>
          </el-card>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3>2.2 文档追溯机制</h3>
      <div class="dark-content-box">
        <el-card>
          <el-table :data="trackingMechanism" border style="width: 100%">
            <el-table-column prop="dimension" label="追溯维度" width="150"></el-table-column>
            <el-table-column prop="retentionPeriod" label="保留期限" width="120"></el-table-column>
            <el-table-column prop="queryMethod" label="查询方式" width="150"></el-table-column>
            <el-table-column prop="relatedSystem" label="关联系统"></el-table-column>
          </el-table>
          
          <div class="tracking-workflow-container">
            <h4 class="mt-20">文档追溯工作流</h4>
            <div ref="trackingWorkflow" class="mini-diagram"></div>
          </div>
          
          <div class="tracking-examples mt-20">
            <h4>文档追溯命令示例</h4>
            <div class="command-examples">
              <div class="command-group">
                <h5>Git历史追溯</h5>
                <pre class="code-block">
# 按作者查询文档历史
git log --author="王工程师" --name-only --pretty=format:"%h %ad %s" --date=short docs/

# 按时间范围查询文档变更
git log --since="2025-01-01" --until="2025-07-01" --name-only --pretty=format:"%h %ad %s" --date=short docs/specifications/

# 按关键词查询提交历史
git log -S "性能优化" --name-only --pretty=format:"%h %ad %s" --date=short
                </pre>
              </div>
              
              <div class="command-group">
                <h5>Elasticsearch全文检索</h5>
                <pre class="code-block">
// 复合条件查询
GET /documents/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "content": "网络延迟" }},
        { "range": { "updated_at": { "gte": "2025-01-01" }}},
        { "term": { "module": "战斗系统" }}
      ]
    }
  },
  "sort": [
    { "updated_at": { "order": "desc" }}
  ],
  "_source": ["title", "version", "author", "updated_at", "content_summary"]
}
                </pre>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>版本演进路线图</h3>
      <div ref="versionRoadmap" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>重大变更说明</h3>
      <div class="dark-content-box">
        <el-card>
          <div v-for="(change, index) in majorChanges" :key="index" class="major-change">
            <div class="change-header">
              <h4>{{ change.title }} <span class="version-tag">v{{ change.version }}</span></h4>
              <span class="change-date">{{ change.date }}</span>
            </div>
            <div class="change-content">
              <p>{{ change.description }}</p>
              <div v-if="change.details" class="change-details">
                <h5>详细变更</h5>
                <ul>
                  <li v-for="(detail, dIndex) in change.details" :key="dIndex">
                    {{ detail }}
                  </li>
                </ul>
              </div>
              <div v-if="change.impact" class="change-impact">
                <h5>影响范围</h5>
                <el-tag v-for="(tag, tIndex) in change.impact" :key="tIndex" 
                  :type="getImpactType(tag)" effect="dark" class="impact-tag">
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const versionRoadmap = ref<HTMLElement | null>(null);
const changeTypeChart = ref<HTMLElement | null>(null);
const trackingWorkflow = ref<HTMLElement | null>(null);

// 修订历史数据
const revisionHistory = [
  {
    version: 'v1.0.0',
    date: '2025-07-08',
    author: '系统架构组',
    description: '初始版本发布，包含系统基础架构和模块划分',
    status: '已发布'
  },
  {
    version: 'v1.1.0',
    date: '2025-07-09',
    author: '产品管理组',
    description: '添加非功能性需求章节，包括性能、可用性和扩展性要求',
    status: '已发布'
  },
  {
    version: 'v1.2.0',
    date: '2025-07-10',
    author: '管理规范组',
    description: '添加管理规范章节，包括版本管理、文档要求、变更控制流程和合规审计',
    status: '已发布'
  },
  {
    version: 'v1.3.0',
    date: '2025-07-11',
    author: '系统架构组',
    description: '添加附录章节，包括FPS游戏专项术语表和修订记录',
    status: '当前版本'
  },
  {
    version: 'v1.4.0',
    date: '2025-07-20',
    author: '安全团队',
    description: '计划增加安全框架详细设计和审计机制',
    status: '计划中'
  }
];

// 版本变更记录
const versionChangeRecords = [
  {
    version: 'v1.2.0',
    changeType: '功能新增',
    affectedModule: '武器系统',
    modifier: '张XX',
    reviewer: '王XX'
  },
  {
    version: 'v1.1.3',
    changeType: 'BUG修复',
    affectedModule: '匹配逻辑',
    modifier: '李XX',
    reviewer: '周XX'
  },
  {
    version: 'v1.2.1',
    changeType: '性能优化',
    affectedModule: '战斗引擎',
    modifier: '刘XX',
    reviewer: '陈XX'
  },
  {
    version: 'v1.1.5',
    changeType: '安全更新',
    affectedModule: '登录系统',
    modifier: '黄XX',
    reviewer: '马XX'
  },
  {
    version: 'v1.3.0',
    changeType: '架构调整',
    affectedModule: '全局服务',
    modifier: '杨XX',
    reviewer: '林XX'
  }
];

// 文档追溯机制
const trackingMechanism = [
  {
    dimension: '按作者',
    retentionPeriod: '永久',
    queryMethod: 'Git历史',
    relatedSystem: 'GitHub'
  },
  {
    dimension: '按时间',
    retentionPeriod: '5年',
    queryMethod: '文档数据库',
    relatedSystem: 'Confluence'
  },
  {
    dimension: '按关键词',
    retentionPeriod: '实时',
    queryMethod: '全文检索',
    relatedSystem: 'Elasticsearch'
  },
  {
    dimension: '按模块',
    retentionPeriod: '3年',
    queryMethod: '元数据检索',
    relatedSystem: 'Jira + Confluence'
  },
  {
    dimension: '按版本',
    retentionPeriod: '永久',
    queryMethod: '版本控制',
    relatedSystem: 'GitLab + Semantic Versioning'
  }
];

// 重大变更说明
const majorChanges = [
  {
    title: '系统架构重构',
    version: '1.2.0',
    date: '2025-07-10',
    description: '对系统架构进行重构，采用微服务架构替代原单体架构，以提升系统的扩展性和维护性。',
    details: [
      '拆分为7个核心微服务',
      '引入服务网格(Service Mesh)管理服务间通信',
      '重构数据访问层，采用CQRS模式',
      '引入事件驱动架构处理系统内异步通信'
    ],
    impact: ['架构', '部署', '性能']
  },
  {
    title: '文档标准化',
    version: '1.3.0',
    date: '2025-07-11',
    description: '标准化所有技术文档格式和管理流程，建立统一的文档生命周期管理规范。',
    details: [
      '制定文档分类标准',
      '建立文档状态管理流程',
      '开发自动化文档生成工具链',
      '实现多语言文档支持'
    ],
    impact: ['流程', '标准化']
  }
];

// 获取状态类型
const getStatusType = (status: string) => {
  switch (status) {
    case '已发布':
      return 'success';
    case '当前版本':
      return 'primary';
    case '计划中':
      return 'info';
    default:
      return '';
  }
};

// 获取变更类型标签
const getChangeTypeTag = (changeType: string) => {
  switch (changeType) {
    case '功能新增':
      return 'success';
    case 'BUG修复':
      return 'warning';
    case '性能优化':
      return 'info';
    case '安全更新':
      return 'danger';
    case '架构调整':
      return 'primary';
    default:
      return '';
  }
};

// 获取影响范围标签类型
const getImpactType = (impact: string) => {
  switch (impact) {
    case '架构':
      return 'danger';
    case '性能':
      return 'warning';
    case '部署':
      return 'info';
    case '流程':
      return 'success';
    case '标准化':
      return '';
    default:
      return '';
  }
};

onMounted(() => {
  if (versionRoadmap.value) {
    const mermaidCode = `
      gitGraph
        commit id: "v0.9.0" tag: "初始原型"
        commit id: "v1.0.0" tag: "基础架构"
        branch 性能优化
        checkout 性能优化
        commit id: "优化引擎"
        commit id: "网络优化"
        checkout main
        merge 性能优化 tag: "v1.1.0"
        branch 管理规范
        checkout 管理规范
        commit id: "版本管理"
        commit id: "文档规范"
        commit id: "变更控制"
        checkout main
        merge 管理规范 tag: "v1.2.0"
        branch 附录
        checkout 附录
        commit id: "术语表"
        commit id: "修订记录"
        checkout main
        merge 附录 tag: "v1.3.0"
        commit id: "当前版本"
    `;
    createDiagram(versionRoadmap.value, mermaidCode);
  }
  
  if (changeTypeChart.value) {
    const mermaidCode = `
      pie title 变更类型分布 (2025年第二季度)
        "功能新增" : 42
        "BUG修复" : 28
        "性能优化" : 15
        "安全更新" : 10
        "架构调整" : 5
    `;
    createDiagram(changeTypeChart.value, mermaidCode);
  }
  
  if (trackingWorkflow.value) {
    const mermaidCode = `
      flowchart TD
        A["文档变更触发"] --> B{"是否需要追溯?"}
        B -->|是| C["确定追溯维度"]
        B -->|否| Z["结束流程"]
        
        C --> D["选择追溯系统"]
        D --> E{"按作者追溯"}
        D --> F{"按时间追溯"}
        D --> G{"按关键词追溯"}
        D --> H{"按模块追溯"}
        
        E --> I["Git历史查询"]
        F --> J["文档数据库查询"]
        G --> K["Elasticsearch检索"]
        H --> L["元数据检索"]
        
        I --> M["生成追溯报告"]
        J --> M
        K --> M
        L --> M
        
        M --> N["版本对比分析"]
        N --> O["确认文档演进路径"]
    `;
    createDiagram(trackingWorkflow.value, mermaidCode);
  }
});
</script>

<style scoped>
.revision-history {
  padding: 20px;
  background-color: #000000;
  color: var(--text-primary);
  min-height: 100%;
}

.section {
  margin-bottom: 30px;
}

.subsection {
  margin-bottom: 20px;
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
  margin-top: 15px;
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
  min-height: 300px;
  padding: 15px;
  border-radius: 4px;
  background-color: #000000;
  border: 1px solid var(--gold-border);
  margin-top: 15px;
}

.tracking-workflow-container {
  margin-top: 30px;
}

.command-examples {
  margin-top: 15px;
}

.command-group {
  margin-bottom: 20px;
}

.command-group h5 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 0.95rem;
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

.major-change {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.major-change:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.change-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.change-header h4 {
  color: var(--primary-color);
  margin: 0;
  display: flex;
  align-items: center;
}

.version-tag {
  background-color: var(--primary-color);
  color: #000;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: 10px;
  font-weight: bold;
}

.change-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.change-content p {
  margin: 10px 0;
  line-height: 1.5;
}

.change-details, .change-impact {
  margin-top: 15px;
}

.change-details h5, .change-impact h5 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 0.95rem;
}

.change-details ul {
  margin: 0;
  padding-left: 20px;
}

.change-details li {
  margin-bottom: 5px;
  color: var(--text-secondary);
}

.impact-tag {
  margin-right: 8px;
  margin-bottom: 5px;
}

.mt-20 {
  margin-top: 20px;
}

:deep(.el-card) {
  background-color: #000000;
  border-color: var(--border-color);
}

:deep(.el-table) {
  background-color: transparent;
  color: var(--text-primary);
}

:deep(.el-table tr) {
  background-color: transparent;
}

:deep(.el-table th) {
  background-color: rgba(255, 215, 0, 0.1);
  color: var(--primary-color);
  border-bottom: 1px solid var(--gold-border);
}

:deep(.el-table td) {
  border-bottom: 1px solid rgba(255, 215, 0, 0.1);
}

:deep(.el-table--border) {
  border: 1px solid rgba(255, 215, 0, 0.2);
}

:deep(.el-table--border th), :deep(.el-table--border td) {
  border-right: 1px solid rgba(255, 215, 0, 0.1);
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td) {
  background-color: rgba(255, 215, 0, 0.05);
}

:deep(.el-tag--dark) {
  border: none;
}

:deep(.el-tag--dark.el-tag--success) {
  background-color: rgba(103, 194, 58, 0.8);
}

:deep(.el-tag--dark.el-tag--info) {
  background-color: rgba(144, 147, 153, 0.8);
}

:deep(.el-tag--dark.el-tag--warning) {
  background-color: rgba(230, 162, 60, 0.8);
}

:deep(.el-tag--dark.el-tag--danger) {
  background-color: rgba(245, 108, 108, 0.8);
}

:deep(.el-tag--dark.el-tag--primary) {
  background-color: rgba(64, 158, 255, 0.8);
}

h2, h3, h4 {
  color: var(--primary-color);
}
</style> 