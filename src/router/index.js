import { createRouter, createWebHistory } from 'vue-router';
import Acceuil from '@/Acceuil.vue';
import page1 from '@/page1.vue';
import page2 from '@/page2.vue'
import Auth from '@/Auth.vue'
import Index from '@/Index.vue';
import Boutique from '@/Boutique.vue';
import Transfert from '@/Transfert.vue';
//import NotFoundPage from './page/NotFoundPage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',name:'Acceuil',component:Index},
    {path: '/page1/:id',name: 'page1',component: page1,},
    {path: '/page2',name: 'page2',component: page2,},
    {path: '/Authentification',name:'Authentification',component:Auth},
    {path: '/Boutique',name:'Boutique',component:Boutique},
    {path: '/Transfert',name:'Transfert',component:Transfert}
    //{path: '/:pathMatch(.*)*',component:NotFoundPage}
  ],
})

export default router