<template>
  <div class="item-counter">
    <div class="counter" v-if="numberOfCartItems > 0">
      <span>{{ numberOfCartItems }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "CartItemCounter",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    numberOfCartItems() {
      return this.$store.getters.numberOfCartItems;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .item-counter {
    .counter {
      background-color: $red;
      border-radius: 50%;
      border: none;
      position: fixed;
      right: 22px;
      bottom: 33px;
      width: 24px;
      height: 24px;
      z-index: 3;

      span {
        color: $white;
        display: block;
        margin-top: 2px;
      }

      .no-show {
        display: none;
      }
    }
  }
}
</style>
