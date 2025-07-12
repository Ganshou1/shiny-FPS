import{d as g,r as p,o as m,c as v,a as k,b as l,l as F,e as n,w as o,f as d,i as t,j as w,_}from"./index-Dk8T_2ac.js";const y={class:"version-management"},x={class:"section"},I={class:"dark-content-box"},R={class:"section"},C={class:"section"},P={class:"dark-content-box"},A={class:"section"},B={class:"section"},T={class:"dark-content-box"},D={class:"section"},Q={class:"dark-content-box"},S={class:"rollback-checklist"},G=g({__name:"VersionManagement",setup(J){const a=p(null),r=p(null),h=[{field:"主版本",example:"v2.0",description:"架构级改动",approval:"CTO签字"},{field:"次版本",example:"v1.5",description:"新武器/地图",approval:"制作人审批"},{field:"热修复",example:"v1.4.3",description:"紧急BUG修复",approval:"主程确认"},{field:"构建号",example:"v1.4.3.2105",description:"每日构建",approval:"自动化流程"},{field:"特殊版本",example:"v1.4-beta1",description:"测试版本",approval:"QA主管确认"}],f=[{stage:"内部测试",target:"公司设备",duration:"1-3天",rollbackThreshold:"崩溃率>1%"},{stage:"小规模",target:"5%玩家",duration:"24小时",rollbackThreshold:"差评率>15%"},{stage:"中规模",target:"30%玩家",duration:"48小时",rollbackThreshold:"留存率下降>10%"},{stage:"全量",target:"所有玩家",duration:"-",rollbackThreshold:"营收降幅>5%"}],b=[{checkItem:"业务影响评估",description:"评估回滚对玩家体验、数据一致性和业务指标的影响",owner:"产品经理"},{checkItem:"技术可行性确认",description:"确认回滚方案的技术路径，评估风险点和复杂度",owner:"技术负责人"},{checkItem:"数据完整性验证",description:"确保目标版本的数据备份完整可用，数据结构兼容",owner:"DBA"},{checkItem:"回滚资源准备",description:"准备回滚所需的代码包、配置文件和部署脚本",owner:"DevOps工程师"},{checkItem:"回滚计划审批",description:"回滚方案经相关负责人审批，明确时间窗口和人员分工",owner:"项目经理"}];return m(()=>{a.value&&v(a.value,`
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
    `),r.value&&v(r.value,`
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
    `)}),(u,e)=>{const s=d("el-table-column"),i=d("el-table"),c=d("el-card");return w(),k("div",y,[e[13]||(e[13]=l("h2",null,"版本管理规范",-1)),l("div",x,[e[0]||(e[0]=l("h3",null,"1.1 版本控制体系",-1)),e[1]||(e[1]=l("h4",null,"1.1.1 版本号命名规则",-1)),l("div",I,[n(i,{data:h,border:"",style:{width:"100%"}},{default:o(()=>[n(s,{prop:"field",label:"字段",width:"120"}),n(s,{prop:"example",label:"示例",width:"120"}),n(s,{prop:"description",label:"变更说明",width:"180"}),n(s,{prop:"approval",label:"审批要求"})]),_:1})])]),l("div",R,[e[2]||(e[2]=l("h3",null,"分支管理流程",-1)),l("div",{ref_key:"branchFlowchart",ref:a,class:"diagram-container"},null,512)]),l("div",C,[e[3]||(e[3]=l("h3",null,"1.2 灰度发布策略",-1)),l("div",P,[n(i,{data:f,border:"",style:{width:"100%"}},{default:o(()=>[n(s,{prop:"stage",label:"阶段",width:"120"}),n(s,{prop:"target",label:"目标设备",width:"150"}),n(s,{prop:"duration",label:"持续时间",width:"150"}),n(s,{prop:"rollbackThreshold",label:"回滚阈值"})]),_:1})])]),l("div",A,[e[4]||(e[4]=l("h3",null,"构建流水线设计",-1)),l("div",{ref_key:"cicdPipeline",ref:r,class:"diagram-container"},null,512)]),l("div",B,[e[6]||(e[6]=l("h3",null,"分支管理策略",-1)),l("div",T,[n(c,null,{default:o(()=>e[5]||(e[5]=[l("div",{class:"branch-strategy"},[l("h4",null,"Git-Flow工作流"),l("p",null,"FPS游戏管理系统采用修改版的Git-Flow工作流，主要包含以下分支类型："),l("div",{class:"branch-types"},[l("div",{class:"branch-type"},[l("h5",null,[l("i",{class:"el-icon branch-icon"},"main"),t(" Main分支")]),l("p",null,"存放官方发布历史，所有提交都使用版本号标记"),l("p",null,[l("strong",null,"保护措施:"),t(" 需通过CI全部测试用例，并经过至少2位审核人批准")])]),l("div",{class:"branch-type"},[l("h5",null,[l("i",{class:"el-icon branch-icon"},"develop"),t(" Develop分支")]),l("p",null,"最新的开发进度，所有功能开发完成后合并到此分支"),l("p",null,[l("strong",null,"保护措施:"),t(" 需通过自动化测试，必须由功能负责人审核")])]),l("div",{class:"branch-type"},[l("h5",null,[l("i",{class:"el-icon branch-icon"},"feature"),t(" Feature分支")]),l("p",null,"用于开发新功能，命名格式: feature/[JIRA-ID]-[功能简述]"),l("p",null,[l("strong",null,"生命周期:"),t(" 从develop分支创建，完成后通过PR合并回develop")])]),l("div",{class:"branch-type"},[l("h5",null,[l("i",{class:"el-icon branch-icon"},"release"),t(" Release分支")]),l("p",null,"准备发布新版本，命名格式: release/v[主版本].[次版本]"),l("p",null,[l("strong",null,"特点:"),t(" 只修复Bug，不添加新功能，完成后合并到main和develop")])]),l("div",{class:"branch-type"},[l("h5",null,[l("i",{class:"el-icon branch-icon"},"hotfix"),t(" Hotfix分支")]),l("p",null,"紧急修复生产问题，命名格式: hotfix/v[版本]-[问题简述]"),l("p",null,[l("strong",null,"特点:"),t(" 从main创建，修复后合并回main和develop")])])]),l("h4",{class:"mt-20"},"提交信息规范"),l("pre",{class:"code-block"},`<type>(<scope>): <subject>

<body>

<footer>
            `),l("p",null,"其中："),l("ul",null,[l("li",null,[l("strong",null,"type:"),t(" feat(新功能), fix(Bug修复), docs(文档), style(样式), refactor(重构), perf(性能优化), test(测试), chore(构建/依赖)")]),l("li",null,[l("strong",null,"scope:"),t(" 影响范围，如auth, weapons, matchmaking等")]),l("li",null,[l("strong",null,"subject:"),t(" 简短描述，不超过50个字符")]),l("li",null,[l("strong",null,"body:"),t(" 详细描述，说明改动原因和影响")]),l("li",null,[l("strong",null,"footer:"),t(" 关联的Issue或Breaking Changes")])]),l("h4",{class:"mt-20"},"合并请求(Pull Request)规范"),l("ul",null,[l("li",null,"所有代码变更必须通过PR进行，禁止直接提交到保护分支"),l("li",null,"PR必须关联至少一个JIRA工单"),l("li",null,"PR必须通过CI/CD流水线所有测试"),l("li",null,"PR必须经过至少一位同级别或以上开发人员审核"),l("li",null,"核心模块PR需要经过架构师或技术负责人审核")])],-1)])),_:1,__:[5]})])]),l("div",D,[e[12]||(e[12]=l("h3",null,"版本回滚清单",-1)),l("div",Q,[n(c,null,{default:o(()=>[l("div",S,[e[7]||(e[7]=l("h4",null,"版本回滚前检查项",-1)),n(i,{data:b,border:"",style:{width:"100%"}},{default:o(()=>[n(s,{prop:"checkItem",label:"检查项",width:"200"}),n(s,{prop:"description",label:"说明"}),n(s,{prop:"owner",label:"负责人",width:"120"})]),_:1}),e[8]||(e[8]=l("h4",{class:"mt-20"},"回滚执行步骤",-1)),e[9]||(e[9]=l("ol",null,[l("li",null,[l("strong",null,"确认回滚范围"),l("p",null,"明确需要回滚的组件、版本和影响范围，是否需要数据回滚")]),l("li",null,[l("strong",null,"准备回滚环境"),l("p",null,"确保回滚版本的代码和资源包已经准备就绪，环境配置正确")]),l("li",null,[l("strong",null,"通知相关方"),l("p",null,"通知运营、客服和社区团队，准备公告和沟通材料")]),l("li",null,[l("strong",null,"备份当前数据"),l("p",null,"确保当前版本的数据已完全备份，必要时准备数据回滚脚本")]),l("li",null,[l("strong",null,"执行分批回滚"),l("p",null,"先在少量服务器上执行回滚，确认无异常后逐步扩大范围")]),l("li",null,[l("strong",null,"验证回滚结果"),l("p",null,"进行全面的功能和性能测试，确保回滚版本正常工作")]),l("li",null,[l("strong",null,"监控和跟进"),l("p",null,"密切监控关键指标，收集用户反馈，及时处理新问题")])],-1)),e[10]||(e[10]=l("h4",{class:"mt-20"},"特殊场景处理",-1)),e[11]||(e[11]=l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"场景"),l("th",null,"处理方案")]),l("tr",null,[l("td",null,"数据结构变更"),l("td",null,"准备数据迁移脚本，确保向前和向后兼容")]),l("tr",null,[l("td",null,"多组件依赖"),l("td",null,"确定回滚顺序，先回滚依赖方，后回滚被依赖方")]),l("tr",null,[l("td",null,"客户端强制更新"),l("td",null,"发布特殊版本客户端，支持旧版服务器协议")]),l("tr",null,[l("td",null,"第三方服务依赖"),l("td",null,"确认第三方服务接口兼容性，必要时回退第三方集成")])],-1))])]),_:1})])]),e[14]||(e[14]=F('<div class="section" data-v-10802fd3><h3 data-v-10802fd3>关键要求说明</h3><div class="dark-content-box" data-v-10802fd3><div class="key-requirements" data-v-10802fd3><ul class="special-notes" data-v-10802fd3><li data-v-10802fd3><strong data-v-10802fd3>所有版本变更需关联JIRA需求单</strong>, 确保每个变更有明确的需求来源和追踪记录</li><li data-v-10802fd3><strong data-v-10802fd3>文档必须包含变更历史记录</strong>, 记录变更内容、影响范围和负责人</li><li data-v-10802fd3><strong data-v-10802fd3>生产环境配置需版本化存储</strong>, 确保配置变更可追踪、可回滚</li><li data-v-10802fd3><strong data-v-10802fd3>重大变更需进行玩家影响评估</strong>, 评估潜在风险和收益，制定应对预案</li></ul></div></div></div>',1))])}}}),N=_(G,[["__scopeId","data-v-10802fd3"]]);export{N as default};
