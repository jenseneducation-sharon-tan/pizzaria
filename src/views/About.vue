<template>
  <div class="about">
    <h1>This is an about page</h1>
    <CartItemCounter />
  </div>
</template>
<script>
import CartItemCounter from "@/components/CartItemCounter";

export default {
  name: "About",
  components: { CartItemCounter },
};
</script>
<style lang="scss" scoped></style>
