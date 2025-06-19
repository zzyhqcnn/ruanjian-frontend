import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import TempRoute from '@/views/TempRoute.vue'

const routes = [
  {
    path: '/',
    component: () => import('@/views/LayoutPage.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/HomePageContent.vue'),
      },
      {
        path: 'intro',
        name: 'Intro',
        component: () => h(TempRoute, { title: '介绍页面' }),
      },
      {
        path: 'about',
        name: 'About',
        component: () => h(TempRoute, { title: '关于页面' }),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => h(TempRoute, { title: '注册页面' }),
  },
  {
    path: '/student',
    component: () => import('@/components/layout/StudentLayout.vue'),
    children: [
      {
        path: '',
        name: 'StudentHome',
        component: () => import('@/views/student/StudentHomePage.vue'),
      },
      {
        path: 'test',
        name: 'StudentTest',
        component: () => import('@/views/student/StudentTestPage.vue'),
      },
      {
        path: 'analysis',
        name: 'StudentAnalysis',
        component: () => h(TempRoute, { title: '习题分析' }),
      },
      {
        path: 'resources',
        name: 'StudentResources',
        component: () => h(TempRoute, { title: '学习资源' }),
      },
      {
        path: 'bookshelf',
        name: 'StudentBookshelf',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">书架</div>',
        },
      },
      {
        path: 'ai-chat',
        name: 'StudentAIChat',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">智能对话</div>',
        },
      },
      {
        path: 'interaction',
        name: 'StudentInteraction',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">师生互动</div>',
        },
      },
    ],
  },
  {
    path: '/teacher',
    component: {
      template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">教师端页面</div>',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
