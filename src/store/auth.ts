import { defineStore } from 'pinia'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('token') !== null,
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('userInfo') || '{}'),
  }),
  
  getters: {
    userAvatar: (state) => state.user?.avatar || '',
    userName: (state) => state.user?.name || '用户',
  },
  
  actions: {
    async login(username: string, password: string) {
      // Simulate API request
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          // For demo, only accept admin/123456
          if (username === 'admin' && password === '123456') {
            // Successful login
            const token = 'demo-token-' + Math.random().toString(36).substr(2)
            const user = {
              id: 1,
              name: 'Admin User',
              avatar: 'https://dummyimage.com/100x100/1890ff/ffffff&text=A',
              role: 'admin'
            }
            
            // Update state
            this.token = token
            this.user = user
            this.isAuthenticated = true
            
            // Store in localStorage for persistence
            localStorage.setItem('token', token)
            localStorage.setItem('userInfo', JSON.stringify(user))
            
            resolve()
          } else {
            // Failed login
            reject(new Error('用户名或密码错误'))
          }
        }, 1000) // 1s delay to simulate API
      })
    },
    
    logout() {
      // Clear state
      this.token = null
      this.user = {}
      this.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      
      // Redirect to login page
      setTimeout(() => {
        router.push('/')
      }, 0)
    },
    
    verifyAuth() {
      // In a real app, this would validate the token with the server
      return this.isAuthenticated
    }
  }
}) 