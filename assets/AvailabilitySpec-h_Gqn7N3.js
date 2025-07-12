import{d as _,r as b,o as h,c as v,a as D,b as l,e as t,w as s,f as u,i,j as C,_ as w}from"./index-D9XT-uxJ.js";const G={class:"availability-spec"},k={class:"section"},B={class:"dark-content-box"},E={class:"section"},F={class:"section"},x={class:"dark-content-box"},H={class:"section"},I={class:"dark-content-box"},P={class:"tab-content"},A={class:"section"},L={class:"dark-content-box"},O={class:"backup-verification"},R={class:"section"},M={class:"dark-content-box"},q={class:"disaster-recovery-checklist"},V=_({__name:"AvailabilitySpec",setup(N){const a=b(null),o=b(null),r=b(null),y=[{componentType:"匹配服务",availabilityTarget:"99.99%",recoveryTime:"<1分钟",dataGuarantee:"事务日志实时"},{componentType:"战斗服务",availabilityTarget:"99.95%",recoveryTime:"<30秒",dataGuarantee:"内存快照每5秒"},{componentType:"数据存储",availabilityTarget:"99.999%",recoveryTime:"<5秒",dataGuarantee:"多AZ同步"},{componentType:"认证服务",availabilityTarget:"99.99%",recoveryTime:"<15秒",dataGuarantee:"跨区域同步复制"},{componentType:"内容分发",availabilityTarget:"99.9%",recoveryTime:"<5分钟",dataGuarantee:"CDN多节点缓存"}],f=[{failureType:"服务器宕机",detectionTime:"10秒",switchMethod:"自动热备",consistency:"最后1秒状态"},{failureType:"网络分区",detectionTime:"15秒",switchMethod:"仲裁切换",consistency:"最终一致性"},{failureType:"数据库故障",detectionTime:"5秒",switchMethod:"只读模式",consistency:"事务回滚"},{failureType:"区域性故障",detectionTime:"30秒",switchMethod:"跨区域转移",consistency:"异步复制点"},{failureType:"软件版本问题",detectionTime:"60秒",switchMethod:"自动回滚",consistency:"版本兼容逻辑"}],g=[{scenario:"单节点故障",frequency:"每周",success:"无感知切换，RTO < 30秒"},{scenario:"数据中心网络中断",frequency:"每月",success:"区域内容灾切换，RTO < 90秒"},{scenario:"主数据库崩溃",frequency:"每月",success:"自动切换备库，RTO < 5秒"},{scenario:"区域级灾难",frequency:"每季度",success:"跨区域容灾，RTO < 5分钟"},{scenario:"数据损坏恢复",frequency:"每半年",success:"数据恢复完整，RPO < 5分钟"}];return h(()=>{a.value&&v(a.value,`
      graph TD
        subgraph 多区域部署
        A[玩家请求] --> B{全局负载均衡}
        B -->|区域1| C1[边缘节点]
        B -->|区域2| C2[边缘节点]
        B -->|区域3| C3[边缘节点]
        
        C1 --> D1[游戏服务集群]
        C2 --> D2[游戏服务集群]
        C3 --> D3[游戏服务集群]
        
        D1 --> E1[(主数据中心)]
        D2 --> E2[(主数据中心)]
        D3 --> E3[(主数据中心)]
        
        E1 -.-> F1[(备份数据中心)]
        E2 -.-> F2[(备份数据中心)]
        E3 -.-> F3[(备份数据中心)]
        end
        
        subgraph 高可用架构
        D1 --> G1[服务实例1]
        D1 --> G2[服务实例2]
        D1 --> G3[服务实例3]
        
        G1 --> H[健康检查]
        G2 --> H
        G3 --> H
        
        H --> I{自动伸缩}
        I -->|扩容| G4[新服务实例]
        I -->|缩容| G3
        end
    `),o.value&&v(o.value,`
      graph TD
        A[异常检测] --> B{问题分类}
        B -->|进程级| C[进程自愈]
        B -->|实例级| D[实例自愈]
        B -->|服务级| E[服务自愈]
        
        C -->|进程重启| F[健康检查]
        D -->|实例替换| F
        E -->|服务降级/切换| F
        
        F -->|恢复正常| G[恢复服务]
        F -->|持续异常| H[升级处理]
    `),r.value&&v(r.value,`
      graph LR
        A[备份执行] --> B[完整性校验]
        B --> C{校验通过?}
        C -->|是| D[测试恢复]
        C -->|否| E[触发报警]
        
        D --> F{恢复成功?}
        F -->|是| G[验证数据]
        F -->|否| H[调查失败原因]
        
        G --> I{数据一致?}
        I -->|是| J[标记备份有效]
        I -->|否| K[修复备份流程]
        
        E --> L[重新执行备份]
        H --> L
        K --> L
    `)}),(d,n)=>{const e=u("el-table-column"),p=u("el-table"),c=u("el-tab-pane"),T=u("el-tabs"),m=u("el-card");return C(),D("div",G,[n[22]||(n[22]=l("h2",null,"可用性要求",-1)),l("div",k,[n[0]||(n[0]=l("h3",null,"2.1 服务等级协议(SLA)",-1)),l("div",B,[t(p,{data:y,border:"",style:{width:"100%"}},{default:s(()=>[t(e,{prop:"componentType",label:"组件类型",width:"150"}),t(e,{prop:"availabilityTarget",label:"可用性目标",width:"150"}),t(e,{prop:"recoveryTime",label:"故障恢复时间",width:"150"}),t(e,{prop:"dataGuarantee",label:"数据持久化保证"})]),_:1})])]),l("div",E,[n[1]||(n[1]=l("h3",null,"服务可用性架构",-1)),l("div",{ref_key:"availabilityDiagram",ref:a,class:"diagram-container"},null,512)]),l("div",F,[n[2]||(n[2]=l("h3",null,"2.2 灾备方案",-1)),n[3]||(n[3]=l("h4",null,"2.2.1 故障转移策略",-1)),l("div",x,[t(p,{data:f,border:"",style:{width:"100%"}},{default:s(()=>[t(e,{prop:"failureType",label:"故障类型",width:"150"}),t(e,{prop:"detectionTime",label:"检测时间",width:"150"}),t(e,{prop:"switchMethod",label:"切换方式",width:"150"}),t(e,{prop:"consistency",label:"数据一致性保证"})]),_:1})])]),l("div",H,[n[9]||(n[9]=l("h3",null,"心跳检测协议",-1)),l("div",I,[t(m,null,{default:s(()=>[t(T,{type:"border-card"},{default:s(()=>[t(c,{label:"心跳机制"},{default:s(()=>n[4]||(n[4]=[l("div",{class:"tab-content"},[l("h4",null,"分层心跳检测"),l("ul",null,[l("li",null,[l("strong",null,"L1: 进程级心跳"),l("p",null,"频率: 1次/秒，超时阈值: 3秒"),l("p",null,"作用: 监控进程是否存活，触发自动重启机制")]),l("li",null,[l("strong",null,"L2: 服务级心跳"),l("p",null,"频率: 1次/5秒，超时阈值: 15秒"),l("p",null,"作用: 监控服务是否能正常响应，触发服务切换")]),l("li",null,[l("strong",null,"L3: 集群级心跳"),l("p",null,"频率: 1次/30秒，超时阈值: 90秒"),l("p",null,"作用: 监控数据中心状态，触发区域故障转移")])]),l("h4",{class:"mt-20"},"心跳协议格式"),l("pre",{class:"code-block"},`{
  "service_id": "battle-server-001",
  "instance_id": "i-12345abcde",
  "region": "asia-east",
  "timestamp": 1625482938,
  "status": "healthy",
  "metrics": {
    "cpu_load": 0.45,
    "memory_usage": 0.62,
    "active_connections": 128,
    "response_time_ms": 15
  },
  "version": "1.5.2"
}
                `)],-1)])),_:1,__:[4]}),t(c,{label:"故障检测"},{default:s(()=>n[5]||(n[5]=[l("div",{class:"tab-content"},[l("h4",null,"多维度故障检测"),l("ul",null,[l("li",null,[l("strong",null,"基础设施层检测"),l("p",null,"监控主机、网络设备、存储系统的硬件和操作系统状态"),l("p",null,"指标: CPU负载、内存使用率、磁盘I/O、网络吞吐量")]),l("li",null,[l("strong",null,"应用层检测"),l("p",null,"监控游戏服务进程状态、API响应时间、错误率"),l("p",null,"指标: 服务响应延迟、HTTP状态码、业务错误率、队列深度")]),l("li",null,[l("strong",null,"业务层检测"),l("p",null,"监控游戏会话创建成功率、匹配时间、游戏进行中断率"),l("p",null,"指标: 会话完整度、玩家掉线率、异常行为模式")])]),l("h4",{class:"mt-20"},"故障阈值定义"),l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"故障等级"),l("th",null,"触发条件"),l("th",null,"响应措施")]),l("tr",null,[l("td",null,"P1 - 严重"),l("td",null,"系统不可用 > 30秒"),l("td",null,"立即自动故障转移 + 紧急团队通知")]),l("tr",null,[l("td",null,"P2 - 高危"),l("td",null,"部分功能不可用 > 2分钟"),l("td",null,"自动降级 + 工程师介入")]),l("tr",null,[l("td",null,"P3 - 中等"),l("td",null,"性能下降 > 50% 超过5分钟"),l("td",null,"负载均衡调整 + 技术支持通知")]),l("tr",null,[l("td",null,"P4 - 轻微"),l("td",null,"非关键功能异常"),l("td",null,"记录问题 + 下次更新修复")])])],-1)])),_:1,__:[5]}),t(c,{label:"自愈机制"},{default:s(()=>[l("div",P,[n[6]||(n[6]=l("h4",null,"多层次自愈机制",-1)),l("div",{ref_key:"selfHealingDiagram",ref:o,class:"mini-diagram"},null,512),n[7]||(n[7]=l("h4",{class:"mt-20"},"自愈策略详情",-1)),n[8]||(n[8]=l("ul",null,[l("li",null,[l("strong",null,"进程自愈"),l("p",null,"监控系统检测到进程崩溃或不响应时，自动重启进程"),l("p",null,"最大重试次数: 3次，重试间隔: 指数退避(5s, 15s, 45s)"),l("p",null,"连续失败后: 标记实例为不健康，触发实例替换")]),l("li",null,[l("strong",null,"实例自愈"),l("p",null,"监控系统检测到实例异常时，自动从负载均衡中移除并创建新实例"),l("p",null,"启动新实例后执行健康检查，确认正常后才加入服务"),l("p",null,"保留问题实例供后续分析，但不再分配新流量")]),l("li",null,[l("strong",null,"服务自愈"),l("p",null,"监控系统检测到整体服务异常时，自动进行服务降级或切换"),l("p",null,"启用备用路由规则，将流量导向健康区域"),l("p",null,"根据预设的策略执行服务恢复流程")])],-1))])]),_:1})]),_:1})]),_:1})])]),l("div",A,[n[17]||(n[17]=l("h3",null,"数据备份验证流程",-1)),l("div",L,[t(m,null,{default:s(()=>[l("div",O,[n[10]||(n[10]=l("h4",null,"备份策略",-1)),n[11]||(n[11]=l("ul",null,[l("li",null,[l("strong",null,"增量备份:"),i(" 每1小时执行一次 "),l("p",null,"保存48小时内任意时间点的数据状态，支持精细回滚")]),l("li",null,[l("strong",null,"全量备份:"),i(" 每24小时执行一次 "),l("p",null,"保存7天内每天的完整数据快照，支持完整恢复")]),l("li",null,[l("strong",null,"归档备份:"),i(" 每周执行一次 "),l("p",null,"保存90天的历史数据，用于长期追溯和分析")])],-1)),n[12]||(n[12]=l("h4",{class:"mt-20"},"备份验证流程",-1)),l("div",{ref_key:"backupVerificationDiagram",ref:r,class:"mini-diagram"},null,512),n[13]||(n[13]=l("h4",{class:"mt-20"},"备份恢复演练",-1)),n[14]||(n[14]=l("p",null,"定期进行备份恢复演练，确保备份数据的有效性和恢复流程的可靠性：",-1)),n[15]||(n[15]=l("ol",null,[l("li",null,[l("strong",null,"每周演练:"),i(" 从增量备份恢复单个玩家数据")]),l("li",null,[l("strong",null,"每月演练:"),i(" 从全量备份恢复完整游戏分区")]),l("li",null,[l("strong",null,"每季度演练:"),i(" 模拟灾难场景，执行跨区域恢复")])],-1)),n[16]||(n[16]=l("table",{class:"custom-table mt-20"},[l("tr",null,[l("th",null,"备份类型"),l("th",null,"恢复时间目标(RTO)"),l("th",null,"恢复点目标(RPO)"),l("th",null,"验证频率")]),l("tr",null,[l("td",null,"增量备份"),l("td",null,"< 30分钟"),l("td",null,"< 1小时"),l("td",null,"每周")]),l("tr",null,[l("td",null,"全量备份"),l("td",null,"< 2小时"),l("td",null,"< 24小时"),l("td",null,"每月")]),l("tr",null,[l("td",null,"归档备份"),l("td",null,"< 8小时"),l("td",null,"< 7天"),l("td",null,"每季度")])],-1))])]),_:1})])]),l("div",R,[n[21]||(n[21]=l("h3",null,"容灾演练清单",-1)),l("div",M,[t(m,null,{default:s(()=>[l("div",q,[n[18]||(n[18]=l("h4",null,"常规容灾演练项目",-1)),t(p,{data:g,border:"",style:{width:"100%"}},{default:s(()=>[t(e,{prop:"scenario",label:"演练场景",width:"200"}),t(e,{prop:"frequency",label:"执行频率",width:"120"}),t(e,{prop:"success",label:"成功标准"})]),_:1}),n[19]||(n[19]=l("h4",{class:"mt-20"},"容灾演练步骤",-1)),n[20]||(n[20]=l("ol",null,[l("li",null,[l("strong",null,"演练准备"),l("ul",null,[l("li",null,"确定演练范围和目标"),l("li",null,"准备演练脚本和工具"),l("li",null,"通知相关团队和利益相关者"),l("li",null,"设置监控和观察点")])]),l("li",null,[l("strong",null,"演练执行"),l("ul",null,[l("li",null,"按照预设场景触发故障条件"),l("li",null,"观察系统自动响应行为"),l("li",null,"记录关键指标和时间点"),l("li",null,"必要时执行人工干预步骤")])]),l("li",null,[l("strong",null,"结果评估"),l("ul",null,[l("li",null,"评估恢复时间是否达到目标"),l("li",null,"验证数据一致性和完整性"),l("li",null,"识别流程中的瓶颈和问题"),l("li",null,"总结经验和教训")])]),l("li",null,[l("strong",null,"改进优化"),l("ul",null,[l("li",null,"更新容灾文档和流程"),l("li",null,"优化自动化工具和脚本"),l("li",null,"培训团队成员"),l("li",null,"调整资源配置和技术架构")])])],-1))])]),_:1})])])])}}}),K=w(V,[["__scopeId","data-v-f9182933"]]);export{K as default};
