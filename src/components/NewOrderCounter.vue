<template>
  <div class="order-counter">
    <div class="counter" v-if="numberOfNewOrders > 0">
      <span>{{ numberOfNewOrders }}</span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    numberOfNewOrders() {
      return this.$store.getters.numberOfNewOrders;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/style/main";

.order-counter {
  .counter {
    background-color: $red;
    border-radius: 50%;
    border: none;
    width: 24px;
    height: 24px;
    z-index: 10;

    span {
      color: $white;
      display: block;
      padding: 14px 0;
      line-height: 0;
    }
  }
}
</style>
