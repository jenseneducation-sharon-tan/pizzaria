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
          <li
            v-for="(cartitem, index) in cart"
            v-bind:key="cartitem.cartItemId"
          >
            <div class="cartitem-container">
              <div class="cartitem-wrap">
                <div class="title-price-wrap">
                  <div class="title-wrap">
                    <img
                      class="customize-icon"
                      src="@/assets/customize.svg"
                      alt=""
                      @click="
                        $refs.cartModal[0].openModal(), selectedPizza(index)
                      "
                    />
                    <span>{{ cartitem.title }}</span>
                  </div>

                  <div class="price-wrap">
                    <span class="price">{{ cartitem.price }}kr</span>
                  </div>
                </div>
                <!-- <span class="total-price"
                >{{ cartitem.price * cartitem.quantity }}kr</span
              > -->

                <div class="topping-wrap">
                  <ul>
                    <hr v-if="cartitem.toppings.length" />
                    <li
                      v-for="topping in cartitem.toppings"
                      v-bind:key="topping.id"
                    >
                      <span>+ Extra {{ topping.title }}</span>
                      <span>{{ topping.price }}kr</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="quantity-container">
                <span class="×">×</span>
                <div class="quantity-wrap">
                  <div
                    class="add-quantity add-arrow-wrap"
                    @click="addQuantity(index)"
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
                    @click="removeQuantity(index)"
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
            <hr />
          </li>
        </ul>
      </div>

      <button
        v-if="Object.keys(Object.assign({}, ...user)).length"
        class="cart-button direkt"
        @click="goToCheckout()"
      >
        Gå till kassan
      </button>
      <button
        v-if="!Object.keys(Object.assign({}, ...user)).length"
        class="cart-button"
        @click="$refs.loginModal.openModal()"
      >
        Logga in och gå till kassan
      </button>
      <p v-if="!Object.keys(Object.assign({}, ...user)).length" class="or">
        or
      </p>
      <a
        v-if="!Object.keys(Object.assign({}, ...user)).length"
        href="#/checkout"
        >Gå till kassan som gäst</a
      >
    </main>
    <p class="noItemText" v-else>Det är tomt i varukorgen</p>

    <!-----------------------------Topping Modal-------------------------------------->
    <modal class="modal" ref="cartModal">
      <template v-slot:header>
        <h1 class="modal-title">Extra pålägg</h1>
      </template>
      <template v-slot:body>
        <div class="pizza-name-wrap">
          <h2>{{ cart[selectedPizzaIndex].title }}</h2>
          <ul>
            <li v-for="menuitem in menu" v-bind:key="menuitem.id">
              <p v-if="menuitem.id == cart[selectedPizzaIndex].id">
                {{ menuitem.desc }}
              </p>
            </li>
          </ul>
        </div>
        <span class="desc-text">
          Jag vill ha extra:
        </span>
        <div class="topping-list">
          <ul>
            <li v-for="(topping, index) in toppings" v-bind:key="topping.id">
              <div>
                <input
                  v-if="index < toppings.length / 2"
                  type="checkbox"
                  name=""
                  v-bind:id="index"
                  :value="topping"
                  v-model="checkedToppings"
                />

                <label v-bind:for="index">
                  <span v-if="index < toppings.length / 2">{{
                    topping.title
                  }}</span>
                </label>
              </div>
              <span v-if="index < toppings.length / 2"
                >{{ topping.price }}kr</span
              >
            </li>
          </ul>
          <ul>
            <li v-for="(topping, index) in toppings" v-bind:key="topping.id">
              <div>
                <input
                  v-if="index >= toppings.length / 2"
                  type="checkbox"
                  name=""
                  v-bind:id="index"
                  :value="topping"
                  v-model="checkedToppings"
                />
                <label v-bind:for="index">
                  <span v-if="index >= toppings.length / 2">{{
                    topping.title
                  }}</span>
                </label>
              </div>
              <span v-if="index >= toppings.length / 2"
                >{{ topping.price }}kr</span
              >
            </li>
          </ul>
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button
            id="toppingSaveButton"
            @click="
              $refs.cartModal.closeModal(), saveToppings(selectedPizzaIndex)
            "
          >
            Spara
          </button>
        </div>
      </template>
    </modal>

    <!---------------------------------------Login / Register Modal--------------------------------------->
    <modal class="modal login-modal" ref="loginModal">
      <template v-slot:body>
        <LogIn
          v-if="logIn"
          @changeLogin="changeLogin"
          @checkLogin="checkLogin"
        />
        <Regist v-else @changeLogin="changeLogin" @checkLogin="checkLogin" />
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import LogIn from "@/components/LogIn";
import Regist from "@/components/Regist";

export default {
  name: "Cart",
  components: {
    Modal,
    LogIn,
    Regist,
  },
  props: ["id"],
  data: () => ({
    selectedPizzaIndex: 0,
    checkedToppings: [],
    isError: false,
    showLogIn: false,
    showRegist: false,
    logIn: true,
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
    menu() {
      return this.$store.state.menu;
    },
    error: function() {
      return this.$store.state.loginError;
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$store.dispatch("fetchToppings");
  },
  methods: {
    addQuantity(index) {
      this.$store.commit("addQuantity", index);
    },
    removeQuantity(index) {
      this.$store.commit("removeQuantity", index);
    },
    selectedPizza(index) {
      this.selectedPizzaIndex = index;
      this.checkedToppings = this.cart[index].toppings;
    },
    saveToppings(selectedPizzaIndex) {
      let cartInfo = {
        toppings: this.checkedToppings,
        pizzaIndex: selectedPizzaIndex,
      };
      this.$store.commit("addToppingsToPizza", cartInfo);
    },
    changeLogin() {
      this.logIn = !this.logIn;
    },
    checkLogin() {
      setTimeout(() => {
        if (Object.keys(this.user).length) {
          this.$router.push("/checkout");
        }
      }, 1000);
    },
    goToCheckout() {
      this.$router.push({ name: "Checkout" });
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

    ul {
      list-style: none;
    }

    .modal {
      .modal-title {
        font-size: $font-heading-lg;
      }

      .pizza-name-wrap {
        width: 100%;
        background: $white-green;
        padding: 1.5rem 0;
        border-radius: 20px;
        margin-bottom: 1.5rem;

        h2 {
          margin-bottom: 0.5rem;
        }
      }

      .desc-text {
        font-size: $font-text-xs;
        margin-bottom: 1rem;
      }

      .topping-list {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;

        ul {
          list-style: none;
          text-align: left;
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          li {
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
              margin: 0.5rem 0;
            }
          }

          &:nth-of-type(1) {
            padding-right: 1rem;
          }

          &:nth-of-type(2) {
            border-left: 1px solid $dark-green;
            padding-left: 1rem;
          }
        }
      }

      button {
        @include common-button-mobile;
        font-size: 28px;
        padding: 10px 16px 8px;
        background: $orange;
        color: $white;
        margin: 0.5rem 0 12px;
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
          hr {
            border: 1px solid $light-green;
          }

          .cartitem-container {
            display: flex;
            align-items: center;

            .cartitem-wrap {
              margin: 8px 1rem 8px 0;
              width: 100%;

              .title-price-wrap {
                display: flex;
                align-items: center;
                justify-content: space-between;
                //   width: 75%;
                width: 100%;

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
                  margin: 0.5rem 0;
                }
              }
            }

            hr {
              border: 1px solid $light-green;
            }

            .topping-wrap {
              ul {
                hr {
                  margin: 0.2rem 0 0.5rem;
                  opacity: 0.3;
                }
                li {
                  display: flex;
                  justify-content: space-between;
                  margin: 0.2rem 0;
                }
              }
            }

            .quantity-container {
              display: flex;
              align-items: center;
              margin: 0.5rem 0;

              .× {
                margin-right: 1rem;
                margin-top: -0.3rem;
              }

              img {
                width: 10px;
              }

              .item-quantity {
                font-size: 20px;
              }
            }
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

    .direkt {
      margin: 32px 0 60px;
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
