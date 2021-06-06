import { shallowMount, createLocalVue } from "@vue/test-utils";
import CartItemCounter from "@/components/CartItemCounter.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartItemCounter", () => {
  let wrapper;
  let store;
  let state;
  let getters;

  let cart = [
    {
      id: 2,
      title: "Vesuvio",
      price: 119,
      quantity: 2,
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
  ];

  beforeEach(async () => {
    state = { cart };

    getters = {
      numberOfCartItems: (state) => {
        let numberOfItems = 0;
        state.cart.forEach((item) => {
          numberOfItems += item.quantity;
        });
        return numberOfItems;
      },
    };

    store = new Vuex.Store({
      getters,
      state,
    });

    wrapper = shallowMount(CartItemCounter, {
      localVue,
      store,
    });
  });
  it("should sum up the total quantity in the cart", () => {
    const expected = store.getters.numberOfCartItems;
    let actual = parseInt(wrapper.find(".counter").text());

    expect(actual).toBe(expected);
  });

  it("should not exist if the total quantity is 0", async () => {
    const expected = true;
    await wrapper.setProps({ cart: [] });

    expect(wrapper.find(".counter").exists()).toBe(expected);
  });
});
