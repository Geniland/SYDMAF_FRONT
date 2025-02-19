import { defineStore } from 'pinia';

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: [], // Liste des articles dans le panier
  }),
  getters: {
    totalPrice(state) {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        // Utiliser $patch pour que les changements soient réactifs
        this.$patch((state) => {
          existingItem.quantity += product.quantity || 1;
        });
      } else {
        this.$patch((state) => {
          state.items.push({
            ...product,
            quantity: product.quantity || 1,
          });
        });
      }
    },
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        this.$patch((state) => {
          item.quantity = quantity > 0 ? quantity : 1;
        });
      }
    },
  },
});
