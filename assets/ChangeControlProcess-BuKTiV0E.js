import{d as f,r as p,o as b,c as v,a as h,b as l,e as s,w as a,f as d,j as w,_}from"./index-D9XT-uxJ.js";const k={class:"change-control"},y={class:"section"},C={class:"dark-content-box"},L={class:"section"},x={class:"section"},g={class:"dark-content-box"},P={class:"change-request-process"},B={class:"section"},D={class:"dark-content-box"},G=f({__name:"ChangeControlProcess",setup(O){const t=p(null),o=p(null),u=[{step:"问题确认",responsible:"值班主程",timeLimit:"30分钟",deliverable:"故障报告"},{step:"方案制定",responsible:"核心开发",timeLimit:"1小时",deliverable:"修复方案文档"},{step:"修复验证",responsible:"QA团队",timeLimit:"2小时",deliverable:"测试用例"},{step:"审批流程",responsible:"技术负责人",timeLimit:"30分钟",deliverable:"审批记录"},{step:"灰度推送",responsible:"DevOps",timeLimit:"1小时",deliverable:"监控看板"},{step:"全量发布",responsible:"运维团队",timeLimit:"1小时",deliverable:"部署报告"},{step:"效果评估",responsible:"产品经理",timeLimit:"24小时",deliverable:"评估报告"}],m=[{type:"标准变更",description:"低风险、常规的变更，如配置参数调整、小型功能更新等",priority:"低",approvalLevel:"模块负责人"},{type:"正常变更",description:"中等风险、计划内的功能性变更，如新功能上线、架构优化等",priority:"中",approvalLevel:"技术负责人"},{type:"紧急变更",description:"高风险、需要立即处理的问题修复，如生产环境严重BUG、安全漏洞等",priority:"高",approvalLevel:"制作人"},{type:"重大变更",description:"可能影响整体系统稳定性的变更，如核心架构调整、数据库迁移等",priority:"最高",approvalLevel:"CTO"}];return b(()=>{t.value&&v(t.value,`
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
    `),o.value&&v(o.value,`
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
    `)}),(n,e)=>{const i=d("el-table-column"),r=d("el-table"),c=d("el-card");return w(),h("div",k,[e[9]||(e[9]=l("h2",null,"变更控制流程",-1)),l("div",y,[e[0]||(e[0]=l("h3",null,"3.1 紧急热修SOP",-1)),l("div",C,[s(r,{data:u,border:"",style:{width:"100%"}},{default:a(()=>[s(i,{prop:"step",label:"步骤",width:"150"}),s(i,{prop:"responsible",label:"责任人",width:"150"}),s(i,{prop:"timeLimit",label:"时限",width:"120"}),s(i,{prop:"deliverable",label:"输出物"})]),_:1})])]),l("div",L,[e[1]||(e[1]=l("h3",null,"紧急修复流程图",-1)),l("div",{ref_key:"hotfixProcessFlow",ref:t,class:"diagram-container"},null,512)]),l("div",x,[e[6]||(e[6]=l("h3",null,"变更请求处理流程",-1)),l("div",g,[s(c,null,{default:a(()=>[l("div",P,[e[2]||(e[2]=l("h4",null,"变更请求类型",-1)),s(r,{data:m,border:"",style:{width:"100%"}},{default:a(()=>[s(i,{prop:"type",label:"类型",width:"150"}),s(i,{prop:"description",label:"描述"}),s(i,{prop:"priority",label:"优先级",width:"100"}),s(i,{prop:"approvalLevel",label:"审批级别",width:"150"})]),_:1}),e[3]||(e[3]=l("h4",{class:"mt-20"},"变更请求工作流",-1)),l("div",{ref_key:"changeRequestWorkflow",ref:o,class:"mini-diagram"},null,512),e[4]||(e[4]=l("h4",{class:"mt-20"},"变更请求表单",-1)),e[5]||(e[5]=l("div",{class:"form-preview"},[l("div",{class:"form-section"},[l("h5",null,"基本信息"),l("div",{class:"form-row"},[l("div",{class:"form-field"},[l("label",null,"变更ID"),l("div",{class:"field-preview"},"CHG-2023-0001")]),l("div",{class:"form-field"},[l("label",null,"变更类型"),l("div",{class:"field-preview"},"紧急修复")]),l("div",{class:"form-field"},[l("label",null,"提交日期"),l("div",{class:"field-preview"},"2023-07-15")])]),l("div",{class:"form-row"},[l("div",{class:"form-field"},[l("label",null,"提交人"),l("div",{class:"field-preview"},"张工 (开发团队)")]),l("div",{class:"form-field"},[l("label",null,"受影响系统"),l("div",{class:"field-preview"},"战斗服务器, 匹配系统")]),l("div",{class:"form-field"},[l("label",null,"优先级"),l("div",{class:"field-preview high-priority"},"高")])])]),l("div",{class:"form-section"},[l("h5",null,"变更详情"),l("div",{class:"form-row full-width"},[l("div",{class:"form-field"},[l("label",null,"变更原因"),l("div",{class:"field-preview"},"生产环境发现严重BUG，导致特定武器组合时伤害计算错误")])]),l("div",{class:"form-row full-width"},[l("div",{class:"form-field"},[l("label",null,"变更描述"),l("div",{class:"field-preview"},"修复伤害计算公式中的溢出问题，当组合多个暴击加成时错误计算最终伤害")])]),l("div",{class:"form-row"},[l("div",{class:"form-field"},[l("label",null,"变更范围"),l("div",{class:"field-preview"},"伤害计算模块")]),l("div",{class:"form-field"},[l("label",null,"影响用户比例"),l("div",{class:"field-preview"},"约5%活跃用户")]),l("div",{class:"form-field"},[l("label",null,"计划实施时间"),l("div",{class:"field-preview"},"2023-07-15 22:00")])])]),l("div",{class:"form-section"},[l("h5",null,"风险评估"),l("div",{class:"form-row"},[l("div",{class:"form-field"},[l("label",null,"风险等级"),l("div",{class:"field-preview medium-risk"},"中")]),l("div",{class:"form-field"},[l("label",null,"潜在风险"),l("div",{class:"field-preview"},"可能影响其他武器伤害计算")]),l("div",{class:"form-field"},[l("label",null,"回滚计划"),l("div",{class:"field-preview"},"准备回滚脚本，保留30天回滚窗口")])])]),l("div",{class:"form-section"},[l("h5",null,"审批流程"),l("div",{class:"approval-flow"},[l("div",{class:"approval-step completed"},[l("div",{class:"approver-info"},[l("span",{class:"approver-name"},"李工 (技术负责人)"),l("span",{class:"approval-status"},"已批准"),l("span",{class:"approval-time"},"2023-07-15 18:30")]),l("div",{class:"approval-comment"},"修复方案合理，测试充分，同意实施")]),l("div",{class:"approval-step completed"},[l("div",{class:"approver-info"},[l("span",{class:"approver-name"},"王总 (运营总监)"),l("span",{class:"approval-status"},"已批准"),l("span",{class:"approval-time"},"2023-07-15 19:15")]),l("div",{class:"approval-comment"},"已确认用户影响范围，同意在低峰期实施")]),l("div",{class:"approval-step"},[l("div",{class:"approver-info"},[l("span",{class:"approver-name"},"赵总 (制作人)"),l("span",{class:"approval-status"},"待批准"),l("span",{class:"approval-time"},"-")]),l("div",{class:"approval-comment"})])])])],-1))])]),_:1})])]),l("div",B,[e[8]||(e[8]=l("h3",null,"变更实施控制",-1)),l("div",D,[s(c,null,{default:a(()=>e[7]||(e[7]=[l("div",{class:"implementation-control"},[l("h4",null,"变更窗口管理"),l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"变更类型"),l("th",null,"标准变更窗口"),l("th",null,"冻结期"),l("th",null,"通知要求")]),l("tr",null,[l("td",null,"标准更新"),l("td",null,"每周二 02:00-06:00"),l("td",null,"重大活动前2周"),l("td",null,"提前7天公告")]),l("tr",null,[l("td",null,"功能更新"),l("td",null,"每月15日 00:00-08:00"),l("td",null,"重大活动前3周"),l("td",null,"提前14天公告")]),l("tr",null,[l("td",null,"紧急修复"),l("td",null,"随时(优先低峰期)"),l("td",null,"无冻结期"),l("td",null,"实施前1小时公告")]),l("tr",null,[l("td",null,"数据库变更"),l("td",null,"每月第一个周日 00:00-06:00"),l("td",null,"重大活动前4周"),l("td",null,"提前21天公告")])]),l("h4",{class:"mt-20"},"变更实施清单"),l("div",{class:"implementation-checklist"},[l("div",{class:"checklist-item"},[l("div",{class:"checklist-header"},[l("div",{class:"checkbox checked"}),l("h5",null,"部署前检查")]),l("ul",null,[l("li",null,"备份目标环境配置和数据"),l("li",null,"完成所有自动化测试"),l("li",null,"准备回滚脚本"),l("li",null,"确认监控系统就绪"),l("li",null,"通知相关团队和用户")])]),l("div",{class:"checklist-item"},[l("div",{class:"checklist-header"},[l("div",{class:"checkbox checked"}),l("h5",null,"部署执行")]),l("ul",null,[l("li",null,"执行数据库更改脚本(如需)"),l("li",null,"分批部署应用服务器"),l("li",null,"执行冒烟测试确认功能"),l("li",null,"更新CDN资源(如需)"),l("li",null,"启用新功能开关")])]),l("div",{class:"checklist-item"},[l("div",{class:"checklist-header"},[l("div",{class:"checkbox"}),l("h5",null,"部署后监控")]),l("ul",null,[l("li",null,"监控关键业务指标30分钟"),l("li",null,"监控系统性能指标2小时"),l("li",null,"监控错误日志和告警"),l("li",null,"检查数据一致性"),l("li",null,"确认所有服务健康状态")])]),l("div",{class:"checklist-item"},[l("div",{class:"checklist-header"},[l("div",{class:"checkbox"}),l("h5",null,"变更确认")]),l("ul",null,[l("li",null,"确认变更目标已实现"),l("li",null,"收集用户反馈"),l("li",null,"更新变更记录状态"),l("li",null,"关闭关联的JIRA工单"),l("li",null,"安排变更后评审会议")])])])],-1)])),_:1,__:[7]})])])])}}}),A=_(G,[["__scopeId","data-v-e59fe4ab"]]);export{A as default};
