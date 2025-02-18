<template>
    <div>
      <form @submit.prevent="submitTransaction">
            <div>
            <label for="type">Type de transaction</label>
            <select v-model="transaction.type" id="type">
                <option value="BUY">Achat</option>
                <option value="SELL">Vente</option>
            </select>
            </div>
            
            <div>
            <label for="crypto_currency">Cryptomonnaie</label>
            <select v-model="transaction.crypto_currency" id="crypto_currency">
                <option value="BTC">Bitcoin</option>
                <option value="ETH">Ethereum</option>
            </select>
            </div>
            
            <div>
            <label for="fiat_amount">Montant (en XOF)</label>
            <input type="number" v-model="transaction.fiat_amount" id="fiat_amount" required min="500">
            </div>
            
            <div>
            <label for="address">Adresse de portefeuille</label>
            <input type="text" v-model="transaction.address" id="address" placeholder="Entrez l'adresse de votre portefeuille" required>
            </div>
            
            <div>
            <label for="phone_number">Numéro de téléphone</label>
            <input type="text" v-model="transaction.phone_number" id="phone_number" placeholder="22890909000" required>
            </div>
            
            <div>
            <label for="payment_method">Méthode de paiement</label>
            <select v-model="transaction.payment_method" id="payment_method">
                <option value="TMONEY">TMoney</option>
                <option value="FLOOZ">Flooz</option>
                <option value="ORANGE">Orange Money</option>
            </select>
            </div>
    
            <button type="submit">Soumettre la transaction</button>
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
          const response = await axios.post('http://127.0.0.1:8000/api/transaction', this.transaction);
          alert('Transaction réussie: ' + response.data.status);
        } catch (error) {
          console.error('Erreur lors de la transaction: ' + error);
        }
      }
    }
  };
  
  </script>
  
  
  <style scoped>
  .trade-form {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .payment-methods {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .custom-option {
    padding: 10px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .custom-option img {
    width: 40px;
    height: 40px;
  }
  
  .custom-option:hover,
  .custom-option.selected {
    background-color: #f0f0f0;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  input,
  select,
  button {
    width: 100%;
    padding: 12px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
  
  button {
    background-color: #27ae60;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #219150;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  </style>
  