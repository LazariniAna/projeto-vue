import axios from 'axios';

const state = {
  products: [],
  categories: [],
  product: null,
};

const getters = {
  allProductsPanel: (state) => state.products,
  allCategoriesPanel: (state) => state.categories,
  singlePanel: (state) => state.product,
};

const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/products');
    commit('setProducts', response.data);
  },
  async fetchCategories({ commit }) {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    commit('setCategories', response.data);
  },
  async fetchProduct({ commit }, id) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      commit('setProduct', response.data);
    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
      // Caso ocorra algum erro na API, você pode retornar um valor nulo ou lançar um erro.
      commit('setProduct', null);
    }
  },
  
  async addProduct({ commit }, product) {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', product);
      commit('newProduct', response.data);
    } catch (error) {
      console.error('Erro ao adicionar produto', error);
    }
  },
  async updateProduct({ commit }, updatedProduct) {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct);
      commit('updateProduct', response.data);
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
    }
  },
  async deleteProduct({ commit }, id) {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      commit('removeProduct', id);
    } catch (error) {
      console.error('Erro ao excluir produto', error);
    }
  },
};

const mutations = {
  setProducts: (state, products) => (state.products = products),
  setCategories: (state, categories) => (state.categories = categories),
  setProduct: (state, product) => (state.product = product),
  newProduct: (state, product) => {
    state.products.push(product);
  },
  updateProduct: (state, updatedProduct) => {
    const index = state.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct);
    }
  },
  removeProduct: (state, id) => {
    state.products = state.products.filter(product => product.id !== id);
  },
  setProduct: (state, product) => {
    state.product = product;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
