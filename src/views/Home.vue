<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Nav />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Nav,
  },
};
</script>
