import{d as y,r as m,o as _,c as g,a as D,b as l,e as t,w as s,f as a,i as e,j as h,_ as C}from"./index-Dk8T_2ac.js";const S={class:"doc-requirements"},w={class:"section"},I={class:"dark-content-box"},k={class:"section"},T={class:"section"},A={class:"dark-content-box"},j={class:"doc-templates"},q={class:"section"},E={class:"dark-content-box"},G={class:"tool-chain"},x={class:"section"},F={class:"dark-content-box"},B={class:"multilingual-support"},J=y({__name:"DocumentationRequirements",setup(L){const u=m(null),i=m(null),d=m(null),b=[{docType:"API文档",updateFrequency:"实时同步",retentionPeriod:"永久",accessPermission:"研发全员"},{docType:"设计原稿",updateFrequency:"版本冻结",retentionPeriod:"3年",accessPermission:"美术/策划"},{docType:"运营报表",updateFrequency:"每日生成",retentionPeriod:"1年",accessPermission:"管理层"},{docType:"需求文档",updateFrequency:"版本规划",retentionPeriod:"5年",accessPermission:"产品/研发"},{docType:"故障报告",updateFrequency:"事件触发",retentionPeriod:"2年",accessPermission:"运维/研发"},{docType:"安全审计",updateFrequency:"季度更新",retentionPeriod:"7年",accessPermission:"安全团队"}],f=[{docCategory:"开发者文档",languages:"英文(主要)、中文",updateStrategy:"英文先行，定期同步中文",toolSupport:"Crowdin, VSCode i18n插件"},{docCategory:"用户指南",languages:"中文、英文、日文、韩文",updateStrategy:"完整多语言同步更新",toolSupport:"本地化管理平台"},{docCategory:"运营报告",languages:"中文(主要)、英文",updateStrategy:"按需翻译关键内容",toolSupport:"自动翻译+人工校对"},{docCategory:"技术架构",languages:"英文",updateStrategy:"仅英文维护",toolSupport:"Markdown + PlantUML"}];return _(()=>{u.value&&g(u.value,`
      stateDiagram-v2
        [*] --> 草稿
        草稿 --> 审核中: 提交审核
        审核中 --> 草稿: 审核不通过
        审核中 --> 已发布: 审核通过
        已发布 --> 需更新: 发现问题/需求变更
        需更新 --> 草稿: 开始修订
        已发布 --> 归档: 版本过期
        归档 --> [*]
        
        state 已发布 {
          [*] --> 正常
          正常 --> 需注意: 部分内容过时
          需注意 --> 正常: 内容更新
          需注意 --> 严重过时: 长期未更新
          严重过时 --> [*]
        }
        
        note right of 草稿
          可多人协作编辑
          必须关联JIRA工单
        end note
        
        note right of 已发布
          必须通过自动化检查
          需完成版本号标记
        end note
    `),i.value&&g(i.value,`
      flowchart LR
        A["源代码"] --> B["代码注释"]
        B --> C["JSDoc/Typedoc"]
        
        D["API定义"] --> E["OpenAPI/Swagger"]
        
        F["Markdown文档"] --> G["静态站点生成"]
        
        C --> G
        E --> G
        
        G --> H["文档网站"]
        
        I["CI/CD"] --> J{"触发条件"}
        J -->|"代码提交"| K["自动构建文档"]
        J -->|"定时任务"| K
        K --> L["自动部署"]
        L --> H
    `),d.value&&g(d.value,`
      flowchart LR
        A["源文档变更"] --> B{"检测变更"}
        B --> C["提取待翻译内容"]
        C --> D["机器翻译初稿"]
        D --> E["专业翻译审核"]
        E --> F["技术人员审核"]
        F --> G["合并翻译内容"]
        G --> H["构建多语言文档"]
    `)}),(r,n)=>{const o=a("el-table-column"),v=a("el-table"),p=a("el-tab-pane"),P=a("el-tabs"),c=a("el-card");return h(),D("div",S,[n[22]||(n[22]=l("h2",null,"文档管理体系",-1)),l("div",w,[n[0]||(n[0]=l("h3",null,"2.1 文档分类标准",-1)),n[1]||(n[1]=l("h4",null,"2.1.1 核心文档清单",-1)),l("div",I,[t(v,{data:b,border:"",style:{width:"100%"}},{default:s(()=>[t(o,{prop:"docType",label:"文档类型",width:"150"}),t(o,{prop:"updateFrequency",label:"更新频率",width:"120"}),t(o,{prop:"retentionPeriod",label:"保存期限",width:"120"}),t(o,{prop:"accessPermission",label:"访问权限"})]),_:1})])]),l("div",k,[n[2]||(n[2]=l("h3",null,"2.2 文档状态机",-1)),l("div",{ref_key:"docStatusDiagram",ref:u,class:"diagram-container"},null,512)]),l("div",T,[n[7]||(n[7]=l("h3",null,"文档模板库",-1)),l("div",A,[t(c,null,{default:s(()=>[l("div",j,[n[6]||(n[6]=l("h4",null,"标准模板类型",-1)),t(P,{type:"border-card"},{default:s(()=>[t(p,{label:"设计文档"},{default:s(()=>n[3]||(n[3]=[l("div",{class:"tab-content"},[l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"游戏系统设计文档"),l("span",{class:"template-tag"},"GDD")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 详细描述游戏系统、玩法机制和功能设计")]),l("p",null,[l("strong",null,"必填章节:")]),l("ol",null,[l("li",null,"系统概述与目标"),l("li",null,"功能详细说明"),l("li",null,"UI/UX流程"),l("li",null,"玩家交互设计"),l("li",null,"数值平衡设计"),l("li",null,"技术实现约束"),l("li",null,"测试标准")]),l("p",null,[l("strong",null,"格式要求:"),e(" Markdown + 图表 + 原型图")])])]),l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"技术架构设计文档"),l("span",{class:"template-tag"},"TDD")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 描述系统技术架构、组件关系和实现方案")]),l("p",null,[l("strong",null,"必填章节:")]),l("ol",null,[l("li",null,"架构概述"),l("li",null,"系统组件设计"),l("li",null,"数据模型"),l("li",null,"接口设计"),l("li",null,"扩展性考虑"),l("li",null,"性能与安全设计"),l("li",null,"部署拓扑")]),l("p",null,[l("strong",null,"格式要求:"),e(" Markdown + UML图 + 序列图")])])])],-1)])),_:1,__:[3]}),t(p,{label:"API文档"},{default:s(()=>n[4]||(n[4]=[l("div",{class:"tab-content"},[l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"RESTful API文档"),l("span",{class:"template-tag"},"API")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 描述HTTP API接口规范和使用方法")]),l("p",null,[l("strong",null,"自动生成工具:"),e(" Swagger / OpenAPI")]),l("p",null,[l("strong",null,"必填内容:")]),l("ul",null,[l("li",null,"接口URL与HTTP方法"),l("li",null,"请求参数与格式"),l("li",null,"响应状态与数据结构"),l("li",null,"错误码与描述"),l("li",null,"鉴权要求"),l("li",null,"限流策略"),l("li",null,"使用示例")])])]),l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"SDK集成文档"),l("span",{class:"template-tag"},"SDK")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 指导第三方开发者使用系统SDK")]),l("p",null,[l("strong",null,"自动生成工具:"),e(" JSDoc / Doxygen")]),l("p",null,[l("strong",null,"必填内容:")]),l("ul",null,[l("li",null,"安装与配置指南"),l("li",null,"API参考"),l("li",null,"常见用例"),l("li",null,"错误处理"),l("li",null,"性能优化建议"),l("li",null,"安全最佳实践"),l("li",null,"版本兼容性说明")])])])],-1)])),_:1,__:[4]}),t(p,{label:"运营文档"},{default:s(()=>n[5]||(n[5]=[l("div",{class:"tab-content"},[l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"运营数据报表"),l("span",{class:"template-tag"},"OPS")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 游戏运营数据统计与分析")]),l("p",null,[l("strong",null,"生成周期:"),e(" 每日/每周/每月")]),l("p",null,[l("strong",null,"必填指标:")]),l("ul",null,[l("li",null,"新增用户数据"),l("li",null,"留存与流失"),l("li",null,"付费转化"),l("li",null,"道具消耗"),l("li",null,"玩家行为分析"),l("li",null,"匹配与游戏时长"),l("li",null,"异常行为监控")])])]),l("div",{class:"template-card"},[l("div",{class:"template-header"},[l("h5",null,"活动策划方案"),l("span",{class:"template-tag"},"EVENT")]),l("div",{class:"template-content"},[l("p",null,[l("strong",null,"用途:"),e(" 规划游戏活动内容与实施方案")]),l("p",null,[l("strong",null,"必填内容:")]),l("ul",null,[l("li",null,"活动目标与KPI"),l("li",null,"活动机制设计"),l("li",null,"奖励设置与平衡"),l("li",null,"时间规划与里程碑"),l("li",null,"技术实现需求"),l("li",null,"风险评估"),l("li",null,"数据跟踪计划")])])])],-1)])),_:1,__:[5]})]),_:1})])]),_:1})])]),l("div",q,[n[13]||(n[13]=l("h3",null,"自动生成工具链",-1)),l("div",E,[t(c,null,{default:s(()=>[l("div",G,[n[8]||(n[8]=l("h4",null,"文档自动化工具集成",-1)),l("div",{ref_key:"toolChainDiagram",ref:i,class:"mini-diagram"},null,512),n[9]||(n[9]=l("h4",{class:"mt-20"},"文档生成流程",-1)),n[10]||(n[10]=l("ul",{class:"process-list"},[l("li",null,[l("div",{class:"process-step"},[l("div",{class:"step-number"},"1"),l("div",{class:"step-content"},[l("h5",null,"代码文档生成"),l("p",null,"从代码注释和类型定义自动生成API参考文档"),l("p",null,[l("strong",null,"工具:"),e(" JSDoc/Typedoc (前端), Swagger (后端)")])])])]),l("li",null,[l("div",{class:"process-step"},[l("div",{class:"step-number"},"2"),l("div",{class:"step-content"},[l("h5",null,"接口测试文档"),l("p",null,"基于测试用例自动生成接口使用示例和测试报告"),l("p",null,[l("strong",null,"工具:"),e(" Postman, Jest-Documentation")])])])]),l("li",null,[l("div",{class:"process-step"},[l("div",{class:"step-number"},"3"),l("div",{class:"step-content"},[l("h5",null,"静态网站构建"),l("p",null,"将各种格式文档整合为统一的静态文档网站"),l("p",null,[l("strong",null,"工具:"),e(" VuePress, Docusaurus")])])])]),l("li",null,[l("div",{class:"process-step"},[l("div",{class:"step-number"},"4"),l("div",{class:"step-content"},[l("h5",null,"版本归档"),l("p",null,"自动对文档进行版本控制和归档"),l("p",null,[l("strong",null,"工具:"),e(" Git, Document Version Manager")])])])])],-1)),n[11]||(n[11]=l("h4",{class:"mt-20"},"文档CI/CD流水线",-1)),n[12]||(n[12]=l("pre",{class:"code-block"},`# .github/workflows/docs.yml
name: Documentation Pipeline

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'docs/**'
      - 'src/**/*.ts'
      - 'src/**/*.js'
      - 'src/**/*.vue'
  pull_request:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate API docs
        run: npm run docs:api
      
      - name: Build static site
        run: npm run docs:build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        if: github.ref == 'refs/heads/main'
        with:
          github_token: "GITHUB_TOKEN_PLACEHOLDER"
          publish_dir: ./docs/dist
            `,-1))])]),_:1})])]),l("div",x,[n[21]||(n[21]=l("h3",null,"多语言支持方案",-1)),l("div",F,[t(c,null,{default:s(()=>[l("div",B,[n[14]||(n[14]=l("h4",null,"文档国际化策略",-1)),t(v,{data:f,border:"",style:{width:"100%"}},{default:s(()=>[t(o,{prop:"docCategory",label:"文档类别",width:"150"}),t(o,{prop:"languages",label:"支持语言",width:"180"}),t(o,{prop:"updateStrategy",label:"更新策略",width:"150"}),t(o,{prop:"toolSupport",label:"工具支持"})]),_:1}),n[15]||(n[15]=l("h4",{class:"mt-20"},"翻译工作流程",-1)),l("div",{ref_key:"translationWorkflow",ref:d,class:"mini-diagram"},null,512),n[16]||(n[16]=l("h4",{class:"mt-20"},"多语言资源管理",-1)),n[17]||(n[17]=l("p",null,"采用基于键值对的国际化资源文件系统，支持模块化管理：",-1)),n[18]||(n[18]=l("pre",{class:"code-block"},`// 资源文件结构
docs/
  ├── i18n/
  │   ├── zh-CN/
  │   │   ├── common.json
  │   │   ├── api.json
  │   │   └── ui.json
  │   ├── en-US/
  │   │   ├── common.json
  │   │   ├── api.json
  │   │   └── ui.json
  │   └── ja-JP/
  │       ├── common.json
  │       ├── api.json
  │       └── ui.json
  ├── templates/
  │   ├── api-docs.md
  │   └── user-guide.md
  └── config.js
            `,-1)),n[19]||(n[19]=l("h4",{class:"mt-20"},"翻译质量保证",-1)),n[20]||(n[20]=l("ul",null,[l("li",null,[l("strong",null,"术语库维护"),l("p",null,"建立项目特定术语库，确保专业术语翻译一致性")]),l("li",null,[l("strong",null,"机器翻译+人工审核"),l("p",null,"使用AI辅助翻译初稿，专业翻译人员审核修正")]),l("li",null,[l("strong",null,"上下文提示"),l("p",null,"为翻译者提供界面截图和功能说明，确保翻译符合实际场景")]),l("li",null,[l("strong",null,"变更检测"),l("p",null,"自动检测源文档变更，标记需要更新的翻译内容")])],-1))])]),_:1})])])])}}}),K=C(J,[["__scopeId","data-v-96eecdb0"]]);export{K as default};
