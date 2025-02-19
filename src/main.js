

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Si vous avez besoin des scripts Bootstrap
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js'
import 'aos/demo/css/styles.css'

// Initialisation globale
AOS.init({
  offset: 120, // Décalage (en pixels) par rapport au haut de la page
  delay: 0, // Délai avant de déclencher l'animation
  duration: 1000, // Durée de l'animation (en ms)
  easing: 'ease-in-out', // Fonction d'accélération
  once: true, // Si vrai, l'animation s'exécute une seule fois
});

//  export default {
//    name: 'YourComponent',
//    mounted() {
//      AOS.init();
//    },
//  };

import './assets/vendor/glightbox/js/glightbox.min.js'
import './assets/vendor/php-email-form/validate.js'
import './assets/vendor/purecounter/purecounter_vanilla.js'
import './assets/vendor/swiper/swiper-bundle.min.js'
import './assets/vendor/imagesloaded/imagesloaded.pkgd.min.js'
import './assets/vendor/isotope-layout/isotope.pkgd.min.js'
//import './assets/vendor/aos/aos.js'
import '/src/assets/js/main.js'

//             Favicons
//import '/lg.png'
//import './assets/img/apple-touch-icon.png'

//            Vendor CSS Files
//import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/bootstrap-icons/bootstrap-icons.css'
//import './assets/vendor/aos/aos.css'
import './assets/vendor/glightbox/css/glightbox.min.css'
import './assets/vendor/swiper/swiper-bundle.min.css'

//            Main CSS File
import '/src/assets/css/main.css'
//import './assets/css/theme.min.css'



const app = createApp(App)

createApp(App).use(router).mount("#app");

app.use(router)

app.use(createPinia());

app.mount('#app')



