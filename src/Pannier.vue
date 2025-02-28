<template>
  <div id="app">
    <!-- Header -->
    <header id="header" class="header fixed-top d-flex align-items-center heade">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <a href="index.html" class="d-flex align-items-center">
          <img src="/lg.png" alt="logo" height="80" />
        </a>
        <nav class="navmenu" id="navmenu">
          <ul>
            <li><RouterLink :to="{ name: 'Acceuil' }">Accueil</RouterLink></li>
            <li><RouterLink :to="{ name: 'Acceuil' }">À propos</RouterLink></li>
            <li><RouterLink :to="{ name: 'Boutique' }">Boutique</RouterLink></li>
            <li><RouterLink :to="{ name: 'Transfert' }">Transfert</RouterLink></li>
            <li> <RouterLink  :to="{name:'Pannier'}"> <a>Panier</a></RouterLink></li>
            <li v-if="user && user.role === 'admin'">
              <RouterLink :to="{ name: 'Dashboard' }">Dashboard</RouterLink>
            </li>
            <li><RouterLink :to="{ name: 'Acceuil' }">Contact</RouterLink></li>
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
              <button class="delete-btn" @click="removeItem(item.id)">❌</button>
              <div class="row align-items-center">
                <img :src="`http://127.0.0.1:8000/storage/${item.image_path}`" alt="Produit" class="col-3" height="120" />
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
            <button class="btn btn-success btn-block" id="pay-btn">Achat direct</button>
            <RouterLink
              :to="{
                name: 'Formulaire',
                query: {
                  products: JSON.stringify(cartItems)
                }
              }"
              class="btn btn-success btn-block"
            >
              Paiement à la livraison
            </RouterLink>

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

    const removeItem = (itemId) => {
      cartStore.removeItem(item.id);
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
      // Construire la description avec la liste des produits
      const productsDescription = cartStore.items
        .map(item => `${item.name} (x${item.quantity}) - ${item.price} FCFA`)
        .join(" | "); 

      FedaPay.init("#pay-btn", {
        public_key: "pk_live_ohAdmJUsB0GoCerrC4U9JafZ",
        transaction: {
          amount: totalPrice.value, // Utilisation dynamique du totalPrice
          description: `Achat de produits : ${productsDescription}`,
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
      cartItems: computed(() => cartStore.items), // ✅ Assurer la réactivité
      totalPrice,
      increaseQuantity,
      decreaseQuantity,
      removeItem: cartStore.removeItem, // ✅ Appel correct de la suppression
    };
  },
};
</script>


<style scoped>
.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: red;
  transition: transform 0.2s ease-in-out;
}

.delete-btn:hover {
  transform: scale(1.2);
}


.heade {
  background-color: #1a7c1e;
}.main {
  margin-top: 120px;
  padding: 20px;
  background-color: #f8f9fa;
  text-align: center;
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

h5.text-center {
  font-size: 22px;
  font-weight: bold;
  color: #1a7c1e;
  margin-bottom: 20px;
}

.container {
  max-width: 900px;
  margin: auto;
}

ul {
  list-style: none;
  padding: 0;
}

.li_class {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  transition: transform 0.2s ease-in-out;
}

.li_class:hover {
  transform: scale(1.02);
}

.li_class img {
  width: 25%;
  height: 10%;

  object-fit: cover;
  margin-right: 15px;
}

.li_class div {
  flex-grow: 1;
  text-align: left;
}

.li_class h5 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.li_class p {
  font-size: 14px;
  color: #777;
}

.li_class .col-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.li_class .col-3 h5 {
  color: #1a7c1e;
  font-weight: bold;
}

.d-flex button {
  background-color: #1a7c1e;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 5px;
  font-size: 16px;
  transition: background 0.3s ease;
}

.d-flex button:hover {
  background-color: #145a14;
}

.d-flex input {
  text-align: center;
  font-size: 16px;
  width: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.total-box {
  margin-top: 30px;
  padding: 20px;
  background-color: #1a7c1e;
  color: white;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.total-box h5 {
  font-size: 20px;
}

.total-box h4 {
  font-size: 24px;
  font-weight: bold;
}

.btn-success {
  width: 100%;
  font-size: 18px;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.btn-success:hover {
  background-color: #145a14;
}

.text-center p {
  font-size: 18px;
  color: #777;
}

</style>
