<template>
  <div class="container">
    <h1 class="my-4">Visão Geral</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total de Produtos</h5>
            <p class="card-text">{{ totalProducts }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total de Categorias</h5>
            <p class="card-text">{{ totalCategories }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Total de usuários</h5>
            <p class="card-text">{{ totalUsers }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Overview',
  computed: {
    ...mapGetters(['allProducts', 'allCategories', 'allUsers']),
    totalProducts() {
      return this.allProducts.length;
    },
    totalCategories() {
      return this.allCategories.length;
    },
    totalUsers() {
      return this.allUsers?.length;
    },
  },
  methods: {
    ...mapActions(['fetchProducts', 'fetchCategories', 'fetchUsers']),
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchUsers();
  },
};
</script>
