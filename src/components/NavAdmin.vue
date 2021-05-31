<template>
  <nav>
    <div class="admin-nav">
      <ul class="nav__wrap">
        <li v-for="nav in adminNavList" v-bind:key="nav.name" class="menu-list">
          <router-link class="menu-list-link" :to="`${nav.link}`">
            <span>{{ nav.name }}</span>
          </router-link>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <NewOrderCounter />
  </nav>
</template>

<script>
import NewOrderCounter from "@/components/NewOrderCounter";
export default {
  components: {
    NewOrderCounter,
  },
  data: () => ({
    adminNavList: [
      {
        name: "Pizzor",
        link: "/admin/pizza",
      },
      {
        name: "Extra pålägg",
        link: "/admin/customize",
      },
      {
        name: "Beställningar",
        link: "/admin/orders",
      },
    ],
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/style/main";
.admin-nav {
  display: none;
}

@media screen and (max-width: $breakpoint-tablet) and (min-width: $breakpoint-mobile) {
  .order-counter {
    position: fixed;
    right: 45px;
    bottom: 33px;

    @media screen and (min-width: 1023px) {
      right: 80px;
    }
  }

  .admin-nav {
    background: $white;
    box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.199);
    height: 70px;
    width: 100%;
    //position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;

    .nav__wrap {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      list-style: none;
      margin-top: 4px;

      .menu-list-link {
        display: flex;
        flex-direction: column;
        text-decoration: none;

        span {
          color: $dark-green;
          font-size: 32px;
        }
      }

      .router-link-active {
        span {
          color: $orange;
        }
      }
    }
  }
}
</style>
