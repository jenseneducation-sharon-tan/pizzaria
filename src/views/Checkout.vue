<template>
  <div class="checkout">
    <router-link class="back-wrap" to="/cart" exact>
      <img src="@/assets/back.svg" alt="" />
      <span>Gå tillbaka till varukorg</span>
    </router-link>

    <div class="checkout-container">
      <h1>Kassa</h1>
      <div class="cart-details" v-if="cart.length !== 0">
        <div class="total-wrap">
          <span>Total</span>
          <span>{{ totalAmount }}kr</span>
        </div>
        <hr />
        <ul>
          <li v-for="cartitem in cart" v-bind:key="cartitem.cartItemId">
            <div class="cartitem-container">
              <div class="cartitem-wrap">
                <div class="title-price-wrap">
                  <div class="title-wrap">
                    <span>{{ cartitem.title }}</span>
                  </div>

                  <div class="price-wrap">
                    <span class="price">{{ cartitem.price }}kr</span>
                  </div>
                </div>

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
                  <div class="item-quantity">{{ cartitem.quantity }}</div>
                </div>
              </div>
            </div>
            <hr />
          </li>
        </ul>
      </div>
      <router-link class="back-to-menu-wrap" to="/menu" exact>
        <span>Fortsätta att handla</span>
      </router-link>
      <hr class="hr" />

      <!-- Leverans Method --------------------------------------------------->
      <div class="leverans-details">
        <span class="leverans-details__title"
          >Välj avhämtning eller leverera hem</span
        >
        <ul>
          <li v-for="(method, index) in leverans" v-bind:key="index">
            <input
              type="radio"
              name="leverans"
              :value="method"
              v-bind:id="method"
              v-model="checkedLeveransMethod"
              checked="checked"
            />

            <label @click="checkUser()" v-bind:for="method">
              <span>{{ method }}</span>
            </label>
          </li>
        </ul>
        <span
          class="leverans-details__title"
          v-if="checkedLeveransMethod == 'Avhämtning'"
          >Fyll i ditt namn</span
        >
        <span
          class="leverans-details__title"
          v-if="checkedLeveransMethod == 'Leverera hem'"
          >Fyll i ditt namn, adress och telefonnummer</span
        >
        <div class="adress">
          <label
            v-if="
              checkedLeveransMethod == 'Avhämtning' ||
                checkedLeveransMethod == 'Leverera hem'
            "
            for="name"
            >Namn</label
          >
          <input
            v-if="
              checkedLeveransMethod == 'Avhämtning' ||
                checkedLeveransMethod == 'Leverera hem'
            "
            name="name"
            type="text"
            v-model="name"
          />
          <label v-if="checkedLeveransMethod == 'Leverera hem'" for="adress"
            >Leveransadress</label
          >
          <input
            v-if="checkedLeveransMethod == 'Leverera hem'"
            name="adress"
            type="text"
            v-model="adress"
          />
          <label v-if="checkedLeveransMethod == 'Leverera hem'" for="telefon"
            >Telefonnummer</label
          >
          <input
            v-if="checkedLeveransMethod == 'Leverera hem'"
            name="telefon"
            type="number"
            v-model="telefon"
          />
        </div>
      </div>
      <hr class="hr" />

      <!-- Payment Method --------------------------------------------------->
      <div class="payment-details">
        <span class="payment-details__title">Välj betalningssätt</span>
        <ul>
          <li v-for="(method, index) in paymentMethod" v-bind:key="index">
            <input
              type="radio"
              name="payment"
              :value="method"
              v-bind:id="method"
              v-model="checkedPaymentMethod"
              checked="checked"
            />

            <label v-bind:for="method">
              <span>{{ method }}</span>
            </label>
          </li>
        </ul>

        <span
          class="leverans-details__title"
          v-if="checkedPaymentMethod == 'Kort'"
          >Fyll i ditt korts info</span
        >

        <div class="card">
          <label v-if="checkedPaymentMethod == 'Kort'" for="cardnumber"
            >Kortnummer</label
          >
          <input
            v-if="checkedPaymentMethod == 'Kort'"
            name="cardnumber"
            type="number"
            v-model="cardnumber"
            maxlength="12"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          />
          <label v-if="checkedPaymentMethod == 'Kort'" for="valid"
            >Gilltigt till ( månad / år )</label
          >
          <div class="valid-info" v-if="checkedPaymentMethod == 'Kort'">
            <input
              name="valid"
              type="number"
              v-model="validYear"
              maxlength="2"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            />
            <span>/</span>
            <input
              name="valid"
              type="number"
              v-model="validMonth"
              maxlength="2"
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            />
          </div>

          <label v-if="checkedPaymentMethod == 'Kort'" for="cvc"
            >CVC/CVV-kod</label
          >
          <input
            v-if="checkedPaymentMethod == 'Kort'"
            name="cvc"
            type="number"
            maxlength="3"
            v-model="cvc"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          />
        </div>
      </div>

      <hr class="hr" />

      <!-- Total --------------------------------------------------->
      <div class="summa-details">
        <span class="summa-details__title">Summa</span>
        <div class="total-price">
          <span>Att betala</span>
          <span>{{ totalAmount }}kr</span>
        </div>
      </div>
      <button
        :disabled="payIsDisabled"
        :class="{ payIsDisabled: payIsDisabled }"
        @click="pay()"
      >
        Betala
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    leverans: ["Avhämtning", "Leverera hem"],
    paymentMethod: ["Swish", "Kort"],
    checkedLeveransMethod: "",
    checkedPaymentMethod: "",
    name: null,
    adress: null,
    telefon: null,
    cardnumber: null,
    validYear: null,
    validMonth: null,
    cvc: null,
  }),
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    totalAmount() {
      return this.$store.getters.total;
    },
    menu() {
      return this.$store.state.menu;
    },
    user() {
      return this.$store.state.user;
    },
    payIsDisabled() {
      if (this.checkedLeveransMethod == "" || this.checkedPaymentMethod == "") {
        return true;
      } else if (this.checkedLeveransMethod == "Avhämtning" && !this.name) {
        return true;
      } else if (
        (this.checkedLeveransMethod == "Leverera hem" && !this.name) ||
        (this.checkedLeveransMethod == "Leverera hem" && !this.adress) ||
        (this.checkedLeveransMethod == "Leverera hem" && !this.telefon)
      ) {
        return true;
      } else if (
        (this.checkedPaymentMethod == "Kort" && !this.cardnumber) ||
        (this.checkedPaymentMethod == "Kort" && !this.validYear) ||
        (this.checkedPaymentMethod == "Kort" && !this.validMonth) ||
        (this.checkedPaymentMethod == "Kort" && !this.cvc)
      ) {
        return true;
      } else if (!this.cart.length) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {},
  watch: {},
  methods: {
    checkUser() {
      if (Object.keys(this.user).length) {
        this.name = this.user.userName;
        this.adress = this.user.adress;
        this.telefon = this.user.telefon;
      }
    },
    async pay() {
      this.$store.commit(
        "setDelivery",
        this.checkedLeveransMethod == "Avhämtning" ? false : true
      );
      let userInfo = {
        name: this.name,
        address: this.adress,
        telephoneNumber: this.telefon,
      };
      await this.$store.dispatch("postOrder", userInfo);
      await this.$store.dispatch("fetchAllOrders");
      this.$router.push("/thankyou");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

.checkout {
  display: block;
  background: $white-green;
  height: 100vh;
  padding: 1rem 1rem;
  color: $dark-green;
  overflow: auto;
  text-align: left;
  padding-bottom: 90px;

  .back-wrap,
  .back-to-menu-wrap {
    display: flex;
    align-items: center;
    color: $dark-green;

    img {
      width: 20px;
      height: auto;
    }

    span {
      margin: 4px 0 0 8px;
    }
  }

  .back-to-menu-wrap {
    margin: 1rem 0;
  }

  .checkout-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: $font-heading-xl;
      margin: 20px 0;
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
                width: 100%;

                .title-wrap {
                  display: flex;
                  align-items: center;
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

              .item-quantity {
                font-size: 20px;
              }
            }
          }
        }
      }
    }

    .hr {
      border: solid 1px $dark-green;
      opacity: 0.3;
      width: 100%;
      margin-bottom: 20px;
    }

    .leverans-details,
    .payment-details,
    .summa-details {
      width: 100%;

      &__title {
        font-size: 1.125rem;
        font-weight: bold;
      }

      ul {
        margin-bottom: 2rem;

        li {
          margin: 1rem 0;
          span {
            margin-top: 8px;
          }
        }
      }

      .adress,
      .card {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0 1rem;

        label {
          margin: 3px 0px 3px 3px;
          align-self: flex-start;
        }
        input {
          background-color: $white;
          border: 1px solid $white;
          color: $orange;
          font-size: $font-text-xs;
          height: 44px;
          border-radius: 5px;
          margin-bottom: 5px;
          padding-left: 8px;
        }

        .valid-info {
          display: flex;
          align-items: center;
          justify-content: space-between;

          input {
            width: 45%;
          }
        }
      }

      .total-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
      }
    }

    button {
      @include common-button-mobile;
      font-size: 28px;
      padding: 10px 16px 8px;
      background: $orange;
      color: $white;
      margin: 24px 0 12px;
    }

    .payIsDisabled {
      background: $gray;
    }
  }
}
</style>
