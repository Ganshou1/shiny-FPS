import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/main.css'

// 导入Store
import { usePlayerStore } from './store/players'
import { useMatchStore } from './store/matches'
import { useServerStore } from './store/servers'
import { useWeaponStore } from './store/weapons'

const app = createApp(App)
const pinia = createPinia()

// Register ElementPlus icons globally
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Use plugins
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 初始化应用
app.mount('#app')

// 初始化模拟数据
const useMockData = true // 在实际项目中可以从环境变量获取: import.meta.env.VITE_USE_MOCK_DATA === 'true'

if (useMockData) {
  const playerStore = usePlayerStore()
  const matchStore = useMatchStore()
  const serverStore = useServerStore()
  const weaponStore = useWeaponStore()
  
  // 加载各类模拟数据
  playerStore.loadMockData()
  matchStore.loadMockData()
  serverStore.loadMockData()
  weaponStore.loadMockData()
  
  console.log('已加载模拟数据')
} 