<template>
  <div class="user-management dark-panel">
    <div class="page-header">
      <h2 class="page-title gold-text">用户管理</h2>
      <div class="header-actions">
        <el-input
          v-model="searchQuery"
          placeholder="搜索用户"
          prefix-icon="Search"
          clearable
          class="search-input"
        />
        <el-dropdown>
          <el-button type="primary">
            <el-icon><Plus /></el-icon> 用户操作 <el-icon><ArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showAddUserDialog">添加用户</el-dropdown-item>
              <el-dropdown-item @click="registerDialogVisible = true">用户注册</el-dropdown-item>
              <el-dropdown-item @click="resetPasswordDialogVisible = true">找回密码</el-dropdown-item>
              <el-dropdown-item @click="roleDialogVisible = true">角色管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-tabs v-model="activeTab" class="user-tabs">
      <el-tab-pane label="所有用户" name="all" />
      <el-tab-pane label="管理员" name="admin" />
      <el-tab-pane label="普通用户" name="regular" />
      <el-tab-pane label="禁用账户" name="disabled" />
      <el-tab-pane label="认证用户" name="verified" />
      <el-tab-pane label="行为日志" name="logs" />
      <el-tab-pane label="好友关系" name="social" />
    </el-tabs>

    <div v-if="activeTab === 'all' || activeTab === 'admin' || activeTab === 'regular' || activeTab === 'disabled' || activeTab === 'verified'">
      <el-table
        :data="filteredUsers"
        stripe
        border
        style="width: 100%"
        row-class-name="dark-row"
      >
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column label="角色" width="120">
          <template #default="{ row }">
            <el-tag :type="getRoleTagType(row.role)">
              {{ row.role === 'admin' ? '管理员' : row.role === 'superadmin' ? '超级管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="部门" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="lastLogin" label="最后登录" />
        <el-table-column label="实名认证" width="100" v-if="activeTab === 'all' || activeTab === 'verified'">
          <template #default="{ row }">
            <el-tag :type="getVerificationTagType(row)">
              {{ getVerificationStatus(row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === 'active' ? '激活' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="{ row }">
            <el-dropdown size="small">
              <el-button size="small" type="primary">
                操作 <el-icon><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleEdit(row)">编辑</el-dropdown-item>
                  <el-dropdown-item @click="toggleUserStatus(row)">
                    {{ row.status === 'active' ? '禁用' : '激活' }}
                  </el-dropdown-item>
                  <el-dropdown-item @click="showVerificationDialog(row)">实名认证</el-dropdown-item>
                  <el-dropdown-item @click="showSocialDialog(row)">社交关系</el-dropdown-item>
                  <el-dropdown-item @click="showUserLogs(row)">查看日志</el-dropdown-item>
                  <el-dropdown-item @click="showRolePermissions(row)">角色权限</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!-- 用户行为日志 -->
    <div v-if="activeTab === 'logs'">
      <el-table
        :data="userLogs"
        stripe
        border
        style="width: 100%"
        row-class-name="dark-row"
      >
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="action" label="操作类型" width="120" />
        <el-table-column prop="ip" label="IP地址" width="150" />
        <el-table-column prop="userAgent" label="User Agent" width="200" />
        <el-table-column prop="details" label="详情" />
        <el-table-column prop="timestamp" label="时间" width="180" />
      </el-table>
    </div>
    
    <!-- 社交关系 -->
    <div v-if="activeTab === 'social'">
      <el-table
        :data="socialRelations"
        stripe
        border
        style="width: 100%"
        row-class-name="dark-row"
      >
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column prop="targetUsername" label="目标用户" width="120" />
        <el-table-column label="关系类型" width="120">
          <template #default="{ row }">
            <el-tag :type="row.type === 'friend' ? 'success' : 'danger'">
              {{ row.type === 'friend' ? '好友' : '黑名单' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="建立时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="danger" @click="deleteSocialRelation(row)">
              {{ row.type === 'friend' ? '解除好友' : '移出黑名单' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        :total="filteredUsers.length"
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        class="dark-pagination"
      />
    </div>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑用户' : '添加用户'"
      width="500px"
      class="dark-dialog"
    >
      <el-form :model="userForm" label-width="80px" :rules="rules" ref="userFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="选择角色" style="width: 100%">
            <el-option label="超级管理员" value="superadmin" />
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="regular" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="userForm.department" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="选择状态" style="width: 100%">
            <el-option label="激活" value="active" />
            <el-option label="禁用" value="disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="userForm.password" type="password" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveUser">确认</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 用户注册对话框 -->
    <el-dialog
      v-model="registerDialogVisible"
      title="用户注册"
      width="500px"
      class="dark-dialog"
    >
      <el-form :model="registerForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerForm.username" prefix-icon="User" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" prefix-icon="Message" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" show-password prefix-icon="Lock" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" show-password prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-checkbox>同意用户条款和隐私政策</el-checkbox>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="registerUser">注册</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 找回密码对话框 -->
    <el-dialog
      v-model="resetPasswordDialogVisible"
      title="找回密码"
      width="500px"
      class="dark-dialog"
    >
      <el-form :model="resetPasswordForm" label-width="100px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resetPasswordForm.email" prefix-icon="Message" />
        </el-form-item>
        <el-form-item label="验证码" prop="securityCode">
          <div class="security-code-input">
            <el-input v-model="resetPasswordForm.securityCode" />
            <el-button type="primary">获取验证码</el-button>
          </div>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPasswordForm.newPassword" type="password" show-password prefix-icon="Lock" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmNewPassword">
          <el-input v-model="resetPasswordForm.confirmNewPassword" type="password" show-password prefix-icon="Lock" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetPasswordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="resetPassword">确认</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 角色权限管理对话框 -->
    <el-dialog
      v-model="roleDialogVisible"
      title="角色权限管理"
      width="700px"
      class="dark-dialog"
    >
      <el-tabs>
        <el-tab-pane label="角色列表">
          <el-table :data="roles" border style="width: 100%" row-class-name="dark-row">
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column prop="name" label="角色名称" width="150" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="权限配置">
          <div v-for="role in roles" :key="role.id" class="role-permissions">
            <h3>{{ role.name }}</h3>
            <el-divider />
            <el-checkbox-group v-model="role.permissions">
              <div v-for="perm in role.permissions" :key="perm.id" class="permission-item">
                <el-checkbox :label="perm">{{ perm.name }}</el-checkbox>
                <span class="permission-description">{{ perm.description }}</span>
              </div>
            </el-checkbox-group>
          </div>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roleDialogVisible = false">取消</el-button>
          <el-button type="primary">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 实名认证对话框 -->
    <el-dialog
      v-model="verificationDialogVisible"
      title="实名认证"
      width="500px"
      class="dark-dialog"
    >
      <el-form :model="verificationForm" label-width="100px">
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="verificationForm.realName" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="verificationForm.idNumber" />
        </el-form-item>
        <el-form-item label="认证状态" prop="status">
          <el-select v-model="verificationForm.status" style="width: 100%">
            <el-option label="待审核" value="pending" />
            <el-option label="已认证" value="verified" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item label="拒绝原因" prop="rejectReason" v-if="verificationForm.status === 'rejected'">
          <el-input v-model="verificationForm.rejectReason" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="verificationDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveVerification">保存</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 社交关系管理对话框 -->
    <el-dialog
      v-model="socialDialogVisible"
      title="社交关系管理"
      width="650px"
      class="dark-dialog"
    >
      <el-tabs>
        <el-tab-pane label="好友列表">
          <el-table
            :data="socialRelations.filter(r => r.type === 'friend')"
            border
            style="width: 100%"
            row-class-name="dark-row"
          >
            <el-table-column prop="targetUsername" label="用户名" />
            <el-table-column prop="createdAt" label="添加时间" />
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button size="small" type="danger" @click="deleteSocialRelation(row)">解除好友</el-button>
                <el-button size="small" type="warning">加入黑名单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="黑名单">
          <el-table
            :data="socialRelations.filter(r => r.type === 'blacklist')"
            border
            style="width: 100%"
            row-class-name="dark-row"
          >
            <el-table-column prop="targetUsername" label="用户名" />
            <el-table-column prop="createdAt" label="添加时间" />
            <el-table-column label="操作" width="180">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="deleteSocialRelation(row)">移出黑名单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="添加关系">
          <el-form label-width="100px">
            <el-form-item label="用户搜索">
              <el-input placeholder="请输入用户名或ID"></el-input>
            </el-form-item>
            <el-form-item label="关系类型">
              <el-radio-group>
                <el-radio label="friend">好友</el-radio>
                <el-radio label="blacklist">黑名单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">添加关系</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, ArrowDown, User, Lock, Message, Check, Warning } from '@element-plus/icons-vue';

// 用户类型定义
// 用户角色权限接口
interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
}

// 用户角色接口
interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

// 用户行为日志接口
interface UserLog {
  id: number;
  userId: number;
  username: string;
  action: string;
  ip: string;
  userAgent: string;
  details: string;
  timestamp: string;
}

// 用户实名认证接口
interface VerificationInfo {
  realName: string;
  idNumber: string;
  verifiedAt?: string;
  status: 'pending' | 'verified' | 'rejected';
  rejectReason?: string;
}

// 社交关系接口
interface SocialRelation {
  id: number;
  userId: number;
  targetUserId: number;
  targetUsername: string;
  type: 'friend' | 'blacklist';
  createdAt: string;
}

// 用户接口
interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  roleId?: number;
  roles?: Role[];
  department: string;
  email: string;
  lastLogin: string;
  status: 'active' | 'disabled';
  password?: string;
  phone?: string;
  verificationInfo?: VerificationInfo;
  relations?: SocialRelation[];
  logs?: UserLog[];
}

// 状态
const searchQuery = ref('');
const activeTab = ref('all');
const currentPage = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const isEdit = ref(false);
const userFormRef = ref<FormInstance>();

// 对话框状态
const registerDialogVisible = ref(false);
const resetPasswordDialogVisible = ref(false);
const roleDialogVisible = ref(false);
const verificationDialogVisible = ref(false);
const socialDialogVisible = ref(false);

// 当前选择的用户ID (用于多个操作)
const currentUserId = ref<number | null>(null);

// 表单
const userForm = reactive<User>({
  id: 0,
  username: '',
  name: '',
  role: 'regular',
  department: '',
  email: '',
  lastLogin: '',
  status: 'active',
  password: '',
  phone: ''
});

const registerForm = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
});

const resetPasswordForm = reactive({
  email: '',
  securityCode: '',
  newPassword: '',
  confirmNewPassword: ''
});

const verificationForm = reactive<VerificationInfo>({
  realName: '',
  idNumber: '',
  status: 'pending'
});

// 角色和权限数据
const roles = ref<Role[]>([
  {
    id: 1,
    name: '超级管理员',
    description: '系统最高权限，可以进行所有操作',
    permissions: [
      { id: 1, name: '用户管理', code: 'user:*', description: '所有用户相关权限' },
      { id: 2, name: '角色管理', code: 'role:*', description: '所有角色相关权限' },
      { id: 3, name: '系统管理', code: 'system:*', description: '所有系统相关权限' }
    ]
  },
  {
    id: 2,
    name: '管理员',
    description: '可以管理普通用户和基本功能',
    permissions: [
      { id: 1, name: '用户管理', code: 'user:view,edit', description: '查看和编辑用户信息' },
      { id: 3, name: '系统管理', code: 'system:view', description: '查看系统信息' }
    ]
  },
  {
    id: 3,
    name: '普通用户',
    description: '基本访问权限',
    permissions: [
      { id: 4, name: '个人信息', code: 'profile:*', description: '管理个人信息权限' }
    ]
  }
]);

// 用户日志数据
const userLogs = ref<UserLog[]>([
  {
    id: 1,
    userId: 1,
    username: 'admin',
    action: '登录',
    ip: '192.168.1.100',
    userAgent: 'Chrome/90.0.4430.212',
    details: '成功登录系统',
    timestamp: '2023-06-15 08:30:25'
  },
  {
    id: 2,
    userId: 2,
    username: 'zhangsan',
    action: '修改密码',
    ip: '192.168.1.101',
    userAgent: 'Firefox/89.0',
    details: '用户修改了自己的密码',
    timestamp: '2023-06-14 10:25:18'
  },
  {
    id: 3,
    userId: 1,
    username: 'admin',
    action: '添加用户',
    ip: '192.168.1.100',
    userAgent: 'Chrome/90.0.4430.212',
    details: '添加新用户：wangwu',
    timestamp: '2023-06-13 15:22:42'
  }
]);

// 社交关系数据
const socialRelations = ref<SocialRelation[]>([
  {
    id: 1,
    userId: 2,
    targetUserId: 3,
    targetUsername: 'lisi',
    type: 'friend',
    createdAt: '2023-05-20 09:15:30'
  },
  {
    id: 2,
    userId: 2,
    targetUserId: 4,
    targetUsername: 'wangwu',
    type: 'blacklist',
    createdAt: '2023-05-25 16:20:10'
  },
  {
    id: 3,
    userId: 3,
    targetUserId: 2,
    targetUsername: 'zhangsan',
    type: 'friend',
    createdAt: '2023-05-20 09:18:45'
  }
]);

// 表单验证规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur', validator: (rule, value, callback) => {
      if (isEdit.value) {
        callback();
      } else if (!value) {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }}
  ]
});

// 示例用户数据
const users = ref<User[]>([
  {
    id: 1,
    username: 'admin',
    name: '管理员',
    role: 'superadmin',
    department: '技术部',
    email: 'admin@example.com',
    lastLogin: '2023-06-15 08:30',
    status: 'active'
  },
  {
    id: 2,
    username: 'zhangsan',
    name: '张三',
    role: 'regular',
    department: '市场部',
    email: 'zhangsan@example.com',
    lastLogin: '2023-06-14 10:25',
    status: 'active'
  },
  {
    id: 3,
    username: 'lisi',
    name: '李四',
    role: 'admin',
    department: '人事部',
    email: 'lisi@example.com',
    lastLogin: '2023-06-13 09:15',
    status: 'active'
  },
  {
    id: 4,
    username: 'wangwu',
    name: '王五',
    role: 'regular',
    department: '销售部',
    email: 'wangwu@example.com',
    lastLogin: '2023-06-12 14:20',
    status: 'disabled'
  },
  {
    id: 5,
    username: 'zhaoliu',
    name: '赵六',
    role: 'regular',
    department: '销售部',
    email: 'zhaoliu@example.com',
    lastLogin: '2023-06-10 11:42',
    status: 'active'
  },
  {
    id: 6,
    username: 'qianqi',
    name: '钱七',
    role: 'admin',
    department: '技术部',
    email: 'qianqi@example.com',
    lastLogin: '2023-06-09 08:55',
    status: 'active'
  },
  {
    id: 7,
    username: 'zhuba',
    name: '朱八',
    role: 'regular',
    department: '市场部',
    email: 'zhuba@example.com',
    lastLogin: '2023-06-08 10:15',
    status: 'disabled'
  },
  {
    id: 8,
    username: 'wangjiu',
    name: '王九',
    role: 'regular',
    department: '销售部',
    email: 'wangjiu@example.com',
    lastLogin: '2023-06-07 09:30',
    status: 'active'
  },
  {
    id: 9,
    username: 'lishi',
    name: '李十',
    role: 'admin',
    department: '财务部',
    email: 'lishi@example.com',
    lastLogin: '2023-06-06 16:40',
    status: 'active'
  },
  {
    id: 10,
    username: 'zhaoshiyi',
    name: '赵十一',
    role: 'regular',
    department: '市场部',
    email: 'zhaoshiyi@example.com',
    lastLogin: '2023-06-05 11:20',
    status: 'active'
  }
]);

// 根据标签类型获取角色标签类型
const getRoleTagType = (role: string) => {
  switch (role) {
    case 'superadmin':
      return 'danger';
    case 'admin':
      return 'warning';
    default:
      return 'success';
  }
};

// 根据当前tab和搜索筛选用户
const filteredUsers = computed(() => {
  let result = [...users.value];
  
  // 按标签筛选
  if (activeTab.value !== 'all') {
    if (activeTab.value === 'admin') {
      result = result.filter(user => user.role === 'admin' || user.role === 'superadmin');
    } else if (activeTab.value === 'regular') {
      result = result.filter(user => user.role === 'regular');
    } else if (activeTab.value === 'disabled') {
      result = result.filter(user => user.status === 'disabled');
    }
  }
  
  // 按搜索词筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(user => 
      user.username.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// 显示添加用户对话框
const showAddUserDialog = () => {
  isEdit.value = false;
  Object.assign(userForm, {
    id: 0,
    username: '',
    name: '',
    role: 'regular',
    department: '',
    email: '',
    lastLogin: '',
    status: 'active',
    password: ''
  });
  dialogVisible.value = true;
};

// 显示编辑用户对话框
const handleEdit = (row: User) => {
  isEdit.value = true;
  Object.assign(userForm, { ...row });
  dialogVisible.value = true;
};

// 切换用户状态
const toggleUserStatus = (row: User) => {
  const action = row.status === 'active' ? '禁用' : '激活';
  ElMessageBox.confirm(
    `确定要${action}用户 ${row.name} 吗?`,
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // 在实际应用中，这里应该调用API
      row.status = row.status === 'active' ? 'disabled' : 'active';
      ElMessage({
        type: 'success',
        message: `已${action}用户 ${row.name}`
      });
    })
    .catch(() => {
      // 取消操作
    });
};

// 验证状态处理函数
const getVerificationTagType = (user: User) => {
  if (!user.verificationInfo) return 'info';
  switch (user.verificationInfo.status) {
    case 'verified':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'warning';
  }
};

// 验证状态文本
const getVerificationStatus = (user: User) => {
  if (!user.verificationInfo) return '未认证';
  switch (user.verificationInfo.status) {
    case 'verified':
      return '已认证';
    case 'rejected':
      return '已拒绝';
    default:
      return '审核中';
  }
};

// 显示实名认证对话框
const showVerificationDialog = (user: User) => {
  currentUserId.value = user.id;
  
  // 如果已有认证信息则加载
  if (user.verificationInfo) {
    Object.assign(verificationForm, { ...user.verificationInfo });
  } else {
    Object.assign(verificationForm, {
      realName: '',
      idNumber: '',
      status: 'pending'
    });
  }
  
  verificationDialogVisible.value = true;
};

// 显示社交关系对话框
const showSocialDialog = (user: User) => {
  currentUserId.value = user.id;
  socialDialogVisible.value = true;
};

// 显示用户日志
const showUserLogs = (user: User) => {
  currentUserId.value = user.id;
  activeTab.value = 'logs';
  
  // 实际应用中，这里会根据用户ID加载特定用户的日志
  // 这里仅作示例
};

// 显示角色权限管理
const showRolePermissions = (user: User) => {
  currentUserId.value = user.id;
  roleDialogVisible.value = true;
};

// 删除社交关系
const deleteSocialRelation = (relation: SocialRelation) => {
  ElMessageBox.confirm(
    `确定要${relation.type === 'friend' ? '解除与' : '将'}用户 ${relation.targetUsername} ${relation.type === 'friend' ? '的好友关系' : '从黑名单中移除'}吗?`,
    '确认操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      // 在实际应用中，这里应该调用API
      const index = socialRelations.value.findIndex(r => r.id === relation.id);
      if (index !== -1) {
        socialRelations.value.splice(index, 1);
      }
      ElMessage({
        type: 'success',
        message: relation.type === 'friend' ? '已解除好友关系' : '已从黑名单中移除'
      });
    })
    .catch(() => {
      // 取消操作
    });
};

// 用户注册
const registerUser = () => {
  ElMessage({
    type: 'success',
    message: '注册成功，请等待管理员审核'
  });
  registerDialogVisible.value = false;
  
  // 实际应用中，这里会调用API进行注册
  // 并记录用户行为日志
  logUserAction({
    userId: 0,
    username: registerForm.username,
    action: '用户注册',
    details: '新用户注册，等待审核',
    ip: '127.0.0.1',
    userAgent: navigator.userAgent
  });
};

// 重置密码
const resetPassword = () => {
  ElMessage({
    type: 'success',
    message: '密码重置链接已发送到您的邮箱'
  });
  resetPasswordDialogVisible.value = false;
  
  // 实际应用中，这里会调用API发送密码重置链接
};

// 保存实名认证
const saveVerification = () => {
  if (!currentUserId.value) return;
  
  const userIndex = users.value.findIndex(user => user.id === currentUserId.value);
  if (userIndex !== -1) {
    // 更新用户实名认证信息
    users.value[userIndex].verificationInfo = { ...verificationForm };
    
    ElMessage({
      type: 'success',
      message: '实名认证信息已更新'
    });
    
    // 记录用户行为日志
    logUserAction({
      userId: users.value[userIndex].id,
      username: users.value[userIndex].username,
      action: '实名认证',
      details: '提交实名认证信息',
      ip: '127.0.0.1',
      userAgent: navigator.userAgent
    });
  }
  
  verificationDialogVisible.value = false;
};

// 记录用户行为日志
const logUserAction = (logData: Omit<UserLog, 'id' | 'timestamp'>) => {
  // 生成日志ID和时间戳
  const newLog: UserLog = {
    id: userLogs.value.length + 1,
    ...logData,
    timestamp: new Date().toLocaleString()
  };
  
  // 添加到日志列表
  userLogs.value.unshift(newLog);
  
  // 实际应用中，这里会调用API记录日志
};

// 保存用户
const saveUser = () => {
  if (!userFormRef.value) return;
  
  userFormRef.value.validate((valid) => {
    if (valid) {
      if (isEdit.value) {
        // 更新现有用户
        const index = users.value.findIndex(user => user.id === userForm.id);
        if (index !== -1) {
          users.value[index] = { ...userForm };
        }
        ElMessage({
          type: 'success',
          message: `用户 ${userForm.name} 更新成功`
        });
        
        // 记录用户行为日志
        logUserAction({
          userId: userForm.id,
          username: userForm.username,
          action: '更新用户',
          details: `更新用户信息：${userForm.name}`,
          ip: '127.0.0.1',
          userAgent: navigator.userAgent
        });
      } else {
        // 添加新用户
        const newId = Math.max(...users.value.map(u => u.id), 0) + 1;
        users.value.push({
          ...userForm,
          id: newId,
          lastLogin: '-'
        });
        ElMessage({
          type: 'success',
          message: `用户 ${userForm.name} 添加成功`
        });
        
        // 记录用户行为日志
        logUserAction({
          userId: newId,
          username: userForm.username,
          action: '添加用户',
          details: `添加新用户：${userForm.name}`,
          ip: '127.0.0.1',
          userAgent: navigator.userAgent
        });
      }
      dialogVisible.value = false;
    }
  });
};
</script>

<style scoped>
.user-management {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 24px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.search-input {
  width: 250px;
}

.user-tabs {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-pagination) {
  --el-pagination-bg-color: var(--darker-bg);
  --el-pagination-text-color: var(--text-secondary);
  --el-pagination-button-color: var(--text-secondary);
  --el-pagination-hover-color: var(--primary-color);
}

:deep(.el-pagination .el-pager li) {
  background-color: var(--light-bg);
  color: var(--text-secondary);
}

:deep(.el-pagination .el-pager li.is-active) {
  background-color: var(--primary-color);
  color: #000000;
}

:deep(.el-select-dropdown__item.selected) {
  color: var(--primary-color);
}

:deep(.el-form-item__label) {
  color: var(--text-primary);
}

:deep(.dark-dialog .el-dialog__header) {
  border-bottom: 1px solid var(--gold-border);
  padding-bottom: 15px;
}

:deep(.dark-dialog .el-dialog__title) {
  color: var(--primary-color);
}

/* 确保深色主题表格样式 */
:deep(.dark-row) {
  background-color: var(--darker-bg);
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped.dark-row td) {
  background-color: var(--light-bg);
}

:deep(.el-table--enable-row-hover .el-table__body tr.dark-row:hover > td) {
  background-color: var(--lighter-bg);
}

/* 新增样式 */
.security-code-input {
  display: flex;
  gap: 10px;
}

.security-code-input .el-input {
  flex: 1;
}

.role-permissions {
  margin-bottom: 20px;
  padding: 15px;
  background-color: var(--light-bg);
  border-radius: 4px;
}

.permission-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.permission-description {
  margin-left: 10px;
  color: var(--text-secondary);
  font-size: 12px;
}
</style> 