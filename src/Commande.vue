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
              <li v-if="user && user.role === 'user'"><RouterLink to="/">A propos</RouterLink></li>
              <li><RouterLink :to="{ name: 'Boutique' }">Boutique</RouterLink></li>
              <li v-if="user && user.role === 'user'"><RouterLink :to="{ name: 'Transfert' }">Transfert</RouterLink></li>
              <li v-if="user && user.role === 'user'"><RouterLink :to="{ name: 'Pannier' }">Panier</RouterLink></li>
  
              <li v-if="user && user.role === 'admin'"><RouterLink :to="{ name: 'Categories' }">Catégories</RouterLink></li>
              <li v-if="user && user.role === 'admin'"><RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink></li>
              <li v-if="user && user.role === 'admin'"><RouterLink :to="{ name: 'Commande' }">Commandes Effectuées</RouterLink></li>
  
              <li v-if="user && user.role === 'user'"><a href="#contact">Contact</a></li>
  
              <li class="dropdown">
                <a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                <ul>
                  <p class="NomUtilisateur">Mr/Mrs, <strong>{{ userName  }}</strong></p>
                  <li><RouterLink :to="{ name: 'Authentification' }">Inscription</RouterLink></li>
                  <li><RouterLink :to="{ name: 'Authentification' }">Connexion</RouterLink></li>
                  <li v-if="isAuthenticated"><button @click="handleLogout">Déconnexion</button></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>
  
      <div class="container">
        <h2 class="title">Liste des Commandes</h2>
        <div v-if="loading" class="loading">Chargement des commandes...</div>
        <div v-else>
          <div v-if="commandes.length > 0" class="commandes-list">
            <div v-for="commande in commandes" :key="commande.id" class="commande-card">
              <h3>{{ commande.name }}</h3>
              <p><strong>Adresse:</strong> {{ commande.address }}</p>
              <p><strong>Téléphone:</strong> {{ commande.phone }}</p>
              <p><strong>Instructions:</strong> {{ commande.instructions || 'Aucune' }}</p>
              <h4>Produits :</h4>
              <ul>
                <li v-for="(produit, index) in commande.products" :key="index">
                  {{ produit.name }} - Quantité: {{ produit.quantity }}
                </li>
              </ul>
            </div>
          </div>
          <div v-else class="no-data">Aucune commande trouvée.</div>
        </div>
      </div>
  
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
      const commandes = ref([]);
      const loading = ref(true);
   
      const isAuthenticated = ref(false);
      const user = ref(null);
      const cartStore = useCartStore();
  
      // Récupération des commandes depuis l'API Laravel
      const fetchCommandes = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/livraisons");
          commandes.value = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes", error);
        } finally {
          loading.value = false;
        }
      };
  
      const checkAuth = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        user.value = JSON.parse(userData);
        isAuthenticated.value = true;
        userName.value = user.value.name || "Invité";
      }
    };
  
      const userName = ref("Invité");
      if (user.value) {
        userName.value = user.value.name;
      }
  
      onMounted(() => {
        checkAuth();
        fetchCommandes();
      });
  
      return {
        commandes,
        loading,
        isAuthenticated,
        user,
        userName,
      };
    },
  };
  </script>
  
  <style scoped>

    .container {
    max-width: 800px;
    margin-top: 15%;
  
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    }
 

  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .loading {
    font-size: 18px;
    color: #777;
  }
  
  .commandes-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .commande-card {
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
    text-align: left;
  }
  
  .commande-card h3 {
    margin-bottom: 10px;
    color: #007bff;
  }
  
  .commande-card p {
    margin: 5px 0;
  }
  
  ul {
    padding-left: 20px;
  }
  
  .no-data {
    font-size: 18px;
    color: #999;
  }
  
  .NomUtilisateur {
    color: #1a7c1e;
  }
  
  #header {
    padding: 15px 0;
    background-color: green;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .navmenu ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  
  .navmenu a {
    color: white;
    font-size: 15px;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .navmenu a:hover {
    color: #d4edda;
  }
  </style>
  