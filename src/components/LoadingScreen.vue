<template>
  <div class="loading">
    <img src="../assets/pizza.svg" alt="" />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .loading {
    background-color: $dark-green;
    color: $white;
    width: 100%;
    z-index: 999;
    img {
      width: 148px;
      height: 100vh;
      align-items: center;
      animation: rotation 5s infinite linear;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
}
</style>
