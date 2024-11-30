<template>
  <div class="container py-5">
    <h1 class="text-center mb-5 text-3xl font-bold">Carrinhos</h1>

    <div class="row mb-4">
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <input
          type="date"
          v-model="filter.date"
          class="form-control"
          placeholder="Filtrar por Data"
        />
      </div>
      
      <div class="col-12 col-md-4 mb-3 mb-md-0">
        <input
          type="number"
          v-model="filter.userId"
          class="form-control"
          placeholder="Filtrar por ID do Usuário"
        />
      </div>
      
      <div class="col-12 col-md-4">
        <button @click="applyFilter" class="btn  w-100" style="background-color: #197278; color:white ;">
          Aplicar Filtro
        </button>
      </div>
    </div>
    <div class="row">
      <div
        v-for="cart in filteredCarts"
        :key="cart.id"
        class="col-12 col-md-6 mb-4"
      >
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-3">Carrinho ID: {{ cart.id }}</h5>
            <p class="card-text mb-3">ID do Usuário: {{ cart.userId }}</p>
            <p class="card-text mb-3">Data: {{ formatDate(cart.date) }}</p>
            <div class="mt-auto d-flex justify-content-between">
              <router-link :to="'/cart/' + cart.id" class="btn "  style="background-color: #197278; color:white ;">
                Ver Detalhes
              </router-link>
              <button
                @click="deleteCart(cart.id)"
                class="btn "
                style="background-color: #C42021; color:white ;"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Carts',
  data() {
    return {
      filter: {
        date: '',
        userId: ''
      }
    };
  },
  computed: {
    ...mapGetters(['allCarts']),
    filteredCarts() {
      let carts = this.allCarts;

      if (this.filter.date) {
        const filterDate = this.filter.date; 
        carts = carts.filter(cart => {
          const cartDate = new Date(cart.date).toISOString().split('T')[0]; 
          return cartDate === filterDate; 
        });
      }
      if (this.filter.userId) {
        carts = carts.filter(cart => cart.userId == this.filter.userId); 
      }

      return carts;
    }
  },
  methods: {
    ...mapActions(['fetchCarts', 'deleteCart']), // Ajuste para chamar as funções de cart

    applyFilter() {
      this.fetchCarts(this.filter); 
    },
    formatDate(dateString) {
      const date = new Date(dateString); 
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('pt-BR', options);
    },
    deleteCart(cartId) {
      if (confirm('Tem certeza de que deseja excluir este carrinho?')) {
        this.$store.dispatch('deleteCart', cartId);
      }
    }
  },
  created() {
    this.fetchCarts(); 
  }
};
</script>

<style scoped>
</style>
