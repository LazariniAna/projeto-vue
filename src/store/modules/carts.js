import axios from 'axios';

const state = {
  carts: JSON.parse(localStorage.getItem('carts')) || [], // Inicializa com o carrinho do localStorage
  cartDetails: {}, // Detalhes do carrinho individual
};

const getters = {
  allCarts: (state) => state.carts,
  cartDetails: (state) => state.cartDetails,
};

const actions = {
  async createCart({ commit, state }, newCart) {
    try {
      const newCartId = state.carts.length + 1;
      const cartWithId = { ...newCart, id: newCartId };

      state.carts.push(cartWithId); 
      commit('updateCarts', state.carts); 
      localStorage.setItem('carts', JSON.stringify(state.carts)); 

      return Promise.resolve();
    } catch (error) {
      console.error("Erro ao criar carrinho:", error);
      return Promise.reject(error); 
    }
  },

  async updateCart({ commit, state }, { cartId, products }) {
    try {
      const cartIndex = state.carts.findIndex(cart => cart.id === cartId);
      if (cartIndex !== -1) {
        state.carts[cartIndex].products = products; 
        commit('updateCart', state.carts[cartIndex]); 
        console.log(state.carts)
        localStorage.setItem('carts', JSON.stringify(state.carts)); 

        return Promise.resolve();
      } else {
        throw new Error("Carrinho não encontrado");
      }
    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error);
      return Promise.reject(error);
    }
  },
  async fetchCarts({ commit }) {
    if (state.carts.length === 0) {
      const response = await axios.get('https://fakestoreapi.com/carts');
      commit('setCarts', response.data);
      localStorage.setItem('carts', JSON.stringify(response.data)); 
    }
  },

  async fetchCartDetails({ commit }, cartId) {
    const cart = state.carts.find(cart => cart.id === cartId);
    if (cart) {
      commit('setCartDetails', cart);
    } else {
      const response = await axios.get(`https://fakestoreapi.com/carts/${cartId}`);
      commit('setCartDetails', response.data);
    }
  },

  async addItemToCart({ commit, state }, { cartId, productId, quantity }) {
    const cartIndex = state.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = state.carts[cartIndex];
      const existingItem = cart.products.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      
      commit('updateCart', cart);
      localStorage.setItem('carts', JSON.stringify(state.carts)); 
    } else {
      console.error('Carrinho não encontrado');
    }
  },

  async removeItemFromCart({ commit, state }, { cartId, productId }) {
    const cartIndex = state.carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = state.carts[cartIndex];
      cart.products = cart.products.filter(item => item.productId !== productId);
      commit('updateCart', cart);
      localStorage.setItem('carts', JSON.stringify(state.carts)); 
      console.error('Carrinho não encontrado');
    }
  },

};

const mutations = {
  setCarts: (state, carts) => {
    state.carts = carts;
  },

  setCartDetails: (state, cart) => {
    state.cartDetails = cart;
  },

  updateCarts: (state, carts) => {
    state.carts = carts;
  },
  updateCart: (state, updatedCart) => {
    const cartIndex = state.carts.findIndex(cart => cart.id === updatedCart.id);
    if (cartIndex !== -1) {
      state.carts.splice(cartIndex, 1, updatedCart); 
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
