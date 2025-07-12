<template>
  <div class="compliance-audit">
    <h2>合规性审计</h2>
    
    <div class="section">
      <h3>4.1 检查项表示例</h3>
      
      <div class="dark-content-box">
        <el-table :data="auditItems" border style="width: 100%">
          <el-table-column prop="auditItem" label="审计项" width="150"></el-table-column>
          <el-table-column prop="standard" label="检测标准" width="180"></el-table-column>
          <el-table-column prop="tool" label="检查工具" width="150"></el-table-column>
          <el-table-column prop="remediation" label="补救措施"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>合规性检查流程</h3>
      <div ref="complianceCheckFlow" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>合规性标准清单</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="compliance-standards">
            <el-tabs type="border-card">
              <el-tab-pane label="数据安全合规">
                <div class="tab-content">
                  <h4>适用标准</h4>
                  <ul class="standards-list">
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">GDPR (通用数据保护条例)</span>
                        <span class="standard-badge">欧盟</span>
                      </div>
                      <p>适用于所有处理欧盟公民个人数据的企业，无论企业位于何处</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>用户数据处理需明确获得同意</li>
                          <li>保障用户查阅、更正、删除数据的权利</li>
                          <li>数据泄露需在72小时内通知监管机构</li>
                          <li>实施数据保护影响评估</li>
                          <li>遵循数据最小化原则</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">PIPL (个人信息保护法)</span>
                        <span class="standard-badge">中国</span>
                      </div>
                      <p>中国个人信息保护法律框架，规范个人信息处理活动</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>收集个人信息需明确告知目的、方式和范围</li>
                          <li>不得过度收集个人信息</li>
                          <li>采取必要措施确保个人信息安全</li>
                          <li>遵循单独同意原则</li>
                          <li>重要数据需在中国境内存储</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">CCPA (加州消费者隐私法)</span>
                        <span class="standard-badge">美国</span>
                      </div>
                      <p>适用于在加州开展业务并收集个人信息的企业</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>向消费者披露收集的个人信息类别</li>
                          <li>允许消费者选择退出个人信息销售</li>
                          <li>提供查询和删除个人信息的权利</li>
                          <li>不得因消费者行使权利而歧视</li>
                          <li>维护隐私政策并定期更新</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="游戏内容规范">
                <div class="tab-content">
                  <h4>适用标准</h4>
                  <ul class="standards-list">
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">网络游戏管理规定</span>
                        <span class="standard-badge">中国</span>
                      </div>
                      <p>规范网络游戏运营和管理，促进行业健康发展</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>实名认证和防沉迷系统</li>
                          <li>未成年人保护措施</li>
                          <li>游戏内容符合社会公德</li>
                          <li>虚拟道具和服务交易管理</li>
                          <li>游戏服务协议和用户隐私保护</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">ESRB (娱乐软件分级委员会)</span>
                        <span class="standard-badge">北美</span>
                      </div>
                      <p>为视频游戏和应用程序提供内容分级，帮助消费者了解内容适宜性</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>准确申报游戏内容</li>
                          <li>按要求标注分级和内容描述</li>
                          <li>广告和营销材料符合分级要求</li>
                          <li>在线互动环境的安全控制</li>
                          <li>游戏内购买的披露</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">PEGI (泛欧游戏信息)</span>
                        <span class="standard-badge">欧洲</span>
                      </div>
                      <p>欧洲视频游戏分级系统，根据游戏内容设定年龄分级</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>符合年龄分级标准</li>
                          <li>内容描述符号正确使用</li>
                          <li>游戏前显示分级信息</li>
                          <li>营销内容符合分级要求</li>
                          <li>准确披露游戏内购买信息</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              
              <el-tab-pane label="支付安全标准">
                <div class="tab-content">
                  <h4>适用标准</h4>
                  <ul class="standards-list">
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">PCI DSS (支付卡行业数据安全标准)</span>
                        <span class="standard-badge">国际</span>
                      </div>
                      <p>适用于处理、存储或传输信用卡数据的所有实体</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>构建和维护安全的网络</li>
                          <li>保护持卡人数据</li>
                          <li>维护漏洞管理计划</li>
                          <li>实施强访问控制措施</li>
                          <li>定期监控和测试网络</li>
                          <li>维护信息安全政策</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">非银行支付机构网络支付业务管理办法</span>
                        <span class="standard-badge">中国</span>
                      </div>
                      <p>规范支付机构网络支付业务，保护用户资金安全</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>实名制管理</li>
                          <li>分级支付限额</li>
                          <li>客户资金与机构自有资金隔离</li>
                          <li>支付安全管理</li>
                          <li>信息安全保障</li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <div class="standard-header">
                        <span class="standard-name">Apple App Store支付指南</span>
                        <span class="standard-badge">Apple</span>
                      </div>
                      <p>适用于通过App Store发布的应用内购买功能</p>
                      <div class="key-requirements">
                        <p><strong>关键要求:</strong></p>
                        <ul>
                          <li>使用Apple的应用内购买系统</li>
                          <li>禁止引导用户使用外部支付方式</li>
                          <li>价格透明度和用户同意</li>
                          <li>订阅服务的管理和通知</li>
                          <li>退款政策符合要求</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>合规性审计计划</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="audit-plan">
            <h4>年度审计时间表</h4>
            <table class="custom-table">
              <tr>
                <th>审计类型</th>
                <th>频率</th>
                <th>执行时间</th>
                <th>负责团队</th>
                <th>输出物</th>
              </tr>
              <tr>
                <td>内部安全审计</td>
                <td>季度</td>
                <td>每季度最后一个月</td>
                <td>安全团队</td>
                <td>安全评估报告</td>
              </tr>
              <tr>
                <td>数据合规审计</td>
                <td>半年</td>
                <td>6月和12月</td>
                <td>数据治理团队</td>
                <td>数据合规报告</td>
              </tr>
              <tr>
                <td>第三方安全渗透测试</td>
                <td>年度</td>
                <td>每年9月</td>
                <td>外部安全公司</td>
                <td>渗透测试报告</td>
              </tr>
              <tr>
                <td>支付系统审计</td>
                <td>年度</td>
                <td>每年3月</td>
                <td>财务安全团队</td>
                <td>PCI DSS合规证明</td>
              </tr>
              <tr>
                <td>未成年人保护审查</td>
                <td>季度</td>
                <td>每季度首月</td>
                <td>运营合规团队</td>
                <td>未成年保护报告</td>
              </tr>
            </table>
            
            <h4 class="mt-20">合规性管理结构</h4>
            <div ref="complianceOrgChart" class="mini-diagram"></div>
            
            <h4 class="mt-20">审计流程</h4>
            <ol class="audit-process">
              <li>
                <h5>审计准备</h5>
                <ul>
                  <li>确定审计范围和目标</li>
                  <li>制定审计计划和时间表</li>
                  <li>分配审计资源和团队</li>
                  <li>准备审计工具和检查表</li>
                </ul>
              </li>
              <li>
                <h5>审计执行</h5>
                <ul>
                  <li>收集和审查文档</li>
                  <li>执行技术测试和评估</li>
                  <li>进行访谈和观察</li>
                  <li>记录发现和证据</li>
                </ul>
              </li>
              <li>
                <h5>发现分析</h5>
                <ul>
                  <li>评估发现的合规性风险</li>
                  <li>确定根本原因</li>
                  <li>制定修复建议</li>
                  <li>优先排序不合规项</li>
                </ul>
              </li>
              <li>
                <h5>报告与跟进</h5>
                <ul>
                  <li>编写审计报告</li>
                  <li>与利益相关者沟通结果</li>
                  <li>制定修复计划</li>
                  <li>跟踪修复进度</li>
                  <li>验证修复有效性</li>
                </ul>
              </li>
            </ol>
            
            <h4 class="mt-20">合规知识传承机制</h4>
            <div class="knowledge-transfer">
              <div class="knowledge-item">
                <div class="knowledge-header">
                  <i class="el-icon knowledge-icon">📝</i>
                  <h5>合规培训计划</h5>
                </div>
                <p>针对不同角色定制的合规培训:</p>
                <ul>
                  <li>开发人员 - 安全编码和数据处理</li>
                  <li>产品经理 - 隐私设计和法规要求</li>
                  <li>运营人员 - 内容审核和用户管理</li>
                  <li>管理层 - 合规责任和风险管理</li>
                </ul>
                <p><strong>频率:</strong> 新员工入职培训 + 季度更新培训</p>
              </div>
              
              <div class="knowledge-item">
                <div class="knowledge-header">
                  <i class="el-icon knowledge-icon">📚</i>
                  <h5>合规知识库</h5>
                </div>
                <p>维护集中化的合规要求和最佳实践:</p>
                <ul>
                  <li>法规解读和案例分析</li>
                  <li>合规检查表和自评工具</li>
                  <li>问题解决方案和最佳实践</li>
                  <li>行业动态和法规更新</li>
                </ul>
                <p><strong>更新:</strong> 每月审查和更新</p>
              </div>
              
              <div class="knowledge-item">
                <div class="knowledge-header">
                  <i class="el-icon knowledge-icon">🔍</i>
                  <h5>合规咨询机制</h5>
                </div>
                <p>建立专业合规支持渠道:</p>
                <ul>
                  <li>合规专家咨询服务</li>
                  <li>定期合规问答会议</li>
                  <li>合规风险预警机制</li>
                  <li>跨部门合规沟通渠道</li>
                </ul>
                <p><strong>响应时间:</strong> 常规问题24小时，紧急问题4小时</p>
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

const complianceCheckFlow = ref<HTMLElement | null>(null);
const complianceOrgChart = ref<HTMLElement | null>(null);

const auditItems = [
  {
    auditItem: '数据安全',
    standard: 'GDPR条款',
    tool: '静态扫描',
    remediation: '自动脱敏'
  },
  {
    auditItem: '防沉迷',
    standard: '实名认证',
    tool: '日志分析',
    remediation: '强制下线'
  },
  {
    auditItem: '支付合规',
    standard: 'PCI DSS',
    tool: '人工抽查',
    remediation: '交易回滚'
  },
  {
    auditItem: '内容合规',
    standard: '游戏内容规范',
    tool: 'AI内容审核',
    remediation: '屏蔽敏感内容'
  },
  {
    auditItem: '版权合规',
    standard: '知识产权法',
    tool: '相似度扫描',
    remediation: '替换侵权内容'
  }
];

onMounted(() => {
  if (complianceCheckFlow.value) {
    const mermaidCode = `
      flowchart TD
        A[启动合规检查] --> B[确定检查范围]
        B --> C[准备检查工具]
        C --> D[执行自动化检查]
        D --> E[执行手动检查]
        
        E --> F{发现问题?}
        F -->|是| G[问题分类]
        F -->|否| H[生成合规报告]
        
        G --> I[严重性评估]
        I --> J{紧急修复?}
        J -->|是| K[立即修复]
        J -->|否| L[纳入计划修复]
        
        K --> M[验证修复]
        L --> N[跟踪修复进度]
        
        M --> O[更新合规状态]
        N --> O
        O --> H
        
        H --> P[合规审核会议]
        P --> Q[更新合规记录]
        Q --> R[制定改进计划]
    `;
    createDiagram(complianceCheckFlow.value, mermaidCode);
  }
  
  if (complianceOrgChart.value) {
    const mermaidCode = `
      flowchart TD
        A[董事会合规委员会] --> B[首席合规官]
        B --> C[数据合规团队]
        B --> D[安全合规团队]
        B --> E[产品合规团队]
        B --> F[法务合规团队]
        
        C --> G[数据保护官]
        C --> H[数据治理专家]
        
        D --> I[安全审计师]
        D --> J[渗透测试专家]
        
        E --> K[内容审核团队]
        E --> L[用户保护团队]
        
        F --> M[法规专家]
        F --> N[合同审核专家]
        
        B -.-> O[外部审计机构]
        B -.-> P[法律顾问]
    `;
    createDiagram(complianceOrgChart.value, mermaidCode);
  }
});
</script>

<style scoped>
.compliance-audit {
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

.standards-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.standards-list li {
  margin-bottom: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 15px;
}

.standard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.standard-name {
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-color);
}

.standard-badge {
  background-color: var(--primary-color);
  color: var(--darkest-bg);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.standards-list p {
  margin: 8px 0;
  color: var(--text-secondary);
}

.key-requirements {
  background-color: rgba(255, 215, 0, 0.05);
  border-radius: 4px;
  padding: 10px 15px;
  margin-top: 10px;
}

.key-requirements p {
  margin: 5px 0;
  color: var(--text-primary);
}

.key-requirements ul {
  margin: 8px 0;
  padding-left: 20px;
}

.key-requirements li {
  margin-bottom: 5px;
  border: none;
  background: none;
  padding: 0;
}

.audit-process {
  counter-reset: audit-step;
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.audit-process > li {
  position: relative;
  margin-bottom: 25px;
  padding-left: 50px;
}

.audit-process > li::before {
  counter-increment: audit-step;
  content: counter(audit-step);
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  background-color: var(--primary-color);
  color: var(--darkest-bg);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
}

.audit-process h5 {
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 16px;
}

.audit-process ul {
  margin: 0;
  padding-left: 20px;
}

.audit-process ul li {
  margin-bottom: 5px;
  color: var(--text-secondary);
}

.knowledge-transfer {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.knowledge-item {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 15px;
}

.knowledge-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.knowledge-icon {
  font-size: 24px;
  margin-right: 10px;
}

.knowledge-header h5 {
  margin: 0;
  color: var(--primary-color);
  font-size: 16px;
}

.knowledge-item p {
  margin: 8px 0;
  color: var(--text-secondary);
}

.knowledge-item ul {
  margin: 8px 0;
  padding-left: 20px;
}

.knowledge-item li {
  margin-bottom: 5px;
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