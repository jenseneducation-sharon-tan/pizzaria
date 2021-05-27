<template>
  <div class="OrderHistory">
    <div class="small" @click="logout" id="logOutLink">Logga ut</div>
    <img class="pic" src="@/assets/person.svg" alt="user" />
    <div class="users">
      <label for="userName">Namn</label>
      <input name="name" type="text" v-model="userName" />
      <label for="email">Epost</label>
      <input name="name" type="text" v-model="email" />
      <label for="address">Adress</label>
      <input name="adress" type="text" v-model="address" class="address" />
      <label for="telephoneNumber">Telephonnummer</label>
      <input name="telephoneNumber" type="text" v-model="telephoneNumber" />
      <button class="saveUser" @click="UpdateUser()">Spara</button>
    </div>
    <div class="user-history">
      <h2>Din orderhistork</h2>
      <ul>
        <li class="oldOrders" v-for="order in orders" :key="order.orderNr">
          <div>
            Id: <span>{{ order.orderNr }}</span>
          </div>
          <div>{{ order.time }}</div>
          <div>
            Summa: <span>{{ order.total }} kr</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Regist",
  data: () => ({
    userName: "",
    email: "",
    address: "",
    telephoneNumber: "",
    userId: "",
    orders: [],
  }),
  async created() {
    this.userName = this.$store.state.user["userName"];
    this.address = this.$store.state.user["address"];
    this.email = this.$store.state.user["email"];
    this.telephoneNumber = this.$store.state.user["telephoneNumber"];
    this.userId = this.$store.state.user["id"];
    if (this.userId) {
      await this.$store.dispatch("fetchOrders");
      this.orders = this.$store.state.orders;
    }
  },
  methods: {
    async UpdateUser() {
      await this.$store.dispatch("updateUser", {
        userName: this.userName,
        email: this.email,
        address: this.address,
        telephoneNumber: this.telephoneNumber,
      });
    },
    async logout() {
      await this.$store.dispatch("logoutUser");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/main";
.OrderHistory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .small {
    font-size: $font-text-sm;
    align-self: flex-end;
    color: $white;
  }
  .pic {
    width: 100px;
    height: 100px;
  }
  .users {
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    label {
      margin: 3px 0px 3px 3px;
      align-self: flex-start;
      font-size: $font-footer;
      color: $white;
    }
    input {
      background-color: $white-green;
      border: 1px solid $white-green;
      height: 44px;
      border-radius: 5px;
      margin-bottom: 5px;
      color: $dark-green;
      font-size: $font-text-xs;
    }
    .address {
      height: 88px;
    }
    .saveUser {
      @include common-button-mobile;
      font-size: 24px;
      padding: 14px 16px 10px;
      background: $orange;
      color: $white;
      margin: 32px 0 12px;
    }
  }
  .user-history {
    width: 70%;
    h2 {
      color: $white;
      font-size: $font-heading-md;
      margin: 20px 0px;
      border-bottom: 1px solid $white-green;
    }
    .oldOrders {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: $white;
      border-bottom: 1px solid $white-green;
      font-size: $font-footer;
      margin-bottom: 10px;
    }
  }
}
</style>