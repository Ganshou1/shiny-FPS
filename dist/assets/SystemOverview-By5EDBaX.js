import{d as y,r as p,o as C,c as v,a as w,b as n,e as t,w as s,f as o,u as _,t as k,g as D,h as Q,i as h,j as x,_ as A}from"./index-Dk8T_2ac.js";const M={class:"system-overview"},B={class:"section"},I={class:"dark-content-box"},T={class:"service-areas"},P={class:"service-area"},S={class:"service-icon"},R={class:"service-area"},z={class:"service-icon"},F={class:"service-area"},O={class:"service-icon"},G={class:"section"},H={class:"subsection"},E={class:"dark-content-box"},L={class:"subsection"},K={class:"dark-content-box mt-20"},N={class:"section"},J={class:"subsection"},V={class:"subsection"},W={class:"dark-content-box"},q={class:"section"},j={class:"dark-content-box"},U={class:"section"},X={class:"dark-content-box"},Y={class:"scenario-list"},Z={class:"scenario"},$={class:"scenario-header"},nn={class:"scenario"},en={class:"scenario-header"},tn={class:"scenario"},sn={class:"scenario-header"},ln={class:"section"},on={class:"dark-content-box mt-20"},an=y({__name:"SystemOverview",setup(dn){const a=p(null),d=p(null),r=p(null),f=[{dimension:"同步精度",capability:"128Hz服务器刷新率",advantage:"超过主流64Hz标准"},{dimension:"反作弊",capability:"三重检测体系（客户端/网络/服务器）",advantage:"比行业平均多2层防护"},{dimension:"容灾能力",capability:"50毫秒内完成故障切换",advantage:"快于标准200毫秒响应"}],b=[{region:"东亚区",configuration:"东京/首尔节点",latency:"<30ms",coverage:"中日韩等地区"},{region:"欧洲区",configuration:"法兰克福节点",latency:"<50ms",coverage:"欧盟国家"},{region:"北美区",configuration:"弗吉尼亚节点",latency:"<40ms",coverage:"美洲地区"}];return C(()=>{a.value&&v(a.value,`
      flowchart TB
        subgraph "智能运营核心能力"
        A["实时监控"] --> B["智能分析"]
        B --> C["自动干预"]
        C --> D["效果评估"]
        D --> A
        end
        
        subgraph "数据处理管道"
        E["游戏事件采集"] --> F["实时流处理"]
        F --> G["多维数据仓库"]
        G --> H["机器学习预测"]
        end
        
        subgraph "运营决策支持"
        I["玩家行为分析"] --> J["匹配质量优化"]
        J --> K["内容推荐系统"]
        K --> L["留存风险预警"]
        end
        
        A --> E
        H --> B
        C --> K
    `),d.value&&v(d.value,`
      flowchart TB
        subgraph "前端层"
        A["玩家客户端"] --- B["管理控制台"]
        B --- C["数据可视化"]
        end
        
        subgraph "API网关"
        D["认证鉴权"] --- E["请求路由"]
        E --- F["限流控制"]
        F --- G["数据转换"]
        end
        
        subgraph "微服务集群"
        H["用户服务"] --- I["武器系统"]
        I --- J["匹配服务"]
        J --- K["对战服务"]
        K --- L["排行榜"]
        L --- M["内容管理"]
        end
        
        subgraph "基础设施"
        N["分布式存储"] --- O["消息队列"]
        O --- P["缓存集群"]
        P --- Q["搜索引擎"]
        end
        
        A --> D
        B --> D
        C --> D
        G --> H
        M --> N
    `),r.value&&v(r.value,`
      timeline
        title FPS管理系统发展路线
        section 阶段一：基础建设
          2024 Q1 : 核心框架搭建
          2024 Q2 : 基础功能实现
          2024 Q3 : 内部测试优化
        section 阶段二：功能完善
          2024 Q4 : 电竞核心功能
          2025 Q1 : 智能匹配系统
          2025 Q2 : 反作弊系统升级
        section 阶段三：全球部署
          2025 Q3 : 全球服务器部署
          2025 Q4 : 跨区域联赛支持
          2026 Q1 : 全球电竞标准对接
        section 阶段四：生态扩展
          2026 Q2 : 开放API接口
          2026 Q3 : 第三方工具集成
          2026 Q4 : 生态合作伙伴计划
    `)}),(c,e)=>{const u=o("el-icon"),l=o("el-card"),i=o("el-table-column"),g=o("el-table"),m=o("el-tag");return x(),w("div",M,[e[26]||(e[26]=n("h2",null,"系统概述",-1)),n("div",B,[e[4]||(e[4]=n("h3",null,"1. 系统定位",-1)),n("div",I,[t(l,null,{default:s(()=>[e[3]||(e[3]=n("p",null,"本系统是为专业级第一人称射击游戏设计的全生命周期管理平台，主要服务于：",-1)),n("div",T,[n("div",P,[n("div",S,[t(u,null,{default:s(()=>[t(_(k))]),_:1})]),e[0]||(e[0]=n("div",{class:"service-content"},[n("h4",null,"研发阶段"),n("p",null,"支持200+武器参数和地图元素的动态调整")],-1))]),n("div",R,[n("div",z,[t(u,null,{default:s(()=>[t(_(D))]),_:1})]),e[1]||(e[1]=n("div",{class:"service-content"},[n("h4",null,"运营阶段"),n("p",null,"承载日均50万活跃玩家的高强度竞技对战")],-1))]),n("div",F,[n("div",O,[t(u,null,{default:s(()=>[t(_(Q))]),_:1})]),e[2]||(e[2]=n("div",{class:"service-content"},[n("h4",null,"电竞赛事"),n("p",null,"提供亚毫秒级判定的专业竞技环境")],-1))])])]),_:1,__:[3]})])]),n("div",G,[e[8]||(e[8]=n("h3",null,"2. 核心特性",-1)),n("div",H,[e[5]||(e[5]=n("h4",null,"2.1 竞技级技术架构",-1)),n("div",E,[t(l,null,{default:s(()=>[t(g,{data:f,border:"",style:{width:"100%"}},{default:s(()=>[t(i,{prop:"dimension",label:"维度",width:"180"}),t(i,{prop:"capability",label:"能力指标",width:"230"}),t(i,{prop:"advantage",label:"行业对比优势"})]),_:1})]),_:1})])]),n("div",L,[e[7]||(e[7]=n("h4",null,"2.2 智能运营能力",-1)),n("div",{ref_key:"operationCapabilityChart",ref:a,class:"diagram-container"},null,512),n("div",K,[t(l,null,{default:s(()=>e[6]||(e[6]=[n("pre",{class:"code-block"},`// 智能运营系统核心架构
class IntelligentOperationSystem {
  constructor() {
    this.modules = {
      realTimeMonitoring: new RealTimeMonitor({
        refreshRate: 1000, // 毫秒
        metricsCollectionRate: 128, // Hz
        alertThreshold: 0.75 // 百分比
      }),
      
      matchmaking: new MatchmakingEngine({
        skillBasedParams: {
          eloWeight: 0.65,
          recentPerformanceWeight: 0.25,
          playstyleCompatibilityWeight: 0.1
        },
        maxMatchmakingTime: 45 // 秒
      }),
      
      anomalyDetection: new AnomalyDetector({
        detectionAlgorithms: ['movementAnalysis', 'aimPatternRecognition', 'statisticalOutliers'],
        falsePositiveThreshold: 0.001, // 0.1%
        mlModelUpdateFrequency: 86400 // 秒 (每日)
      }),
      
      playerRetention: new RetentionOptimizer({
        segmentation: ['skillLevel', 'playFrequency', 'monetizationTier'],
        interventionChannels: ['inGameRewards', 'matchDifficulty', 'personalizedContent'],
        abTestGroups: 5
      })
    };
    
    // 系统互联初始化
    this.initializeIntegrations();
  }
  
  // 各系统协同工作
  async analyzeGameState() {
    const metrics = await this.modules.realTimeMonitoring.collectMetrics();
    const matchData = await this.modules.matchmaking.getCurrentMatches();
    const anomalies = await this.modules.anomalyDetection.scan(metrics, matchData);
    
    if (anomalies.length > 0) {
      this.handleAnomalies(anomalies);
    }
    
    return {
      serverLoad: metrics.serverLoad,
      activeMatches: matchData.count,
      avgMatchQuality: matchData.averageQualityScore,
      detectedAnomalies: anomalies.length
    };
  }
}
            `,-1)])),_:1,__:[6]})])])]),n("div",N,[e[11]||(e[11]=n("h3",null,"3. 系统架构",-1)),n("div",J,[e[9]||(e[9]=n("h4",null,"3.1 逻辑架构",-1)),n("div",{ref_key:"logicalArchitectureChart",ref:d,class:"diagram-container"},null,512)]),n("div",V,[e[10]||(e[10]=n("h4",null,"3.2 物理部署",-1)),n("div",W,[t(l,null,{default:s(()=>[t(g,{data:b,border:"",style:{width:"100%"}},{default:s(()=>[t(i,{prop:"region",label:"区域",width:"150"}),t(i,{prop:"configuration",label:"服务器配置",width:"250"}),t(i,{prop:"latency",label:"网络延迟",width:"150"}),t(i,{prop:"coverage",label:"覆盖范围"})]),_:1})]),_:1})])])]),n("div",q,[e[13]||(e[13]=n("h3",null,"4. 设计原则",-1)),n("div",j,[t(l,null,{default:s(()=>e[12]||(e[12]=[n("div",{class:"design-principles"},[n("div",{class:"principle"},[n("h4",null,"竞技公平性"),n("p",null,"所有关键战斗计算均在服务端验证")]),n("div",{class:"principle"},[n("h4",null,"专业级精度"),n("p",null,"核心操作0.25毫秒响应标准")]),n("div",{class:"principle"},[n("h4",null,"弹性扩展"),n("p",null,"5分钟内完成200%容量扩容")]),n("div",{class:"principle"},[n("h4",null,"安全合规"),n("p",null,"符合ISO27001和PCI DSS认证要求")])],-1)])),_:1,__:[12]})])]),n("div",U,[e[23]||(e[23]=n("h3",null,"5. 典型应用场景",-1)),n("div",X,[t(l,null,{default:s(()=>[n("div",Y,[n("div",Z,[n("div",$,[e[15]||(e[15]=n("h4",null,"赛季更新",-1)),t(m,{type:"warning"},{default:s(()=>e[14]||(e[14]=[h("复杂场景")])),_:1,__:[14]})]),e[16]||(e[16]=n("p",null,"同时调整上百项武器参数且保证零停机",-1))]),n("div",nn,[n("div",en,[e[18]||(e[18]=n("h4",null,"全球赛事",-1)),t(m,{type:"success"},{default:s(()=>e[17]||(e[17]=[h("核心业务")])),_:1,__:[17]})]),e[19]||(e[19]=n("p",null,"支持多支战队跨大洲实时对战",-1))]),n("div",tn,[n("div",sn,[e[21]||(e[21]=n("h4",null,"安全防护",-1)),t(m,{type:"danger"},{default:s(()=>e[20]||(e[20]=[h("关键能力")])),_:1,__:[20]})]),e[22]||(e[22]=n("p",null,"自动识别并拦截DDoS攻击",-1))])])]),_:1})])]),n("div",ln,[e[25]||(e[25]=n("h3",null,"6. 发展路线",-1)),n("div",{ref_key:"developmentRoadmapChart",ref:r,class:"diagram-container"},null,512),n("div",on,[t(l,null,{default:s(()=>e[24]||(e[24]=[n("p",{class:"conclusion-text"},"本系统设计遵循电子竞技行业最高标准，其架构方案已成为竞技射击游戏后台系统的行业参考范例。",-1)])),_:1,__:[24]})])])])}}}),cn=A(an,[["__scopeId","data-v-abb458d4"]]);export{cn as default};
