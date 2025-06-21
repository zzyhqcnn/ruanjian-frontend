import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import TempRoute from '@/views/TempRoute.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
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
    meta: {
      title: '登录',
      requiresAuth: false,
    },
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
        path: 'dashboard',
        name: 'StudentDashboard',
        component: () => h(TempRoute, { title: '学生仪表盘' }),
        meta: {
          title: '学生仪表盘',
          requiresAuth: true,
        },
      },
      {
        path: 'test',
        name: 'StudentTest',
        component: () => import('@/views/student/StudentTestPage.vue'),
      },
      {
        path: 'analysis',
        name: 'StudentAnalysis',
        component: () => import('@/views/student/StudentAnalysisPage.vue'),
        meta: {
          title: '习题分析',
          requiresAuth: true,
        },
      },
      {
        path: 'resources',
        name: 'StudentResources',
        component: () => import('@/views/student/StudyResourcesPage.vue'),
        meta: {
          title: '学习资源',
          requiresAuth: true,
        },
      },
      {
        path: 'bookshelf',
        name: 'StudentBookshelf',
        component: () => import('@/views/student/StudentBookshelfPage.vue'),
      },
      {
        path: 'ai-chat',
        name: 'StudentAIChat',
        component: () => import('@/views/student/StudentAIChatPage.vue'),
      },
      {
        path: 'interaction',
        name: 'StudentInteraction',
        component: () => import('@/views/student/StudentInteractionPage.vue'),
        meta: {
          title: '师生互动',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/teacher',
    component: () => import('@/components/layout/TeacherLayout.vue'),
    children: [
      {
        path: '',
        name: 'TeacherHome',
        component: () => import('@/views/teacher/TeacherHomePage.vue'),
        meta: {
          title: '教师首页',
          requiresAuth: true,
        },
      },
      {
        path: 'prepare',
        name: 'TeacherPrepare',
        component: () => h(TempRoute, { title: '智能备课' }),
        meta: {
          title: '智能备课',
          requiresAuth: true,
        },
      },
      {
        path: 'analysis',
        name: 'TeacherAnalysis',
        component: () => h(TempRoute, { title: '学情分析' }),
        meta: {
          title: '学情分析',
          requiresAuth: true,
        },
      },
      {
        path: 'assignment',
        name: 'TeacherAssignment',
        component: () => h(TempRoute, { title: '作业布置' }),
        meta: {
          title: '作业布置',
          requiresAuth: true,
        },
      },
      {
        path: 'ai-chat',
        name: 'TeacherAIChat',
        component: () => h(TempRoute, { title: '智能对话' }),
        meta: {
          title: '智能对话',
          requiresAuth: true,
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `智学平台 - ${to.meta.title}`
  }

  // 后续可添加权限验证逻辑
  next()
})

export default router
