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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
