<template>
  <div class="cart">
    <div class="title">
      <img src="@/assets/bag.svg" alt="" />
      <h1>Varukorg</h1>
    </div>
    <main v-if="cart.length !== 0">
      <div class="about-tomato-icon">
        <img src="@/assets/customize-small.svg" alt="" />
        <span>--- Lägga till extra pålägg</span>
      </div>

      <div class="cart-details">
        <div class="total-wrap">
          <span>Total</span>
          <span>{{ totalAmount }}kr</span>
        </div>
        <hr />
        <ul>
          <li v-for="cartitem in cart" v-bind:key="cartitem.id">
            <div class="cartitem-wrap">
              <div class="title-price-wrap">
                <div class="title-wrap">
                  <img
                    class="customize-icon"
                    src="@/assets/customize.svg"
                    alt=""
                    @click="$refs.cartModal.openModal()"
                  />
                  <span>{{ cartitem.title }}</span>
                </div>

                <div class="price-wrap">
                  <span class="price">{{ cartitem.price }}kr</span>
                  <span class="×">×</span>
                  <div class="quantity-wrap">
                    <div
                      class="add-quantity add-arrow-wrap"
                      @click="addQuantity(cartitem.id)"
                    >
                      <img
                        class="arrow-up__img"
                        src="@/assets/arrow-up.svg"
                        alt=""
                      />
                    </div>
                    <div class="item-quantity">{{ cartitem.quantity }}</div>
                    <div
                      class="remove-quantity remove-arrow-wrap"
                      @click="removeQuantity(cartitem.id)"
                    >
                      <img
                        class="arrow-down__img"
                        src="@/assets/arrow-down.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <span class="total-price"
                >{{ cartitem.price * cartitem.quantity }}kr</span
              >
            </div>
            <hr />
          </li>
        </ul>
      </div>

      <button class="cart-button">Logga in och gå till kassan</button>
      <p class="or">or</p>
      <a href="#/checkout">Gå till kassan som gäst</a>
    </main>
    <p class="noItemText" v-else>Det är tomt i varukorgen</p>

    <!-- Modal -->
    <modal class="modal" ref="cartModal">
      <template v-slot:header>
        <h1 class="modal-title">Extra pålägg</h1>
      </template>
      <template v-slot:body>
        <span>
          Jag vill ha extra:
        </span>
        <ul>
          <li v-for="topping in toppings" v-bind:key="topping.id">
            {{ topping.title }}
          </li>
        </ul>
      </template>
      <template v-slot:footer>
        <div>
          <button @click="$refs.cartModal.closeModal()">Spara</button>
        </div>
      </template>
    </modal>
    <CartItemCounter />
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import CartItemCounter from "@/components/CartItemCounter";

export default {
  name: "Cart",
  components: {
    Modal,
    CartItemCounter,
  },
  props: ["id"],
  data: () => ({
    // toppings: [],
  }),
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalAmount() {
      return this.$store.getters.total;
    },
    toppings() {
      return this.$store.state.toppings;
    },
  },
  mounted() {
    this.$store.dispatch("fetchToppings");
  },
  methods: {
    addQuantity(id) {
      this.$store.commit("addQuantity", id);
    },
    removeQuantity(id) {
      this.$store.commit("removeQuantity", id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.overflow-hidden {
  overflow: hidden;
}

.cart {
  display: none;
}

@media screen and (max-width: $breakpoint-mobile) {
  .cart {
    display: block;
    background: $white-green;
    height: 100vh;
    padding: 38px 1rem;
    color: $dark-green;
    overflow: auto;

    .modal {
      .modal-title {
        font-size: $font-heading-lg;
      }

      ul {
        list-style: none;
      }

      button {
        @include common-button-mobile;
        font-size: 28px;
        padding: 10px 16px 8px;
        background: $orange;
        color: $white;
        margin: 32px 0 12px;
      }
    }

    .noItemText {
      font-size: 1.5rem;
      margin-top: 2rem;
    }

    .title {
      padding: 0 0 28px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
        height: auto;
        margin-right: 10px;
        margin-bottom: 10px;
      }

      h1 {
        font-size: $font-heading-xl;
      }
    }

    .about-tomato-icon {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      margin-left: 10px;

      img {
        width: 20px;
        height: auto;
        margin-bottom: 4px;
        margin-right: 4px;
      }
    }

    .cart-details {
      background: $white;
      border-radius: 20px;
      width: 100%;
      height: auto;
      padding: 1.5rem 1rem;

      .total-wrap {
        display: flex;
        justify-content: space-between;
        span {
          font-size: $font-heading-xs;
        }
      }

      hr {
        border: 2px solid $light-green;
      }

      ul {
        list-style: none;

        li {
          .cartitem-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 8px 0;
            width: 100%;

            .title-price-wrap {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 75%;

              .title-wrap {
                display: flex;
                align-items: center;

                .customize-icon {
                  width: 30px;
                  margin-right: 0.8rem;
                }
              }

              .price-wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .price {
                  margin-right: 0.2rem;
                }

                .× {
                  margin-right: 0.3rem;
                  margin-top: -0.3rem;
                }

                img {
                  width: 10px;
                }
              }
            }
          }

          hr {
            border: 1px solid $light-green;
          }
        }
      }
    }

    .cart-button {
      @include common-button-mobile;
      font-size: 24px;
      padding: 14px 16px 10px;
      background: $orange;
      color: $white;
      margin: 32px 0 12px;
    }

    .or {
      margin-bottom: 8px;
      font-size: $font-text-sm;
    }

    a {
      font-size: $font-text-sm;
      color: $orange;
      padding-bottom: 100px;
    }
  }
}
</style>
