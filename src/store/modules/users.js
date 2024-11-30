import axios from 'axios';
import { validateUser } from '../../utils/validation';
import { handleError } from '../../utils/errorHandler';

const API_URL = 'https://fakestoreapi.com/users';

const state = {
  users: JSON.parse(localStorage.getItem('users')) || [],
  user: null,
};

const getters = {
  allUsers: (state) => state.users,
  user: (state) => state.user,
  singleUser: (state) => state.user,
};

const actions = {
  async fetchUsers({ commit }) {
    if (state.users.length === 0) {
      const response = await axios.get(API_URL);
      commit('setUsers', response.data);
      localStorage.setItem('users', JSON.stringify(response.data));
    }
  },

  async fetchUser({ commit }, id) {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find((user) => user.id === id);
    console.log(user)
    if (user) {
      commit('setUser', user); 
    } else {
      if(id != "new"){
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response)
        commit('setUser', response.data);
        storedUsers.push(response.data);
        localStorage.setItem('users', JSON.stringify(storedUsers)); 
      }
    }
  },

  async addUser({ commit }, user) {
    try {
      const response = await axios.post(API_URL, user);
      commit('newUser', response.data);
      console.log(response.data)
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users)); 
    } catch (error) {
      console.log(error)
    }
  },

  async updateUser({ commit }, updatedUser) {
    try {
      const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
      commit('updateUser', response.data);
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users = users.map(user =>
        user.id === updatedUser.id ? response.data : user
      );
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.log(error);
    }
  },

  async deleteUser({ commit }, id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      commit('removeUser', id);

      let users = JSON.parse(localStorage.getItem('users')) || [];
      users = users.filter(user => user.id !== id);
      localStorage.setItem('users', JSON.stringify(users)); 
    } catch (error) {
      handleError(error);
    }
  },
};

const mutations = {
  setUsers: (state, users) => {
    state.users = users;
  },
  setUser: (state, user) => {
    state.user = user;
  },
  newUser: (state, user) => {
    state.users.push(user);
  },
  updateUser: (state, updatedUser) => {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  removeUser: (state, id) => {
    state.users = state.users.filter(user => user.id !== id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
