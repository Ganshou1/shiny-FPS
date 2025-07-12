<template>
  <div class="interface-regulations">
    <h2>外部接口规范</h2>
    
    <div class="section">
      <h3>2.1 第三方平台对接</h3>
      <h4>2.1.1 社交平台接口</h4>
      
      <div class="dark-content-box">
        <el-table :data="socialPlatformData" border style="width: 100%">
          <el-table-column prop="platform" label="平台类型" width="150"></el-table-column>
          <el-table-column prop="authMethod" label="认证方式" width="180"></el-table-column>
          <el-table-column prop="rateLimit" label="速率限制" width="150"></el-table-column>
          <el-table-column prop="dataFormat" label="数据格式"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>平台特性兼容矩阵</h3>
      <div class="dark-content-box">
        <el-table :data="platformCompatibilityData" border style="width: 100%">
          <el-table-column prop="feature" label="功能特性" width="180"></el-table-column>
          <el-table-column prop="steam" label="Steam">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.steam)">{{ scope.row.steam }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="wechat" label="微信">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.wechat)">{{ scope.row.wechat }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="discord" label="Discord">
            <template #default="scope">
              <el-tag :type="getTagType(scope.row.discord)">{{ scope.row.discord }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>2.2 支付系统接口</h3>
      <h4>2.2.1 交易状态机</h4>
      
      <div ref="transactionDiagram" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>支付系统对接规范</h3>
      <div class="dark-content-box">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="安全要求">
              <div class="tab-content">
                <h4>接口安全措施</h4>
                <ul>
                  <li>
                    <strong>签名验证</strong>
                    <p>所有支付相关请求必须包含数字签名，服务器端进行签名验证，防止请求被篡改</p>
                  </li>
                  <li>
                    <strong>非对称加密</strong>
                    <p>敏感交易信息使用RSA-2048加密，确保传输过程中数据安全</p>
                  </li>
                  <li>
                    <strong>幂等性处理</strong>
                    <p>每个交易请求都必须有唯一标识，防止重复处理同一笔交易</p>
                  </li>
                  <li>
                    <strong>IP白名单</strong>
                    <p>支付回调接口仅接受支付服务提供商的IP请求</p>
                  </li>
                  <li>
                    <strong>交易记录多重备份</strong>
                    <p>交易数据同时写入多个存储系统，确保数据不会丢失</p>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="异常处理">
              <div class="tab-content">
                <h4>支付异常处理流程</h4>
                <ol>
                  <li>
                    <strong>支付超时</strong>
                    <p>设置60秒超时时间，超时后自动查询交易状态</p>
                  </li>
                  <li>
                    <strong>回调失败</strong>
                    <p>支付服务商回调失败时，实现指数退避重试机制，最多重试5次</p>
                  </li>
                  <li>
                    <strong>订单状态不一致</strong>
                    <p>每5分钟执行一次对账流程，识别并修复订单状态不一致问题</p>
                  </li>
                  <li>
                    <strong>退款处理</strong>
                    <p>支持全额和部分退款，退款操作需要双重授权</p>
                  </li>
                  <li>
                    <strong>人工干预</strong>
                    <p>异常交易触发人工干预流程，系统生成处理工单</p>
                  </li>
                </ol>
              </div>
            </el-tab-pane>
            <el-tab-pane label="沙箱环境">
              <div class="tab-content">
                <h4>沙箱测试策略</h4>
                <ul>
                  <li><strong>测试环境地址:</strong> https://sandbox-api.fps-game.com/payment</li>
                  <li><strong>测试账号:</strong> 自动生成10个不同特征的测试账号</li>
                  <li><strong>模拟场景:</strong> 正常支付、部分成功、延迟到账、退款场景</li>
                  <li><strong>测试覆盖率:</strong> 100% API覆盖，95% 异常情况覆盖</li>
                  <li><strong>自动化测试:</strong> 每次代码提交自动执行回归测试</li>
                </ul>
                
                <h4 class="mt-20">沙箱测试用例示例</h4>
                <el-table :data="sandboxTestcaseData" border style="width: 100%">
                  <el-table-column prop="id" label="用例ID" width="100"></el-table-column>
                  <el-table-column prop="scenario" label="测试场景" width="150"></el-table-column>
                  <el-table-column prop="steps" label="步骤"></el-table-column>
                  <el-table-column prop="expected" label="预期结果" width="200"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>3. 错误处理规范</h3>
      <h4>3.1 状态码体系</h4>
      
      <div class="dark-content-box">
        <el-table :data="errorCodesData" border style="width: 100%">
          <el-table-column prop="code" label="错误码" width="100"></el-table-column>
          <el-table-column prop="category" label="分类" width="150"></el-table-column>
          <el-table-column prop="suggestion" label="处理建议"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>3.2 重试策略矩阵</h3>
      
      <div class="dark-content-box">
        <el-table :data="retryStrategyData" border style="width: 100%">
          <el-table-column prop="errorType" label="错误类型" width="180"></el-table-column>
          <el-table-column prop="retryInterval" label="重试间隔" width="150"></el-table-column>
          <el-table-column prop="maxRetries" label="最大次数" width="120"></el-table-column>
          <el-table-column prop="fallbackPlan" label="补偿方案"></el-table-column>
        </el-table>
      </div>
    </div>
    
    <div class="section">
      <h3>合规性检查清单</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="compliance-checklist">
            <ul>
              <li>
                <strong>GDPR合规</strong>
                <div class="compliance-details">
                  <p>所有与EU用户相关的接口必须:</p>
                  <ul>
                    <li>提供数据导出能力</li>
                    <li>支持"被遗忘权"数据删除</li>
                    <li>实现明确的用户同意流程</li>
                    <li>数据传输加密保护</li>
                  </ul>
                </div>
              </li>
              <li>
                <strong>PCI DSS要求</strong>
                <div class="compliance-details">
                  <p>支付接口必须满足PCI DSS 3.2.1标准:</p>
                  <ul>
                    <li>不存储完整的信用卡号</li>
                    <li>传输过程中使用TLS 1.2+</li>
                    <li>访问支付系统的人员需要双因素认证</li>
                    <li>每季度进行渗透测试</li>
                  </ul>
                </div>
              </li>
              <li>
                <strong>本地化法规</strong>
                <div class="compliance-details">
                  <p>根据不同地区调整API行为:</p>
                  <ul>
                    <li>中国区: 实名认证接口、防沉迷系统对接</li>
                    <li>韩国区: 游戏时长限制、年龄分级</li>
                    <li>中东地区: 内容过滤接口</li>
                    <li>巴西: 本地支付方式对接</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </div>
    
    <div class="section">
      <h3>特别说明</h3>
      <div class="dark-content-box">
        <el-card>
          <div class="special-notes">
            <ul>
              <li><strong>社交接口需支持GFX内容过滤</strong> - 确保用户生成内容符合各国家/地区的内容政策</li>
              <li><strong>支付回调需签名验证+非对称加密</strong> - 确保交易的真实性和安全性</li>
              <li><strong>接口版本管理策略</strong> - 外部接口版本统一在URL中显式声明，如 /v1/api/payment</li>
              <li><strong>流量突增应对方案</strong> - 活动期间可能出现流量高峰，需实现请求排队和削峰机制</li>
              <li><strong>敏感数据脱敏规则</strong> - 日志和错误报告中的敏感信息（如支付信息、用户标识）必须脱敏处理</li>
              <li><strong>接口监控埋点规范</strong> - 所有外部接口调用需记录性能和错误率，设置适当的告警阈值</li>
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

const transactionDiagram = ref<HTMLElement | null>(null);

const socialPlatformData = [
  {
    platform: 'Steam',
    authMethod: 'OAuth2.0',
    rateLimit: '1000/min',
    dataFormat: 'Protobuf'
  },
  {
    platform: '微信',
    authMethod: 'JWT',
    rateLimit: '500/min',
    dataFormat: 'JSON'
  },
  {
    platform: 'Discord',
    authMethod: 'API Key',
    rateLimit: '200/min',
    dataFormat: 'MessagePack'
  },
  {
    platform: 'Facebook',
    authMethod: 'OAuth2.0',
    rateLimit: '600/min',
    dataFormat: 'JSON'
  },
  {
    platform: 'Apple',
    authMethod: 'JWT+OAuth',
    rateLimit: '800/min',
    dataFormat: 'JSON'
  }
];

const platformCompatibilityData = [
  {
    feature: '好友导入',
    steam: '完全支持',
    wechat: '部分支持',
    discord: '完全支持'
  },
  {
    feature: '成就系统',
    steam: '完全支持',
    wechat: '不支持',
    discord: '部分支持'
  },
  {
    feature: '内购验证',
    steam: '完全支持',
    wechat: '完全支持',
    discord: '不支持'
  },
  {
    feature: '聊天集成',
    steam: '部分支持',
    wechat: '完全支持',
    discord: '完全支持'
  },
  {
    feature: '直播集成',
    steam: '完全支持',
    wechat: '部分支持',
    discord: '完全支持'
  }
];

const sandboxTestcaseData = [
  {
    id: 'PT-001',
    scenario: '正常支付流程',
    steps: '1.创建订单 2.发起支付 3.模拟支付成功 4.接收回调',
    expected: '订单状态变为"已支付"，发放对应虚拟物品'
  },
  {
    id: 'PT-002',
    scenario: '支付超时',
    steps: '1.创建订单 2.发起支付 3.支付未完成 4.等待超时',
    expected: '订单状态变为"已超时"，系统自动查询最新状态'
  },
  {
    id: 'PT-003',
    scenario: '支付失败',
    steps: '1.创建订单 2.发起支付 3.模拟支付失败',
    expected: '订单状态变为"支付失败"，用户可重新尝试'
  },
  {
    id: 'PT-004',
    scenario: '退款流程',
    steps: '1.查询已支付订单 2.发起退款请求 3.模拟退款成功',
    expected: '订单状态变为"已退款"，回收已发放的虚拟物品'
  }
];

const errorCodesData = [
  {
    code: '4xx',
    category: '客户端错误',
    suggestion: '终止当前操作，提示用户检查输入'
  },
  {
    code: '5xx',
    category: '服务端错误',
    suggestion: '自动重试3次，间隔递增'
  },
  {
    code: '6xx',
    category: '业务异常',
    suggestion: '记录日志告警，根据具体错误码处理'
  }
];

const retryStrategyData = [
  {
    errorType: '网络超时',
    retryInterval: '指数退避',
    maxRetries: '5',
    fallbackPlan: '事务回滚'
  },
  {
    errorType: '服务不可用',
    retryInterval: '固定1s',
    maxRetries: '3',
    fallbackPlan: '切换备用'
  },
  {
    errorType: '数据冲突',
    retryInterval: '立即重试',
    maxRetries: '1',
    fallbackPlan: '人工干预'
  },
  {
    errorType: '授权失败',
    retryInterval: '无重试',
    maxRetries: '0',
    fallbackPlan: '强制重新登录'
  },
  {
    errorType: '资源限制',
    retryInterval: '3s固定',
    maxRetries: '2',
    fallbackPlan: '降级服务'
  }
];

// 标签类型辅助函数
const getTagType = (status) => {
  if (status === '完全支持') return 'success';
  if (status === '部分支持') return 'warning';
  if (status === '不支持') return 'danger';
  return 'info';
};

onMounted(() => {
  if (transactionDiagram.value) {
    const mermaidCode = `
      stateDiagram-v2
        [*] --> Created: 创建订单
        Created --> Processing: 发起支付
        Processing --> Success: 支付成功
        Processing --> Failed: 支付失败
        Processing --> Timeout: 超时
        
        Success --> Completed: 发货完成
        Success --> Refunding: 申请退款
        Refunding --> Refunded: 退款成功
        Refunding --> RefundFailed: 退款失败
        
        Failed --> Created: 重新支付
        Failed --> Canceled: 取消订单
        Timeout --> Processing: 重试支付
        Timeout --> Canceled: 超过重试次数
        
        Completed --> [*]
        Refunded --> [*]
        RefundFailed --> [*]
        Canceled --> [*]
    `;
    createDiagram(transactionDiagram.value, mermaidCode);
  }
});
</script>

<style scoped>
.interface-regulations {
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
  color: var(--primary-color);
}

.tab-content ul, .tab-content ol {
  padding-left: 20px;
  margin-bottom: 20px;
}

.tab-content li {
  margin-bottom: 15px;
}

.tab-content p {
  margin: 5px 0;
}

.dark-content-box {
  background-color: #000000;
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
}

.mt-20 {
  margin-top: 20px;
}

.special-notes ul {
  padding-left: 20px;
}

.special-notes li {
  margin-bottom: 15px;
  line-height: 1.6;
}

.compliance-checklist ul {
  padding-left: 20px;
  list-style-type: none;
}

.compliance-checklist > ul > li {
  margin-bottom: 25px;
}

.compliance-details {
  margin-left: 20px;
  margin-top: 8px;
}

.compliance-details ul {
  margin-top: 8px;
}

.compliance-details li {
  margin-bottom: 8px;
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

:deep(.el-tag--success) {
  background-color: rgba(103, 194, 58, 0.1);
  border-color: rgba(103, 194, 58, 0.5);
  color: #67c23a;
}

:deep(.el-tag--warning) {
  background-color: rgba(230, 162, 60, 0.1);
  border-color: rgba(230, 162, 60, 0.5);
  color: #e6a23c;
}

:deep(.el-tag--danger) {
  background-color: rgba(245, 108, 108, 0.1);
  border-color: rgba(245, 108, 108, 0.5);
  color: #f56c6c;
}
</style> 