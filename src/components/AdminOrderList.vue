<template>
  <div class="order-list">
    <ul class="order-list-wrapper" :class="tab1 == '2' ? 'done' : null">
      <li v-for="order in orders" :key="order.id" class="order-item">
        <AdminOrderItem
          v-if="tab1 == '1' && tab2 == '1' && !order.state"
          :order="order"
        />
        <AdminOrderItem
          v-if="
            tab1 == '1' &&
              tab2 == '2' &&
              order.state &&
              order.state == 'preparing'
          "
          :order="order"
        />
        <AdminOrderItem
          v-if="tab1 == '2' && order.state && order.state == 'done'"
          :order="order"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import AdminOrderItem from "@/components/AdminOrderItem.vue";

export default {
  components: { AdminOrderItem },
  props: {
    tab1: String,
    tab2: String,
  },
  mounted() {
    this.$store.dispatch("fetchAllOrders");
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.order-list {
  display: flex;
  justify-content: center;
  margin-top: 200px;

  .order-list-wrapper {
    overflow: auto;
    position: fixed;
    bottom: 70px;
    height: 62%;
    width: 100%;
    background: $dark-green;

    @media screen and (min-width: 1023px) {
      height: 72%;
    }
  }

  .done {
    height: 68%;

    @media screen and (min-width: 1023px) {
      height: 75%;
    }
  }
}
</style>
