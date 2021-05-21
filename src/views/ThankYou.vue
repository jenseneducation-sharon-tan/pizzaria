<template>
  <div class="confirm-order">
    <div class="order-wrapper" v-if="order.eta">
      <p>Tack för din beställning</p>
      <p>Order ID : {{ order.orderNr }}</p>
      <div class="pizza-picture">
        <img src="@/assets/fork.svg" alt="fork" width="40px" />
        <img src="@/assets/pizza.svg" alt="pizza" width="148px" />
        <img src="@/assets/knife.svg" alt="knife" width="23px" />
      </div>
      <p class="confirm-text">
        Din beställning är klar om
      </p>
      <div class="estimate-delivery">ca {{ order.eta }} min</div>
      <router-link to="/menu">
        <button>Stäng</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    order() {
      return this.$store.state.orderInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.confirm-order {
  display: none;
}

@media screen and (max-width: $breakpoint-mobile) {
  .confirm-order {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $dark-green;
    height: 100vh;
    color: $white;
    .order-wrapper {
      margin-top: 75px;
      //justify-content: space-evenly;

      p:nth-child(1) {
        margin-bottom: 20px;
        font-size: $font-heading-sm;
      }
      p:nth-child(2),
      .confirm-text {
        font-size: $font-text-sm;
      }

      p:nth-child(2) {
        margin-bottom: 50px;
      }

      .pizza-picture {
        img:nth-child(1) {
          margin-right: 10px;
        }
        img:nth-child(3) {
          margin-left: 10px;
        }
      }
      .confirm-text {
        margin-bottom: 10px;
      }

      .pizza-picture {
        margin-bottom: 50px;
      }

      .estimate-delivery {
        font-size: $font-text-lg;
      }
    }
    button {
      @include common-button-mobile;
      color: $dark-green;
      background-color: $yellow;
      margin-top: 30px;
      width: 70%;
    }
  }
}
</style>
