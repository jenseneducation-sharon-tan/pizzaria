import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import AdminCustomizeList from "@/components/AdminCustomizeList.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("AdminCustomizeItem", () => {
  let toppings;

  beforeEach(() => {
    toppings = [
      {
        id: 1,
        title: "Banana",
        price: 10,
      },
    ];
  });
  it("should display the name and price and description of the item", async () => {
    let item = {
      id: 1,
      title: "Banana",
      price: 10,
    };

    const wrapper = mount(AdminCustomizeList, { propsData: { toppings } });

    const toppingName = wrapper.find(".item-title").text();
    const toppingPrice = parseInt(wrapper.find(".item-price").text());

    let expectedName = item.title;
    let expectedPrice = item.price;

    expect(toppingName).toBe(expectedName);
    expect(toppingPrice).toBe(expectedPrice);
  });
});
