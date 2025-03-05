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
                            <RouterLink :to="{ name: 'Dashboard' }">Produits</RouterLink>
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
 <main class="main-container">
        <!-- Section des Catégories -->
        <section id="hero" class="hero section dark-background">
                <img src="./assets/img/hero-bg-2.jpg" alt="" class="hero-bg">
        </section>
        <section class="categories-container">
            <button 
                @click="fetchProduits()" 
                class="category-btn" 
                :class="{ 'active': selectedCategory === null }">
                Tous
            </button>
            <button 
                v-for="categorie in categories" 
                :key="categorie.id" 
                @click="fetchProduitsByCategory(categorie.id)" 
                class="category-btn" 
                :class="{ 'active': selectedCategory === categorie.id }">
                {{ categorie.name }}
            </button>
        </section>

        <!-- Section des Produits -->
        <section class="products-grid">
            <div v-for="produit in produits" :key="produit.id" class="product-card">
                <img 
                    class="product-image" 
                    :src="`http://127.0.0.1:8000/storage/${produit.image_path}`" 
                    :alt="produit.name"
                    @click="openImageModal(produit)"
                    onerror="this.onerror=null; this.src='/default-image.jpg';"/>
                <div class="product-info">
                    <h4>{{ produit.name }}</h4>
                    <p class="description">{{ produit.description }}</p>
                    <p class="price">{{ produit.price }} Fcfa</p>
                    <button v-if="isAuthenticated" @click="addProductToCart(produit)" class="btn-add">Ajouter au panier</button>
                    <RouterLink v-else :to="{ name: 'Authentification' }" class="btn-login">Se connecter</RouterLink>
                </div>
            </div>
            <p v-if="produits.length === 0" class="no-products">Aucun produit trouvé.</p>

            <div v-if="isModalOpen" class="modal">
            <div class="modal-content">
                <button class="Btn-Traitement"><span class="close" @click="isModalOpen = false">&times;</span></button>
                <img :src="selectedProduct.image_path ? `http://127.0.0.1:8000/storage/${selectedProduct.image_path}` : '/default-image.jpg'" class="modal-image" />
                <h3>{{ selectedProduct.name }}</h3>
                <p>{{ selectedProduct.description }}</p>
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
        const isModalOpen = ref(false);
        const selectedProduct = ref({});


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

        const openImageModal = (product) => {
            console.log("Ouverture du modal pour :", product);
            selectedProduct.value = product;
            isModalOpen.value = true;
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
            selectedProduct,
            openImageModal,
            isModalOpen,
        };
    }
};
</script>
<style scoped>

.Btn-Traitement{
    background: #ffffff;
    color: rgb(0, 0, 0);
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    margin-top: 5px;
    transition: background 0.3s;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    text-align: center;
}

.modal-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
}


.main-container {
   
    
    margin: auto;
}

.categories-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
}

.category-btn {
    background: #f8f9fa;
    border: 1px solid #ddd;
    padding: 10px 15px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.category-btn.active, .category-btn:hover {
    background: #007bff;
    color: white;
    border-color: #007bff;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}

.product-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 15px;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-image {
    width: 100%;
    height: 50%;
    object-fit: cover;
    border-bottom: 1px solid #eeeeee;
}

.product-info {
    padding: 10px;
}

.description {
    font-size: 14px;
    color: #666;
}

.price {
    font-weight: bold;
    color: #007bff;
    margin: 10px 0;
}

.btn-add, .btn-login {
    background: #28a745;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    margin-top: 5px;
    transition: background 0.3s;
}

.btn-add:hover { background: #218838; }
.btn-login { background: #007bff; }
.btn-login:hover { background: #0056b3; }

.no-products {
    text-align: center;
    color: #888;
    margin-top: 20px;
}

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
  padding: 3px;
  transition: color 0.3s ease;
}

.navmenu a:hover {
  color: #d4edda;
}



</style>
