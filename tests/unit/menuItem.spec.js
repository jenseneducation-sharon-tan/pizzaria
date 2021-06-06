import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import MenuList from "@/components/MenuList.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("MenuItem", () => {
  let menu;

  beforeEach(() => {
    menu = [
      {
        id: 1,
        title: "Margherita",
        desc: "Tomatsås, Ost, Mozzarellaost, Basilika",
        price: 119,
      },
    ];
  });
  it("should display the name, price and description of the item", async () => {
    let pizza = {
      id: 1,
      title: "Margherita",
      desc: "Tomatsås, Ost, Mozzarellaost, Basilika",
      price: 119,
    };

    const wrapper = mount(MenuList, { propsData: { menu } });

    const pizzaName = wrapper.find(".item-title").text();
    const pizzaPrice = parseInt(wrapper.find(".item-price").text());
    const pizzaDesc = wrapper.find(".item-ingredients").text();

    let expectedName = pizza.title;
    let expectedPrice = pizza.price;
    let expectedDesc = pizza.desc;

    expect(pizzaName).toBe(expectedName);
    expect(pizzaPrice).toBe(expectedPrice);
    expect(pizzaDesc).toBe(expectedDesc);
  });
});
