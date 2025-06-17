import { createRouter, createWebHistory } from 'vue-router'

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
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">介绍页面</div>',
        },
      },
      {
        path: 'about',
        name: 'About',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">关于页面</div>',
        },
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
    component: {
      template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">注册页面</div>',
    },
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
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">综合测试</div>',
        },
      },
      {
        path: 'analysis',
        name: 'StudentAnalysis',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">习题分析</div>',
        },
      },
      {
        path: 'resources',
        name: 'StudentResources',
        component: {
          template: '<div style="font-size:40px;text-align:center;margin-top:20vh;">学习资源</div>',
        },
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
