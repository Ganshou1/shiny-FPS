import{d as _,r as p,o as h,c as m,a as k,b as l,e as s,w as a,f as u,i as o,j as f,_ as C}from"./index-Dk8T_2ac.js";const w={class:"compliance-audit"},I={class:"section"},y={class:"dark-content-box"},B={class:"section"},D={class:"section"},P={class:"dark-content-box"},A={class:"compliance-standards"},q={class:"section"},S={class:"dark-content-box"},x={class:"audit-plan"},E=_({__name:"ComplianceAudit",setup(F){const d=p(null),e=p(null),v=[{auditItem:"数据安全",standard:"GDPR条款",tool:"静态扫描",remediation:"自动脱敏"},{auditItem:"防沉迷",standard:"实名认证",tool:"日志分析",remediation:"强制下线"},{auditItem:"支付合规",standard:"PCI DSS",tool:"人工抽查",remediation:"交易回滚"},{auditItem:"内容合规",standard:"游戏内容规范",tool:"AI内容审核",remediation:"屏蔽敏感内容"},{auditItem:"版权合规",standard:"知识产权法",tool:"相似度扫描",remediation:"替换侵权内容"}];return h(()=>{d.value&&m(d.value,`
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
    `),e.value&&m(e.value,`
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
    `)}),(r,n)=>{const t=u("el-table-column"),g=u("el-table"),i=u("el-tab-pane"),b=u("el-tabs"),c=u("el-card");return f(),k("div",w,[n[14]||(n[14]=l("h2",null,"合规性审计",-1)),l("div",I,[n[0]||(n[0]=l("h3",null,"4.1 检查项表示例",-1)),l("div",y,[s(g,{data:v,border:"",style:{width:"100%"}},{default:a(()=>[s(t,{prop:"auditItem",label:"审计项",width:"150"}),s(t,{prop:"standard",label:"检测标准",width:"180"}),s(t,{prop:"tool",label:"检查工具",width:"150"}),s(t,{prop:"remediation",label:"补救措施"})]),_:1})])]),l("div",B,[n[1]||(n[1]=l("h3",null,"合规性检查流程",-1)),l("div",{ref_key:"complianceCheckFlow",ref:d,class:"diagram-container"},null,512)]),l("div",D,[n[5]||(n[5]=l("h3",null,"合规性标准清单",-1)),l("div",P,[s(c,null,{default:a(()=>[l("div",A,[s(b,{type:"border-card"},{default:a(()=>[s(i,{label:"数据安全合规"},{default:a(()=>n[2]||(n[2]=[l("div",{class:"tab-content"},[l("h4",null,"适用标准"),l("ul",{class:"standards-list"},[l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"GDPR (通用数据保护条例)"),l("span",{class:"standard-badge"},"欧盟")]),l("p",null,"适用于所有处理欧盟公民个人数据的企业，无论企业位于何处"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"用户数据处理需明确获得同意"),l("li",null,"保障用户查阅、更正、删除数据的权利"),l("li",null,"数据泄露需在72小时内通知监管机构"),l("li",null,"实施数据保护影响评估"),l("li",null,"遵循数据最小化原则")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"PIPL (个人信息保护法)"),l("span",{class:"standard-badge"},"中国")]),l("p",null,"中国个人信息保护法律框架，规范个人信息处理活动"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"收集个人信息需明确告知目的、方式和范围"),l("li",null,"不得过度收集个人信息"),l("li",null,"采取必要措施确保个人信息安全"),l("li",null,"遵循单独同意原则"),l("li",null,"重要数据需在中国境内存储")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"CCPA (加州消费者隐私法)"),l("span",{class:"standard-badge"},"美国")]),l("p",null,"适用于在加州开展业务并收集个人信息的企业"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"向消费者披露收集的个人信息类别"),l("li",null,"允许消费者选择退出个人信息销售"),l("li",null,"提供查询和删除个人信息的权利"),l("li",null,"不得因消费者行使权利而歧视"),l("li",null,"维护隐私政策并定期更新")])])])])],-1)])),_:1,__:[2]}),s(i,{label:"游戏内容规范"},{default:a(()=>n[3]||(n[3]=[l("div",{class:"tab-content"},[l("h4",null,"适用标准"),l("ul",{class:"standards-list"},[l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"网络游戏管理规定"),l("span",{class:"standard-badge"},"中国")]),l("p",null,"规范网络游戏运营和管理，促进行业健康发展"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"实名认证和防沉迷系统"),l("li",null,"未成年人保护措施"),l("li",null,"游戏内容符合社会公德"),l("li",null,"虚拟道具和服务交易管理"),l("li",null,"游戏服务协议和用户隐私保护")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"ESRB (娱乐软件分级委员会)"),l("span",{class:"standard-badge"},"北美")]),l("p",null,"为视频游戏和应用程序提供内容分级，帮助消费者了解内容适宜性"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"准确申报游戏内容"),l("li",null,"按要求标注分级和内容描述"),l("li",null,"广告和营销材料符合分级要求"),l("li",null,"在线互动环境的安全控制"),l("li",null,"游戏内购买的披露")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"PEGI (泛欧游戏信息)"),l("span",{class:"standard-badge"},"欧洲")]),l("p",null,"欧洲视频游戏分级系统，根据游戏内容设定年龄分级"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"符合年龄分级标准"),l("li",null,"内容描述符号正确使用"),l("li",null,"游戏前显示分级信息"),l("li",null,"营销内容符合分级要求"),l("li",null,"准确披露游戏内购买信息")])])])])],-1)])),_:1,__:[3]}),s(i,{label:"支付安全标准"},{default:a(()=>n[4]||(n[4]=[l("div",{class:"tab-content"},[l("h4",null,"适用标准"),l("ul",{class:"standards-list"},[l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"PCI DSS (支付卡行业数据安全标准)"),l("span",{class:"standard-badge"},"国际")]),l("p",null,"适用于处理、存储或传输信用卡数据的所有实体"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"构建和维护安全的网络"),l("li",null,"保护持卡人数据"),l("li",null,"维护漏洞管理计划"),l("li",null,"实施强访问控制措施"),l("li",null,"定期监控和测试网络"),l("li",null,"维护信息安全政策")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"非银行支付机构网络支付业务管理办法"),l("span",{class:"standard-badge"},"中国")]),l("p",null,"规范支付机构网络支付业务，保护用户资金安全"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"实名制管理"),l("li",null,"分级支付限额"),l("li",null,"客户资金与机构自有资金隔离"),l("li",null,"支付安全管理"),l("li",null,"信息安全保障")])])]),l("li",null,[l("div",{class:"standard-header"},[l("span",{class:"standard-name"},"Apple App Store支付指南"),l("span",{class:"standard-badge"},"Apple")]),l("p",null,"适用于通过App Store发布的应用内购买功能"),l("div",{class:"key-requirements"},[l("p",null,[l("strong",null,"关键要求:")]),l("ul",null,[l("li",null,"使用Apple的应用内购买系统"),l("li",null,"禁止引导用户使用外部支付方式"),l("li",null,"价格透明度和用户同意"),l("li",null,"订阅服务的管理和通知"),l("li",null,"退款政策符合要求")])])])])],-1)])),_:1,__:[4]})]),_:1})])]),_:1})])]),l("div",q,[n[13]||(n[13]=l("h3",null,"合规性审计计划",-1)),l("div",S,[s(c,null,{default:a(()=>[l("div",x,[n[6]||(n[6]=l("h4",null,"年度审计时间表",-1)),n[7]||(n[7]=l("table",{class:"custom-table"},[l("tr",null,[l("th",null,"审计类型"),l("th",null,"频率"),l("th",null,"执行时间"),l("th",null,"负责团队"),l("th",null,"输出物")]),l("tr",null,[l("td",null,"内部安全审计"),l("td",null,"季度"),l("td",null,"每季度最后一个月"),l("td",null,"安全团队"),l("td",null,"安全评估报告")]),l("tr",null,[l("td",null,"数据合规审计"),l("td",null,"半年"),l("td",null,"6月和12月"),l("td",null,"数据治理团队"),l("td",null,"数据合规报告")]),l("tr",null,[l("td",null,"第三方安全渗透测试"),l("td",null,"年度"),l("td",null,"每年9月"),l("td",null,"外部安全公司"),l("td",null,"渗透测试报告")]),l("tr",null,[l("td",null,"支付系统审计"),l("td",null,"年度"),l("td",null,"每年3月"),l("td",null,"财务安全团队"),l("td",null,"PCI DSS合规证明")]),l("tr",null,[l("td",null,"未成年人保护审查"),l("td",null,"季度"),l("td",null,"每季度首月"),l("td",null,"运营合规团队"),l("td",null,"未成年保护报告")])],-1)),n[8]||(n[8]=l("h4",{class:"mt-20"},"合规性管理结构",-1)),l("div",{ref_key:"complianceOrgChart",ref:e,class:"mini-diagram"},null,512),n[9]||(n[9]=l("h4",{class:"mt-20"},"审计流程",-1)),n[10]||(n[10]=l("ol",{class:"audit-process"},[l("li",null,[l("h5",null,"审计准备"),l("ul",null,[l("li",null,"确定审计范围和目标"),l("li",null,"制定审计计划和时间表"),l("li",null,"分配审计资源和团队"),l("li",null,"准备审计工具和检查表")])]),l("li",null,[l("h5",null,"审计执行"),l("ul",null,[l("li",null,"收集和审查文档"),l("li",null,"执行技术测试和评估"),l("li",null,"进行访谈和观察"),l("li",null,"记录发现和证据")])]),l("li",null,[l("h5",null,"发现分析"),l("ul",null,[l("li",null,"评估发现的合规性风险"),l("li",null,"确定根本原因"),l("li",null,"制定修复建议"),l("li",null,"优先排序不合规项")])]),l("li",null,[l("h5",null,"报告与跟进"),l("ul",null,[l("li",null,"编写审计报告"),l("li",null,"与利益相关者沟通结果"),l("li",null,"制定修复计划"),l("li",null,"跟踪修复进度"),l("li",null,"验证修复有效性")])])],-1)),n[11]||(n[11]=l("h4",{class:"mt-20"},"合规知识传承机制",-1)),n[12]||(n[12]=l("div",{class:"knowledge-transfer"},[l("div",{class:"knowledge-item"},[l("div",{class:"knowledge-header"},[l("i",{class:"el-icon knowledge-icon"},"📝"),l("h5",null,"合规培训计划")]),l("p",null,"针对不同角色定制的合规培训:"),l("ul",null,[l("li",null,"开发人员 - 安全编码和数据处理"),l("li",null,"产品经理 - 隐私设计和法规要求"),l("li",null,"运营人员 - 内容审核和用户管理"),l("li",null,"管理层 - 合规责任和风险管理")]),l("p",null,[l("strong",null,"频率:"),o(" 新员工入职培训 + 季度更新培训")])]),l("div",{class:"knowledge-item"},[l("div",{class:"knowledge-header"},[l("i",{class:"el-icon knowledge-icon"},"📚"),l("h5",null,"合规知识库")]),l("p",null,"维护集中化的合规要求和最佳实践:"),l("ul",null,[l("li",null,"法规解读和案例分析"),l("li",null,"合规检查表和自评工具"),l("li",null,"问题解决方案和最佳实践"),l("li",null,"行业动态和法规更新")]),l("p",null,[l("strong",null,"更新:"),o(" 每月审查和更新")])]),l("div",{class:"knowledge-item"},[l("div",{class:"knowledge-header"},[l("i",{class:"el-icon knowledge-icon"},"🔍"),l("h5",null,"合规咨询机制")]),l("p",null,"建立专业合规支持渠道:"),l("ul",null,[l("li",null,"合规专家咨询服务"),l("li",null,"定期合规问答会议"),l("li",null,"合规风险预警机制"),l("li",null,"跨部门合规沟通渠道")]),l("p",null,[l("strong",null,"响应时间:"),o(" 常规问题24小时，紧急问题4小时")])])],-1))])]),_:1})])])])}}}),N=C(E,[["__scopeId","data-v-e070ae8a"]]);export{N as default};
