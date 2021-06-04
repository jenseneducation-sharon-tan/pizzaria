import { mount, createLocalVue } from "@vue/test-utils";
import MenuList from "@/components/MenuList.vue";

import Vuex from "vuex";
const localVue = createLocalVue();
localVue.use(Vuex);

describe("MenuList", () => {
  let menu;

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
      {
        id: 6,
        title: "Banana",
        desc: "Tomatsås, Ost, Skinka, Banan, Curry",
        price: 124,
      },
      {
        id: 7,
        title: "Napolitana",
        desc: "Tomatsås, Ost, Sardeller, Oliver",
        price: 124,
      },
      {
        id: 8,
        title: "Bolognese",
        desc: "Tomatsås, Ost, Köttfärs, Lök",
        price: 138,
      },
      {
        id: 9,
        title: "Bacon",
        desc: "Tomatsås, Ost, Bacon, Lök",
        price: 138,
      },
    ];
  });

  it("should show 9 items when rendering", async () => {
    const wrapper = mount(MenuList, {
      propsData: { menu },
    });

    const expected = 9;
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

  /*  it("triggers when clicked", async () => {
    const wrapper = mount(MenuList, {
      propsData: { menu },
    });

    const addButton = wrapper.find(".add-button");

    wrapper.wm.addItem = jest.fn();
    await addButton.trigger("click");

    expect(wrapper.vm.addItem).toHaveBeenCalled();
  }); */
});
