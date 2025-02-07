import { createRouter, createWebHistory } from 'vue-router';
import Acceuil from '@/Acceuil.vue';
import page1 from '@/page1.vue';
import page2 from '@/page2.vue'
import Auth from '@/Auth.vue'
import Index from '@/Index.vue';
import Boutique from '@/Boutique.vue';
import Transfert from '@/Transfert.vue';
import Dashboard from '@/Dashboard.vue';
import Pannier from '@/Pannier.vue';
//import NotFoundPage from './page/NotFoundPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name:'Acceuil',component:Index},
    {path: '/page1/:id',name: 'page1',component: page1,},
    {path: '/page2',name: 'page2',component: page2,},
    {path: '/Authentification',name:'Authentification',component:Auth},
    {path: '/Boutique',name:'Boutique',component:Boutique},
    {path: '/Pannier',name:'Pannier',component:Pannier},
    // {path: '/Index',name:'Index',component:Index},
    {path: '/Transfert',name:'Transfert',component:Transfert},
    { 
      path: '/Dashboard',
      name:'Dashboard',
      component:Dashboard ,
      meta: { requiresAuth: true, roles: ["admin"] },
      // meta: { requiresAdmin: true }, // Cette route nécessite un rôle d'admin
    }
    //{path: '/:pathMatch(.*)*',component:NotFoundPage}
  ],
})


// Garde globale pour les routes
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Récupère l'utilisateur depuis le localStorage
  if (to.meta.requiresAdmin) {
    if (user && user.role === 'admin') {
      next(); // Autorisé
    } else {
      alert('Accès refusé. Vous devez être administrateur pour accéder à cette page.');
      next({ name: 'Authentification' }); // Redirige vers la page d'authentification
    }
  } else {
    next(); // Aucune restriction
  }
});

export default router