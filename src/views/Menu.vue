<template>
  <div class="menu">
    <img class="graphic-top" :src="require(`@/assets/graphic-top.svg`)" />
    <h1>Menu</h1>
    <MenuList :menu="menu" />
    <img class="graphic-bottom" :src="require(`@/assets/graphic-bottom.svg`)" />
    <CartItemCounter />
  </div>
</template>

<script>
import MenuList from "@/components/MenuList";
import CartItemCounter from "@/components/CartItemCounter";

export default {
  name: "Menu",
  components: { MenuList, CartItemCounter },

  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  mounted() {
    this.$store.dispatch("fetchMenu");
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .menu {
    h1 {
      font-size: $font-heading-xl;
      color: $dark-green;
      padding-top: 40px;
    }
    .graphic-bottom {
      margin-bottom: 60px;
    }
  }
}
</style>
