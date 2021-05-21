<template>
  <div class="about">
    <h1>Om oss</h1>
    <div class="about-details">
      <p class="details">
        Lorem ipsum dolor sit amet,consectetur adipiscing elit. Vestibulum sed
        auctor mi. Duis varius, dui vitae pretiumrutrum,velit eros molestie
        nisi, in pulvinar purus arcu a sem. In conseq dvolutpat.Pellentesque
        viverra consequat cursus. Nuncporttitor lobortis lorem ut lobortis.
        Morbi tortor quam.
      </p>
      <hr />
      <h1>Öppettider</h1>
      <p>Alla dagar 10-22</p>
      <hr />
      <h1>Adress</h1>
      <p>Pizzavägen 123 Stockholm</p>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4078.4398518596845!2d18.093819749076776!3d59.262474651973704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f79b76843cc87%3A0xd7cf317387986eff!2zQ2lyY2xlIEsgU2vDtm5kYWwgTnluw6RzdsOkZ2Vu!5e0!3m2!1sen!2sse!4v1621264431332!5m2!1sen!2sse"
        width="600"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
      <hr />
      <h1>Telefon</h1>
      <p>070 1234 567</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
@import "@/style/main";

@media screen and (max-width: $breakpoint-mobile) {
  .about {
    background-image: url("../assets/bg-2.jpg");
    background-repeat: repeat y;
    height: 100vh;
    padding: 38px 1rem;
    overflow: auto;
    color: $dark-green;
    align-items: center;
    justify-content: center;
    overflow: auto;

    h1 {
      font-size: $font-heading-xl;
      text-align: center;
      font-weight: normal;
    }

    .about-details {
      color: $dark-green;
      margin: 24px;
      text-align: center;

      .details {
        font-size: $font-text-sm;
        text-align: left;
      }

      hr {
        border: 1px solid $light-green;
        margin-bottom: 40px;
      }

      p {
        font-size: $font-text-sm;
        margin-top: 20px;
        margin-bottom: 40px;
      }
    }

    iframe {
      width: 100%;
      height: auto;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      margin-top: 20px;
    }
  }
}
</style>
