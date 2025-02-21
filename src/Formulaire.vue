<template>
  <div class="container">
    <div class="form-wrapper">
      <h2 class="form-title">Informations de Livraison</h2>

      <form @submit.prevent="submitForm" ref="contactForm">
        <!-- Nom Complet -->
        <div class="form-group">
          <label for="name" class="form-label">Nom Complet</label>
          <input v-model="form.name" type="text" id="name" class="form-input" name="from_name" required>
        </div>

        <!-- Adresse -->
        <div class="form-group">
          <label for="address" class="form-label">Adresse</label>
          <input v-model="form.address" type="text" id="address" class="form-input" name="address" required placeholder="(précisez le quartier)">
        </div>

        <!-- Numéro de Téléphone -->
        <div class="form-group">
          <label for="phone" class="form-label">Numéro de Téléphone</label>
          <input v-model="form.phone" type="tel" id="phone" class="form-input" name="phone" required placeholder="+228 98 04 50 26">
        </div>

        <!-- Instructions supplémentaires -->
        <div class="form-group">
          <label for="instructions" class="form-label">Instructions supplémentaires</label>
          <textarea v-model="form.instructions" id="instructions" class="form-textarea" name="message" rows="4"></textarea>
        </div>

        <!-- Champ Email caché pour l'envoi EmailJS -->
        <input type="email" name="reply_to" v-model="form.email" class="form-input" placeholder="Votre Email (facultatif)">

        <!-- Nom du destinataire (fixe) -->
        <input type="text" name="to_name" value="SYDMAF Boutique en ligne" class="form-input" readonly>

        <!-- Bouton Envoyer -->
        <button type="submit" class="form-button">Commandez</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from 'vue-router';
import emailjs from "emailjs-com"; // Import EmailJS

export default {
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();

    return {
      router,
      cartStore
    };
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        phone: "",
        instructions: "",
        email: "",
        products: [],
      },
    };
  },
  mounted() {
    this.form.products = this.cartStore.items;
  },
  methods: {
    async submitForm() {
      try {
        // Envoi des données à l'API Laravel
        await axios.post("http://localhost:8000/api/livraisons", this.form);

        // Envoi de l'email via EmailJS
        const emailResponse = await emailjs.send("service_apsof8q", "template_lavz4mn", this.form, "zyC4A-UAypOO78bpR");

        if (emailResponse.status === 200) {
          alert("Commande envoyée avec succès ! Vous serez contacté sous peu.");
        }

        // Réinitialisation du formulaire
        this.form = { name: "", address: "", phone: "", instructions: "", email: "", products: [] };

        // Vider le panier
        this.cartStore.clearCart();

        // Redirection vers l'accueil
        this.router.push({ name: "Acceuil" });

      } catch (error) {
        console.error("Erreur lors de l'envoi des données ou de l'email", error);
        alert("Une erreur s'est produite lors de l'envoi de la commande.");
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

/* Input */
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
  border-color: #007bff;
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
  border-color: #007bff;
}

/* Bouton Envoyer */
.form-button {
  width: 100%;
  background-color: #007bff;
  color: #ffffff;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>
