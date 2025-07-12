<template>
  <div class="user-management-module">
    <h2>用户管理模块（FPS专项）</h2>
    
    <div class="section">
      <h3>1.1 竞技身份认证</h3>
      <el-table :data="authParams" border style="width: 100%">
        <el-table-column prop="param" label="参数项" width="180"></el-table-column>
        <el-table-column prop="value" label="标准值" width="180"></el-table-column>
        <el-table-column prop="requirement" label="特殊要求"></el-table-column>
      </el-table>
    </div>
    
    <div class="section">
      <h3>用户状态流转图</h3>
      <div ref="diagramContainer" class="diagram-container"></div>
    </div>
    
    <div class="section">
      <h3>用户状态管理</h3>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>用户列表</span>
            <div class="search-bar">
              <el-input 
                v-model="searchQuery" 
                placeholder="搜索用户" 
                clearable
                @input="filterUsers"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
              <el-select v-model="statusFilter" placeholder="状态筛选" @change="filterUsers">
                <el-option label="全部状态" value=""></el-option>
                <el-option label="游客" value="游客"></el-option>
                <el-option label="注册用户" value="注册用户"></el-option>
                <el-option label="认证玩家" value="认证玩家"></el-option>
                <el-option label="失信玩家" value="失信玩家"></el-option>
                <el-option label="封禁名单" value="封禁名单"></el-option>
              </el-select>
            </div>
          </div>
        </template>
        <el-table :data="filteredUsers" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="username" label="用户名" width="120"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="getUserStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="rank" label="段位" width="100"></el-table-column>
          <el-table-column prop="honorLevel" label="荣誉等级" width="100">
            <template #default="scope">
              <div class="honor-stars">
                <el-icon v-for="i in scope.row.honorLevel" :key="i" color="#F7BA2A"><Star /></el-icon>
                <el-icon v-for="i in 5-scope.row.honorLevel" :key="`empty-${i}`" color="#C0C4CC"><Star /></el-icon>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="verificationTime" label="最近验证" width="180"></el-table-column>
          <el-table-column prop="reports" label="举报次数" width="100"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="viewUser(scope.row)">查看</el-button>
              <el-button 
                size="small" 
                type="warning" 
                @click="verifyUser(scope.row)"
                :disabled="scope.row.status === '游客' || scope.row.status === '封禁名单'"
              >验证</el-button>
              <el-button 
                size="small" 
                type="danger" 
                @click="openBanDialog(scope.row)"
                :disabled="scope.row.status === '封禁名单'"
              >封禁</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalUsers"
            :page-size="pageSize"
            :current-page="currentPage"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-card>
    </div>
    
    <el-dialog v-model="banDialogVisible" title="封禁用户" width="30%">
      <el-form :model="banForm" label-width="120px">
        <el-form-item label="用户名">
          <span>{{ selectedUser?.username }}</span>
        </el-form-item>
        <el-form-item label="封禁原因">
          <el-select v-model="banForm.reason" placeholder="选择封禁原因">
            <el-option label="作弊行为" value="cheating"></el-option>
            <el-option label="恶意骚扰" value="harassment"></el-option>
            <el-option label="违规言论" value="hate_speech"></el-option>
            <el-option label="多次举报" value="reports"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封禁期限">
          <el-select v-model="banForm.duration" placeholder="选择封禁期限">
            <el-option label="24小时" value="24h"></el-option>
            <el-option label="3天" value="3d"></el-option>
            <el-option label="7天" value="7d"></el-option>
            <el-option label="30天" value="30d"></el-option>
            <el-option label="永久" value="permanent"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封禁级别">
          <el-radio-group v-model="banForm.level">
            <el-radio label="account">账号级</el-radio>
            <el-radio label="hardware">硬件级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封禁关联小号" v-if="banForm.level === 'hardware'">
          <el-switch v-model="banForm.banAlts" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="banForm.note" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="banDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="confirmBan">确认封禁</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Search, Star } from '@element-plus/icons-vue';
import { createDiagram } from '@/utils/diagramUtil';
import { ElMessage } from 'element-plus';

const diagramContainer = ref<HTMLElement | null>(null);

// 竞技身份认证参数
const authParams = [
  {
    param: '段位验证频率',
    value: '每24小时',
    requirement: '人脸识别+设备指纹'
  },
  {
    param: '作弊封禁关联',
    value: '硬件级',
    requirement: '同步封禁小号'
  },
  {
    param: '荣誉等级',
    value: '1-5星',
    requirement: '影响匹配优先级'
  }
];

// 用户列表数据
const users = ref([
  { id: 1001, username: 'Player001', status: '认证玩家', rank: '钻石', honorLevel: 4, verificationTime: '2023-12-01 14:30', reports: 0 },
  { id: 1002, username: 'Gamer123', status: '注册用户', rank: '黄金', honorLevel: 2, verificationTime: '2023-12-01 10:15', reports: 1 },
  { id: 1003, username: 'ProSniper', status: '认证玩家', rank: '大师', honorLevel: 5, verificationTime: '2023-12-01 08:45', reports: 0 },
  { id: 1004, username: 'Noob4Fun', status: '游客', rank: '-', honorLevel: 0, verificationTime: '-', reports: 0 },
  { id: 1005, username: 'ToxicPlayer', status: '失信玩家', rank: '白银', honorLevel: 1, verificationTime: '2023-11-29 16:20', reports: 3 },
  { id: 1006, username: 'Hacker101', status: '封禁名单', rank: '黄金', honorLevel: 0, verificationTime: '2023-11-25 09:10', reports: 8 },
  { id: 1007, username: 'CasualGamer', status: '注册用户', rank: '青铜', honorLevel: 3, verificationTime: '2023-11-30 20:30', reports: 0 },
  { id: 1008, username: 'CompetitiveAce', status: '认证玩家', rank: '大师', honorLevel: 4, verificationTime: '2023-12-01 12:45', reports: 1 }
]);

// 分页和筛选
const searchQuery = ref('');
const statusFilter = ref('');
const currentPage = ref(1);
const pageSize = ref(5);
const totalUsers = computed(() => users.value.length);

const filteredUsers = computed(() => {
  let result = users.value;
  
  if (searchQuery.value) {
    result = result.filter(user => 
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (statusFilter.value) {
    result = result.filter(user => user.status === statusFilter.value);
  }
  
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return result.slice(startIndex, startIndex + pageSize.value);
});

const filterUsers = () => {
  currentPage.value = 1;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 用户状态相关
const getUserStatusType = (status: string) => {
  switch (status) {
    case '游客': return 'info';
    case '注册用户': return '';
    case '认证玩家': return 'success';
    case '失信玩家': return 'warning';
    case '封禁名单': return 'danger';
    default: return '';
  }
};

// 查看用户
const viewUser = (user: any) => {
  console.log('查看用户:', user);
  // 实际项目中可跳转到用户详情页或弹出详情对话框
};

// 验证用户
const verifyUser = (user: any) => {
  console.log('验证用户:', user);
  ElMessage.success(`已对 ${user.username} 进行身份验证`);
  // 更新验证时间
  user.verificationTime = new Date().toLocaleString();
};

// 封禁用户
const banDialogVisible = ref(false);
const selectedUser = ref<any>(null);
const banForm = ref({
  reason: '',
  duration: '',
  level: 'account',
  banAlts: true,
  note: ''
});

const openBanDialog = (user: any) => {
  selectedUser.value = user;
  banDialogVisible.value = true;
};

const confirmBan = () => {
  console.log('封禁用户:', selectedUser.value, banForm.value);
  // 实际项目中这里会调用API来封禁用户
  if (selectedUser.value) {
    const userIndex = users.value.findIndex(u => u.id === selectedUser.value.id);
    if (userIndex !== -1) {
      users.value[userIndex].status = '封禁名单';
      ElMessage.success(`已封禁用户 ${selectedUser.value.username}`);
    }
  }
  banDialogVisible.value = false;
};

onMounted(() => {
  if (diagramContainer.value) {
    const mermaidCode = `
      stateDiagram-v2
        [*] --> 游客
        游客 --> 注册用户: 手机验证
        注册用户 --> 认证玩家: 完成10场匹配
        认证玩家 --> 失信玩家: 3次举报成立
        失信玩家 --> 封禁名单: 申诉失败
    `;
    createDiagram(diagramContainer.value, mermaidCode);
  }
});
</script>

<style scoped>
.user-management-module {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.diagram-container {
  margin-top: 20px;
  min-height: 300px;
  border: 1px solid #ebeef5;
  padding: 20px;
  border-radius: 4px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar {
  display: flex;
  gap: 10px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.honor-stars {
  display: flex;
  align-items: center;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style> 