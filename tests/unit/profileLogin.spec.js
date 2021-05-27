import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import LogIn from "../../src/components/LogIn.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("LogIn.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      loginUser: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
    });
  });

  //login
  it('calls store action "actionClick" when button is clicked', () => {
    const wrapper = shallowMount(LogIn, { store, localVue });
    wrapper.find("button").trigger("click");
    expect(actions.loginUser).toHaveBeenCalled();
  });
});
