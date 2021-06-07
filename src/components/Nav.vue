<template>
  <nav>
    <div class="customer-nav">
      <ul class="nav__wrap">
        <li
          v-for="nav in customerNavList"
          v-bind:key="nav.name"
          class="menu-list"
        >
          <router-link class="menu-list-link" :to="`${nav.link}`">
            <img
              class="nav-icon nav-icon_inactive"
              :src="require(`@/assets/${nav.icon}.svg`)"
              :alt="`${nav.name}`"
            />
            <img
              class="nav-icon nav-icon_active"
              :src="require(`@/assets/${nav.icon}-active.svg`)"
              :alt="`${nav.name}`"
            />
            <span>{{ nav.name }}</span>
          </router-link>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <CartItemCounter />
  </nav>
</template>

<script>
import CartItemCounter from "@/components/CartItemCounter";
export default {
  components: {
    CartItemCounter,
  },
  data: () => ({
    customerNavList: [
      {
        name: "Meny",
        link: "/menu",
        icon: "menu",
      },
      {
        name: "Om oss",
        link: "/about",
        icon: "about",
      },
      {
        name: "Profil",
        link: "/profile",
        icon: "profile",
      },
      {
        name: "Varukorg",
        link: "/cart",
        icon: "bag",
      },
    ],
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.customer-nav {
  display: none;
}

@media screen and (max-width: $breakpoint-mobile) {
  .customer-nav {
    background: $white;
    box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.199);
    height: 60px;
    width: 100%;
    //position: absolute;
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .nav__wrap {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      margin-top: 4px;

      li:nth-of-type(1) {
        margin-left: 6px;
      }

      .menu-list-link {
        display: flex;
        flex-direction: column;
        text-decoration: none;

        .nav-icon {
          width: auto;
          height: 26px;
          margin-bottom: 2px;
        }

        .nav-icon_active {
          display: none;
        }

        span {
          color: $dark-green;
          font-size: 18px;
        }
      }

      .router-link-active {
        .nav-icon {
          width: auto;
          height: 26px;
          margin-bottom: 2px;
        }

        .nav-icon_inactive {
          display: none;
        }

        .nav-icon_active {
          display: block;
        }

        span {
          color: $orange;
        }
      }
    }
  }
}
</style>
