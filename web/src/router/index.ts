import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProvidersView from '../views/ProvidersView.vue'
import ProviderDetailView from '../views/ProviderDetailView.vue'
import HelpView from '../views/HelpView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useAuthStore } from '@/stores/auth.ts'
import type { User } from '@/types/user'
import LoginView from '@/views/LoginView.vue'
import ChatRoomView from '@/views/ChatRoomView.vue'
import VolunteerQueueView from '@/views/VolunteerQueueView.vue'
import ChatWaiting from '@/views/ChatWaiting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/providers',
      name: 'providers',
      component: ProvidersView,
    },
    {
      path: '/providers/:id',
      name: 'provider-detail',
      component: ProviderDetailView,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/chat/waiting',
      name: 'chat-waiting',
      component: ChatWaiting,
      meta: { requiresAuth: true, roles: ['MEMBER'] }
    },
    {
      path: '/chat/:id',
      name: 'chat-room',
      component: ChatRoomView,
      props: true,
      meta: { requiresAuth: true, roles: ['MEMBER', 'VOLUNTEER'] }
    },
    {
      path: '/volunteer',
      name: 'volunteer-queue',
      component: VolunteerQueueView,
      meta: { requiresAuth: true, roles: ['VOLUNTEER'], requiresApproved: true }
    }
  ],
})

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: User['role'][]
    requiresApproved?: boolean
  }
}

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.user) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.meta.roles && auth.user && !to.meta.roles.includes(auth.user.role)) {
    return { name: 'home' }
  }
  if (to.meta.requiresApproved && auth.user && !auth.user.approved) {
    return { name: 'home' }
  }
})

export default router
