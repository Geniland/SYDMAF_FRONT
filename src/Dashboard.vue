<template>
  <div class="product-management">
    <h1>Gestion des produits</h1>

    <!-- Formulaire pour ajouter ou modifier un produit -->
    <form @submit.prevent="saveProduct" class="form-container">
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

      <div>
        
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      categories: [],
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
  },
  methods: {
    async fetchProducts() {
      try {
            const response = await axios.get("http://127.0.0.1:8000/api/produits");
            this.products = response.data.produits.map(product => ({
              ...product,
              category: product.categories || { name: "Non assignée" },
            }));
            console.log("Produits assignées :", this.products); // Vérifiez ici

      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/list-categories");
        this.categories = response.data.categories;
        console.log("Catégories assignées :", this.categories); // Vérifiez ici
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    async saveProduct() {
      const formData = new FormData();
      Object.entries(this.productForm).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        if (this.productForm.id) {
          await axios.post(`http://127.0.0.1:8000/api/modification/${this.productForm.id}`, formData);
        } else {
          await axios.post("http://127.0.0.1:8000/api/produits", formData);
        }

        this.fetchProducts();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l’enregistrement du produit:", error);
      }
    },
    editProduct(product) {
      this.productForm = { ...product, categories_id: product.category.id };
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/supp-produit/${id}`);
        this.fetchProducts();
      } catch (error) {
        console.error("Erreur lors de la suppression du produit:", error);
      }
    },
    resetForm() {
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
      this.productForm.image = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.product-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h1,
h2 {
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
</style>
