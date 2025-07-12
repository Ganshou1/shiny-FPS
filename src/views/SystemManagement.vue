<template>
  <div class="system-management-container">
    <h1 class="page-title">系统管理</h1>
    
    <!-- 统计图表 -->
    <SystemManagementChart />
    
    <!-- 管理选项卡 -->
    <el-card class="management-card">
      <el-tabs v-model="activeTab" type="border-card">
        <!-- 用户管理 -->
        <el-tab-pane label="用户管理" name="users">
          <div class="tab-header">
            <div class="search-box">
              <el-input
                v-model="userSearch"
                placeholder="搜索用户"
                prefix-icon="Search"
                clearable
                style="width: 250px;"
              />
            </div>
            <el-button type="primary" @click="addUser">
              <el-icon><Plus /></el-icon> 添加用户
            </el-button>
          </div>
          
          <el-table :data="filteredUsers" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="username" label="用户名" width="120" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="role" label="角色" width="120">
              <template #default="{ row }">
                <el-tag :type="getRoleTagType(row.role)">{{ row.role }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="department" label="部门" width="150" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column prop="lastLogin" label="最后登录" width="180">
              <template #default="{ row }">
                {{ formatDate(row.lastLogin) }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100">
              <template #default="{ row }">
                <el-tag :type="row.status === '激活' ? 'success' : 'danger'">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="editUser(row)">编辑</el-button>
                <el-button 
                  size="small" 
                  :type="row.status === '激活' ? 'danger' : 'success'"
                  @click="toggleUserStatus(row)"
                >
                  {{ row.status === '激活' ? '禁用' : '激活' }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="userCurrentPage"
              :page-size="pageSize"
              :total="userData.length"
              layout="total, prev, pager, next"
              @current-change="handleUserPageChange"
            />
          </div>
        </el-tab-pane>
        
        <!-- 角色管理 -->
        <el-tab-pane label="角色管理" name="roles">
          <div class="tab-header">
            <div class="search-box">
              <el-input
                v-model="roleSearch"
                placeholder="搜索角色"
                prefix-icon="Search"
                clearable
                style="width: 250px;"
              />
            </div>
            <el-button type="primary" @click="addRole">
              <el-icon><Plus /></el-icon> 添加角色
            </el-button>
          </div>
          
          <el-table :data="filteredRoles" border stripe style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="角色名称" width="150" />
            <el-table-column prop="code" label="角色编码" width="150" />
            <el-table-column prop="description" label="描述" min-width="200" />
            <el-table-column prop="userCount" label="用户数" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="180">
              <template #default="{ row }">
                {{ formatDate(row.createTime) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="250">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="success" @click="assignPermissions(row)">分配权限</el-button>
                <el-button size="small" type="danger" @click="deleteRole(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="pagination-container">
            <el-pagination
              v-model:current-page="roleCurrentPage"
              :page-size="pageSize"
              :total="roleData.length"
              layout="total, prev, pager, next"
              @current-change="handleRolePageChange"
            />
          </div>
        </el-tab-pane>
        
        <!-- 菜单管理 -->
        <el-tab-pane label="菜单管理" name="menus">
          <div class="tab-header">
            <div class="search-box">
              <el-input
                v-model="menuSearch"
                placeholder="搜索菜单"
                prefix-icon="Search"
                clearable
                style="width: 250px;"
              />
            </div>
            <el-button type="primary" @click="addMenu">
              <el-icon><Plus /></el-icon> 添加菜单
            </el-button>
          </div>
          
          <el-table
            :data="filteredMenus"
            border
            stripe
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            style="width: 100%"
          >
            <el-table-column prop="name" label="菜单名称" width="180" />
            <el-table-column prop="icon" label="图标" width="100">
              <template #default="{ row }">
                <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="path" label="路径" width="180" />
            <el-table-column prop="component" label="组件" width="180" />
            <el-table-column prop="permission" label="权限标识" width="180" />
            <el-table-column prop="type" label="类型" width="100">
              <template #default="{ row }">
                <el-tag :type="getMenuTypeTag(row.type)">{{ row.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" width="80" />
            <el-table-column label="操作" fixed="right" width="230">
              <template #default="{ row }">
                <el-button size="small" type="primary" @click="editMenu(row)">编辑</el-button>
                <el-button size="small" type="success" @click="addChildMenu(row)" v-if="row.type !== '按钮'">
                  添加子菜单
                </el-button>
                <el-button size="small" type="danger" @click="deleteMenu(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import SystemManagementChart from '@/components/SystemManagementChart.vue';
import dayjs from 'dayjs';

// 活动选项卡
const activeTab = ref('users');
const pageSize = ref(10);

// 用户管理
const userSearch = ref('');
const userCurrentPage = ref(1);

// 角色管理
const roleSearch = ref('');
const roleCurrentPage = ref(1);

// 菜单管理
const menuSearch = ref('');

// 模拟用户数据
const userData = reactive([
  { id: 1, username: 'admin', name: '管理员', role: '超级管理员', department: '技术部', email: 'admin@example.com', lastLogin: '2023-06-15 08:30:45', status: '激活' },
  { id: 2, username: 'zhangsan', name: '张三', role: '普通用户', department: '市场部', email: 'zhangsan@example.com', lastLogin: '2023-06-14 16:22:10', status: '激活' },
  { id: 3, username: 'lisi', name: '李四', role: '管理员', department: '人事部', email: 'lisi@example.com', lastLogin: '2023-06-13 09:15:33', status: '激活' },
  { id: 4, username: 'wangwu', name: '王五', role: '普通用户', department: '财务部', email: 'wangwu@example.com', lastLogin: '2023-06-12 14:05:22', status: '禁用' },
  { id: 5, username: 'zhaoliu', name: '赵六', role: '普通用户', department: '销售部', email: 'zhaoliu@example.com', lastLogin: '2023-06-10 11:42:18', status: '激活' },
  { id: 6, username: 'qianqi', name: '钱七', role: '管理员', department: '技术部', email: 'qianqi@example.com', lastLogin: '2023-06-09 17:30:05', status: '激活' },
  { id: 7, username: 'zhuba', name: '朱八', role: '普通用户', department: '市场部', email: 'zhuba@example.com', lastLogin: '2023-06-08 10:15:42', status: '禁用' },
  { id: 8, username: 'wangjiu', name: '王九', role: '普通用户', department: '人事部', email: 'wangjiu@example.com', lastLogin: '2023-06-07 09:22:31', status: '激活' },
  { id: 9, username: 'lishi', name: '李十', role: '管理员', department: '财务部', email: 'lishi@example.com', lastLogin: '2023-06-06 16:40:12', status: '激活' },
  { id: 10, username: 'zhouyi', name: '周一', role: '普通用户', department: '销售部', email: 'zhouyi@example.com', lastLogin: '2023-06-05 14:18:27', status: '激活' },
  { id: 11, username: 'wuer', name: '吴二', role: '普通用户', department: '技术部', email: 'wuer@example.com', lastLogin: '2023-06-04 11:05:33', status: '禁用' },
  { id: 12, username: 'zhengsan', name: '郑三', role: '管理员', department: '市场部', email: 'zhengsan@example.com', lastLogin: '2023-06-03 09:50:18', status: '激活' },
]);

// 模拟角色数据
const roleData = reactive([
  { id: 1, name: '超级管理员', code: 'SUPER_ADMIN', description: '拥有所有权限', userCount: 1, createTime: '2023-01-01 00:00:00' },
  { id: 2, name: '管理员', code: 'ADMIN', description: '拥有大部分权限，不能进行系统关键设置', userCount: 3, createTime: '2023-01-02 10:30:00' },
  { id: 3, name: '普通用户', code: 'USER', description: '基本操作权限', userCount: 8, createTime: '2023-01-03 14:20:00' },
  { id: 4, name: '游客', code: 'GUEST', description: '只读权限', userCount: 0, createTime: '2023-01-04 16:45:00' },
  { id: 5, name: '审计员', code: 'AUDITOR', description: '系统审计权限', userCount: 0, createTime: '2023-02-15 09:20:00' },
  { id: 6, name: '运维人员', code: 'OPS', description: '系统维护权限', userCount: 0, createTime: '2023-03-10 11:15:00' },
]);

// 模拟菜单数据
const menuData = reactive([
  {
    id: 1,
    name: '首页',
    icon: 'House',
    path: '/',
    component: 'Home',
    permission: '',
    type: '菜单',
    sort: 1
  },
  {
    id: 2,
    name: '系统管理',
    icon: 'Setting',
    path: '/system',
    component: 'Layout',
    permission: 'system:view',
    type: '目录',
    sort: 2,
    children: [
      {
        id: 21,
        name: '用户管理',
        icon: 'User',
        path: '/system/users',
        component: 'system/users/index',
        permission: 'system:user:view',
        type: '菜单',
        sort: 1,
        children: [
          {
            id: 211,
            name: '用户新增',
            icon: '',
            path: '',
            component: '',
            permission: 'system:user:add',
            type: '按钮',
            sort: 1
          },
          {
            id: 212,
            name: '用户编辑',
            icon: '',
            path: '',
            component: '',
            permission: 'system:user:edit',
            type: '按钮',
            sort: 2
          },
          {
            id: 213,
            name: '用户删除',
            icon: '',
            path: '',
            component: '',
            permission: 'system:user:delete',
            type: '按钮',
            sort: 3
          }
        ]
      },
      {
        id: 22,
        name: '角色管理',
        icon: 'UserFilled',
        path: '/system/roles',
        component: 'system/roles/index',
        permission: 'system:role:view',
        type: '菜单',
        sort: 2
      },
      {
        id: 23,
        name: '菜单管理',
        icon: 'Menu',
        path: '/system/menus',
        component: 'system/menus/index',
        permission: 'system:menu:view',
        type: '菜单',
        sort: 3
      }
    ]
  },
  {
    id: 3,
    name: '数据管理',
    icon: 'Document',
    path: '/data',
    component: 'Layout',
    permission: 'data:view',
    type: '目录',
    sort: 3
  }
]);

// 过滤用户数据
const filteredUsers = computed(() => {
  const searchResult = userSearch.value
    ? userData.filter(user => 
        user.username.toLowerCase().includes(userSearch.value.toLowerCase()) ||
        user.name.toLowerCase().includes(userSearch.value.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.value.toLowerCase())
      )
    : userData;
  
  const start = (userCurrentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  
  return searchResult.slice(start, end);
});

// 过滤角色数据
const filteredRoles = computed(() => {
  const searchResult = roleSearch.value
    ? roleData.filter(role => 
        role.name.toLowerCase().includes(roleSearch.value.toLowerCase()) ||
        role.code.toLowerCase().includes(roleSearch.value.toLowerCase()) ||
        role.description.toLowerCase().includes(roleSearch.value.toLowerCase())
      )
    : roleData;
  
  const start = (roleCurrentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  
  return searchResult.slice(start, end);
});

// 过滤菜单数据
const filteredMenus = computed(() => {
  if (!menuSearch.value) return menuData;
  
  // 递归搜索菜单
  const searchMenus = (menus) => {
    const result = [];
    
    for (const menu of menus) {
      if (
        menu.name.toLowerCase().includes(menuSearch.value.toLowerCase()) ||
        (menu.path && menu.path.toLowerCase().includes(menuSearch.value.toLowerCase())) ||
        (menu.permission && menu.permission.toLowerCase().includes(menuSearch.value.toLowerCase()))
      ) {
        result.push({ ...menu });
      } else if (menu.children && menu.children.length > 0) {
        const childrenResult = searchMenus(menu.children);
        if (childrenResult.length > 0) {
          result.push({
            ...menu,
            children: childrenResult
          });
        }
      }
    }
    
    return result;
  };
  
  return searchMenus(menuData);
});

// 处理用户页面变化
const handleUserPageChange = (page: number) => {
  userCurrentPage.value = page;
};

// 处理角色页面变化
const handleRolePageChange = (page: number) => {
  roleCurrentPage.value = page;
};

// 获取角色标签类型
const getRoleTagType = (role: string) => {
  switch (role) {
    case '超级管理员': return 'danger';
    case '管理员': return 'warning';
    case '普通用户': return 'success';
    default: return 'info';
  }
};

// 获取菜单类型标签
const getMenuTypeTag = (type: string) => {
  switch (type) {
    case '目录': return 'primary';
    case '菜单': return 'success';
    case '按钮': return 'info';
    default: return '';
  }
};

// 格式化日期
const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

// 用户相关操作
const addUser = () => {
  ElMessage.success('添加用户操作');
};

const editUser = (user) => {
  ElMessage.success(`编辑用户: ${user.name}`);
};

const toggleUserStatus = (user) => {
  const newStatus = user.status === '激活' ? '禁用' : '激活';
  ElMessageBox.confirm(
    `确定要${newStatus}用户 ${user.name} 吗？`,
    `${newStatus}用户`,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    user.status = newStatus;
    ElMessage.success(`已${newStatus}用户: ${user.name}`);
  }).catch(() => {});
};

// 角色相关操作
const addRole = () => {
  ElMessage.success('添加角色操作');
};

const editRole = (role) => {
  ElMessage.success(`编辑角色: ${role.name}`);
};

const assignPermissions = (role) => {
  ElMessage.success(`为角色 ${role.name} 分配权限`);
};

const deleteRole = (role) => {
  ElMessageBox.confirm(
    `确定要删除角色 ${role.name} 吗？`,
    '删除角色',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    const index = roleData.findIndex(item => item.id === role.id);
    if (index !== -1) {
      roleData.splice(index, 1);
      ElMessage.success(`已删除角色: ${role.name}`);
    }
  }).catch(() => {});
};

// 菜单相关操作
const addMenu = () => {
  ElMessage.success('添加菜单操作');
};

const editMenu = (menu) => {
  ElMessage.success(`编辑菜单: ${menu.name}`);
};

const addChildMenu = (menu) => {
  ElMessage.success(`为 ${menu.name} 添加子菜单`);
};

const deleteMenu = (menu) => {
  ElMessageBox.confirm(
    `确定要删除菜单 ${menu.name} 吗？`,
    '删除菜单',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 这里应该有递归删除逻辑，简化处理
    ElMessage.success(`已删除菜单: ${menu.name}`);
  }).catch(() => {});
};
</script>

<style scoped>
.system-management-container {
  padding: 20px;
}

.page-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: var(--primary-color); /* 更改为金色，与主题一致 */
}

.management-card {
  margin-top: 20px;
}

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

/* 添加自定义样式确保表格中的普通文本可见 */
:deep(.el-table) {
  color: var(--text-primary);
}

:deep(.el-table--border) th {
  color: var(--primary-color);
}

:deep(.el-input__inner) {
  color: var(--text-primary);
}

:deep(.el-tabs__item) {
  color: var(--text-secondary);
}

:deep(.el-tabs__item.is-active) {
  color: var(--primary-color);
}

:deep(.el-pagination .el-pagination__total) {
  color: var(--text-secondary);
}

:deep(.el-pagination button) {
  color: var(--text-secondary);
}
</style> 