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
    isLoading: true,
    user: {},
    orders: [],
    delivery: true,
    userName: "",
    email: "",
    password: "",
    newPizza: {},
    newTopping: {},
    loginError: "",
    adminUser: {},
  },
  mutations: {
    setMenu: (state, menu) => (state.menu = menu),
    //create new pizza
    setNewPizza: (state, pizza) => (state.newPizza = pizza),
    //create new topping
    setNewTopping: (state, topping) => (state.newTopping = topping),

    //add toppings to one pizza
    addToppingsToPizza(state, cartInfo) {
      state.cart[cartInfo.pizzaIndex].toppings = cartInfo.toppings;
    },
    addQuantity(state, index) {
      // let index = state.cart.findIndex((item) => item.id === id);
      state.cart[index].quantity++;
    },
    removeQuantity(state, index) {
      // let index = state.cart.findIndex((item) => item.id === id);
      state.cart[index].quantity--;
      if (state.cart[index].quantity == 0) {
        state.cart.splice(index, 1);
      }
    },
    setToppings: (state, toppings) => (state.toppings = toppings),
    setOrder: (state, data) => (state.orderInfo = data),
    setOneOrder: (state, data) => {
      state.orders = state.orders.map((order) => {
        if (order.orderNr === data.orderNr) {
          return data;
        }
        return order;
      });
    },
    setOrders: (state, data) => (state.orders = data),
    setDelivery(state, method) {
      state.delivery = method;
    },
    removeAdminUser: (state) => (state.adminUser = {}),
    removeUser: (state) => (state.user = {}),

    //tomt cart after man beställt
    emptyCart(state) {
      state.cart = [];
    },

    setUser: (state, data) => (state.user = data),
    setadminUser: (state, data) => (state.adminUser = data),
    addToCart(state, item) {
      state.cart.push({
        cartItemId: state.cart.length ? state.cart.length + 1 : 1,
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: 1,
        toppings: [],
      });
    },
    // addToCart(state, item) {
    //   if (state.cart.find((i) => i.id === item.id)) {
    //     let index = state.cart.findIndex((i) => i.id === item.id);
    //     state.cart[index].quantity++;
    //   } else {
    //     state.cart.push({
    //       id: item.id,
    //       title: item.title,
    //       price: item.price,
    //       quantity: 1,
    //       toppings: [],
    //     });
    //   }
    // },
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
    async createPizza({ commit, state }, newPizza) {
      let id = 0;
      state.menu.forEach((pizza) => {
        if (pizza.id >= id) {
          id = pizza.id + 1;
        }
      });
      const body = {
        id: id,
        ...newPizza,
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

    async postOrder({ commit, state }, userInfo) {
      const body = {
        userId: Object.keys(state.user).length > 0 && state.user.id,
        cart: state.cart,
        delivery: state.delivery,
        userInfo: userInfo,
      };
      if (body.userId) {
        const userResponse = await axios.post(
          "http://localhost:5000/users/update",
          {
            id: body.userId,
            ...userInfo,
          }
        );
        commit("setUser", userResponse);
      }
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
    async updateUser({ commit, state }, user) {
      const body = user;
      const response = await axios.post(
        "http://localhost:5000/users/update",
        body
      );
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
        setTimeout(() => {
          state.loginError = false;
        }, 2000);
      } else {
        commit("setUser", response.data);
      }
    },
    async loginAdmin({ commit, state }, body) {
      const response = await axios.post(
        "http://localhost:5000/admin/logIn",
        body
      );
      if (response.data.error) {
        state.loginError = response.data.error;
        setTimeout(() => {
          state.loginError = false;
        }, 5000);
      } else {
        commit("setadminUser", response.data);
      }
    },
    async logoutAdmin({ commit }) {
      commit("removeAdminUser");
    },
    async logoutUser({ commit }) {
      commit("removeUser");
    },
    async updateOrder({ commit }, { orderNr, state }) {
      //Ändra state för en order
      const states = ["waiting", "preparing", "done"];
      if (!states.contains(state)) {
        console.log("State must be 'waiting', 'preparing' or 'done'");
      }
      let response = axios.post("http://localhost:5000/admin/updateOrder", {
        orderNr,
        state,
      });
      commit("setOneOrder", response);
    },
    //alla orders för en user
    async fetchOrders({ commit, state }) {
      const res = await axios.get(
        `http://localhost:5000/orders/${state.user.id}`
      );
      commit("setOrders", res.data);
    },
    async fetchAllOrders({ commit }) {
      // Hämta alla orders (för admin)
      const res = await axios.get("http/localhost:5000/allOrders");
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
          if (item.toppings.length) {
            item.toppings.forEach((topping) => {
              state.orders.totalValue += topping.price * item.quantity;
            });
          }
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
