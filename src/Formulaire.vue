<template>
    <div class="container">
      <div class="form-wrapper">
        <h2 class="form-title">Informations de Livraison</h2>
        <form @submit.prevent="submitForm">
          <!-- Nom Complet -->
          <div class="form-group">
            <label for="name" class="form-label">Nom Complet</label>
            <input v-model="form.name" type="text" id="name" class="form-input" required>
          </div>
  
          <!-- Adresse -->
          <div class="form-group">
            <label for="address" class="form-label">Adresse</label>
            <input v-model="form.address" type="text" id="address" class="form-input" required placeholder="(précisez le quartier)">
          </div>
  
          <!-- Numéro de Téléphone -->
          <div class="form-group">
            <label for="phone" class="form-label">Numéro de Téléphone</label>
            <input v-model="form.phone" type="tel" id="phone" class="form-input" required placeholder="+228 98 04 50 26">
          </div>
  
          <!-- Instructions supplémentaires -->
          <div class="form-group">
            <label for="instructions" class="form-label">Instructions supplémentaires</label>
            <textarea v-model="form.instructions" id="instructions" class="form-textarea" rows="4"></textarea>
          </div>
  
          <!-- Bouton Envoyer -->
          <button type="submit" class="form-button">Commandez</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useCartStore } from "@/stores/cartStore";

  
  export default {
    data() {
      return {
        form: {
          name: "",
          address: "",
          phone: "",
          instructions: "",
          products: [], // Stocker les produits ici
        },
      };
    },
    mounted() {
      const cartStore = useCartStore();
      this.form.products = cartStore.items; // Récupérer les produits du panier
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post("http://localhost:8000/api/livraisons", this.form);
          alert("Commande envoyée avec succès ! vous serez contactes sous peu pour la livraison .");
          
          // Réinitialiser le formulaire après soumission
          this.form = { name: "", address: "", phone: "", instructions: "", products: [] };


  
          // Vider le panier après la commande
          const cartStore = useCartStore();
          cartStore.clearCart();

          // Forcer la redirection après mise à jour du DOM
          // await nextTick(); 
         
          // this.$router.push("Formulaire").catch(err => console.error("Erreur de navigation :", err));

  
        } catch (error) {
          console.error("Erreur lors de l'envoi des données", error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  /* Conteneur principal */
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  
  /* Wrapper du formulaire */
  .form-wrapper {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
  }
  
  /* Titre du formulaire */
  .form-title {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
    color: #333333;
  }
  
  /* Groupe de champs */
  .form-group {
    margin-bottom: 20px;
  }
  
  /* Label */
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #555555;
  }
  
  /* Input (champs texte) */
  .form-input {
    width: 100%;
    padding: 12px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    font-size: 14px;
    color: #333333;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #007bff; /* Couleur bleue au focus */
  }
  
  /* Textarea */
  .form-textarea {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #cccccc;
  }
  
  .form-textarea:focus {
    outline: none;
    border-color: #007bff; /* Couleur bleue au focus */
  }
  
  /* Bouton Envoyer */
  .form-button {
    width: calc(100%);
    background-color: #007bff; /* Bleu principal */
    color: #ffffff; /* Texte blanc */
    padding: 12px;
    
  }  

  </style>