<template>
  <div class="container py-5">
    <!-- Abas de Navegação -->
    <div class="mb-4">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'products' }"
            href="#"
            @click="setActiveTab('products')"
            >Gestão de Produtos</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'orders' }"
            href="#"
            @click="setActiveTab('orders')"
            >Gestão de Pedidos</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'users' }"
            href="#"
            @click="setActiveTab('users')"
            >Gestão de Usuários</a
          >
        </li>
      </ul>
    </div>

    <div v-if="activeTab === 'products'">
      <h2 class="mb-4">Gestão de Produtos</h2>
      <div class="row mb-4">
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <input
            type="text"
            v-model="productSearch"
            class="form-control"
            placeholder="Buscar produtos"
          />
        </div>
        <div class="col-12 col-md-4 mb-3 mb-md-0">
          <select v-model="productCategory" @change="filterProducts" class="form-control">
            <option value="">Todas as Categorias</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="col-12 col-md-4">
          <select v-model="productSortOrder" @change="sortProducts" class="form-control">
            <option value="price">Ordenar por Preço</option>
            <option value="rating">Ordenar por Classificação</option>
          </select>
        </div>
      </div>

      <!-- Tabela de Produtos -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Classificação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>{{ product.title }}</td>
            <td>{{ product.category }}</td>
            <td>R${{ product.price }}</td>
            <td>{{ product.rating.rate }} / 5</td>
            <td>
              <button @click="editProduct(product)" class="btn "  style="background-color: #197278; color:white ;">Editar</button>
              <button @click="deleteProduct(product.id)" class="btn "  style="background-color: #C42021; color:white ;">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addProduct" class="btn "style="background-color: #6FEDB7; color:white ;">Adicionar Produto</button>

    </div>

    <div v-if="activeTab === 'orders'">
      <h2 class="mb-4">Gestão de Pedidos</h2>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredCarts" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.products }}</td>
            <td>
              <button @click="editOrder(order)" class="btn " style="background-color: #197278; color:white ;">Editar</button>
              <button @click="deleteOrder(order.id)" class="btn"  style="background-color: #C42021; color:white ;">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addOrder" class="btn btn-success">Adicionar Pedido</button>
    </div>

    <div v-if="activeTab === 'users'">
      <h2 class="mb-4">Gestão de Usuários</h2>
      <div class="mb-3">
        <input
          type="text"
          v-model="userSearch"
          class="form-control"
          placeholder="Buscar usuário"
        />
      </div>

      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.name.firstname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.city }}</td>
            <td>
              <button @click="editUser(user)" class="btn"  style="background-color: #197278; color:white ;">Editar</button>
              <button @click="deleteUser(user.id)" class="btn "  style="background-color: #C42021; color:white ;">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addUser" class="btn btn-success">Adicionar Usuário</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'AdminPanel',
  data() {
    return {
      activeTab: 'products', 
      productSearch: '',
      productCategory: '',
      productSortOrder: 'price',
      userSearch: '',
      categories: [],
      products: [],
      orders: [],
      users: [], 
    };
  },
  computed: {
    ...mapGetters(['allUsers', 'allCategories', 'allCarts']),
    filteredProducts() {
      let products = this.products;
      if (this.productSearch) {
        products = products.filter(product => product.title.toLowerCase().includes(this.productSearch.toLowerCase()));
      }
      if (this.productCategory) {
        products = products.filter(product => product.category === this.productCategory);
      }
      if (this.productSortOrder === 'price') {
        products.sort((a, b) => a.price - b.price);
      } else if (this.productSortOrder === 'rating') {
        products.sort((a, b) => b.rating.rate - a.rating.rate);
      }
      return products;
    },
    filteredUsers() {
      return this.users.filter(user => user.name.toLowerCase().includes(this.userSearch.toLowerCase()));
    },
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
    },
    filteredCarts() {
      let carts = this.allCarts;

      return carts;
    }
  },
  methods: {
    ...mapActions(['fetchUsers', 'allUsers', 'fetchCarts']),
    setActiveTab(tab) {
      this.activeTab = tab;
    },

    async fetchProducts() {
      const response = await axios.get('https://fakestoreapi.com/products');
      this.products = response.data;
    },

    async fetchCategories() {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      this.categories = response.data;
    },

    async deleteProduct(id) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('Erro ao excluir produto', error);
      }
    },

    addProduct() {
      this.$router.push('/products/create');
    },

    editProduct(product) {
      this.$router.push(`/products/${product.id}`);
    },

    viewProductDetails(product) {
      this.$router.push(`/products/${product.id}`);
    },

    addOrder() {
      alert('Adicionando pedido');
    },

    editOrder(order) {
      this.$router.push(`/cart/${order.id}`);
    },

    deleteOrder(id) {
      this.orders = this.orders.filter(order => order.id !== id);
    },

    viewOrderDetails(order) {
      alert(`Detalhes do pedido ${order.id}`);
    },

    addUser() {
      alert('Adicionando usuário');
    },

    editUser(user) {
      this.$router.push(`/users/${user.id}`);
    },

    deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories();
    this.fetchCarts(); 
  }
};
</script>

<style scoped>
.nav-tabs .nav-link.active {
  background-color: #007bff;
  color: white;
}
</style>
