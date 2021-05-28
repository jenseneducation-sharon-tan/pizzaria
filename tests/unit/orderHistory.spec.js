import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import OrderHistory from "../../src/components/OrderHistory.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("OrderHistory.vue", () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    actions = {
      logoutUser: jest.fn(),
      fetchOrders: jest.fn(),
    };
    state = {
      user: {
        userName: "",
        address: "",
        email: "",
        id: "ha",
        telephoneNumber: "",
      },
      orders: [
        {
          orderNr: "AAA",
          time: "2021-05-27",
          total: 200,
          userId: "ha",
        },
        {
          orderNr: "BBB",
          time: "2021-05-23",
          total: 150,
          userId: "ha",
        },
      ],
    };
    store = new Vuex.Store({
      actions,
      state,
    });
  });

  //logout
  it("calls store action when it is clicked", () => {
    const wrapper = shallowMount(OrderHistory, { store, localVue });
    wrapper.find("#logOutLink").trigger("click");
    expect(actions.logoutUser).toHaveBeenCalled();
  });

  it("Displays the right number of orders", async () => {
    const wrapper = await shallowMount(OrderHistory, { store, localVue });
    await wrapper.vm.$forceUpdate();
    let orders = wrapper.findAll(".oldOrders");
    expect(orders).toHaveLength(2);
  });
});
