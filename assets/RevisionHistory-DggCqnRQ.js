import{d as R,r as b,o as V,c as w,a as l,b as e,e as n,w as r,f as m,i as p,k as i,F as k,m as C,j as d,n as M,p as q,_ as E}from"./index-D9XT-uxJ.js";const H={class:"revision-history"},F={class:"section"},N={class:"dark-content-box"},I={class:"section"},L={class:"subsection"},j={class:"dark-content-box"},J={class:"subsection"},U={class:"subsection"},K={class:"dark-content-box"},W={class:"section"},A={class:"dark-content-box"},O={class:"tracking-workflow-container"},Q={class:"section"},Z={class:"section"},$={class:"dark-content-box"},z={class:"change-header"},Y={class:"version-tag"},ee={class:"change-date"},te={class:"change-content"},ne={key:0,class:"change-details"},se={key:1,class:"change-impact"},oe=R({__name:"RevisionHistory",setup(re){const h=b(null),v=b(null),g=b(null),X=[{version:"v1.0.0",date:"2025-07-08",author:"系统架构组",description:"初始版本发布，包含系统基础架构和模块划分",status:"已发布"},{version:"v1.1.0",date:"2025-07-09",author:"产品管理组",description:"添加非功能性需求章节，包括性能、可用性和扩展性要求",status:"已发布"},{version:"v1.2.0",date:"2025-07-10",author:"管理规范组",description:"添加管理规范章节，包括版本管理、文档要求、变更控制流程和合规审计",status:"已发布"},{version:"v1.3.0",date:"2025-07-11",author:"系统架构组",description:"添加附录章节，包括FPS游戏专项术语表和修订记录",status:"当前版本"},{version:"v1.4.0",date:"2025-07-20",author:"安全团队",description:"计划增加安全框架详细设计和审计机制",status:"计划中"}],T=[{version:"v1.2.0",changeType:"功能新增",affectedModule:"武器系统",modifier:"张XX",reviewer:"王XX"},{version:"v1.1.3",changeType:"BUG修复",affectedModule:"匹配逻辑",modifier:"李XX",reviewer:"周XX"},{version:"v1.2.1",changeType:"性能优化",affectedModule:"战斗引擎",modifier:"刘XX",reviewer:"陈XX"},{version:"v1.1.5",changeType:"安全更新",affectedModule:"登录系统",modifier:"黄XX",reviewer:"马XX"},{version:"v1.3.0",changeType:"架构调整",affectedModule:"全局服务",modifier:"杨XX",reviewer:"林XX"}],S=[{dimension:"按作者",retentionPeriod:"永久",queryMethod:"Git历史",relatedSystem:"GitHub"},{dimension:"按时间",retentionPeriod:"5年",queryMethod:"文档数据库",relatedSystem:"Confluence"},{dimension:"按关键词",retentionPeriod:"实时",queryMethod:"全文检索",relatedSystem:"Elasticsearch"},{dimension:"按模块",retentionPeriod:"3年",queryMethod:"元数据检索",relatedSystem:"Jira + Confluence"},{dimension:"按版本",retentionPeriod:"永久",queryMethod:"版本控制",relatedSystem:"GitLab + Semantic Versioning"}],x=[{title:"系统架构重构",version:"1.2.0",date:"2025-07-10",description:"对系统架构进行重构，采用微服务架构替代原单体架构，以提升系统的扩展性和维护性。",details:["拆分为7个核心微服务","引入服务网格(Service Mesh)管理服务间通信","重构数据访问层，采用CQRS模式","引入事件驱动架构处理系统内异步通信"],impact:["架构","部署","性能"]},{title:"文档标准化",version:"1.3.0",date:"2025-07-11",description:"标准化所有技术文档格式和管理流程，建立统一的文档生命周期管理规范。",details:["制定文档分类标准","建立文档状态管理流程","开发自动化文档生成工具链","实现多语言文档支持"],impact:["流程","标准化"]}],G=a=>{switch(a){case"已发布":return"success";case"当前版本":return"primary";case"计划中":return"info";default:return""}},B=a=>{switch(a){case"功能新增":return"success";case"BUG修复":return"warning";case"性能优化":return"info";case"安全更新":return"danger";case"架构调整":return"primary";default:return""}},D=a=>{switch(a){case"架构":return"danger";case"性能":return"warning";case"部署":return"info";case"流程":return"success";case"标准化":return"";default:return""}};return V(()=>{h.value&&w(h.value,`
      gitGraph
        commit id: "v0.9.0" tag: "初始原型"
        commit id: "v1.0.0" tag: "基础架构"
        branch 性能优化
        checkout 性能优化
        commit id: "优化引擎"
        commit id: "网络优化"
        checkout main
        merge 性能优化 tag: "v1.1.0"
        branch 管理规范
        checkout 管理规范
        commit id: "版本管理"
        commit id: "文档规范"
        commit id: "变更控制"
        checkout main
        merge 管理规范 tag: "v1.2.0"
        branch 附录
        checkout 附录
        commit id: "术语表"
        commit id: "修订记录"
        checkout main
        merge 附录 tag: "v1.3.0"
        commit id: "当前版本"
    `),v.value&&w(v.value,`
      pie title 变更类型分布 (2025年第二季度)
        "功能新增" : 42
        "BUG修复" : 28
        "性能优化" : 15
        "安全更新" : 10
        "架构调整" : 5
    `),g.value&&w(g.value,`
      flowchart TD
        A["文档变更触发"] --> B{"是否需要追溯?"}
        B -->|是| C["确定追溯维度"]
        B -->|否| Z["结束流程"]
        
        C --> D["选择追溯系统"]
        D --> E{"按作者追溯"}
        D --> F{"按时间追溯"}
        D --> G{"按关键词追溯"}
        D --> H{"按模块追溯"}
        
        E --> I["Git历史查询"]
        F --> J["文档数据库查询"]
        G --> K["Elasticsearch检索"]
        H --> L["元数据检索"]
        
        I --> M["生成追溯报告"]
        J --> M
        K --> M
        L --> M
        
        M --> N["版本对比分析"]
        N --> O["确认文档演进路径"]
    `)}),(a,t)=>{const s=m("el-table-column"),f=m("el-tag"),_=m("el-table"),c=m("el-card");return d(),l("div",H,[t[13]||(t[13]=e("h2",null,"修订记录",-1)),e("div",F,[t[0]||(t[0]=e("h3",null,"文档修订历史",-1)),e("div",N,[n(c,null,{default:r(()=>[n(_,{data:X,border:"",style:{width:"100%"}},{default:r(()=>[n(s,{prop:"version",label:"版本号",width:"100"}),n(s,{prop:"date",label:"日期",width:"120"}),n(s,{prop:"author",label:"修订人",width:"120"}),n(s,{prop:"description",label:"修订内容"}),n(s,{prop:"status",label:"状态",width:"100"},{default:r(o=>[n(f,{type:G(o.row.status)},{default:r(()=>[p(i(o.row.status),1)]),_:2},1032,["type"])]),_:1})]),_:1})]),_:1})])]),e("div",I,[t[5]||(t[5]=e("h3",null,"2.1 版本变更说明",-1)),e("div",L,[t[1]||(t[1]=e("h4",null,"2.1.1 记录模板",-1)),e("div",j,[n(c,null,{default:r(()=>[n(_,{data:T,border:"",style:{width:"100%"}},{default:r(()=>[n(s,{prop:"version",label:"版本号",width:"100"}),n(s,{prop:"changeType",label:"变更类型",width:"120"},{default:r(o=>[n(f,{type:B(o.row.changeType)},{default:r(()=>[p(i(o.row.changeType),1)]),_:2},1032,["type"])]),_:1}),n(s,{prop:"affectedModule",label:"影响模块",width:"150"}),n(s,{prop:"modifier",label:"修改人",width:"100"}),n(s,{prop:"reviewer",label:"审核人",width:"100"})]),_:1})]),_:1})])]),e("div",J,[t[2]||(t[2]=e("h4",null,"2.1.2 变更类型分布",-1)),e("div",{ref_key:"changeTypeChart",ref:v,class:"diagram-container"},null,512)]),e("div",U,[t[4]||(t[4]=e("h4",null,"2.1.3 变更记录代码示例",-1)),e("div",K,[n(c,null,{default:r(()=>t[3]||(t[3]=[e("pre",{class:"code-block"},`// 版本变更记录对象结构
interface VersionChange {
  version: string;
  changeType: 'feature' | 'bugfix' | 'improvement' | 'refactor';
  affectedModule: string;
  modifier: string;
  reviewer: string;
  date: Date;
  details: string;
  commitHash: string;
}

// 记录新版本变更
function recordVersionChange(change: VersionChange): Promise<boolean> {
  // 1. 验证变更记录完整性
  validateChangeRecord(change);
  
  // 2. 将变更写入版本数据库
  return database.versionChanges.insert(change)
    .then(result => {
      // 3. 触发通知钩子
      notifyStakeholders(change);
      
      // 4. 更新关联文档
      updateRelatedDocuments(change);
      
      return result.success;
    })
    .catch(error => {
      logger.error(\`Failed to record version change: \${error.message}\`);
      return false;
    });
}
            `,-1)])),_:1,__:[3]})])])]),e("div",W,[t[8]||(t[8]=e("h3",null,"2.2 文档追溯机制",-1)),e("div",A,[n(c,null,{default:r(()=>[n(_,{data:S,border:"",style:{width:"100%"}},{default:r(()=>[n(s,{prop:"dimension",label:"追溯维度",width:"150"}),n(s,{prop:"retentionPeriod",label:"保留期限",width:"120"}),n(s,{prop:"queryMethod",label:"查询方式",width:"150"}),n(s,{prop:"relatedSystem",label:"关联系统"})]),_:1}),e("div",O,[t[6]||(t[6]=e("h4",{class:"mt-20"},"文档追溯工作流",-1)),e("div",{ref_key:"trackingWorkflow",ref:g,class:"mini-diagram"},null,512)]),t[7]||(t[7]=e("div",{class:"tracking-examples mt-20"},[e("h4",null,"文档追溯命令示例"),e("div",{class:"command-examples"},[e("div",{class:"command-group"},[e("h5",null,"Git历史追溯"),e("pre",{class:"code-block"},`# 按作者查询文档历史
git log --author="王工程师" --name-only --pretty=format:"%h %ad %s" --date=short docs/

# 按时间范围查询文档变更
git log --since="2025-01-01" --until="2025-07-01" --name-only --pretty=format:"%h %ad %s" --date=short docs/specifications/

# 按关键词查询提交历史
git log -S "性能优化" --name-only --pretty=format:"%h %ad %s" --date=short
                `)]),e("div",{class:"command-group"},[e("h5",null,"Elasticsearch全文检索"),e("pre",{class:"code-block"},`// 复合条件查询
GET /documents/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "content": "网络延迟" }},
        { "range": { "updated_at": { "gte": "2025-01-01" }}},
        { "term": { "module": "战斗系统" }}
      ]
    }
  },
  "sort": [
    { "updated_at": { "order": "desc" }}
  ],
  "_source": ["title", "version", "author", "updated_at", "content_summary"]
}
                `)])])],-1))]),_:1,__:[7]})])]),e("div",Q,[t[9]||(t[9]=e("h3",null,"版本演进路线图",-1)),e("div",{ref_key:"versionRoadmap",ref:h,class:"diagram-container"},null,512)]),e("div",Z,[t[12]||(t[12]=e("h3",null,"重大变更说明",-1)),e("div",$,[n(c,null,{default:r(()=>[(d(),l(k,null,C(x,(o,P)=>e("div",{key:P,class:"major-change"},[e("div",z,[e("h4",null,[p(i(o.title)+" ",1),e("span",Y,"v"+i(o.version),1)]),e("span",ee,i(o.date),1)]),e("div",te,[e("p",null,i(o.description),1),o.details?(d(),l("div",ne,[t[10]||(t[10]=e("h5",null,"详细变更",-1)),e("ul",null,[(d(!0),l(k,null,C(o.details,(u,y)=>(d(),l("li",{key:y},i(u),1))),128))])])):M("",!0),o.impact?(d(),l("div",se,[t[11]||(t[11]=e("h5",null,"影响范围",-1)),(d(!0),l(k,null,C(o.impact,(u,y)=>(d(),q(f,{key:y,type:D(u),effect:"dark",class:"impact-tag"},{default:r(()=>[p(i(u),1)]),_:2},1032,["type"]))),128))])):M("",!0)])])),64))]),_:1})])])])}}}),ie=E(oe,[["__scopeId","data-v-7ba56d34"]]);export{ie as default};
