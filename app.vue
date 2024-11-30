<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #2DD881; padding: 0 !important;">
      <div class="" style="background-color: #2DD881; width: 100%;">
        <a class="navbar-brand" href="#">Store Dashboard</a>
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <div class="" id="">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Overview</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">Produtos</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/carts">Carrinho</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/users">Usuários</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <router-link class="nav-link" to="/panel">Painel</router-link>
            </li>
            <li v-if="isAuthenticated" class="nav-item">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
            <li v-else class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated']), // Verifica se o usuário está autenticado
  },
  methods: {
    ...mapActions(['clearAuthToken']), // Ação para limpar o token no Vuex
    logout() {
      this.clearAuthToken(); // Limpa o token do Vuex
      this.$router.push('/login'); // Redireciona para a página de login
    },
  },
};
</script>
