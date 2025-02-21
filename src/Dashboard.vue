<template>
  <div class="container mx-auto p-6">

    
    

    <div class="index-page">
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
                  <li><RouterLink :to="{ name: 'Authentification' }">Inscription</RouterLink></li>
                  <li><RouterLink :to="{ name: 'Authentification' }">Connexion</RouterLink></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div class="product-management">
        <h1>Gestion des produits</h1>

        <!-- Formulaire pour ajouter ou modifier un produit -->
        <form @submit.prevent="saveProduct" class="form-container"  enctype="multipart/form-data">
          <div class="form-group">
            <label>Nom du produit :</label>
            <input type="text" v-model="productForm.name" required placeholder="Entrez le nom du produit" />
          </div>

          <div class="form-group">
            <label>Description :</label>
            <textarea v-model="productForm.description" required placeholder="Entrez une description"></textarea>
          </div>

          <div class="form-group">
            <label>Prix :</label>
            <input type="number" v-model="productForm.price" required placeholder="Entrez le prix (en FCFA)" />
          </div>

          <div class="form-group">
            <label>Image :</label>
            <input type="file" @change="onFileChange" />
          </div>

          <div class="form-group">
            <label>Catégorie :</label>
            <select v-model="productForm.categories_id" required>
              <option value="" disabled>Sélectionnez une catégorie</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <button class="btn btn-primary" type="submit">
            {{ productForm.id ? 'Modifier' : 'Ajouter' }} le produit
          </button>
        </form>

        <!-- Liste des produits -->
        <div v-if="products.length" class="product-list">
          <h2>Liste des produits</h2>
          <table class="product-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.category.name }}</td>
                <td>
                  <button class="btn btn-secondary" @click="editProduct(product)">Modifier</button>
                  <button class="btn btn-danger" @click="deleteProduct(product.id)">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: null,
      isAuthenticated: false,
      categories: [],
      categoryName: '',
      isEditing: false,
      editingId: null,
      products: [],
      productForm: {
        id: null,
        name: "",
        description: "",
        price: "",
        image: null,
        categories_id: "",
      },
    };
  },
  created() {
    this.fetchCategories();
    this.fetchProducts();
    this.checkAuth();
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
        const response = await axios.get("http://127.0.0.1:8000/api/list-categories");
        this.categories = response.data.categories;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        this.products = response.data.produits.map(product => ({
          ...product,
          category: product.categories || { name: "Non assignée" },
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
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
    async saveProduct() {
    const formData = new FormData();
    Object.entries(this.productForm).forEach(([key, value]) => {
        formData.append(key, value);
    });

    if (this.productForm.id) {
        formData.append("_method", "PUT"); // Ajout de `_method=PUT`
    }

    console.log("Nom du produit envoyé :", formData.get("name"));

    try {
        if (this.productForm.id) {
            await axios.post(`http://127.0.0.1:8000/api/modification-produit/${this.productForm.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            await axios.post("http://127.0.0.1:8000/api/produits", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
        this.fetchProducts();
        this.resetProductForm();
    } catch (error) {
        console.error("Erreur lors de l'ajout/modification du produit :", error);
    }
},


    editProduct(product) {
      this.productForm = { ...product };
      console.log("Produit sélectionné pour modification :", this.productForm);
    },
    deleteProduct(productId) {
      if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        axios.delete(`http://127.0.0.1:8000/api/supp-produit/${productId}`).then(() => {
          this.fetchProducts();
        });
      }
    },
    resetProductForm() {
      this.productForm = {
        id: null,
        name: "",
        description: "",
        price: "",
        image: null,
        categories_id: "",
      };
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.productForm.image = file;
      }
    },
  },
};
</script>
<style scoped>
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

.product-management {
  max-width: 900px;
  margin: 20% auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-container {
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.btn-primary {
  background: #007bff;
  color: #fff;
}

button.btn-secondary {
  background: #6c757d;
  color: #fff;
}

button.btn-danger {
  background: #dc3545;
  color: #fff;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}

.product-table th,
.product-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.product-table th {
  background: #007bff;
  color: #fff;
}

.product-table tbody tr:hover {
  background: #f1f1f1;
}

footer {
 
  color: #fff;
  padding: 40px 0;
}

footer .social-links a {
  color: #fff;
  font-size: 20px;
  margin: 0 10px;
  transition: color 0.3s ease;
}

footer .social-links a:hover {
  color: #28a745;
}
</style>

