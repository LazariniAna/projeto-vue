import { createStore } from 'vuex';
import products from './modules/products';
import carts from './modules/carts';
import users from './modules/users';
import auth from './modules/auth';
import panel from './modules/panel';

const store = createStore({
  modules: {
    products,
    carts,
    users,
    auth,
    panel
  },
});

export default store;
