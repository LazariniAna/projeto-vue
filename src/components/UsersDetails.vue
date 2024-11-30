<template>
  <div class="container my-4">
    <!-- Exibição dos dados do usuário -->
    <div v-if="user" class="text-center mb-4">
      <h1 class="h3 font-weight-bold">{{ user.name.firstname }} {{ user.name.lastname }}</h1>
      <p>Email: {{ user.email }}</p>
      <p>Telefone: {{ user.phone }}</p>
      <p>Endereço: {{ user.address.street }}, {{ user.address.city }} - {{ user.address.zipcode }}</p>
    </div>

    <!-- Formulário de cadastro ou edição -->
    <div>
      <h2 class="h4 text-center mb-4">{{ user ? 'Editar Dados do Usuário' : 'Cadastrar Novo Usuário' }}</h2>
      <form @submit.prevent="openModal" class="bg-light p-4 rounded shadow-sm">
        <div class="mb-3">
          <label for="firstname" class="form-label">Nome</label>
          <input type="text" id="firstname" v-model="newUser.name.firstname" required class="form-control" placeholder="Digite o nome" />
        </div>

        <div class="mb-3">
          <label for="lastname" class="form-label">Sobrenome</label>
          <input type="text" id="lastname" v-model="newUser.name.lastname" required class="form-control" placeholder="Digite o sobrenome" />
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" id="email" v-model="newUser.email" required class="form-control" placeholder="Digite o email" />
        </div>

        <div class="mb-3">
          <label for="username" class="form-label">Nome de Usuário</label>
          <input type="text" id="username" v-model="newUser.username" required class="form-control" placeholder="Digite o nome de usuário" />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <input type="password" id="password" v-model="newUser.password" required class="form-control" placeholder="Digite a senha" />
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">Telefone</label>
          <input type="text" id="phone" v-model="newUser.phone" required class="form-control" placeholder="Digite o telefone" />
        </div>

        <div class="mb-3">
          <label for="street" class="form-label">Endereço</label>
          <input type="text" id="street" v-model="newUser.address.street" required class="form-control" placeholder="Digite o endereço" />
        </div>

        <div class="mb-3">
          <label for="city" class="form-label">Cidade</label>
          <input type="text" id="city" v-model="newUser.address.city" required class="form-control" placeholder="Digite a cidade" />
        </div>

        <div class="mb-3">
          <label for="zipcode" class="form-label">CEP</label>
          <input type="text" id="zipcode" v-model="newUser.address.zipcode" required class="form-control" placeholder="Digite o CEP" />
        </div>

        <div class="mb-3">
          <label for="lat" class="form-label">Latitude</label>
          <input type="text" id="lat" v-model="newUser.address.geolocation.lat" required class="form-control" placeholder="Digite a latitude" />
        </div>

        <div class="mb-3">
          <label for="long" class="form-label">Longitude</label>
          <input type="text" id="long" v-model="newUser.address.geolocation.long" required class="form-control" placeholder="Digite a longitude" />
        </div>

        <button type="button" @click="submitData" class="btn w-100"  style="background-color: #197278; color:white ;">
          {{ user ? 'Atualizar Dados' : 'Cadastrar Usuário' }}
        </button>
      </form>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
      <div class="bg-white p-4 rounded-lg w-75">
        <h3 class="h5 text-center mb-4">Confirmar Alteração</h3>
        <p class="text-center mb-4">
          Você deseja {{ user ? 'editar' : 'cadastrar' }} os dados do usuário com as seguintes informações?
        </p>
        <ul class="mb-4">
          <li><strong>Nome:</strong> {{ newUser.name.firstname }} {{ newUser.name.lastname }}</li>
          <li><strong>Email:</strong> {{ newUser.email }}</li>
          <li><strong>Telefone:</strong> {{ newUser.phone }}</li>
          <li><strong>Endereço:</strong> {{ newUser.address.street }}, {{ newUser.address.city }} - {{ newUser.address.zipcode }}</li>
        </ul>
        <div class="d-flex justify-content-between">
          <button @click="submitData" class="btn btn-success">Confirmar</button>
          <button @click="closeModal" class="btn " style="background-color: #C42021; color:white ;">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'UserDetails',
  data() {
    return {
      newUser: {
        email: '',
        username: '',
        password: '',
        name: { firstname: '', lastname: '' },
        phone: '',
        address: { 
          street: '', 
          city: '', 
          zipcode: '', 
          geolocation: { lat: '', long: '' } 
        },
      },
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters(['singleUser']),
    user() {
      return this.singleUser;
    },
  },
  methods: {
    ...mapActions(['fetchUser', 'addUser', 'updateUser']),

    openModal() {
      this.isModalVisible = true; 
    },

    closeModal() {
      this.isModalVisible = false;
    },

    submitData() {
  this.isModalVisible = false;

  const userData = { 
    ...this.newUser, 
    address: { 
      ...this.newUser.address, 
      geolocation: { 
        ...this.newUser.address.geolocation,
      },
    },
  };

  console.log("Dados do usuário antes de enviar:", userData);

  if (this.user) {
    this.updateUser({ id: this.user.id, ...userData })
    .then(() => {
        alert('Usuário atualizado com sucesso!');
        this.$router.push('/users');
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        alert('Erro ao atualizar o usuário.');
      });
  } else {
    this.addUser(userData)
      .then(() => {
        alert('Usuário cadastrado com sucesso!');
        this.$router.push('/users');
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário:", error);
        alert('Erro ao cadastrar o usuário.');
      });
  }
}

,
  },
  created() {
    const userId = this.$route.params.id;
    if (userId) {
      this.fetchUser(userId); 
    }
  },
  watch: {
    user(newUser) {
      if (newUser) {
        this.newUser = { ...newUser };
      }
    },
  },
};
</script>

<style scoped>
body {
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

.fixed {
  position: fixed;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.5);
}

.z-50 {
  z-index: 50;
}

.modal-dialog {
  max-width: 500px;
}
</style>
