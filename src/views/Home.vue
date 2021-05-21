<template>
  <div class="home">
    <div class="home-container">
      <img src="../assets/pizza.svg" alt="" />
      <div class="title">
        <h1>EKO PIZZA</h1>
      </div>
      <p class="smallText">Vi använder bara ekologiska ingredienser!</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  created() {
    setTimeout(() => this.$router.push({ path: "/menu" }), 3000);
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .home {
    background-image: url("../assets/bg-1.jpg");
    background-repeat: repeat y;
    height: 100vh;
    padding: 38px 1rem;
    overflow: auto;
    color: $white;
    align-items: center;
    justify-content: center;
    display: flex;

    .home-container {
      img {
        width: 148px;
        align-items: center;
        justify-content: center;
        margin-top: -20px;
      }

      .title {
        padding: 0 0 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;

        h1 {
          font-size: $font-landing;
          font-weight: 400;
        }
      }
      p {
        font-size: $font-footer;
        padding-top: 0px;
      }
    }
  }
}
</style>
