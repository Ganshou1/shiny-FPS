import{d as C,r as i,o as T,c as r,a as h,b as l,e as t,w as u,f as c,i as e,j as y,_ as I}from"./index-D9XT-uxJ.js";const D={class:"scalability-spec"},A={class:"section"},k={class:"dark-content-box"},x={class:"section"},B={class:"section"},E={class:"dark-content-box"},S={class:"section"},w={class:"dark-content-box"},G={class:"microservice-principles"},L={class:"section"},N={class:"dark-content-box"},V={class:"hot-config-loading"},H={class:"section"},F={class:"dark-content-box"},K={class:"stress-testing"},M=C({__name:"ScalabilitySpec",setup(O){const a=i(null),d=i(null),p=i(null),m=i(null),v=[{metricType:"CPU使用率",scaleOutThreshold:"70%持续5分钟",scaleInThreshold:"30%持续10分钟",maxInstances:"500"},{metricType:"在线玩家数",scaleOutThreshold:"80%容量",scaleInThreshold:"40%容量",maxInstances:"按区域配置"},{metricType:"网络带宽",scaleOutThreshold:"85%占用",scaleInThreshold:"50%占用",maxInstances:"10Gbps"},{metricType:"匹配队列深度",scaleOutThreshold:"队列等待>30秒",scaleInThreshold:"队列等待<5秒",maxInstances:"200"},{metricType:"内存使用率",scaleOutThreshold:"75%持续3分钟",scaleInThreshold:"40%持续15分钟",maxInstances:"按实例类型配置"}],b=[{updateType:"武器参数",effectTime:"立即",rollbackTime:"15分钟",scopeControl:"按分区分批"},{updateType:"地图资源",effectTime:"下一局游戏",rollbackTime:"1小时",scopeControl:"版本标记"},{updateType:"核心逻辑",effectTime:"维护窗口",rollbackTime:"需停机",scopeControl:"全服同步"},{updateType:"匹配算法",effectTime:"10分钟",rollbackTime:"30分钟",scopeControl:"灰度发布"},{updateType:"活动配置",effectTime:"立即",rollbackTime:"5分钟",scopeControl:"全服生效"}];return T(()=>{a.value&&r(a.value,`
      graph TD
        subgraph 监控系统
        A[负载监控] --> B{触发扩容?}
        B -->|是| C[扩容决策]
        B -->|否| D{触发缩容?}
        D -->|是| E[缩容决策]
        D -->|否| A
        end
        
        subgraph 自动伸缩系统
        C --> F[创建新实例]
        E --> G[移除实例]
        
        F --> H[预热新实例]
        G --> I[优雅关闭]
        
        H --> J[加入负载均衡]
        I --> K[从负载均衡移除]
        end
        
        subgraph 资源控制
        J --> L[增加资源分配]
        K --> M[释放资源]
        
        L --> N[更新容量指标]
        M --> N
        N --> A
        end
    `),d.value&&r(d.value,`
      graph TD
        A[服务规模决策] --> B{核心功能?}
        B -->|是| C[小型服务]
        B -->|否| D{状态复杂?}
        D -->|是| E[中型服务]
        D -->|否| F{高性能要求?}
        F -->|是| E
        F -->|否| C
        
        C --> G[单一职责]
        E --> H[相关职责组合]
        
        G --> I[快速迭代]
        H --> J[定期发布]
    `),p.value&&r(p.value,`
      graph TD
        A[全局配置] --> B[区域配置]
        B --> C[服务集群配置]
        C --> D[服务实例配置]
        
        A --> E[默认参数]
        B --> F[区域特定参数]
        C --> G[负载相关参数]
        D --> H[实例特定参数]
        
        I[配置中心] --> A
        I --> J[版本控制]
        I --> K[配置历史]
        I --> L[回滚能力]
    `),m.value&&r(m.value,`
      graph LR
        A[容量规划] --> B{负载类型}
        B -->|基础负载| C[线性增长]
        B -->|峰值负载| D[指数增长]
        B -->|活动负载| E[阶跃增长]
        
        C --> F[缓慢扩容]
        D --> G[预先扩容]
        E --> H[弹性扩容]
        
        F --> I[成本优化]
        G --> J[可靠性保障]
        H --> K[突发应对]
        
        I --> L[总体容量计划]
        J --> L
        K --> L
    `)}),(o,n)=>{const s=c("el-table-column"),f=c("el-table"),g=c("el-card");return y(),h("div",D,[n[27]||(n[27]=l("h2",null,"扩展性要求",-1)),l("div",A,[n[0]||(n[0]=l("h3",null,"3.1 弹性伸缩规则",-1)),l("div",k,[t(f,{data:v,border:"",style:{width:"100%"}},{default:u(()=>[t(s,{prop:"metricType",label:"指标类型",width:"150"}),t(s,{prop:"scaleOutThreshold",label:"扩容阈值",width:"180"}),t(s,{prop:"scaleInThreshold",label:"缩容阈值",width:"180"}),t(s,{prop:"maxInstances",label:"最大实例数"})]),_:1})])]),l("div",x,[n[1]||(n[1]=l("h3",null,"弹性伸缩架构",-1)),l("div",{ref_key:"scalabilityDiagram",ref:a,class:"diagram-container"},null,512)]),l("div",B,[n[2]||(n[2]=l("h3",null,"3.2 热更新能力",-1)),l("div",E,[t(f,{data:b,border:"",style:{width:"100%"}},{default:u(()=>[t(s,{prop:"updateType",label:"更新类型",width:"150"}),t(s,{prop:"effectTime",label:"生效时间",width:"150"}),t(s,{prop:"rollbackTime",label:"回滚时限",width:"150"}),t(s,{prop:"scopeControl",label:"影响范围控制"})]),_:1})])]),l("div",S,[n[10]||(n[10]=l("h3",null,"微服务拆分原则",-1)),l("div",w,[t(g,null,{default:u(()=>[l("div",G,[n[3]||(n[3]=l("h4",null,"领域驱动设计(DDD)拆分策略",-1)),n[4]||(n[4]=l("p",null,"基于业务领域拆分微服务，确保每个服务职责单一、边界清晰：",-1)),n[5]||(n[5]=l("ul",null,[l("li",null,[l("strong",null,"战斗服务域"),l("ul",null,[l("li",null,"战斗物理引擎服务"),l("li",null,"伤害计算服务"),l("li",null,"状态同步服务"),l("li",null,"AI行为服务")])]),l("li",null,[l("strong",null,"玩家服务域"),l("ul",null,[l("li",null,"账号管理服务"),l("li",null,"角色管理服务"),l("li",null,"道具管理服务"),l("li",null,"成就进度服务")])]),l("li",null,[l("strong",null,"匹配服务域"),l("ul",null,[l("li",null,"队列管理服务"),l("li",null,"技能评分服务"),l("li",null,"队伍形成服务"),l("li",null,"服务器分配服务")])])],-1)),n[6]||(n[6]=l("h4",{class:"mt-20"},"接口设计原则",-1)),n[7]||(n[7]=l("ul",null,[l("li",null,[l("strong",null,"版本化API:"),e(" 所有服务API必须包含版本号，支持多版本并行运行")]),l("li",null,[l("strong",null,"向后兼容:"),e(" 新版本API必须兼容至少前两个版本的客户端")]),l("li",null,[l("strong",null,"无状态设计:"),e(" 服务接口设计为无状态，确保可随时扩展")]),l("li",null,[l("strong",null,"故障隔离:"),e(" 使用熔断器模式，防止故障级联传播")]),l("li",null,[l("strong",null,"异步通信:"),e(" 非实时操作使用消息队列实现异步通信")])],-1)),n[8]||(n[8]=l("h4",{class:"mt-20"},"服务大小准则",-1)),l("div",{ref_key:"serviceSizingDiagram",ref:d,class:"mini-diagram"},null,512),n[9]||(n[9]=l("table",{class:"custom-table mt-20"},[l("tr",null,[l("th",null,"服务类型"),l("th",null,"代码规模"),l("th",null,"团队规模"),l("th",null,"更新频率")]),l("tr",null,[l("td",null,"核心游戏逻辑"),l("td",null,"5-10K行代码"),l("td",null,"3-5人"),l("td",null,"1-2周/次")]),l("tr",null,[l("td",null,"基础服务组件"),l("td",null,"10-20K行代码"),l("td",null,"4-6人"),l("td",null,"2-4周/次")]),l("tr",null,[l("td",null,"基础设施服务"),l("td",null,"20-50K行代码"),l("td",null,"6-8人"),l("td",null,"1-2月/次")])],-1))])]),_:1})])]),l("div",L,[n[18]||(n[18]=l("h3",null,"配置热加载方案",-1)),l("div",N,[t(g,null,{default:u(()=>[l("div",V,[n[11]||(n[11]=l("h4",null,"配置层次结构",-1)),l("div",{ref_key:"configHierarchyDiagram",ref:p,class:"mini-diagram"},null,512),n[12]||(n[12]=l("h4",{class:"mt-20"},"配置分发流程",-1)),n[13]||(n[13]=l("ol",null,[l("li",null,[l("strong",null,"配置更改提交"),l("p",null,"开发人员将配置变更提交到配置中心"),l("p",null,"变更记录版本化并添加审计日志")]),l("li",null,[l("strong",null,"配置验证"),l("p",null,"自动验证配置格式和约束条件"),l("p",null,"运行单元测试验证功能影响")]),l("li",null,[l("strong",null,"金丝雀发布"),l("p",null,"将配置应用到1%的服务实例"),l("p",null,"监控关键指标变化")]),l("li",null,[l("strong",null,"全量发布"),l("p",null,"逐步扩大配置应用范围(10% → 50% → 100%)"),l("p",null,"每一步监控性能和错误率")])],-1)),n[14]||(n[14]=l("h4",{class:"mt-20"},"配置类型与刷新策略",-1)),n[15]||(n[15]=l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"配置类型"),l("th",null,"更新方式"),l("th",null,"刷新频率"),l("th",null,"版本控制")]),l("tr",null,[l("td",null,"游戏平衡性参数"),l("td",null,"热更新"),l("td",null,"实时"),l("td",null,"语义版本")]),l("tr",null,[l("td",null,"匹配算法参数"),l("td",null,"热更新"),l("td",null,"每小时"),l("td",null,"语义版本")]),l("tr",null,[l("td",null,"服务连接配置"),l("td",null,"半热更新"),l("td",null,"每日"),l("td",null,"增量版本")]),l("tr",null,[l("td",null,"底层架构配置"),l("td",null,"冷更新"),l("td",null,"计划维护"),l("td",null,"主版本号")])],-1)),n[16]||(n[16]=l("h4",{class:"mt-20"},"热更新代码示例",-1)),n[17]||(n[17]=l("pre",{class:"code-block"},`// 配置监听器示例
class ConfigWatcher implements ConfigChangeListener {
  // 热更新回调
  @Override
  public void onChange(ConfigChangedEvent event) {
    if (event.isTypeOf(ConfigType.GAME_BALANCE)) {
      // 原子性更新游戏平衡参数
      updateWeaponStats(event.getConfig());
      updateMovementParams(event.getConfig());
      updateAbilityCooldowns(event.getConfig());
      
      // 广播更新通知
      notifyConfigChanged(ConfigType.GAME_BALANCE, event.getVersion());
      
      // 记录更新日志
      logger.info("Game balance updated to version: {}", event.getVersion());
    }
  }
  
  // 版本兼容性检查
  private boolean isCompatible(String version) {
    SemanticVersion current = SemanticVersion.parse(getCurrentVersion());
    SemanticVersion target = SemanticVersion.parse(version);
    return target.getMajor() == current.getMajor();
  }
}
            `,-1))])]),_:1})])]),l("div",H,[n[26]||(n[26]=l("h3",null,"压力测试增长模型",-1)),l("div",F,[t(g,null,{default:u(()=>[l("div",K,[n[19]||(n[19]=l("h4",null,"容量规划模型",-1)),l("div",{ref_key:"capacityPlanningDiagram",ref:m,class:"mini-diagram"},null,512),n[20]||(n[20]=l("h4",{class:"mt-20"},"负载测试方法论",-1)),n[21]||(n[21]=l("ul",null,[l("li",null,[l("strong",null,"基准测试"),l("p",null,"标准化压测场景，包括："),l("ul",null,[l("li",null,"1v1小规模对战 (模拟高精度物理计算)"),l("li",null,"10v10中规模对战 (模拟标准竞技场景)"),l("li",null,"32v32大规模战役 (模拟极限负载场景)")])]),l("li",null,[l("strong",null,"递增负载测试"),l("p",null,"从基准负载开始，每5分钟增加10%负载，直到系统性能下降"),l("p",null,"记录每一级负载下的关键性能指标")]),l("li",null,[l("strong",null,"突发负载测试"),l("p",null,"模拟活动上线或媒体曝光带来的突发流量"),l("p",null,"在5秒内将负载提升至基准的300%，观察系统响应")]),l("li",null,[l("strong",null,"长时间稳定性测试"),l("p",null,"在80%峰值负载下持续运行72小时"),l("p",null,"观察内存泄漏、响应时间漂移等长期稳定性问题")])],-1)),n[22]||(n[22]=l("h4",{class:"mt-20"},"性能指标分析",-1)),n[23]||(n[23]=l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"指标"),l("th",null,"预期增长率"),l("th",null,"触发扩容阈值"),l("th",null,"临界值")]),l("tr",null,[l("td",null,"服务器CPU使用率"),l("td",null,"线性"),l("td",null,"70%"),l("td",null,"90%")]),l("tr",null,[l("td",null,"内存使用率"),l("td",null,"阶梯型"),l("td",null,"80%"),l("td",null,"95%")]),l("tr",null,[l("td",null,"网络带宽"),l("td",null,"平方增长"),l("td",null,"70%"),l("td",null,"85%")]),l("tr",null,[l("td",null,"响应时间"),l("td",null,"指数增长"),l("td",null,"2x基准"),l("td",null,"5x基准")]),l("tr",null,[l("td",null,"每秒事务数"),l("td",null,"线性"),l("td",null,"N/A"),l("td",null,"N/A")])],-1)),n[24]||(n[24]=l("h4",{class:"mt-20"},"特别说明",-1)),n[25]||(n[25]=l("ul",{class:"special-notes"},[l("li",null,[l("strong",null,"战斗服务必须实现无状态设计"),e(", 确保可随时扩展或替换实例")]),l("li",null,[l("strong",null,"所有扩展操作需通过金丝雀发布验证"),e(", 先应用到少量实例观察效果")]),l("li",null,[l("strong",null,"监控系统需具备预测性扩容能力"),e(", 基于历史数据预测负载峰值提前扩容")]),l("li",null,[l("strong",null,"版本兼容性至少维护3个历史大版本"),e(", 确保平滑升级和回滚能力")])],-1))])]),_:1})])])])}}}),_=I(M,[["__scopeId","data-v-5b0c1514"]]);export{_ as default};
