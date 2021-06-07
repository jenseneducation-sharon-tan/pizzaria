import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Cart from "@/views/Cart.vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe("Cart.vue", () => {
  let wrapper;
  let store;
  let state;
  let getters;
  let storeOptions;
  let id = 1;
  let data = {
    menu: [
      {
        id: 1,
        title: "Margherita",
        desc: "Tomatsås, Ost, Mozzarellaost, Basilika",
        price: 119,
      },
      {
        id: 2,
        title: "Vesuvio",
        desc: "Tomatsås, Ost, Skinka",
        price: 119,
      },
    ],
    cart: [
      {
        id: 2,
        title: "Vesuvio",
        price: 119,
        quantity: 1,
        toppings: [],
      },
      {
        id: 3,
        title: "Funghi",
        price: 119,
        quantity: 1,
        toppings: [
          {
            id: 2,
            title: "Ost",
            price: 24,
          },
          {
            id: 7,
            title: "Salami",
            price: 20,
          },
        ],
      },
      {
        id: 6,
        title: "Banana",
        price: 124,
        quantity: 2,
        toppings: [],
      },
    ],
    toppings: [],
  };

  beforeEach(async () => {
    state = { cart: data.cart, menu: data.menu };

    getters = {
      total: (state) => {
        if (state.cart.length > 0) {
          let totalValue = 0;
          state.cart.forEach((item) => {
            totalValue += item.price * item.quantity;
            if (item.toppings.length) {
              item.toppings.forEach((topping) => {
                totalValue += topping.price * item.quantity;
              });
            }
          });
          return totalValue;
        } else {
          return 0;
        }
      },
    };

    storeOptions = {
      state,
      getters,
      actions: {
        fetchToppings: jest.fn(),
      },
      mutations: {
        addToppingsToPizza: jest.fn(),
      },
    };
    store = new Vuex.Store(storeOptions);

    wrapper = shallowMount(Cart, {
      localVue,
      router,
      store,
      propsData: { id },
      data: () => ({
        selectedPizzaIndex: 0,
      }),
      stubs: {
        LogIn: true,
        Regist: true,
        RouterLink: RouterLinkStub,
      },
    });
  });

  it("should get cart data from store when renders", () => {
    //Arrange
    const expected = store.state.cart.length;
    let actual = wrapper.vm.cart.length;
    //Assert
    expect(actual).toBe(expected);
  });

  it("should display total amount of items in cart when renders", async () => {
    //Arrange
    const expected = 530;
    let actual = wrapper.vm.totalAmount;
    //Assert
    expect(actual).toBe(expected);
  });
});
