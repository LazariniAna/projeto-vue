import axios from 'axios';

const state = {
  products: JSON.parse(localStorage.getItem('products')) || [],
  categories: JSON.parse(localStorage.getItem('categories')) || [],
  product: null,
};

const getters = {
  allProducts: (state) => JSON.parse(localStorage.getItem('products')) || state.products,
  allCategories: (state) => state.categories,
  singleProduct: (state) => state.product,
};

const actions = {
  async fetchProducts({ commit }) {
    if (state.products.length === 0) {
      let all = [];
      const response = await axios.get('https://fakestoreapi.com/products');
      const itemsStorage =  JSON.parse(localStorage.getItem('products'))
      console.log(itemsStorage)
      if(itemsStorage){
        all = [...response.data, ...itemsStorage]
      }else{
        all = response.data
      }
      commit('setProducts', all);
      localStorage.setItem('products', JSON.stringify(response.data)); 
    }
  },

  async fetchCategories({ commit }) {
    if (state.categories.length === 0) {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      commit('setCategories', response.data);
      localStorage.setItem('categories', JSON.stringify(response.data));
    }
  },

  async fetchProduct({ commit }, id) {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    if(!response){
      const lista = JSON.parse(localStorage.getItem('products'))
      const item = lista.find(item => item.id == id)
      commit('setProduct', item);
      
    }else{
      commit('setProduct', response.data);
    }
  },

  async addProduct({ commit }, product) {
    try {
      const response = await axios.post('https://fakestoreapi.com/products', product);
      commit('newProduct', response.data);
      
      let products = JSON.parse(localStorage.getItem('products')) || [];
      console.lo
      products.push(response.data);
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Erro ao adicionar produto', error);
    }
  },

  async updateProduct({ commit }, updatedProduct) {
    try {
      const response = await axios.put(`https://fakestoreapi.com/products/${updatedProduct.id}`, updatedProduct);
      commit('updateProduct', response.data);
      
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.map(product =>
        product.id === updatedProduct.id ? response.data : product
      );
      localStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
    }
  },

  async deleteProduct({ commit }, id) {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
  
      commit('removeProduct', id);
  
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products = products.filter(product => product.id !== id);
      localStorage.setItem('products', JSON.stringify(products)); 
  
      window.location.reload();
  
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
