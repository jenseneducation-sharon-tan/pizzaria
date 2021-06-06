import { mount, RouterLinkStub, createLocalVue } from "@vue/test-utils";
import AdminPizzaList from "@/components/AdminPizzaList.vue";

import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AdminPizzaList", () => {
  let wrapper;
  let actions;
  let store;
  let menu = [
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
  let modal;

  beforeEach(() => {
    store = new Vuex.Store({
      actions,
      state: {
        modal: modal,
      },
    });
    wrapper = mount(AdminPizzaList, {
      localVue,
      store,
      propsData: { menu },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
  });
  it("should have to show  9 items in menu when rendering", () => {
    const expected = menu.length;
    const actual = wrapper.findAll(".item-details").length;
    expect(actual).toBe(expected);
  });
});
