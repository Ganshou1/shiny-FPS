import{d as h,r as c,o as f,c as _,a as C,b as e,e as l,w as s,f as o,i as n,j as w,_ as T}from"./index-D9XT-uxJ.js";const S={class:"performance-spec"},D={class:"section"},G={class:"dark-content-box"},k={class:"section"},B={class:"section"},M={class:"dark-content-box"},x={class:"section"},N={class:"section"},V={class:"dark-content-box"},$={class:"section"},H={class:"dark-content-box"},L={class:"hardware-matrix"},R=h({__name:"PerformanceSpec",setup(z){const a=c(null),i=c(null),v=[{metricName:"客户端帧同步延迟",standardValue:"≤50ms",threshold:">100ms告警",measureMethod:"时间戳差值统计"},{metricName:"服务器Tick率",standardValue:"128Hz",threshold:"最低64Hz",measureMethod:"引擎内置计数器"},{metricName:"命中判定误差",standardValue:"≤0.5ms",threshold:">2ms丢弃",measureMethod:"客户端-服务器比对"},{metricName:"输入响应延迟",standardValue:"≤16ms",threshold:">30ms告警",measureMethod:"输入到渲染时间差"},{metricName:"状态同步频率",standardValue:"20Hz",threshold:"最低10Hz",measureMethod:"网络包监控"}],g=[{scenarioType:"竞技模式",playerCapacity:"10v10",cpuLimit:"60%",memoryLimit:"16GB"},{scenarioType:"休闲模式",playerCapacity:"16v16",cpuLimit:"75%",memoryLimit:"24GB"},{scenarioType:"观战模式",playerCapacity:"50观众",cpuLimit:"30%",memoryLimit:"8GB"},{scenarioType:"大型战役",playerCapacity:"32v32",cpuLimit:"85%",memoryLimit:"32GB"}],y=[{serverType:"战斗服务器",cpu:"32核 3.4GHz",memory:"64GB DDR4",network:"10Gbps 冗余",storage:"NVMe SSD 500GB"},{serverType:"匹配服务器",cpu:"16核 2.8GHz",memory:"32GB DDR4",network:"5Gbps",storage:"SSD 250GB"},{serverType:"数据处理节点",cpu:"64核 2.6GHz",memory:"128GB DDR4",network:"25Gbps",storage:"NVMe RAID 2TB"},{serverType:"内容分发节点",cpu:"8核 2.4GHz",memory:"16GB DDR4",network:"40Gbps",storage:"SSD 1TB"}];return f(()=>{a.value&&_(a.value,`
      flowchart TD
        A[客户端输入] --> B[网络传输]
        B --> C{延迟检测}
        C -->|≤50ms| D[正常处理]
        C -->|>50ms| E[预测补偿]
        D --> F[状态更新]
        E --> G[本地预测]
        G --> H[状态校验]
        H --> I{偏差检测}
        I -->|可接受范围内| F
        I -->|超出容忍度| J[强制同步]
        J --> F
        
        subgraph 客户端
        A
        G
        end
        
        subgraph 服务器
        D
        F
        J
        end
    `),i.value&&_(i.value,`
      sequenceDiagram
        participant Client as 客户端
        participant Server as 服务器
        
        Client->>+Server: 输入指令(t0)
        Server->>Server: 处理指令(t0+n)
        Server-->>-Client: 状态更新(t0+n+m)
        Client->>Client: 本地渲染(t0+n+m+p)
        
        note over Client,Server: 理想情况: n+m+p < 50ms
        
        Client->>+Server: 新输入指令(t1)
        
        alt 网络正常
          Server->>Server: 处理指令(t1+n)
          Server-->>-Client: 状态更新(t1+n+m)
        else 网络延迟
          Client->>Client: 本地预测(t1+k)
          Server->>Server: 处理指令(t1+n')
          Server-->>Client: 延迟状态更新(t1+n'+m')
          Client->>Client: 状态校正(平滑过渡)
        end
    `)}),(p,t)=>{const r=o("el-table-column"),d=o("el-table"),u=o("el-tab-pane"),b=o("el-tabs"),m=o("el-card");return w(),C("div",S,[t[15]||(t[15]=e("h2",null,"性能指标",-1)),e("div",D,[t[0]||(t[0]=e("h3",null,"1.1 核心性能参数",-1)),t[1]||(t[1]=e("h4",null,"1.1.1 实时性指标",-1)),e("div",G,[l(d,{data:v,border:"",style:{width:"100%"}},{default:s(()=>[l(r,{prop:"metricName",label:"指标名称",width:"180"}),l(r,{prop:"standardValue",label:"标准值",width:"150"}),l(r,{prop:"threshold",label:"极限阈值",width:"150"}),l(r,{prop:"measureMethod",label:"测量方式"})]),_:1})])]),e("div",k,[t[2]||(t[2]=e("h3",null,"延迟处理流程图",-1)),e("div",{ref_key:"latencyFlowchart",ref:a,class:"diagram-container"},null,512)]),e("div",B,[t[3]||(t[3]=e("h3",null,"1.2 负载指标",-1)),e("div",M,[l(d,{data:g,border:"",style:{width:"100%"}},{default:s(()=>[l(r,{prop:"scenarioType",label:"场景类型",width:"150"}),l(r,{prop:"playerCapacity",label:"单服玩家容量",width:"150"}),l(r,{prop:"cpuLimit",label:"CPU占用上限",width:"150"}),l(r,{prop:"memoryLimit",label:"内存消耗限制"})]),_:1})])]),e("div",x,[t[4]||(t[4]=e("h3",null,"帧同步时序图",-1)),e("div",{ref_key:"frameSyncDiagram",ref:i,class:"diagram-container"},null,512)]),e("div",N,[t[8]||(t[8]=e("h3",null,"网络抖动处理算法",-1)),e("div",V,[l(m,null,{default:s(()=>[l(b,{type:"border-card"},{default:s(()=>[l(u,{label:"延迟预测"},{default:s(()=>t[5]||(t[5]=[e("div",{class:"tab-content"},[e("h4",null,"RTT预测算法"),e("p",null,"使用加权移动平均法对RTT进行预测："),e("pre",{class:"code-block"},`predicted_rtt = (1 - α) * previous_predicted_rtt + α * measured_rtt
rtt_variance = (1 - β) * previous_rtt_variance + β * |measured_rtt - predicted_rtt|
timeout = predicted_rtt + 4 * rtt_variance

其中：α = 0.125, β = 0.25
                `),e("p",null,"当实际RTT超过timeout阈值时，进入网络延迟补偿模式。"),e("h4",{class:"mt-20"},"网络延迟分级处理"),e("ul",null,[e("li",null,[e("strong",null,"优良网络(RTT < 50ms):"),n(" 正常处理，无需特殊补偿")]),e("li",null,[e("strong",null,"轻度延迟(50ms - 100ms):"),n(" 客户端预测补偿，状态过渡平滑处理")]),e("li",null,[e("strong",null,"中度延迟(100ms - 200ms):"),n(" 启用时间补偿，服务器增加状态容忍度")]),e("li",null,[e("strong",null,"严重延迟(> 200ms):"),n(" 触发延迟告警，客户端显示网络状态提示，采用更激进的预测模型")])])],-1)])),_:1,__:[5]}),l(u,{label:"丢包处理"},{default:s(()=>t[6]||(t[6]=[e("div",{class:"tab-content"},[e("h4",null,"可靠UDP实现"),e("p",null,"为战斗关键数据实现自定义可靠UDP协议："),e("ul",null,[e("li",null,[e("strong",null,"序列号机制:"),n(" 每个数据包分配唯一递增序列号")]),e("li",null,[e("strong",null,"选择性重传:"),n(" 仅重传丢失的数据包，而非整个窗口")]),e("li",null,[e("strong",null,"冗余发送:"),n(" 关键操作数据（如开火、技能释放）进行2次发送")]),e("li",null,[e("strong",null,"优先级队列:"),n(" 按数据重要性划分传输优先级")])]),e("h4",{class:"mt-20"},"丢包率处理策略"),e("ul",null,[e("li",null,[e("strong",null,"轻微丢包(< 1%):"),n(" 正常重传机制")]),e("li",null,[e("strong",null,"中度丢包(1% - 5%):"),n(" 增加冗余包，提高关键数据重传优先级")]),e("li",null,[e("strong",null,"严重丢包(> 5%):"),n(" 降低非关键数据更新频率，只传输最关键状态")]),e("li",null,[e("strong",null,"极端丢包(> 15%):"),n(" 触发连接质量警告，可能导致游戏暂停")])])],-1)])),_:1,__:[6]}),l(u,{label:"预测补偿"},{default:s(()=>t[7]||(t[7]=[e("div",{class:"tab-content"},[e("h4",null,"客户端预测模型"),e("p",null,"客户端实现状态预测模型，在服务器确认前预测游戏状态："),e("ul",null,[e("li",null,[e("strong",null,"移动预测:"),n(" 基于物理引擎预测角色位置，收到服务器确认后平滑修正")]),e("li",null,[e("strong",null,"动作预测:"),n(" 本地立即执行动作，同时发送至服务器验证")]),e("li",null,[e("strong",null,"命中判定:"),n(" 本地先做初步判定，服务器返回最终结果后调整")])]),e("h4",{class:"mt-20"},"回滚与状态修正"),e("p",null,"当服务器状态与客户端预测不符时，使用状态回滚与修正："),e("pre",{class:"code-block"},`if (|server_state - client_predicted_state| > tolerance) {
    // 计算平滑修正插值
    correction_weight = min(1.0, delta_time * correction_speed);
    
    // 平滑过渡到正确状态
    current_state = lerp(client_predicted_state, server_state, correction_weight);
    
    // 更新预测模型参数
    update_prediction_model(server_state, client_predicted_state);
}
                `),e("p",null,"修正速度根据偏差大小动态调整，确保玩家体验平滑。")],-1)])),_:1,__:[7]})]),_:1})]),_:1})])]),e("div",$,[t[14]||(t[14]=e("h3",null,"硬件资源配置矩阵",-1)),e("div",H,[l(m,null,{default:s(()=>[e("div",L,[l(d,{data:y,border:"",style:{width:"100%"}},{default:s(()=>[l(r,{prop:"serverType",label:"服务器类型",width:"180"}),l(r,{prop:"cpu",label:"CPU规格",width:"180"}),l(r,{prop:"memory",label:"内存配置",width:"150"}),l(r,{prop:"network",label:"网络要求",width:"150"}),l(r,{prop:"storage",label:"存储配置"})]),_:1}),t[9]||(t[9]=e("h4",{class:"mt-20"},"资源监控指标",-1)),t[10]||(t[10]=e("ul",null,[e("li",null,[e("strong",null,"CPU使用率告警阈值:"),n(" 70% (持续5分钟)")]),e("li",null,[e("strong",null,"内存使用告警阈值:"),n(" 85% (持续3分钟)")]),e("li",null,[e("strong",null,"磁盘I/O饱和度:"),n(" 80% (持续10分钟)")]),e("li",null,[e("strong",null,"网络带宽利用率:"),n(" 75% (持续5分钟)")])],-1)),t[11]||(t[11]=e("h4",{class:"mt-20"},"监控指标采集",-1)),t[12]||(t[12]=e("p",null,"所有性能指标通过Prometheus采集，关键指标定义：",-1)),t[13]||(t[13]=e("pre",{class:"code-block"},`# 服务器帧率监控
fps_server_frame_rate{server_id="$server_id",region="$region"} 

# 客户端延迟分布
fps_client_latency_ms{percentile="50",region="$region"}
fps_client_latency_ms{percentile="95",region="$region"}
fps_client_latency_ms{percentile="99",region="$region"}

# 命中判定误差
fps_hit_detection_error_ms{weapon_type="$type",region="$region"}

# 资源使用率
fps_server_cpu_usage_percent{server_id="$server_id",region="$region"}
fps_server_memory_usage_bytes{server_id="$server_id",region="$region"}
            `,-1))])]),_:1})])])])}}}),F=T(R,[["__scopeId","data-v-a0aa011a"]]);export{F as default};
