import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Cart from "../views/Cart.vue";
import AdminPizza from "../views/AdminPizza.vue";
import Nav from "../components/Nav.vue";
import NavAdmin from "../components/NavAdmin.vue";
import Menu from "../views/Menu.vue";
import Profile from "../views/Profile.vue";
import ThankYou from "../views/ThankYou.vue";
import Checkout from "../views/Checkout.vue";
import AdminLogIn from "../views/AdminLogIn.vue";
import AdminCustomize from "../views/AdminCustomize.vue";

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
      default: Menu,
      nav: Nav,
    },
  },
  {
    path: "/cart",
    name: "Cart",
    components: {
      default: Cart,
      nav: Nav,
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    components: {
      default: Checkout,
      nav: Nav,
    },
  },
  {
    path: "/thankyou",
    name: "Thankyou",
    components: {
      default: ThankYou,
      nav: Nav,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    components: {
      default: Profile,
      nav: Nav,
    },
  },
  {
    path: "/admin",
    name: "AdminLogIn",
    components: {
      default: AdminLogIn,
    },
  },
  {
    path: "/admin/pizza",
    name: "AdminPizza",
    components: {
      default: AdminPizza,
      navAdmin: NavAdmin,
    },
  },
  {
    path: "/admin/customize",
    name: "AdminCustomize",
    components: {
      default: AdminCustomize,
      navAdmin: NavAdmin,
    },
  },
  {
    path: "/admin/orders",
    name: "AdminOrders",
    components: {
      // default: AdminOrders,
      navAdmin: NavAdmin,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
