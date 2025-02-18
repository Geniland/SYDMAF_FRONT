<template>
  <div id="app">
    <!-- Header -->
    <header class="header fixed-top d-flex align-items-center heade">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <a href="index.html" class="d-flex align-items-center">
          <img src="/lg.png" alt="logo" height="80" />
        </a>
        <nav class="navmenu">
          <ul>
            <li><RouterLink :to="{ name: 'Acceuil' }">Accueil</RouterLink></li>
            <li><RouterLink :to="{ name: 'Acceuil' }">À propos</RouterLink></li>
            <li><RouterLink :to="{ name: 'Boutique' }">Boutique</RouterLink></li>
            <li><RouterLink :to="{ name: 'Transfert' }">Transfert</RouterLink></li>
            <li> <RouterLink  :to="{name:'Pannier'}"> <a>Panier</a></RouterLink></li>
            <li v-if="user && user.role === 'admin'">
              <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
            </li>
            <li><a href="index.html">Contact</a></li>
            <li class="dropdown">
              <a href="#"><span>Authentification</span> <i class="bi bi-chevron-down toggle-dropdown"></i></a>
              <ul>
                <li><RouterLink :to="{ name: 'Authentification' }">Inscription</RouterLink></li>
                <li><RouterLink :to="{ name: 'Authentification' }">Connexion</RouterLink></li>
                <li v-if="isAuthenticated">
                  <button @click="handleLogout">Déconnexion</button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <div>
        <h5 class="text-center">Liste de vos produits sélectionnés :</h5>
        <div class="container">
          <ul>
            <li
              v-for="item in cartItems"
              :key="item.id"
              class="li_class border-top border-2 border-success"
            >
              <div class="row align-items-center">
                <img :src="item.image" alt="Produit" class="col-3" height="120" />
                <div class="col-6">
                  <h5 class="text-dark">{{ item.name }}</h5>
                  <p class="text-dark">{{ item.description }}</p>
                </div>
                <div class="col-3">
                  <h5 class="text-dark">{{ item.price }} FCFA</h5>
                  <div class="d-flex justify-content-center align-items-center">
                    <button class="btn btn-sm" @click="decreaseQuantity(item)">-</button>
                    <input
                      type="number"
                      :value="item.quantity"
                      @input="updateQuantity(item, $event.target.value)"
                      class="form-control mx-2"
                      style="width: 60px;"
                    />
                    <button class="btn btn-sm" @click="increaseQuantity(item)">+</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="cartItems.length > 0" class="total-box shadow-lg">
            <h5>Total :</h5>
            <h4>{{ totalPrice }} FCFA</h4>
            <button class="btn btn-success btn-block" id="pay-btn">Acheter</button>
          </div>
          <div v-else class="text-center">
            <p>Votre panier est vide.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { computed, onMounted, watch } from "vue";

function loadFedaPayScript(callback) {
  const script = document.createElement("script");
  script.src = "https://cdn.fedapay.com/checkout.js?v=1.1.2";
  script.async = true;
  script.onload = callback; // Appelé lorsque le script est chargé
  document.body.appendChild(script);
}

export default {
  setup() {
    const cartStore = useCartStore();

    const increaseQuantity = (item) => {
      cartStore.updateQuantity(item.id, item.quantity + 1);
    };

    const decreaseQuantity = (item) => {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.id, item.quantity - 1);
      } else {
        cartStore.removeItem(item.id);
      }
    };

    const totalPrice = computed(() => cartStore.totalPrice);

    const initializeFedaPay = () => {
      if (typeof FedaPay !== "undefined") {
        FedaPay.init("#pay-btn", {
          public_key: "pk_live_ohAdmJUsB0GoCerrC4U9JafZ",
          transaction: {
            amount: totalPrice.value, // Utilisation dynamique du totalPrice
            description: "Acheter mes produits",
          },
        });
      } else {
        console.error("FedaPay is not defined. Make sure the script is loaded.");
      }
    };

    onMounted(() => {
      loadFedaPayScript(() => {
        console.log("FedaPay script loaded.");
        initializeFedaPay();
      });
    });

    // Regarder les changements dans le totalPrice et réinitialiser FedaPay
    watch(totalPrice, () => {
      initializeFedaPay();
    });

    return {
      cartItems: cartStore.items,
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
    };
  },
};
</script>


<style scoped>
.heade {
  background-color: #1a7c1e;
}
.main {
  margin-top: 100px;
  text-align: center;
}
.li_class {
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.total-box {
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
