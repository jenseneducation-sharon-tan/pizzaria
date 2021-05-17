import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [],
    toppings: [],
    cart: [],
    orderInfo: {},
    user: {},
    orders: [],
    delivery: true,
    userName: "",
    email: "",
    password: "",
  },
  mutations: {
    setMenu: (state, menu) => (state.menu = menu),

    //add toppings to one pizza
    addToppingsToPizza(state, item, topping) {
      state.cart.find((i) => i.id === item.id).toppings.push(topping);
    },
    addQuantity(state, itemId) {
      let index = state.cart.findIndex((item) => item.itemId === itemId);
      state.cart[index].quantity++;
    },
    removeQuantity(state, itemId) {
      let index = state.cart.findIndex((item) => item.itemId === itemId);
      state.cart[index].quantity--;
      if (state.cart[index].quantity == 0) {
        state.cart.splice(index, 1);
      }
    },
    setToppings: (state, toppings) => (state.toppings = toppings),
    setOrder: (state, data) => (state.orderInfo = data),
    setOrders: (state, data) => (state.orders = data),
    //tomt cart after man beställt
    emptyCart(state) {
      state.cart = [];
    },
    setUser: (state, data) => (state.user = data),
    addToCart(state, item) {
      if (state.cart.find((i) => i.id === item.id)) {
        let index = state.cart.findIndex((i) => i.id === item.id);
        state.cart[index].quantity++;
      } else {
        state.cart.push({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: 1,
          toppings: [],
        });
      }
    },
  },
  actions: {
    async fetchMenu({ commit }) {
      const response = await axios.get("http://localhost:5000/menu");
      commit("setMenu", response.data);
    },
    async fetchToppings({ commit }) {
      const response = await axios.get("http://localhost:5000/menu/toppings");
      commit("setToppings", response.data);
    },
    async postOrder({ commit, state }) {
      const body = {
        cart: state.cart,
        delivery: state.delivery,
      };
      const response = await axios.post("http://localhost:5000/orders", body);
      commit("setOrder", response.data);
      commit("emptyCart");
    },
    async createUser({ commit, state }) {
      const body = {
        userName: state.userName,
        email: state.email,
        password: state.password,
      };
      const response = await axios.post("http://localhost:5000/users", body);
      if (response.error) {
        console.log(response.error);
      } else {
        commit("setUser", response.data);
      }
    },
    async logInUser({ commit, state }) {
      const body = {
        email: state.email,
        password: state.password,
      };
      const response = await axios.post(
        "http://localhost:5000/users/logIn",
        body
      );
      if (response.error) {
        console.log(response.error);
      } else {
        commit("setUser", response.data);
      }
    },
    //alla orders för en user
    async fetchOrders({ commit, state }) {
      const res = await axios.get(`http://localhost:5000/orders/${state.uuid}`);
      commit("setOrders", res.data);
    },
    addItem(context, item) {
      context.commit("addToCart", item);
    },
  },
  getters: {
    total: (state) => {
      if (state.cart.length > 0) {
        state.orders.totalValue = 0;
        state.cart.forEach((item) => {
          state.orders.totalValue += item.price * item.quantity;
        });
        return state.orders.totalValue;
      } else {
        return 0;
      }
    },
  },
});
