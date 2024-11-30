<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <label for="username">Nome de usuário:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Digite seu nome de usuário"
          required
        />
      </div>
      <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <label for="password">Senha:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
      <button type="submit" :disabled="isLoading">Entrar</button>
    </form>
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
  <div style="border: 1px solid black; text-align: center;">
    <span style="font-weight: 700;">
      Exemplo de login:
    </span>
    username: "mor_2314",
                password: "83r5^_"
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: null,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(["setAuthToken"]), // Ação para armazenar o token no Vuex
    async login() {
      this.isLoading = true;
      this.errorMessage = null;

      try {
        const response = await axios.post("https://fakestoreapi.com/auth/login", {
          username: this.username,
          password: this.password,
        });
        const token = response.data.token;

        this.setAuthToken(token);

        this.$router.push('/');
      } catch (error) {
        console.log(error)
        this.isLoading = false;
        this.errorMessage = "Nome de usuário ou senha inválidos";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
