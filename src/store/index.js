import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [],
    orderInfo: {},
    uuid: "",
    user: {},
    orders: [],
    delivery: true,
  },
  mutations: {
    setMenu: (state, menu) => (state.menu = menu),
    addItems: (state, id) =>
      state.cart.push(state.menu.find((item) => item.id == id)),
    deleteItems(state, id) {
      const item = state.cart.find((item2) => item2.id == id);
      const index = state.cart.indexOf(item);
      state.cart.splice(index, 1);
    },
    setOrder: (state, data) => (state.orderInfo = data),
    //tomt cart after man beställt
    emptyCart(state) {
      state.cart = [];
    },
    setUuid: (state, uuid) => (state.uuid = uuid),
    saveUser(state, user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ fullName: user.fullName, userEmail: user.userEmail })
      );
      state.user = user;
    },
    setOrders: (state, data) => (state.orders = data),
  },
  actions: {
    async fetchMenu({ commit }) {
      const response = await axios.get("http://localhost:5000/menu");
      commit("setMenu", response.data);
    },
    async postOrder({ commit, state }) {
      const body = {
        userId: state.uuid,
        pizzas: state.cart,
        delivery: state.delivery,
      };
      const response = await axios.post("http://localhost:5000/orders", body);
      commit("setOrder", response.data);
      commit("emptyCart");
    },
    //alla orders för en user
    async fetchOrders({ commit, state }) {
      const res = await axios.get(`http://localhost:5000/orders/${state.uuid}`);
      commit("setOrders", res.data);
    },
  },
  getters: {},
});
