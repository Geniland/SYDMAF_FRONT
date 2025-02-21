<template>
    <body class="index-page">
        <header id="header" class="header d-flex align-items-center fixed-top">
            <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <a href="index.html" class="d-flex align-items-center">
                    <img src="/lg.png" alt="logo" height="80">
                </a>
                <nav id="navmenu" class="navmenu">
                    <ul>
                        <li><RouterLink to="/">Accueil</RouterLink></li>
                        <li  v-if="user && user.role === 'user'"><RouterLink to="/">A propos</RouterLink></li>
                        <li><RouterLink :to="{ name: 'Boutique' }">Boutique</RouterLink></li>
                        <li  v-if="user && user.role === 'user'"><RouterLink :to="{ name: 'Transfert' }">Transfert</RouterLink></li>
                        <li v-if="user && user.role === 'user'"><RouterLink :to="{ name: 'Pannier' }">Panier</RouterLink></li>

                        <li v-if="user && user.role === 'admin'">
                            <RouterLink :to="{ name: 'Categories' }">categories</RouterLink>
                        </li>
                        <li v-if="user && user.role === 'admin'">
                            <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
                        </li>
                        
                        <li v-if="user && user.role === 'admin'">
                        <RouterLink :to="{ name: 'Commande' }">Commandes Effectuées</RouterLink>
                        </li>
                                <li  v-if="user && user.role === 'user'"><a href="#contact">Contact</a></li>
                        <li class="dropdown">
                            <a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                            <ul>
                                <p class="NomUtilisateur">
                                    Mr/Mrs ,<strong >{{ userName() }}</strong>
                                </p>
                                <li> <RouterLink  :to="{name:'Authentification'}"> <a >Inscription</a></RouterLink></li>
                                <li> <RouterLink  :to="{name:'Authentification'}"> <a >Connexion</a></RouterLink></li>
                                <li v-if="isAuthenticated">
                                    <button @click="handleLogout">Déconnexion</button>
                                </li>
                        
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <main class="main">
            <section id="hero" class="hero section dark-background">
                <img src="./assets/img/hero-bg-2.jpg" alt="" class="hero-bg">
            </section>

            <section id="portfolio" class="portfolio section">
                <div class="container section-title" data-aos="fade-up">
                    <h2>Boutique</h2>
                    <p>Nos produits</p>
                </div>

                <!-- Menu des catégories -->
                <div class="container text-center mb-4">
                    <button 
                        @click="fetchProduits()" 
                        class="btn btn-outline-secondary mx-2"
                        :class=" { 'btn-secondary text-white': selectedCategory === null }">
                        Tous
                    </button>
                    <button 
                        v-for="categorie in categories" 
                        :key="categorie.id" 
                        @click="fetchProduitsByCategory(categorie.id)"
                        class="btn btn-outline-primary mx-2"
                        :class="{ 'btn-primary text-white': selectedCategory === categorie.id }">
                        {{ categorie.name }}
                    </button>
                </div>

                <div class="container">
                    <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                        <div
                            v-for="produit in produits"
                            :key="produit.id"
                            class="col-lg-4 col-md-6 isotope-item">
                            <img 
                                class="portfolio-image"
                                :src="`http://127.0.0.1:8000/storage/${produit.image_path}`" 
                                :alt="produit.name"
                                onerror="this.onerror=null; this.src='/default-image.jpg';"
                            />
                            <div class="portfolio-info">
                                <h4>{{ produit.name }}</h4>
                                <p>{{ produit.description }}</p>
                                <p>Prix : {{ produit.price }} Fcfa</p>
                                <RouterLink v-if="!isAuthenticated" :to="{ name: 'Authentification' }">
                                    <button type="button">Commandez</button>
                                </RouterLink>
                                <div v-else>
                                    <button type="button" @click="addProductToCart(produit)">Ajouter au panier</button>
                                </div>
                            </div>
                        </div>
                        <p v-if="produits.length === 0" class="text-center mt-3">Aucun produit trouvé.</p>
                    </div>
                </div>
            </section>
        </main>

        <footer id="footer" class="footer dark-background">
            <div class="container footer-top">
                <div class="footer-about text-center">
                    <RouterLink :to="{ name: 'Acceuil' }">
                        <a class="logo d-flex align-items-center justify-content-center">
                            <span class="sitename">SYDMAF</span>
                        </a>
                    </RouterLink>
                    <div class="social-links d-flex mt-4 justify-content-center">
                        <a href=""><i class="bi bi-twitter-x"></i></a>
                        <a href=""><i class="bi bi-facebook"></i></a>
                        <a href=""><i class="bi bi-instagram"></i></a>
                        <a href=""><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <div class="container copyright text-center mt-4">
                Designed by <a href="#">Geni_codex</a> 
            </div>
        </footer>
    </body>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";

export default {
    name: "Boutique",
    setup() {
        const produits = ref([]);
        const categories = ref([]);
        const selectedCategory = ref(null);
        const isAuthenticated = ref(false);
        const user = ref(null);
        const cartStore = useCartStore();

        // Vérifie si l'utilisateur est authentifié et récupère ses informations
        const checkAuth = () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                user.value = JSON.parse(userData);
                isAuthenticated.value = true;
            }
        };

        // Récupère les catégories
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/list-categories");
                categories.value = response.data.categories;
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories :", error);
            }
        };

        // Récupère tous les produits
        const fetchProduits = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/produits");
                produits.value = response.data.produits;
                selectedCategory.value = null; // Réinitialisation de la sélection
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };

        // Récupère les produits par catégorie
        const fetchProduitsByCategory = async (categoryId) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/produits-par-categorie/${categoryId}`);
                produits.value = response.data.products;
                selectedCategory.value = categoryId;
            } catch (error) {
                console.error("Erreur lors de la récupération des produits par catégorie :", error);
            }
        };


        // Renvoie le nom de l'utilisateur ou "Invité" par défaut
        const userName = () => {
        return user.value ? user.value.name : "Invité";
        };

        // Ajoute un produit au panier
        const addProductToCart = (product) => {
            cartStore.addToCart(product);
            alert("Produit ajouté au panier !");
        };

        onMounted(() => {
            checkAuth();
            fetchCategories();
            fetchProduits();
        });

        return {
            produits,
            categories,
            selectedCategory,
            isAuthenticated,
            user,
            fetchProduits,
            fetchProduitsByCategory,
            addProductToCart,
            userName, 
        };
    }
};
</script>
<style scoped>

.NomUtilisateur{
        color: #1a7c1e;
    }
    
.portfolio-image {
    width: 65%;
  height: 60%;

  object-fit: cover;
  margin-right: 15px;
}

.btn {
    margin-bottom: 5px;
}

#header {

  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navmenu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.navmenu li {
  display: inline;
}

.navmenu a {
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-decoration: none;
  padding: 2px;
  transition: color 0.3s ease;
}

.navmenu a:hover {
  color: #d4edda;
}



</style>
