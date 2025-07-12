<template>
  <div class="version-management">
    <h2>版本管理规范</h2>
    
    <div class="section">
      <h3>1.1 版本控制体系</h3>
      <h4>1.1.1 版本号命名规则</h4>
      
      <div class="dark-content-box">
        <el-table :data="versionRules" border style="width: 100%">
          <el-table-column prop="field" label="字段" width="120"></el-table-column>
          <el-table-column prop="example" label="示例" width="120"></el-table-column>
          <el-table-column prop="description" label="变更说明" width="180"></el-table-column>
          <el-table-column prop="approval" label="审批要求"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>分支管理流程</h3>
      <div ref="branchFlowchart" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>1.2 灰度发布策略</h3>
      
      <div class="dark-content-box">
        <el-table :data="gradualReleaseData" border style="width: 100%">
          <el-table-column prop="stage" label="阶段" width="120"></el-table-column>
          <el-table-column prop="target" label="目标设备" width="150"></el-table-column>
          <el-table-column prop="duration" label="持续时间" width="150"></el-table-column>
          <el-table-column prop="rollbackThreshold" label="回滚阈值"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>构建流水线设计</h3>
      <div ref="cicdPipeline" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>分支管理策略</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="branch-strategy">
            <h4>Git-Flow工作流</h4>
            <p>FPS游戏管理系统采用修改版的Git-Flow工作流，主要包含以下分支类型：</p>
            
            <div class="branch-types">
              <div class="branch-type">
                <h5><i class="el-icon branch-icon">main</i> Main分支</h5>
                <p>存放官方发布历史，所有提交都使用版本号标记</p>
                <p><strong>保护措施:</strong> 需通过CI全部测试用例，并经过至少2位审核人批准</p>
              </div>
              
              <div class="branch-type">
                <h5><i class="el-icon branch-icon">develop</i> Develop分支</h5>
                <p>最新的开发进度，所有功能开发完成后合并到此分支</p>
                <p><strong>保护措施:</strong> 需通过自动化测试，必须由功能负责人审核</p>
              </div>
              
              <div class="branch-type">
                <h5><i class="el-icon branch-icon">feature</i> Feature分支</h5>
                <p>用于开发新功能，命名格式: feature/[JIRA-ID]-[功能简述]</p>
                <p><strong>生命周期:</strong> 从develop分支创建，完成后通过PR合并回develop</p>
              </div>
              
              <div class="branch-type">
                <h5><i class="el-icon branch-icon">release</i> Release分支</h5>
                <p>准备发布新版本，命名格式: release/v[主版本].[次版本]</p>
                <p><strong>特点:</strong> 只修复Bug，不添加新功能，完成后合并到main和develop</p>
              </div>
              
              <div class="branch-type">
                <h5><i class="el-icon branch-icon">hotfix</i> Hotfix分支</h5>
                <p>紧急修复生产问题，命名格式: hotfix/v[版本]-[问题简述]</p>
                <p><strong>特点:</strong> 从main创建，修复后合并回main和develop</p>
              </div>
            </div>
            
            <h4 class="mt-20">提交信息规范</h4>
            <pre class="code-block">
&lt;type&gt;(&lt;scope&gt;): &lt;subject&gt;

&lt;body&gt;

&lt;footer&gt;
            </pre>
            <p>其中：</p>
            <ul>
              <li><strong>type:</strong> feat(新功能), fix(Bug修复), docs(文档), style(样式), refactor(重构), perf(性能优化), test(测试), chore(构建/依赖)</li>
              <li><strong>scope:</strong> 影响范围，如auth, weapons, matchmaking等</li>
              <li><strong>subject:</strong> 简短描述，不超过50个字符</li>
              <li><strong>body:</strong> 详细描述，说明改动原因和影响</li>
              <li><strong>footer:</strong> 关联的Issue或Breaking Changes</li>
            </ul>
            
            <h4 class="mt-20">合并请求(Pull Request)规范</h4>
            <ul>
              <li>所有代码变更必须通过PR进行，禁止直接提交到保护分支</li>
              <li>PR必须关联至少一个JIRA工单</li>
              <li>PR必须通过CI/CD流水线所有测试</li>
              <li>PR必须经过至少一位同级别或以上开发人员审核</li>
              <li>核心模块PR需要经过架构师或技术负责人审核</li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>版本回滚清单</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="rollback-checklist">
            <h4>版本回滚前检查项</h4>
            <el-table :data="rollbackPreCheckData" border style="width: 100%">
              <el-table-column prop="checkItem" label="检查项" width="200"></el-table-column>
              <el-table-column prop="description" label="说明"></el-table-column>
              <el-table-column prop="owner" label="负责人" width="120"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">回滚执行步骤</h4>
            <ol>
              <li>
                <strong>确认回滚范围</strong>
                <p>明确需要回滚的组件、版本和影响范围，是否需要数据回滚</p>
              </li>
              <li>
                <strong>准备回滚环境</strong>
                <p>确保回滚版本的代码和资源包已经准备就绪，环境配置正确</p>
              </li>
              <li>
                <strong>通知相关方</strong>
                <p>通知运营、客服和社区团队，准备公告和沟通材料</p>
              </li>
              <li>
                <strong>备份当前数据</strong>
                <p>确保当前版本的数据已完全备份，必要时准备数据回滚脚本</p>
              </li>
              <li>
                <strong>执行分批回滚</strong>
                <p>先在少量服务器上执行回滚，确认无异常后逐步扩大范围</p>
              </li>
              <li>
                <strong>验证回滚结果</strong>
                <p>进行全面的功能和性能测试，确保回滚版本正常工作</p>
              </li>
              <li>
                <strong>监控和跟进</strong>
                <p>密切监控关键指标，收集用户反馈，及时处理新问题</p>
              </li>
            </ol>
            
            <h4 class="mt-20">特殊场景处理</h4>
            <table class="custom-table">
              <tr>
                <th>场景</th>
                <th>处理方案</th>
              </tr>
              <tr>
                <td>数据结构变更</td>
                <td>准备数据迁移脚本，确保向前和向后兼容</td>
              </tr>
              <tr>
                <td>多组件依赖</td>
                <td>确定回滚顺序，先回滚依赖方，后回滚被依赖方</td>
              </tr>
              <tr>
                <td>客户端强制更新</td>
                <td>发布特殊版本客户端，支持旧版服务器协议</td>
              </tr>
              <tr>
                <td>第三方服务依赖</td>
                <td>确认第三方服务接口兼容性，必要时回退第三方集成</td>
              </tr>
            </table>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>关键要求说明</h3>
      <div class="dark-content-box">
        <div class="key-requirements">
          <ul class="special-notes">
            <li><strong>所有版本变更需关联JIRA需求单</strong>, 确保每个变更有明确的需求来源和追踪记录</li>
            <li><strong>文档必须包含变更历史记录</strong>, 记录变更内容、影响范围和负责人</li>
            <li><strong>生产环境配置需版本化存储</strong>, 确保配置变更可追踪、可回滚</li>
            <li><strong>重大变更需进行玩家影响评估</strong>, 评估潜在风险和收益，制定应对预案</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const branchFlowchart = ref<HTMLElement | null>(null);
const cicdPipeline = ref<HTMLElement | null>(null);

const versionRules = [
  {
    field: '主版本',
    example: 'v2.0',
    description: '架构级改动',
    approval: 'CTO签字'
  },
  {
    field: '次版本',
    example: 'v1.5',
    description: '新武器/地图',
    approval: '制作人审批'
  },
  {
    field: '热修复',
    example: 'v1.4.3',
    description: '紧急BUG修复',
    approval: '主程确认'
  },
  {
    field: '构建号',
    example: 'v1.4.3.2105',
    description: '每日构建',
    approval: '自动化流程'
  },
  {
    field: '特殊版本',
    example: 'v1.4-beta1',
    description: '测试版本',
    approval: 'QA主管确认'
  }
];

const gradualReleaseData = [
  {
    stage: '内部测试',
    target: '公司设备',
    duration: '1-3天',
    rollbackThreshold: '崩溃率>1%'
  },
  {
    stage: '小规模',
    target: '5%玩家',
    duration: '24小时',
    rollbackThreshold: '差评率>15%'
  },
  {
    stage: '中规模',
    target: '30%玩家',
    duration: '48小时',
    rollbackThreshold: '留存率下降>10%'
  },
  {
    stage: '全量',
    target: '所有玩家',
    duration: '-',
    rollbackThreshold: '营收降幅>5%'
  }
];

const rollbackPreCheckData = [
  {
    checkItem: '业务影响评估',
    description: '评估回滚对玩家体验、数据一致性和业务指标的影响',
    owner: '产品经理'
  },
  {
    checkItem: '技术可行性确认',
    description: '确认回滚方案的技术路径，评估风险点和复杂度',
    owner: '技术负责人'
  },
  {
    checkItem: '数据完整性验证',
    description: '确保目标版本的数据备份完整可用，数据结构兼容',
    owner: 'DBA'
  },
  {
    checkItem: '回滚资源准备',
    description: '准备回滚所需的代码包、配置文件和部署脚本',
    owner: 'DevOps工程师'
  },
  {
    checkItem: '回滚计划审批',
    description: '回滚方案经相关负责人审批，明确时间窗口和人员分工',
    owner: '项目经理'
  }
];

onMounted(() => {
  if (branchFlowchart.value) {
    const mermaidCode = `
      flowchart TB
        A[代码提交] --> B{分支类型?}
        B -->|feature| C[开发分支]
        B -->|hotfix| D[紧急修复分支]
        B -->|release| E[版本发布分支]
        
        C --> F{代码审核}
        D --> F
        E --> F
        
        F -->|通过| G[合并到develop]
        F -->|不通过| H[修改代码]
        H --> F
        
        G --> I{阶段?}
        I -->|开发| J[部署到测试环境]
        I -->|紧急修复| K[部署到预发布环境]
        I -->|发布| L[部署到生产环境]
        
        J --> M[QA测试]
        K --> N[验证修复]
        L --> O[监控生产表现]
        
        subgraph 主要分支
        P[main] --- Q[develop]
        end
        
        subgraph 辅助分支
        R[feature/*]
        S[hotfix/*]
        T[release/*]
        end
        
        R -.-> Q
        Q -.-> T
        T -.-> P
        P -.-> S
        S -.-> P
        S -.-> Q
    `;
    createDiagram(branchFlowchart.value, mermaidCode);
  }
  
  if (cicdPipeline.value) {
    const mermaidCode = `
      flowchart LR
        subgraph 代码阶段
        A[提交代码] --> B[代码扫描]
        B --> C{通过?}
        C -->|是| D[单元测试]
        C -->|否| A
        D --> E{通过?}
        E -->|是| F[构建应用]
        E -->|否| A
        end
        
        subgraph 测试阶段
        F --> G[部署测试环境]
        G --> H[自动化测试]
        H --> I{通过?}
        I -->|是| J[集成测试]
        I -->|否| A
        J --> K{通过?}
        K -->|是| L[性能测试]
        K -->|否| A
        end
        
        subgraph 发布阶段
        L --> M[部署预发布]
        M --> N[冒烟测试]
        N --> O{通过?}
        O -->|是| P[灰度发布]
        O -->|否| A
        P --> Q[监控验证]
        Q --> R{稳定?}
        R -->|是| S[全量发布]
        R -->|否| T[回滚]
        T --> A
        end
        
        style A fill:#FFF,stroke:#000
        style F fill:#FFF,stroke:#000
        style L fill:#FFF,stroke:#000
        style P fill:#FFF,stroke:#000
        style S fill:#FFF,stroke:#000
    `;
    createDiagram(cicdPipeline.value, mermaidCode);
  }
});
</script>

<style scoped>
.version-management {
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

.branch-strategy h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--primary-color);
}

.branch-types {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.branch-type {
  background-color: rgba(255, 215, 0, 0.05);
  border-left: 3px solid var(--gold-border);
  padding: 15px;
  border-radius: 4px;
}

.branch-type h5 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--primary-color);
  font-size: 16px;
  display: flex;
  align-items: center;
}

.branch-icon {
  font-style: normal;
  background-color: rgba(255, 215, 0, 0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-family: monospace;
  font-size: 14px;
  color: var(--primary-color);
}

.branch-type p {
  margin: 5px 0;
  font-size: 14px;
}

.rollback-checklist ol {
  padding-left: 20px;
  margin: 15px 0;
}

.rollback-checklist li {
  margin-bottom: 15px;
}

.rollback-checklist p {
  margin: 5px 0;
  margin-left: 5px;
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
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
  color: var(--text-primary);
}

.custom-table th {
  background-color: rgba(255, 215, 0, 0.1);
  border: 1px solid var(--gold-border);
  padding: 8px;
  text-align: left;
  color: var(--primary-color);
}

.custom-table td {
  border: 1px solid var(--border-color);
  padding: 8px;
}

.custom-table tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.03);
}

.special-notes {
  margin-top: 15px;
  padding: 15px;
  border-left: 3px solid var(--primary-color);
  background-color: rgba(255, 215, 0, 0.05);
  list-style-type: none;
}

.special-notes li {
  margin-bottom: 15px;
  line-height: 1.5;
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

:deep(h2), :deep(h3), :deep(h4) {
  color: var(--primary-color);
}
</style> 