import { createRouter, createWebHistory } from 'vue-router';
// import Acceuil from '@/Acceuil.vue';
import page1 from '@/page1.vue';
import page2 from '@/page2.vue'
import Auth from '@/Auth.vue'
import Index from '@/Index.vue';
import Boutique from '@/Boutique.vue';
import Transfert from '@/Transfert.vue';
import Dashboard from '@/Dashboard.vue';
import Pannier from '@/Pannier.vue';
import TradeForm from '@/TradeForm.vue';
import Categories from '@/Categories.vue';
import Formulaire from '@/Formulaire.vue';
import Commande from '@/Commande.vue';
//import NotFoundPage from './page/NotFoundPage'

const routes = [
    { path: '/', name: 'Acceuil', component: Index },
    { path: '/page1/:id', name: 'page1', component: page1 },
    { path: '/page2', name: 'page2', component: page2 },
    { path: '/Authentification', name: 'Authentification', component: Auth },
    { path: '/Boutique', name: 'Boutique', component: Boutique },
    { path: '/Formulaire', name: 'Formulaire', component: Formulaire },
    { path: '/Pannier', name: 'Pannier', component: Pannier },
    { path: '/Transfert', name: 'Transfert', component: Transfert },

    // 🔒 Routes protégées (admin uniquement)
    { 
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true, roles: ["admin"] },
    },
    { 
      path: '/Categories',
      name: 'Categories',
      component: Categories,
      meta: { requiresAuth: true, roles: ["admin"] },
    },
    { 
      path: '/Commande',
      name: 'Commande',
      component: Commande,
      meta: { requiresAuth: true, roles: ["admin"] },
    },
    { 
      path: '/TradeForm',
      name: 'TradeForm',
      component: TradeForm,
      meta: { requiresAuth: true, roles: ["admin"] },
    },
    // { path: '/:pathMatch(.*)*', component: NotFoundPage } // Pour gérer les erreurs 404
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 🔐 Garde globale pour protéger les routes
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')); // Récupère l'utilisateur stocké
  const isAuthenticated = !!user; // Vérifie s'il est connecté
  const userRole = user?.role || '';

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      alert("Vous devez être connecté pour accéder à cette page.");
      next({ name: 'Authentification' }); // Redirection vers login
    } else if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      alert("Accès refusé. Vous n'avez pas les permissions nécessaires.");
      next('/'); // Redirection vers l'accueil si non autorisé
    } else {
      next(); // Autorisation accordée
    }
  } else {
    next(); // Aucune restriction
  }
});

export default router;
