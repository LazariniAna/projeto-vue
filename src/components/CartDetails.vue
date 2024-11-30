<template>
  <div class="container my-4" style="display: flex; justify-content: space-around;">
    <div v-if="cart" class="col-md-6">
      <h1 class="display-4">Carrinho - ID: {{ cart.id }}</h1>
      <p><strong>ID do Usuário:</strong> {{ cart.userId }}</p>
      <p><strong>Data:</strong> {{ formatDate(cart.date) }}</p>

      <h3>Itens no Carrinho</h3>
      <ul class="list-group">
        <li v-for="(item, index) in cart.products" :key="index" class="list-group-item">
          Produto ID: {{ item.productId }} - Quantidade: {{ item.quantity }}
          <button @click="editItem(index)" class="btn btn-sm ml-2"  style="background-color: #197278; color:white ;">Editar</button>
          <button @click="removeItem(index)" class="btn  btn-sm ml-2" style="background-color: #C42021; color:white ;">Remover</button>
        </li>
      </ul>
    </div>

    <!-- Formulário de edição de item -->
    <div class="col-md-6">
      <h2 class="h4 text-center mb-4">Editar Item no Carrinho</h2>
      <form @submit.prevent="openModal" class="bg-white p-4 border rounded shadow-lg">
        <div class="mb-3">
          <label for="productId" class="form-label">Produto ID</label>
          <input
            type="number"
            id="productId"
            v-model="selectedItem.productId"
            required
            class="form-control"
            placeholder="ID do Produto"
          />
        </div>

        <div class="mb-3">
          <label for="quantity" class="form-label">Quantidade</label>
          <input
            type="number"
            id="quantity"
            v-model="selectedItem.quantity"
            required
            min="1"
            class="form-control"
            placeholder="Quantidade do Produto"
          />
        </div>

        <button
          type="submit"
          class="btn w-100"
           style="background-color: #197278; color:white ;"
        >
          Atualizar Item
        </button>
      </form>

      <!-- Formulário para criar novo carrinho -->
      <h2 class="h4 text-center mt-4 mb-4">Cadastrar Novo Carrinho</h2>
      <form @submit.prevent="createCart" class="bg-white p-4 border rounded shadow-lg">
        <div class="mb-3">
          <label for="newUserId" class="form-label">ID do Usuário</label>
          <input
            type="number"
            id="newUserId"
            v-model="newCart.userId"
            required
            class="form-control"
            placeholder="ID do Usuário"
          />
        </div>

        <div class="mb-3">
          <label for="newDate" class="form-label">Data</label>
          <input
            type="date"
            id="newDate"
            v-model="newCart.date"
            required
            class="form-control"
          />
        </div>

        <button
          type="submit"
          class="btn btn-success w-100"
        >
          Criar Carrinho
        </button>
      </form>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="isModalVisible" class="modal d-block bg-opacity-50">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Alteração</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p>Você deseja editar o item com os seguintes dados?</p>
            <ul>
              <li><strong>Produto ID:</strong> {{ selectedItem.productId }}</li>
              <li><strong>Quantidade:</strong> {{ selectedItem.quantity }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              @click="confirmSubmit"
              class="btn "
              style="background-color: #6FEDB7; color:white ;"
            >
              Confirmar
            </button>
            <button
              @click="closeModal"
              class="btn "
              style="background-color: #C42021; color:white ;"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CartDetails',
  data() {
    return {
      cartId: this.$route.params.id,
      selectedItem: {
        productId: null,
        quantity: null
      },
      isModalVisible: false,
      newCart: {
        userId: null,
        date: '',
        products: []
      }
    };
  },
  computed: {
    ...mapGetters(['cartDetails']),
    cart() {
      return this.cartDetails;
    }
  },
  methods: {
  ...mapActions(['fetchCartDetails', 'updateCart', 'removeItemFromCart', 'createCart']),
  
  openModal() {
    this.isModalVisible = true;
  },

  closeModal() {
    this.isModalVisible = false;
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  },

  editItem(index) {
    const item = this.cart.products[index];
    this.selectedItem = { ...item };
    this.openModal();
  },

  removeItem(index) {
    const itemId = this.cart.products[index].productId;
    this.removeItemFromCart({ cartId: this.cart.id, productId: itemId })
      .then(() => {
        alert('Item removido com sucesso!');
        this.fetchCartDetails(this.cartId);
      })
      .catch((error) => {
        console.error('Erro ao remover item:', error);
        alert('Erro ao remover item do carrinho.');
      });
  },

  confirmSubmit() {
    const updatedProducts = [...this.cart.products];
    const index = updatedProducts.findIndex(item => item.productId === this.selectedItem.productId);

    if (index !== -1) {
      updatedProducts[index] = { ...this.selectedItem };
    } else {
      updatedProducts.push({ ...this.selectedItem });
    }
    console.log(updatedProducts)
    this.updateCart({ cartId: this.cart.id, products: updatedProducts })
      .then(() => {
        alert('Carrinho atualizado com sucesso!');
        this.fetchCartDetails(this.cartId);
        this.closeModal();
      })
      .catch((error) => {
        console.error("Erro ao atualizar carrinho:", error);
        alert('Erro ao atualizar o carrinho.');
        this.closeModal();
      });
  },

  createCart() {
    const newCartData = {
      userId: this.newCart.userId,
      date: this.newCart.date,
      products: this.newCart.products
    };

    this.createCart(newCartData)
      .then(() => {
        alert('Carrinho criado com sucesso!');
        this.newCart = { userId: null, date: '', products: [] };
      })
      .catch((error) => {
        console.error("Erro ao criar carrinho:", error);
        alert('Erro ao criar o carrinho.');
      });
  }
},


  created() {
    if (this.cartId) {
      this.fetchCartDetails(this.cartId);
    }
  }
};
</script>

<style scoped>
.modal.d-block {
  display: block !important;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
