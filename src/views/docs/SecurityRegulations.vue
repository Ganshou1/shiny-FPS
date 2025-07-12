<template>
  <div class="security-regulations">
    <h2>安全规范体系</h2>
    
    <div class="section">
      <h3>3.1 防御层级</h3>
      <h4>3.1.1 安全矩阵</h4>
      
      <div class="dark-content-box">
        <el-table :data="securityMatrixData" border style="width: 100%">
          <el-table-column prop="type" label="攻击类型" width="180"></el-table-column>
          <el-table-column prop="protection" label="防护方案" width="180"></el-table-column>
          <el-table-column prop="response" label="响应时间"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>安全防御架构</h3>
      <div ref="securityDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>3.2 合规性控制</h3>
      <div class="dark-content-box">
        <el-table :data="complianceData" border style="width: 100%">
          <el-table-column prop="standard" label="标准项" width="180"></el-table-column>
          <el-table-column prop="requirement" label="实施要求" width="180"></el-table-column>
          <el-table-column prop="audit" label="审计频率"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>安全事件分级与响应</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="事件分级">
              <div class="tab-content">
                <el-table :data="securityLevelData" border style="width: 100%">
                  <el-table-column prop="level" label="级别" width="100"></el-table-column>
                  <el-table-column prop="description" label="描述"></el-table-column>
                  <el-table-column prop="examples" label="示例"></el-table-column>
                  <el-table-column prop="response" label="响应要求" width="180"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="响应流程">
              <div class="tab-content">
                <div ref="responseDiagram" class="diagram-container"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="上报机制">
              <div class="tab-content">
                <h4>上报路径</h4>
                <ul>
                  <li>
                    <strong>P0级别事件</strong>
                    <p>立即通知安全团队、技术负责人和公司高管，启动危机公关预案</p>
                  </li>
                  <li>
                    <strong>P1级别事件</strong>
                    <p>立即通知安全团队和技术负责人，4小时内向高管汇报</p>
                  </li>
                  <li>
                    <strong>P2级别事件</strong>
                    <p>通知安全团队，每日例会向技术负责人汇报</p>
                  </li>
                  <li>
                    <strong>P3级别事件</strong>
                    <p>记录在安全事件系统中，周报中汇总</p>
                  </li>
                </ul>
                <h4>外部通知要求</h4>
                <ul>
                  <li>
                    <strong>用户数据泄露</strong>
                    <p>根据GDPR要求，72小时内通知相关监管机构和受影响用户</p>
                  </li>
                  <li>
                    <strong>支付安全事件</strong>
                    <p>24小时内通知支付合作伙伴和相关金融机构</p>
                  </li>
                  <li>
                    <strong>服务中断</strong>
                    <p>超过30分钟的服务中断，需在官方渠道发布状态公告</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>渗透测试与安全审计</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="security-audit">
            <h4>渗透测试计划</h4>
            <el-table :data="pentestData" border style="width: 100%">
              <el-table-column prop="type" label="测试类型" width="180"></el-table-column>
              <el-table-column prop="frequency" label="频率" width="180"></el-table-column>
              <el-table-column prop="scope" label="范围" width="180"></el-table-column>
              <el-table-column prop="executor" label="执行方"></el-table-column>
            </el-table>
            
            <h4 class="mt-20">漏洞管理</h4>
            <div class="vulnerability-management">
              <el-table :data="vulnerabilityData" border style="width: 100%">
                <el-table-column prop="severity" label="严重性" width="120"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column prop="timeline" label="修复时间要求" width="180"></el-table-column>
              </el-table>
            </div>
            
            <h4 class="mt-20">加密算法白名单</h4>
            <div class="encryption-whitelist">
              <el-table :data="encryptionData" border style="width: 100%">
                <el-table-column prop="purpose" label="用途" width="180"></el-table-column>
                <el-table-column prop="approved" label="批准算法" width="180"></el-table-column>
                <el-table-column prop="deprecated" label="禁用算法"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>零信任架构实施</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="zero-trust">
            <p>按照零信任原则设计系统安全架构，实现"永不信任，始终验证"的安全理念。主要实施措施包括：</p>
            <ul>
              <li><strong>微分段</strong>：将网络划分为独立的安全区域，限制横向移动</li>
              <li><strong>最小权限</strong>：为每个用户、设备和应用程序分配最小必要权限</li>
              <li><strong>持续验证</strong>：对所有访问请求进行持续的身份验证和授权</li>
              <li><strong>加密通信</strong>：所有数据传输和存储均采用强加密保护</li>
              <li><strong>可见性和分析</strong>：全面监控和分析所有网络流量和系统活动</li>
            </ul>
            
            <div ref="zeroTrustDiagram" class="diagram-container"></div>
            
            <h4 class="mt-20">三重验证机制</h4>
            <p>敏感操作需要通过以下三重验证才能执行：</p>
            <ol>
              <li><strong>设备验证</strong>：验证访问设备的唯一标识和安全状态</li>
              <li><strong>行为验证</strong>：分析用户行为模式，检测异常活动</li>
              <li><strong>生物特征验证</strong>：使用人脸识别、指纹等生物特征进行身份确认</li>
            </ol>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { createDiagram } from '@/utils/diagramUtil';

const securityDiagram = ref<HTMLElement | null>(null);
const responseDiagram = ref<HTMLElement | null>(null);
const zeroTrustDiagram = ref<HTMLElement | null>(null);

const securityMatrixData = [
  {
    type: 'DDoS',
    protection: '流量清洗+AI过滤',
    response: '<30秒'
  },
  {
    type: '外挂',
    protection: '行为指纹+机器学习',
    response: '实时'
  },
  {
    type: '数据篡改',
    protection: '区块链存证',
    response: '每5分钟验证'
  }
];

const complianceData = [
  {
    standard: 'GDPR',
    requirement: '匿名化处理',
    audit: '季度审计'
  },
  {
    standard: '防沉迷',
    requirement: '实时人脸抽查',
    audit: '每日巡检'
  },
  {
    standard: '支付安全',
    requirement: 'PCI DSS L1认证',
    audit: '年度复审'
  }
];

const securityLevelData = [
  {
    level: 'P0',
    description: '灾难级',
    examples: '大规模数据泄露、支付系统被攻破、游戏核心服务完全中断',
    response: '立即响应，全员投入'
  },
  {
    level: 'P1',
    description: '严重级',
    examples: '区域性服务中断、高危漏洞被利用、部分用户数据泄露',
    response: '1小时内响应'
  },
  {
    level: 'P2',
    description: '中等级',
    examples: '非核心功能异常、已知漏洞被发现、性能显著下降',
    response: '24小时内响应'
  },
  {
    level: 'P3',
    description: '低级',
    examples: '轻微UI问题、非敏感信息泄露、单一用户投诉',
    response: '下一迭代修复'
  }
];

const pentestData = [
  {
    type: '全面渗透测试',
    frequency: '每季度一次',
    scope: '所有生产系统',
    executor: '第三方安全公司'
  },
  {
    type: '红队演练',
    frequency: '每半年一次',
    scope: '核心业务系统',
    executor: '内部安全团队+外部专家'
  },
  {
    type: '自动化安全扫描',
    frequency: '每周一次',
    scope: '所有网络暴露面',
    executor: '自动化工具+安全团队'
  },
  {
    type: '代码安全审计',
    frequency: '每次重大发布前',
    scope: '变更代码',
    executor: '开发团队+安全团队'
  }
];

const vulnerabilityData = [
  {
    severity: '严重',
    description: '可能导致远程代码执行、完全系统接管或大规模数据泄露的漏洞',
    timeline: '24小时内修复'
  },
  {
    severity: '高',
    description: '可能导致敏感信息泄露、权限提升或服务中断的漏洞',
    timeline: '3天内修复'
  },
  {
    severity: '中',
    description: '可能影响系统功能但不会导致数据泄露的漏洞',
    timeline: '7天内修复'
  },
  {
    severity: '低',
    description: '对系统安全性影响较小的漏洞',
    timeline: '30天内修复'
  }
];

const encryptionData = [
  {
    purpose: '传输加密',
    approved: 'TLS 1.3, TLS 1.2 (安全配置)',
    deprecated: 'SSL, TLS 1.0, TLS 1.1'
  },
  {
    purpose: '数据存储',
    approved: 'AES-256-GCM, ChaCha20-Poly1305',
    deprecated: 'DES, 3DES, RC4, AES-CBC'
  },
  {
    purpose: '密码哈希',
    approved: 'Argon2id, bcrypt',
    deprecated: 'MD5, SHA1, PBKDF2 (低迭代)'
  },
  {
    purpose: '数字签名',
    approved: 'Ed25519, RSA-PSS (4096位+)',
    deprecated: 'RSA-PKCS1v1.5, DSA, RSA (<2048位)'
  }
];

onMounted(() => {
  if (securityDiagram.value) {
    const mermaidCode = `
      flowchart TD
        A[外部访问请求] --> B[DDoS防护层]
        B --> C[Web应用防火墙]
        C --> D{身份验证}
        D -->|验证失败| E[拒绝访问]
        D -->|验证成功| F[访问控制层]
        F --> G{权限检查}
        G -->|权限不足| H[拒绝访问]
        G -->|权限充分| I[应用服务]
        
        I --> J[数据加密层]
        J --> K[数据存储]
        
        L[安全监控系统] --> B
        L --> C
        L --> D
        L --> F
        L --> G
        L --> I
        L --> J
        
        M[异常检测系统] --> L
        M --> N[安全运营中心]
        
        O[行为分析引擎] --> D
        O --> G
        O --> P[反作弊系统]
    `;
    createDiagram(securityDiagram.value, mermaidCode);
  }
  
  if (responseDiagram.value) {
    const mermaidCode = `
      flowchart TD
        A[安全事件发现] --> B{事件分级}
        B -->|P0/P1| C[立即激活应急响应]
        B -->|P2| D[标准流程处理]
        B -->|P3| E[常规修复流程]
        
        C --> F[组建应急响应小组]
        F --> G[控制事件影响范围]
        G --> H[排查根本原因]
        H --> I[实施修复方案]
        I --> J[恢复正常运行]
        J --> K[事后分析总结]
        K --> L[更新安全策略]
        
        D --> M[记录详细信息]
        M --> N[分配处理人员]
        N --> O[制定修复计划]
        O --> P[实施修复]
        P --> Q[验证修复效果]
        Q --> R[记录解决方案]
        
        E --> S[纳入迭代计划]
        S --> T[常规开发流程修复]
        T --> U[发布验证]
    `;
    createDiagram(responseDiagram.value, mermaidCode);
  }
  
  if (zeroTrustDiagram.value) {
    const mermaidCode = `
      flowchart TD
        A[访问请求] --> B{身份验证}
        B -->|失败| C[拒绝访问]
        B -->|成功| D{设备验证}
        D -->|失败| C
        D -->|成功| E{上下文分析}
        E -->|异常| F[增强验证]
        E -->|正常| G{权限验证}
        F -->|验证通过| G
        F -->|验证失败| C
        G -->|无权限| C
        G -->|有权限| H[最小权限访问]
        H --> I[持续监控]
        I -->|检测异常| J[重新验证]
        J -->|验证失败| K[终止会话]
        J -->|验证通过| I
        
        subgraph 策略引擎
        L[用户策略] --> M[决策点]
        N[设备策略] --> M
        O[数据策略] --> M
        P[行为基线] --> M
        end
        
        M --> B
        M --> D
        M --> E
        M --> G
        M --> I
    `;
    createDiagram(zeroTrustDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.security-regulations {
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

.tab-content {
  padding: 15px;
}

.tab-content h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.tab-content ul, .tab-content ol {
  padding-left: 20px;
}

.tab-content li {
  margin-bottom: 15px;
}

.tab-content p {
  margin: 5px 0;
}

.security-audit {
  padding: 10px;
}

.vulnerability-management, .encryption-whitelist {
  margin-top: 15px;
}

.zero-trust {
  padding: 10px;
}

.zero-trust ul, .zero-trust ol {
  padding-left: 20px;
  margin-bottom: 20px;
}

.zero-trust li {
  margin-bottom: 10px;
}

.mt-20 {
  margin-top: 20px;
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
}

:deep(.el-tabs--border-card > .el-tabs__content) {
  background-color: #000000;
}

:deep(h2), :deep(h3), :deep(h4) {
  color: var(--primary-color);
}
</style> 