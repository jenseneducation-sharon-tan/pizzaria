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
    newPizza: {},
    newTopping: {},
    loginError: "",
  },
  mutations: {
    setMenu: (state, menu) => (state.menu = menu),
    //create new pizza
    setNewPizza: (state, pizza) => (state.newPizza = pizza),
    //create new topping
    setNewTopping: (state, topping) => (state.newTopping = topping),

    //add toppings to one pizza
    addToppingsToPizza(state, item, topping) {
      state.cart.find((i) => i.id === item.id).toppings.push(topping);
    },
    addQuantity(state, id) {
      console.log(id);
      let index = state.cart.findIndex((item) => item.id === id);
      state.cart[index].quantity++;
    },
    removeQuantity(state, id) {
      let index = state.cart.findIndex((item) => item.id === id);
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
    // for admin page
    async createPizza({ commit, state }) {
      let id = 0;
      state.menu.forEach((pizza) => {
        if (pizza.id >= id) {
          id = pizza.id + 1;
        }
      });
      const body = {
        id: id,
        ...state.newPizza,
      };
      const response = await axios.post(
        "http://localhost:5000/admin/createPizza",
        body
      );
      commit("setMenu", response.data);
    },
    async createTopping({ commit, state }) {
      let id = 0;
      state.toppings.forEach((topping) => {
        if (topping.id >= id) {
          id = topping.id + 1;
        }
      });
      const body = {
        id: id,
        ...state.newTopping,
      };
      const response = await axios.post(
        "http://localhost:5000/admin/createTopping",
        body
      );
      commit("setToppings", response.data);
    },
    // remove pizza in admin page
    async removePizza({ commit }, pizza) {
      const response = await axios.post(
        "http://localhost:5000/admin/removePizza",
        pizza
      );
      commit("setMenu", response.data);
    },
    async removeTopping({ commit }, topping) {
      const response = await axios.post(
        "http://localhost:5000/admin/removeTopping",
        topping
      );
      commit("setToppings", response.data);
    },
    async updatePizza({ commit }, pizza) {
      const response = await axios.post(
        "http://localhost:5000/admin/updatePizza",
        pizza
      );
      commit("setMenu", response.data);
    },
    async updateTopping({ commit }, topping) {
      const response = await axios.post(
        "http://localhost:5000/admin/updateTopping",
        topping
      );
      commit("setToppings", response.data);
    },

    async postOrder({ commit, state }) {
      const body = {
        userId: state.user && state.user.id,
        cart: state.cart,
        delivery: state.delivery,
      };
      const response = await axios.post("http://localhost:5000/orders", body);
      commit("setOrder", response.data);
      commit("emptyCart");
    },
    async createUser({ commit, state }, user) {
      const body = user;
      const response = await axios.post("http://localhost:5000/users", body);
      if (response.data.error) {
        console.log(response.data.error);
        state.loginError = response.data.error;
      } else {
        commit("setUser", response.data);
      }
    },
    async loginUser({ commit, state }, body) {
      const response = await axios.post(
        "http://localhost:5000/users/logIn",
        body
      );
      if (response.data.error) {
        console.log(response.data.error);
        state.loginError = response.data.error;
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
    numberOfCartItems: (state) => {
      let numberOfItems = 0;
      state.cart.forEach((item) => {
        numberOfItems += item.quantity;
      });
      return numberOfItems;
    },
  },
});
