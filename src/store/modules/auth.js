// store.js

const state = {
  authToken: localStorage.getItem('authToken') || null, // Carrega o token do localStorage se disponível
};

const mutations = {
  setAuthToken(state, token) {
    state.authToken = token;
    localStorage.setItem('authToken', token); // Armazena o token no localStorage
  },
  
  clearAuthToken(state) {
    state.authToken = null;
    localStorage.removeItem('authToken'); // Remove o token do localStorage
  },
};

const actions = {
  setAuthToken({ commit }, token) {
    commit('setAuthToken', token);
  },
  
  clearAuthToken({ commit }) {
    commit('clearAuthToken');
  },
};

const getters = {
  isAuthenticated: (state) => !!state.authToken, // Verifica se o usuário está autenticado
};

export default {
  state,
  mutations,
  actions,
  getters,
};
