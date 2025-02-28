<template>
  <div class="trade-container">
    <h2 class="form-title">Effectuer une transaction</h2>
    <form @submit.prevent="submitTransaction" class="trade-form">
      
      <div class="form-group">
        <label for="type">Type de transaction</label>
        <select v-model="transaction.type" id="type">
          <option value="BUY">Achat</option>
          <option value="SELL">Vente</option>
        </select>
      </div>

      <div class="form-group">
        <label for="crypto_currency">Cryptomonnaie</label>
        <select v-model="transaction.crypto_currency" id="crypto_currency">
          <option value="BTC">Bitcoin</option>
          <option value="ETH">Ethereum</option>
        </select>
      </div>

      <div class="form-group">
        <label for="fiat_amount">Montant (en XOF)</label>
        <input type="number" v-model="transaction.fiat_amount" id="fiat_amount" required min="500">
      </div>

      <div class="form-group">
        <label for="address">Adresse de portefeuille</label>
        <input type="text" v-model="transaction.address" id="address" placeholder="Entrez l'adresse de votre portefeuille" required>
      </div>

      <div class="form-group">
        <label for="phone_number">Numéro de téléphone</label>
        <input type="text" v-model="transaction.phone_number" id="phone_number" placeholder="22890909000" required>
      </div>

      <div class="form-group">
        <label for="payment_method">Méthode de paiement</label>
        <select v-model="transaction.payment_method" id="payment_method">
          <option value="TMONEY">TMoney</option>
          <option value="FLOOZ">Flooz</option>
          <option value="ORANGE">Orange Money</option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Soumettre la transaction</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      transaction: {
        type: 'BUY',
        crypto_currency: 'BTC',
        fiat_amount: null,
        address: '',
        phone_number: '',
        payment_method: 'TMONEY',
      }
    };
  },
  methods: {
    async submitTransaction() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://127.0.0.1:8000/api/transaction", this.transaction, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Transaction réussie: " + response.data.status);
      } catch (error) {
        console.error("Erreur lors de la transaction: ", error.response?.data || error);
      }
    }
  }
};
</script>

<style scoped>
.trade-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

.trade-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.submit-btn {
  background-color: #27ae60;
  color: white;
  font-size: 18px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.submit-btn:hover {
  background-color: #219150;
}
</style>
