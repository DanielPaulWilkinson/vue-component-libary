import { createRouter, createWebHistory } from 'vue-router';
import Coffee from '../views/Coffee.vue';

const router = createRouter({
  linkActiveClass: "selected",
  linkExactActiveClass: "selected",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'coffee',
      component: Coffee
    }, 
  ]
});

export default router;
