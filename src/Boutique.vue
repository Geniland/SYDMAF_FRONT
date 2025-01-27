<template>
    <body class="index-page">

        <header id="header" class="header d-flex align-items-center fixed-top">
            <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                
            <a href="index.html" class=" d-flex align-items-center">
                <!-- Uncomment the line below if you also wish to use an image logo -->
                <!-- <img src="assets/img/logo.png" alt=""> -->
                <img src="/lg.png" alt="logo" height="80">
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                <li> <RouterLink  to="/"> <a >Accueil</a></RouterLink></li>
                <li> <RouterLink  to="/"> <a >A propos</a></RouterLink></li>
                <!-- <li><a href="#features">Features</a></li> -->
                <li> <RouterLink  :to="{name:'Boutique'}"> <a >Boutique</a></RouterLink></li>
                <li> <RouterLink  :to="{name:'Transfert'}"> <a >Transfert</a></RouterLink></li>
                <li> <RouterLink  :to="{name:'Pannier'}"> <a>Panier</a></RouterLink></li>
                <!--<li><a href="TA.html">Transfert</a></li>-->
                <!-- <li><a href="#team">Team</a></li> -->
                <li><a href="#contact">Contact</a></li>
                <!-- <li><a href="#pricing">Pricing</a></li> -->
                <li class="dropdown"><a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                        <li> <RouterLink  :to="{name:'Authentification'}"> <a >Inscription</a></RouterLink></li>
                        <li> <RouterLink  :to="{name:'Authentification'}"> <a >Connexion</a></RouterLink></li>
                      
            
                    </ul>
                </li>
                
                </ul>
                <!--<i class="mobile-nav-toggle d-xl-none bi bi-list"></i>-->
                <div class="btn-group dropstart d-xl-none ">
                    <!--<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropstart
                    </button>-->
                    <i class="mobile-nav-toggle d-xl-none bi bi-list btn  " data-bs-toggle="dropdown" aria-expanded="false" type="button"></i>
                    <ul class="dropdown-menu">
                        <li><RouterLink to="/"><a href="#hero" class="active">Accueil</a></RouterLink></li>
                        <!--<li><RouterLink to="/"><a href="#hero" >A propos</a></RouterLink></li>-->
                        <!--<li> <RouterLink :to="{name:'Boutique'}"> <a>Boutique</a></RouterLink></li>-->
                        <li><RouterLink :to="{name:'Transfert'}"> <a>Transfert</a></RouterLink></li>
                        <li class="ms-3"><a href="#contact">Contact</a></li>
                        <li><RouterLink :to="{name:'Authentification'}"> <a>Authentification</a></RouterLink></li>
                    </ul>
                </div>
            </nav>

            </div>
        </header>

        <main class="main">

            <!-- Hero Section -->
            <section id="hero" class="hero section dark-background">
            <img src="./assets/img/hero-bg-2.jpg" alt="" class="hero-bg">
            <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                <defs>
                <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
                </defs>
                <g class="wave1">
                <use xlink:href="#wave-path" x="50" y="3"></use>
                </g>
                <g class="wave2">
                <use xlink:href="#wave-path" x="50" y="0"></use>
                </g>
                <g class="wave3">
                <use xlink:href="#wave-path" x="50" y="9"></use>
                </g>
            </svg>
            </section><!-- /Hero Section -->

        

            
            <section id="portfolio" class="portfolio section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>Boutique</h2>
                    <p>Nos produits</p>
                    </div>
                    <div class="container">
                    <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                        <div
                            v-for="produit in produits"
                            :key="produit.id"
                            class="col-lg-4 col-md-6 isotope-item">

                            <img  class="portfolio-image"
                                :src="`http://127.0.0.1:8000/storage/${produit.image_path}?v=${Date.now()}`" 
                                :alt="produit.name"
                                
                            />
                            
                            <div class="portfolio-info">
                                <h4>{{ produit.name }}</h4>
                                <p>{{ produit.description }}</p>
                                <p>Prix : {{ produit.price }} Fcfa</p>
                                 <!-- Bouton de commande affiché uniquement si l'utilisateur n'est pas connecté -->
                                <RouterLink v-if="!isAuthenticated" :to="{ name: 'Authentification' }">
                                    <button type="button">Commandez</button>
                                </RouterLink>

                                <!-- Message ou autre élément pour les utilisateurs connectés -->
                                <div v-else>
                                    <button type="button" @click="addProductToCart(produit)">Ajouter au panier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Contact Section -->
            <section id="contact" class="contact section">

            <!-- Section Title -->
            <div class="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <div><span>Check Our</span> <span class="description-title">Contact</span></div>
            </div><!-- End Section Title -->

            <div class="container" data-aos="fade" data-aos-delay="100">

                <div class="row gy-4">

                

                <div class="col-lg-8">
                    <form action="forms/contact.php" method="post" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
                    <div class="row gy-4">

                        <div class="col-md-6">
                        <input type="text" name="name" class="form-control" placeholder="Your Name" required>
                        </div>

                        <div class="col-md-6 ">
                        <input type="email" class="form-control" name="email" placeholder="Your Email" required>
                        </div>

                        <div class="col-md-12">
                        <input type="text" class="form-control" name="subject" placeholder="Subject" required>
                        </div>

                        <div class="col-md-12">
                        <textarea class="form-control" name="message" rows="6" placeholder="Message" required></textarea>
                        </div>

                        <div class="col-md-12 text-center">
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">Your message has been sent. Thank you!</div>

                        <button type="submit">Send Message</button>
                        </div>

                    </div>
                    </form>
                </div><!-- End Contact Form -->

                <div class="col-lg-4">
                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                    <i class="bi bi-geo-alt flex-shrink-0"></i>
                    <div>
                        <h3>Address</h3>
                        <p>A108 Adam Street, New York, NY 535022</p>
                    </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                    <i class="bi bi-telephone flex-shrink-0"></i>
                    <div>
                        <h3>Call Us</h3>
                        <p>+228 91404949</p>
                    </div>
                    </div><!-- End Info Item -->

                    <div class="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                    <i class="bi bi-envelope flex-shrink-0"></i>
                    <div>
                        <h3>Email Us</h3>
                        <p>info@sydmaf.com</p>
                    </div>
                    </div><!-- End Info Item -->

                </div>

                </div>

            </div>

            </section><!-- /Contact Section -->

        </main>

        <footer id="footer" class="footer dark-background">

            <div class="container footer-top">
            <div class="row gy-12">
                <div class="footer-about">
                <RouterLink :to="{name:'Acceuil'}">
                <a class="logo d-flex align-items-center text-center">
                    <span class="sitename">SYDMAF</span>
                </a>
                </RouterLink>
            
                <div class="social-links d-flex mt-4">
                    <a href=""><i class="bi bi-twitter-x"></i></a>
                    <a href=""><i class="bi bi-facebook"></i></a>
                    <a href=""><i class="bi bi-instagram"></i></a>
                    <a href=""><i class="bi bi-linkedin"></i></a>
                </div>
                </div>

            </div>
            </div>

            <div class="container copyright text-center mt-4">
            <div class="#">
                Designed by <a href="#">Geni_codex</a> 
            </div>
            </div>

        </footer>

        <!-- Scroll Top -->
        <a href="#" id="scroll-top" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

        <!-- Preloader 
        <div id="preloader"></div> -->

        <!-- Vendor JS Files
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/vendor/php-email-form/validate.js"></script>
        <script src="assets/vendor/aos/aos.js"></script>
        <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
        
        <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
        <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
 -->
        <!-- Main JS File
        <script src="assets/js/main.js"></script> -->

    </body>

</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore"; // Assurez-vous que le chemin du store est correct

export default {
  name: "Boutique",
  setup() {
    const produits = ref([]); // Liste des produits
    const isAuthenticated = ref(false); // Statut d'authentification
    const errorMessage = ref(""); // Message d'erreur
    const cartStore = useCartStore(); // Utilisation du store

    // Vérifie si un utilisateur est connecté
    const checkAuth = () => {
      const userData = localStorage.getItem("user");
      isAuthenticated.value = !!userData; // true si userData existe
    };

    // Récupération des produits depuis l'API
    const fetchProduits = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        produits.value = response.data.produits;
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        errorMessage.value =
          "Impossible de récupérer les produits. Veuillez réessayer plus tard.";
      }
    };

    // Ajout d'un produit au panier
    const addProductToCart = (product) => {
      const imageUrl = `http://127.0.0.1:8000/storage/${product.image_path}?v=${Date.now()}`;
      cartStore.addToCart({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: imageUrl,
      });
      alert("Produit ajouté au panier !");
    };

    // Appels au montage du composant
    onMounted(() => {
      checkAuth();
      fetchProduits();
    });

    return {
      produits,
      isAuthenticated,
      errorMessage,
      addProductToCart,
    };
  },
};
</script>



<style scoped>

.portfolio-image {
  width: 100%; /* Rend l'image responsive par rapport à son conteneur */
  height: 200px; /* Fixe la hauteur pour une taille universelle */
  object-fit: cover; /* Assure que l'image s'adapte à la taille sans déformation */
  border-radius: 10px; /* Facultatif : pour un effet arrondi */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Facultatif : ajoute un léger ombrage */
}

.detail{
    width: 100%;
    margin: 10px ;
    margin-top: 10%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

}

.feature {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.feature:last-child {
    margin-bottom: 0;
}

.feature .icon {
    flex: 0 0 60px;
    height: 60px;
    margin-right: 20px;
}

.feature .icon img {
    width: 100%;
    height: 100%;
}

.feature .text {
    flex: 1;
}

.feature h2 {
    font-size: 1.4rem;
    color: #003366;
    margin-bottom: 10px;
}

.feature p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
}

@media (max-width: 768px) {
    .container {
        width: 90%;
    }

    .feature {
        flex-direction: column;
        align-items: flex-start;
    }

    .feature .icon {
        margin-bottom: 15px;
    }
}

/* Bouton de pays */
.country-button {
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.country-button:hover {
    background-color: #f0f0f0;
    transform: translateY(-5px);
}

.flag-icon {
    width: 30px;
    height: 30px;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
}

.country-button span {
    font-size: 1rem;
    font-weight: normal;
}

.icon-chevron {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
}

/* Responsivité */
@media (max-width: 768px) {
    .col {
        flex: 1 1 100%;
    }
}

</style>