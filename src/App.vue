<template>
  <div id="app">
    <div class="desktop-container">
      <div class="desktop-paragraphs-container">
        <img class="logo-image" src="@/assets/logo.png" alt="logo" />
        <p class="desktop-paragraph">Please open the app from mobile device.</p>
      </div>
      <img class="mockup-image" src="@/assets/Mockup.png" alt="mockup" />
    </div>
    <TopMenu :marketUp="marketUp" :market_change_24hr="market_change_24hr" />
  </div>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue";

export default {
  name: "App",
  components: { TopMenu },
  props: {},
  data() {
    return {
      marketUp: true,
      market_change_24hr: "+7.49%",
    };
  },
};
</script>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1d1c28;
  width: 100%;
  height: 100vh;

  .desktop-container {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: none;

    @media (min-width: 769px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .desktop-paragraphs-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .desktop-paragraph {
        font-size: 2.8rem;
        color: #d6d5da;
        margin-top: 1rem;
        line-height: 1.5;
      }
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
