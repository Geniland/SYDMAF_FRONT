<template>
  <div class="container mx-auto p-6">
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
              <li v-if="user && user.role === 'admin'">
                <RouterLink :to="{ name: 'Categories' }">categories</RouterLink>
              </li>
              <li v-if="user && user.role === 'admin'">
                <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
              </li>
              <li v-if="user && user.role === 'admin'">
                        <RouterLink :to="{ name: 'Commande' }">Commandes Effectuées</RouterLink>
                        </li>
              <li v-if="user && user.role === 'user'"><a href="#contact">Contact</a></li>
              <li class="dropdown">
                            <a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
                            <ul>
                                <!-- <p class="NomUtilisateur">
                                    Mr/Mrs ,<strong >{{ userName() }}</strong>
                                </p> -->
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
    <h1 class="categories text-2xl font-bold mb-4">Gestion des Catégories</h1>
    
    <!-- Formulaire d'ajout/modification -->
    <div class="mb-4 p-4 border rounded-lg shadow-md">
      <h2 class="text-lg font-semibold mb-2">{{ isEditing ? 'Modifier' : 'Ajouter' }} une catégorie</h2>
      <input v-model="categoryName" placeholder="Nom de la catégorie" class="p-2 border rounded w-full mb-2" />
      <button 
        @click="isEditing ? updateCategory() : addCategory()" 
        class="btn-ajouter"
      >
        <i class="fas fa-plus"></i>  
        {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
      </button>

      <button v-if="isEditing" @click="cancelEdit" class="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Annuler</button>
    </div>
    
    <!-- Liste des catégories -->
    <table class="table-categories w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">ID</th>
          <th class="border p-2">Nom</th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id" class="border">
          <td class="border p-2">{{ category.id }}</td>
          <td class="border p-2">{{ category.name }}</td>
          <td class="border p-2">
            <button @click="editCategory(category)" class="btn btn-secondary text-white px-2 py-1 rounded mr-2">Modifier</button>
            <button @click="deleteCategory(category.id)" class="btn btn-danger text-white px-2 py-1 rounded">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      categories: [],
      categoryName: '',
      isEditing: false,
      editingId: null,
    };
  },
  methods: {

    checkAuth() {
      const userData = localStorage.getItem("user");
      if (userData) {
        this.user = JSON.parse(userData);
        this.isAuthenticated = true;
      }
    },
    
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/list-categories');
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Erreur lors du chargement des catégories', error);
      }
    },
    async addCategory() {
      if (!this.categoryName.trim()) return;
      try {
        await axios.post('http://127.0.0.1:8000/api/categories', { name: this.categoryName });
        this.categoryName = '';
        this.fetchCategories();
      } catch (error) {
        console.error('Erreur lors de l\'ajout', error);
      }
    },
    editCategory(category) {
      this.isEditing = true;
      this.categoryName = category.name;
      this.editingId = category.id;
    },
    async updateCategory() {
      if (!this.categoryName.trim()) return;
      try {
        await axios.put(`http://127.0.0.1:8000/api/edite-categories/${this.editingId}`, { name: this.categoryName });
        this.cancelEdit();
        this.fetchCategories();
      } catch (error) {
        console.error('Erreur lors de la modification', error);
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.categoryName = '';
      this.editingId = null;
    },
    async deleteCategory(id) {
      if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return;
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete-categories/${id}`);
        this.fetchCategories();
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.checkAuth();
  },
};
</script>

le 
<style scoped>
/* ====== Conteneur Principal ====== */
.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

/* ====== Header (Barre de navigation) ====== */
#header {
  background-color: green;
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

/* ====== Titre Principal ====== */
.categories {
  margin-top: 120px; /* Ajustement pour éviter le chevauchement avec le header */
  text-align: center;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}

/* ====== Formulaire d'Ajout/Modification ====== */
.mb-4 {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

/* ====== Boutons ====== */
.btn-ajouter {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-ajouter:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.btn-ajouter:active {
  background-color: #1e7e34;
  transform: scale(0.95);
}

.btn-secondary {
  background-color: #007bff;
}

.btn-secondary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

/* ====== Tableau ====== */
.table-categories {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
}

.table-categories th,
.table-categories td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
}

.table-categories th {
  background: #28a745;
  color: white;
}

.table-categories tr:nth-child(even) {
  background: #f2f2f2;
}

.table-categories tr:hover {
  background: #e2e6ea;
}

/* ====== Footer ====== */


.footer a {
  color: #28a745;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.social-links a {
  color: white;
  font-size: 20px;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #28a745;
}


</style>
