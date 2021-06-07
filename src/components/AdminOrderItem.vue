<template>
  <div class="order-container">
    <!-- order info --------------------->
    <section class="orderInfo">
      <div class="orderInfo__id">
        <h3>OrderID</h3>
        <span>{{ order.orderNr }}</span>
      </div>
      <div class="orderInfo__time">
        <h3>Orderdatum och tid</h3>
        <span>{{ order.date }} {{ order.time.substring(0, 5) }}</span>
      </div>

      <div class="orderInfo__pizza">
        <ul v-if="order.cart.length">
          <li
            class="cartItem"
            v-for="(cartItem, index) in order.cart"
            v-bind:key="index"
          >
            <div class="orderInfo__pizza__wrapper">
              <div class="orderInfo__pizza__name">
                <h3>Pizza namn</h3>
                <span>{{ cartItem.title }}</span>
                <ul v-show="cartItem.toppings.length">
                  <li
                    class="topping"
                    v-for="topping in cartItem.toppings"
                    v-bind:key="topping.id"
                  >
                    <span>+ Extra {{ topping.title }}</span>
                  </li>
                </ul>
              </div>
              <div class="orderInfo__pizza__quantity">
                <h3>Kvantit</h3>
                <span>× {{ cartItem.quantity }}</span>
              </div>
            </div>
            <hr />
          </li>
        </ul>
      </div>
      <div class="orderInfo__total">
        <h3>Summa</h3>
        <span>{{ order.total }} kr</span>
      </div>
    </section>
    <hr />
    <!-- kund info --------------------->
    <section class="kundInfo">
      <div class="orderInfo__leverans-method">
        <h3>Avhämtning eller leverera</h3>
        <span v-if="order.delivery == true">
          Leverera hem
        </span>
        <span v-else>
          Avhämtning
        </span>
      </div>
      <div class="orderInfo__customer-name">
        <h3>Namn</h3>
        <span v-if="order.userInfo && order.userInfo.name">{{
          order.userInfo.name
        }}</span>
      </div>
      <div class="orderInfo__customer-address">
        <h3>Adress</h3>
        <span v-if="order.userInfo && order.userInfo.address">
          {{ order.userInfo.address }}</span
        >
      </div>
      <div class="orderInfo__customer-telephone">
        <h3>Telefonnummer</h3>
        <span v-if="order.userInfo && order.userInfo.telephoneNumber">
          {{ order.userInfo.telephoneNumber }}</span
        >
      </div>
    </section>
    <button v-if="!order.state" @click="updateOrder()">Börja förbereda</button>
    <button
      class="button-klar"
      v-if="order.state == 'preparing'"
      @click="updateOrderToDone()"
    >
      Klar
    </button>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    newOrder() {
      return this.$store.state.newOrder;
    },
  },
  methods: {
    updateOrder() {
      const info = {
        orderNr: this.order.orderNr,
        state: "preparing",
      };
      this.$store.dispatch("updateOrder", info);
      this.$store.dispatch("fetchAllOrders");
    },
    updateOrderToDone() {
      const info = {
        orderNr: this.order.orderNr,
        state: "done",
      };
      this.$store.dispatch("updateOrder", info);
      this.$store.dispatch("fetchAllOrders");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";
.order-container {
  background: $white;
  margin: 0 2rem 24px;
  border-radius: 20px;
  padding: 16px;

  hr {
    border: 1px solid $light-green;
  }

  .orderInfo,
  .kundInfo {
    display: flex;
    justify-content: space-between;

    hr {
      margin: 8px 16px 16px;
      width: 100%;
    }

    div {
      margin: 0 16px;
      text-align: left;

      h3 {
        color: $light-green;
        margin-bottom: 16px;
      }
    }

    .orderInfo__pizza {
      display: flex;
      width: 40%;

      .cartItem {
        &:nth-last-of-type(1) {
          margin-bottom: 16px;

          hr {
            display: none;
          }
        }
      }

      &__wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      &__name {
        margin: 0 40px 0 0;
        .topping {
          margin: 8px 0 8px;
          font-size: 14px;
        }
      }

      &__quantity {
        margin: 0 0 0 20px;

        span {
          line-height: 0;
        }
      }
    }
  }

  .kundInfo {
    margin-top: 16px;
  }

  button {
    @include common-button-tablet;
    padding: 8px 120px 6px;
    background: $light-green;
    color: $white;
    margin: 24px 0 12px;
    width: auto;
  }

  .button-klar {
    background: $orange;
  }
}
</style>
