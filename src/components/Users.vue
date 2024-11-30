<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <h1 class="text-center mb-5 text-3xl font-bold">Usuários</h1>
      <div style="gap: 5px; display: flex;">
        <button style="border-radius: 15px; background-color: #2D3047; color: white; padding: 5px; width: 100px; height: 50px;" @click="cleanCache">
        LIMPAR 
        </button>
        <button style="border-radius: 15px; background-color:#6FEDB7; padding: 5px; width: 200px; height: 50px;" @click="redirect">
          NOVO USUÁRIO
        </button>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-4">
        <input type="text" class="form-control" v-model="search" placeholder="Buscar usuários">
      </div>
      <div class="col-md-4">
        <select class="form-control" v-model="selectedCategory" @change="filterByCategory">
          <option value="">Todas as Categorias</option>
          <option v-for="category in allCategories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <select class="form-control" v-model="sortOrder" @change="sortUsers">
          <option value="name">Ordenar por Nome</option>
          <option value="email">Ordenar por Email</option>
        </select>
      </div>
    </div>

    <!-- Lista de Usuários em Cartões -->
    <div class="row">
      <div class="col-md-4 mb-4" v-for="user in filteredUsers" :key="user.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ user.name?.firstname || user.username }} {{ user.name?.lastname || '' }}</h5>
            <p class="card-text"><strong>Email:</strong> {{ user.email }}</p>
            <p class="card-text"><strong>Telefone:</strong> {{ user.phone }}</p>
            <div class="d-flex justify-content-between">
              <button class="btn" style="background-color: #197278; color:white ;" @click="viewUser(user.id)">Visualizar</button>
              <button class="btn" style="background-color: #C42021; color:white ;" @click="deleteUser(user.id)">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Users',
  data() {
    return {
      search: '',
      selectedCategory: '',
      sortOrder: 'name',
      newUser: {
        firstname: '',
        lastname: '',
      },
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters(['allUsers', 'allCategories']),
    
    filteredUsers() {
      let users = this.allUsers;
      
      if (this.search) {
        users = users.filter(user => 
          `${user.name.firstname} ${user.name.lastname}`
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      }

      if (this.selectedCategory) {
        users = users.filter(user => user.category === this.selectedCategory);
      }

      return users;
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'addUser', 'deleteUser', 'fetchUser']),
    
    async viewUser(id) {
      try {
        this.$router.push(`/users/${id}`);
      } catch (error) {
        alert(error.message);
      }
    },

    sortUsers() {
      if (this.sortOrder === 'name') {
        this.allUsers.sort((a, b) => {
          const nameA = `${a.name.firstname} ${a.name.lastname}`.toLowerCase();
          const nameB = `${b.name.firstname} ${b.name.lastname}`.toLowerCase();
          return nameA > nameB ? 1 : -1;
        });
      } else if (this.sortOrder === 'email') {
        this.allUsers.sort((a, b) => a.email.localeCompare(b.email));
      }
    },
    filterByCategory() {
      this.fetchUsers(); 
    },
    redirect(){
      this.$router.push('/users/new');
    },
    cleanCache(){
      localStorage.removeItem('users')
      window.location.reload();
    }
  },
  created() {
    this.fetchUsers(); 
  },
};
</script>
