import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Nav from "../components/Nav.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    components: {
      default: About,
      nav: Nav,
    },
  },
  {
    path: "/menu",
    name: "Menu",
    components: {
      // default: Menu,
      nav: Nav,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    components: {
      // default: Cart,
      nav: Nav,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    components: {
      // default: Checkout,
      nav: Nav,
    },
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    components: {
      // default: Thankyou,
      nav: Nav,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      // default: Profile,
      nav: Nav,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    components: {
      // default: Ädmin,
    },
  },
  {
    path: "/admin/pizza",
    name: "AdminPizza",
    components: {
      // default: AdminPizza,
      nav: Nav,
    },
  },
  {
    path: "/admin/customize",
    name: "AdminCustomize",
    components: {
      // default: AdminCustomize,
      nav: Nav,
    },
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    components: {
      // default: AdminOrders,
      nav: Nav,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
