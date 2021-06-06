import { mount, createLocalVue } from "@vue/test-utils";
import MenuList from "@/components/MenuList.vue";
import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("MenuList", () => {
  let menu, actions, store;

  beforeEach(() => {
    menu = [
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
      {
        id: 3,
        title: "Funghi",
        desc: "Tomatsås, Ost, Champinjoner",
        price: 119,
      },
      {
        id: 4,
        title: "Capricciosa",
        desc: "Tomatsås, Ost, Skinka, Champinjoner",
        price: 124,
      },
      {
        id: 5,
        title: "Hawaii",
        desc: "Tomatsås, Ost, Skinka, Ananas",
        price: 124,
      },
    ];

    actions = {
      addItem: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  it("should show 5 items when rendering", async () => {
    const wrapper = mount(MenuList, {
      propsData: { menu },
    });

    const expected = 5;
    const actual = wrapper.findAll(".item-details").length;
    expect(actual).toBe(expected);
  });

  it("renders round button '+' for every pizza item", () => {
    const wrapper = mount(MenuList, {
      propsData: { menu },
    });
    const item = wrapper.find(".add-button");

    expect(item.exists()).toBe(true);
  });

  it("calls store action 'addItem' when button '+' is clicked ", async () => {
    const wrapper = mount(MenuList, { store, localVue, propsData: { menu } });

    const addButton = wrapper.find(".add-button");

    await addButton.trigger("click");

    expect(actions.addItem).toHaveBeenCalled();
  });
});
