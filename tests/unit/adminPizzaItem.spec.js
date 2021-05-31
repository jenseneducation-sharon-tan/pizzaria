import {
	shallowMount,
	mount,
	RouterLinkStub,
	createLocalVue,
  } from "@vue/test-utils";
  import Vuex from "vuex";
  import VueRouter from "vue-router";
  import AdminPizzaItem from "../../src/components/AdminPizzaItem.vue";
  
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);
  const router = new VueRouter();
  /* router.push("/description/1"); */
  
  describe("AdminPizzaItem", () => {
	let store;

	beforeEach(() => {
		store = new Vuex.Store({
		  state:{

		  },
		});
	  });
  
	it("should show the correct name in the pizza item component", async () => {
	  let wrapper, item;
	  (item = {
		title: "Margherita",
	  }),
		
	  wrapper = shallowMount(AdminPizzaItem, {
		localVue,
		store,
		propsData: {
		  item: item,
		},
		stubs: {
		  RouterLink: RouterLinkStub,
		},
	  });
	  let expected = item.title;
	  let actual = wrapper.find(".item-title").text();
	  expect(actual).toBe(expected);
	});

	
	it("should show the correct price of the pizza in the pizza item component", async () => {
		let wrapper, item;
		(item = {
		  price: 119,
		}),
		  
		wrapper = shallowMount(AdminPizzaItem, {
		  localVue,
		  store,
		  propsData: {
			item: item,
		  },
		  stubs: {
			RouterLink: RouterLinkStub,
		  },
		});
		let expected = "119 kr";
		let actual = wrapper.find(".item-price").text();
		expect(actual).toBe(expected);
	  }); 

	  it("should show the correct description of the pizza in the pizza item component", async () => {
		let wrapper, item;
		(item = {
		  desc: "Tomatsås, Ost, Mozzarellaost, Basilika",
		}),
		  
		wrapper = shallowMount(AdminPizzaItem, {
		  localVue,
		  store,
		  propsData: {
			item: item,
		  },
		  stubs: {
			RouterLink: RouterLinkStub,
		  },
		});
		let expected = item.desc;
		let actual = wrapper.find(".item-description").text();
		expect(actual).toBe(expected);
	  });
});
