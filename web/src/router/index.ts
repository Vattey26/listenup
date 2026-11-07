import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProvidersView from '../views/ProvidersView.vue'
import ProviderDetailView from '../views/ProviderDetailView.vue'
import HelpView from '../views/HelpView.vue'
import RegisterView from '../views/RegisterView.vue'
import NotFoundView from '../views/NotFoundView.vue'

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
  ],
})

export default router
