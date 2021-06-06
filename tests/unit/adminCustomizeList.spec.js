import { mount, createLocalVue } from "@vue/test-utils";
import AdminCustomizeList from "@/components/AdminCustomizeList.vue";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("AdminCustomizeList", () => {
  let toppings, actions, store;

  beforeEach(() => {
    toppings = [
      {
        id: 1,
        title: "Banana",
        price: 10,
      },
      {
        id: 2,
        title: "Ost",
        price: 24,
      },
      {
        id: 3,
        title: "Lök",
        price: 10,
      },
      {
        id: 4,
        title: "Ägg",
        price: 15,
      },
      {
        id: 5,
        title: "Tomat",
        price: 10,
      },
    ];

    actions = {
      fetchToppings: jest.fn(),
      removeTopping: jest.fn(),
      updateTopping: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("should show 5 items when rendering", async () => {
    const wrapper = mount(AdminCustomizeList, {
      propsData: { toppings },
    });

    const expected = 5;
    const actual = wrapper.findAll(".topping-details").length;
    expect(actual).toBe(expected);
  });

  it("renders 'Redigera' and 'Ta bort' for every topping item", () => {
    const wrapper = mount(AdminCustomizeList, {
      propsData: { toppings },
    });
    const editItem = wrapper.find(".edit");
    const deleteItem = wrapper.find(".delete");

    expect(editItem.exists()).toBe(true);
    expect(deleteItem.exists()).toBe(true);
  });

  it("calls store action 'removeTopping' when 'Ta bort' is clicked ", async () => {
    const wrapper = mount(AdminCustomizeList, {
      store,
      localVue,
      propsData: { toppings },
    });

    const deleteItem = wrapper.find(".delete");

    await deleteItem.trigger("click");

    expect(actions.removeTopping).toHaveBeenCalled();
  });
});
