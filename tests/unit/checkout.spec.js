import { shallowMount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import Checkout from "@/views/Checkout.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe("Checkout.vue", () => {
  let wrapper;
  let store;
  let storeOptions;
  let cart = [
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
  ];

  beforeEach(() => {
    let state = { cart: cart };
    storeOptions = {
      state,
      actions: {
        fetchAllOrders: jest.fn(),
        postOrder: jest.fn(),
      },
      mutations: {
        setDelivery: jest.fn(),
      },
    };
    store = new Vuex.Store(storeOptions);

    wrapper = shallowMount(Checkout, {
      data: () => ({
        checkedLeveransMethod: true,
        name: "name",
        adress: "adress",
        telephoneNumber: "telephoneNumber",
        checkedLeveransMethod: "Avhämtning",
        checkedPaymentMethod: "Swish",
      }),
      router,
      localVue,
      store,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });

  it("should calls store action 'fetchAllOrders' when button 'Betala' is clicked", () => {
    //Arrange
    let button = wrapper.find("button");
    //Act
    button.trigger("click");
    //Assert
    expect(storeOptions.actions.postOrder).toHaveBeenCalled();
  });
});
