<template>
  <div class="change-control">
    <h2>变更控制流程</h2>
    
    <div class="section">
      <h3>3.1 紧急热修SOP</h3>
      
      <div class="dark-content-box">
        <el-table :data="hotfixSOP" border style="width: 100%">
          <el-table-column prop="step" label="步骤" width="150"></el-table-column>
          <el-table-column prop="responsible" label="责任人" width="150"></el-table-column>
          <el-table-column prop="timeLimit" label="时限" width="120"></el-table-column>
          <el-table-column prop="deliverable" label="输出物"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>紧急修复流程图</h3>
      <div ref="hotfixProcessFlow" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>变更请求处理流程</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="change-request-process">
            <h4>变更请求类型</h4>
            <el-table :data="changeRequestTypes" border style="width: 100%">
              <el-table-column prop="type" label="类型" width="150"></el-table-column>
              <el-table-column prop="description" label="描述"></el-table-column>
              <el-table-column prop="priority" label="优先级" width="100"></el-table-column>
              <el-table-column prop="approvalLevel" label="审批级别" width="150"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">变更请求工作流</h4>
            <div ref="changeRequestWorkflow" class="mini-diagram"></div>
            
            <h4 class="mt-20">变更请求表单</h4>
            <div class="form-preview">
              <div class="form-section">
                <h5>基本信息</h5>
                <div class="form-row">
                  <div class="form-field">
                    <label>变更ID</label>
                    <div class="field-preview">CHG-2023-0001</div>
                  </div>
                  <div class="form-field">
                    <label>变更类型</label>
                    <div class="field-preview">紧急修复</div>
                  </div>
                  <div class="form-field">
                    <label>提交日期</label>
                    <div class="field-preview">2023-07-15</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field">
                    <label>提交人</label>
                    <div class="field-preview">张工 (开发团队)</div>
                  </div>
                  <div class="form-field">
                    <label>受影响系统</label>
                    <div class="field-preview">战斗服务器, 匹配系统</div>
                  </div>
                  <div class="form-field">
                    <label>优先级</label>
                    <div class="field-preview high-priority">高</div>
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h5>变更详情</h5>
                <div class="form-row full-width">
                  <div class="form-field">
                    <label>变更原因</label>
                    <div class="field-preview">生产环境发现严重BUG，导致特定武器组合时伤害计算错误</div>
                  </div>
                </div>
                <div class="form-row full-width">
                  <div class="form-field">
                    <label>变更描述</label>
                    <div class="field-preview">修复伤害计算公式中的溢出问题，当组合多个暴击加成时错误计算最终伤害</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-field">
                    <label>变更范围</label>
                    <div class="field-preview">伤害计算模块</div>
                  </div>
                  <div class="form-field">
                    <label>影响用户比例</label>
                    <div class="field-preview">约5%活跃用户</div>
                  </div>
                  <div class="form-field">
                    <label>计划实施时间</label>
                    <div class="field-preview">2023-07-15 22:00</div>
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h5>风险评估</h5>
                <div class="form-row">
                  <div class="form-field">
                    <label>风险等级</label>
                    <div class="field-preview medium-risk">中</div>
                  </div>
                  <div class="form-field">
                    <label>潜在风险</label>
                    <div class="field-preview">可能影响其他武器伤害计算</div>
                  </div>
                  <div class="form-field">
                    <label>回滚计划</label>
                    <div class="field-preview">准备回滚脚本，保留30天回滚窗口</div>
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h5>审批流程</h5>
                <div class="approval-flow">
                  <div class="approval-step completed">
                    <div class="approver-info">
                      <span class="approver-name">李工 (技术负责人)</span>
                      <span class="approval-status">已批准</span>
                      <span class="approval-time">2023-07-15 18:30</span>
                    </div>
                    <div class="approval-comment">修复方案合理，测试充分，同意实施</div>
                  </div>
                  <div class="approval-step completed">
                    <div class="approver-info">
                      <span class="approver-name">王总 (运营总监)</span>
                      <span class="approval-status">已批准</span>
                      <span class="approval-time">2023-07-15 19:15</span>
                    </div>
                    <div class="approval-comment">已确认用户影响范围，同意在低峰期实施</div>
                  </div>
                  <div class="approval-step">
                    <div class="approver-info">
                      <span class="approver-name">赵总 (制作人)</span>
                      <span class="approval-status">待批准</span>
                      <span class="approval-time">-</span>
                    </div>
                    <div class="approval-comment"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>变更实施控制</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="implementation-control">
            <h4>变更窗口管理</h4>
            <table class="custom-table">
              <tr>
                <th>变更类型</th>
                <th>标准变更窗口</th>
                <th>冻结期</th>
                <th>通知要求</th>
              </tr>
              <tr>
                <td>标准更新</td>
                <td>每周二 02:00-06:00</td>
                <td>重大活动前2周</td>
                <td>提前7天公告</td>
              </tr>
              <tr>
                <td>功能更新</td>
                <td>每月15日 00:00-08:00</td>
                <td>重大活动前3周</td>
                <td>提前14天公告</td>
              </tr>
              <tr>
                <td>紧急修复</td>
                <td>随时(优先低峰期)</td>
                <td>无冻结期</td>
                <td>实施前1小时公告</td>
              </tr>
              <tr>
                <td>数据库变更</td>
                <td>每月第一个周日 00:00-06:00</td>
                <td>重大活动前4周</td>
                <td>提前21天公告</td>
              </tr>
            </table>
            
            <h4 class="mt-20">变更实施清单</h4>
            <div class="implementation-checklist">
              <div class="checklist-item">
                <div class="checklist-header">
                  <div class="checkbox checked"></div>
                  <h5>部署前检查</h5>
                </div>
                <ul>
                  <li>备份目标环境配置和数据</li>
                  <li>完成所有自动化测试</li>
                  <li>准备回滚脚本</li>
                  <li>确认监控系统就绪</li>
                  <li>通知相关团队和用户</li>
                </ul>
              </div>
              <div class="checklist-item">
                <div class="checklist-header">
                  <div class="checkbox checked"></div>
                  <h5>部署执行</h5>
                </div>
                <ul>
                  <li>执行数据库更改脚本(如需)</li>
                  <li>分批部署应用服务器</li>
                  <li>执行冒烟测试确认功能</li>
                  <li>更新CDN资源(如需)</li>
                  <li>启用新功能开关</li>
                </ul>
              </div>
              <div class="checklist-item">
                <div class="checklist-header">
                  <div class="checkbox"></div>
                  <h5>部署后监控</h5>
                </div>
                <ul>
                  <li>监控关键业务指标30分钟</li>
                  <li>监控系统性能指标2小时</li>
                  <li>监控错误日志和告警</li>
                  <li>检查数据一致性</li>
                  <li>确认所有服务健康状态</li>
                </ul>
              </div>
              <div class="checklist-item">
                <div class="checklist-header">
                  <div class="checkbox"></div>
                  <h5>变更确认</h5>
                </div>
                <ul>
                  <li>确认变更目标已实现</li>
                  <li>收集用户反馈</li>
                  <li>更新变更记录状态</li>
                  <li>关闭关联的JIRA工单</li>
                  <li>安排变更后评审会议</li>
                </ul>
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

const hotfixProcessFlow = ref<HTMLElement | null>(null);
const changeRequestWorkflow = ref<HTMLElement | null>(null);

const hotfixSOP = [
  {
    step: '问题确认',
    responsible: '值班主程',
    timeLimit: '30分钟',
    deliverable: '故障报告'
  },
  {
    step: '方案制定',
    responsible: '核心开发',
    timeLimit: '1小时',
    deliverable: '修复方案文档'
  },
  {
    step: '修复验证',
    responsible: 'QA团队',
    timeLimit: '2小时',
    deliverable: '测试用例'
  },
  {
    step: '审批流程',
    responsible: '技术负责人',
    timeLimit: '30分钟',
    deliverable: '审批记录'
  },
  {
    step: '灰度推送',
    responsible: 'DevOps',
    timeLimit: '1小时',
    deliverable: '监控看板'
  },
  {
    step: '全量发布',
    responsible: '运维团队',
    timeLimit: '1小时',
    deliverable: '部署报告'
  },
  {
    step: '效果评估',
    responsible: '产品经理',
    timeLimit: '24小时',
    deliverable: '评估报告'
  }
];

const changeRequestTypes = [
  {
    type: '标准变更',
    description: '低风险、常规的变更，如配置参数调整、小型功能更新等',
    priority: '低',
    approvalLevel: '模块负责人'
  },
  {
    type: '正常变更',
    description: '中等风险、计划内的功能性变更，如新功能上线、架构优化等',
    priority: '中',
    approvalLevel: '技术负责人'
  },
  {
    type: '紧急变更',
    description: '高风险、需要立即处理的问题修复，如生产环境严重BUG、安全漏洞等',
    priority: '高',
    approvalLevel: '制作人'
  },
  {
    type: '重大变更',
    description: '可能影响整体系统稳定性的变更，如核心架构调整、数据库迁移等',
    priority: '最高',
    approvalLevel: 'CTO'
  }
];

onMounted(() => {
  if (hotfixProcessFlow.value) {
    const mermaidCode = `
      flowchart TD
        A[发现问题] -->|紧急严重BUG| B[启动紧急响应]
        A -->|一般BUG| C[进入常规修复流程]
        
        B --> D[问题定级]
        D -->|P0/P1级| E[组建紧急修复团队]
        D -->|P2级以下| C
        
        E --> F[根本原因分析]
        F --> G[制定修复方案]
        G --> H[开发修复代码]
        H --> I[代码评审]
        I --> J[QA验证测试]
        
        J -->|通过| K{需要热更新?}
        J -->|不通过| H
        
        K -->|是| L[准备热更新包]
        K -->|否| M[准备版本更新]
        
        L --> N[灰度发布5%用户]
        N --> O{监控正常?}
        O -->|是| P[逐步扩大比例]
        O -->|否| Q[立即回滚]
        Q --> F
        
        P --> R[全量发布]
        M --> R
        
        R --> S[持续监控24小时]
        S --> T[发布总结报告]
        T --> U[更新知识库]
    `;
    createDiagram(hotfixProcessFlow.value, mermaidCode);
  }
  
  if (changeRequestWorkflow.value) {
    const mermaidCode = `
      stateDiagram-v2
        [*] --> 创建
        创建 --> 评审: 提交评审
        评审 --> 驳回: 评审不通过
        评审 --> 批准: 评审通过
        驳回 --> 创建: 修改后重新提交
        批准 --> 实施准备: 分配实施人员
        实施准备 --> 实施中: 开始实施
        实施中 --> 验证: 实施完成
        验证 --> 实施中: 验证不通过
        验证 --> 完成: 验证通过
        完成 --> 评估: 效果评估
        评估 --> [*]
        实施中 --> 回滚: 实施失败
        回滚 --> 创建: 重新计划
    `;
    createDiagram(changeRequestWorkflow.value, mermaidCode);
  }
});
</script>

<style scoped>
.change-control {
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

.form-preview {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-top: 20px;
}

.form-section {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
}

.form-section:last-child {
  border-bottom: none;
}

.form-section h5 {
  margin: 0 0 15px 0;
  color: var(--primary-color);
  font-size: 16px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.form-row.full-width {
  flex-direction: column;
}

.form-field {
  flex: 1;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  font-size: 12px;
  color: var(--text-secondary);
}

.field-preview {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  min-height: 20px;
}

.high-priority {
  color: #f56c6c;
  font-weight: bold;
}

.medium-risk {
  color: #e6a23c;
  font-weight: bold;
}

.approval-flow {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.approval-step {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
}

.approval-step.completed {
  border-left: 3px solid #67c23a;
}

.approver-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.approver-name {
  font-weight: bold;
}

.approval-status {
  color: #67c23a;
}

.approval-time {
  color: var(--text-secondary);
  font-size: 12px;
}

.approval-comment {
  color: var(--text-secondary);
  font-style: italic;
  padding: 5px 0;
}

.implementation-checklist {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.checklist-item {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 15px;
}

.checklist-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  color: var(--primary-color);
  font-size: 16px;
  line-height: 20px;
  top: -1px;
  left: 4px;
}

.checklist-header h5 {
  margin: 0;
  color: var(--primary-color);
}

.checklist-item ul {
  margin: 0;
  padding-left: 20px;
}

.checklist-item li {
  margin-bottom: 8px;
  color: var(--text-secondary);
}

.mt-20 {
  margin-top: 20px;
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