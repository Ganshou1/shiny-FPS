<template>
  <div class="login-container">
    <!-- Left side with gradient background -->
    <div class="login-left">
      <div class="login-brand">
        <div class="logo-container">
          <el-icon :size="60" color="#FFD700"><Monitor /></el-icon>
        </div>
        <h1 class="fps-title">FPS游戏管理系统</h1>
        <p>专业、高效、安全的游戏管理解决方案</p>
        <div class="feature-list">
          <div class="feature-item">
            <el-icon><Trophy /></el-icon>
            <span>赛事管理</span>
          </div>
          <div class="feature-item">
            <el-icon><User /></el-icon>
            <span>玩家数据</span>
          </div>
          <div class="feature-item">
            <el-icon><Monitor /></el-icon>
            <span>服务器监控</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right side with login form -->
    <div class="login-right">
      <div class="login-card">
        <div class="login-header">
          <h2 class="fps-text-glow">系统登录</h2>
          <p>欢迎回来，请登录您的账号</p>
        </div>
        
        <el-alert
          title="示例账号：admin / 密码：123456"
          type="info"
          :closable="false"
          class="login-alert"
        />
        
        <el-form
          ref="loginForm_ref"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <!-- Username field -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              prefix-icon="User"
              clearable
              class="dark-input"
            />
          </el-form-item>
          
          <!-- Password field -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              prefix-icon="Lock"
              show-password
              clearable
              class="dark-input"
            />
          </el-form-item>
          
          <!-- Captcha field -->
          <el-form-item prop="captcha">
            <div class="captcha-container">
              <el-input
                v-model="loginForm.captcha"
                placeholder="验证码"
                class="captcha-input dark-input"
              />
              <div class="captcha-image" @click="refreshCaptcha">
                {{ captchaText }}
              </div>
            </div>
          </el-form-item>
          
          <!-- Remember me and forgot password -->
          <div class="login-options">
            <el-checkbox v-model="loginForm.remember">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
          
          <!-- Login button -->
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus'
import { useAuthStore } from '@/store/auth'
import { Monitor, Trophy, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

// Login form data
const loginForm = reactive({
  username: '',
  password: '',
  captcha: '',
  remember: false
})

// Form validation rules
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['blur', 'input'] },
    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: ['blur', 'input'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 4, message: '验证码为 4 位数字', trigger: 'blur' }
  ]
}

// Form and state refs
const loginForm_ref = ref<FormInstance>()
const loading = ref(false)
const captchaText = ref('')

// Generate random 4-digit captcha
function generateCaptcha() {
  try {
    const captcha = Math.floor(1000 + Math.random() * 9000).toString()
    captchaText.value = captcha
    localStorage.setItem('captcha', captcha)
    return captcha
  } catch (error) {
    console.error('Failed to generate or store captcha:', error)
    captchaText.value = '0000' // Fallback captcha
    return '0000'
  }
}

// Refresh captcha
function refreshCaptcha() {
  generateCaptcha()
}

// Login handler
async function handleLogin() {
  if (!loginForm_ref.value) return
  
  try {
    // Validate form
    await loginForm_ref.value.validate()
    
    // Validate captcha
    const storedCaptcha = localStorage.getItem('captcha')
    if (!storedCaptcha) {
      ElMessage.error('验证码已过期，请重新获取')
      refreshCaptcha()
      return
    }
    
    if (loginForm.captcha !== storedCaptcha) {
      ElMessage.error('验证码错误')
      refreshCaptcha()
      return
    }
    
    // Show loading
    loading.value = true
    
    // Attempt login
    await auth.login(loginForm.username, loginForm.password)
    
    // Redirect to home or previous page
    const redirectPath = route.query.redirect as string || '/home'
    router.push(redirectPath)
    
    ElMessage.success('登录成功')
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

// Generate captcha on component mount
onMounted(() => {
  // 确保清除旧的验证码
  localStorage.removeItem('captcha')
  // 生成新的验证码
  const newCaptcha = generateCaptcha()
  console.log('Generated new captcha:', newCaptcha)
})
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: var(--darkest-bg);
}

.login-left {
  flex: 1;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFD700;
  padding: 40px;
  position: relative;
  overflow: hidden;
}

.login-left::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23FFD700" stroke-width="0.5" stroke-opacity="0.1"/></svg>');
  background-size: 20px 20px;
  opacity: 0.05;
}

.login-brand {
  text-align: center;
  position: relative;
  z-index: 1;
}

.logo-container {
  margin-bottom: 20px;
}

.login-brand h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 36px;
  margin-bottom: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.login-brand p {
  font-size: 18px;
  opacity: 0.8;
  margin-bottom: 40px;
}

.feature-list {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.feature-item .el-icon {
  font-size: 24px;
  color: #FFD700;
}

.login-right {
  flex: 1;
  background-color: var(--dark-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  width: 420px;
  background: var(--darker-bg);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 215, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  color: #FFD700;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.login-header p {
  font-size: 14px;
  color: var(--text-secondary);
}

.login-alert {
  margin-bottom: 20px;
  background-color: rgba(255, 215, 0, 0.05) !important;
  border-color: rgba(255, 215, 0, 0.2) !important;
}

.login-form {
  margin-top: 20px;
}

.dark-input :deep(.el-input__inner) {
  background-color: var(--darkest-bg);
  border: 1px solid rgba(255, 215, 0, 0.2);
  color: var(--text-primary);
}

.dark-input :deep(.el-input__inner:focus) {
  border-color: #FFD700;
}

.dark-input :deep(.el-input__prefix) {
  color: rgba(255, 215, 0, 0.5);
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-input {
  flex: 1;
  margin-right: 10px;
}

.captcha-image {
  width: 120px;
  height: 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  border: 1px solid rgba(255, 215, 0, 0.3);
  color: #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  letter-spacing: 4px;
  cursor: pointer;
  user-select: none;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-options :deep(.el-checkbox__label) {
  color: var(--text-secondary);
}

.login-options :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #FFD700;
  border-color: #FFD700;
}

.login-button {
  width: 100%;
  height: 40px;
  background-color: #FFD700 !important;
  border-color: #FFD700 !important;
  color: #000 !important;
  font-weight: bold;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.login-button:hover {
  background-color: #F0C800 !important;
  border-color: #F0C800 !important;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

/* Responsive styles */
@media (max-width: 768px) {
  .login-left {
    display: none;
  }
  
  .login-card {
    width: 90%;
  }
}
</style> 