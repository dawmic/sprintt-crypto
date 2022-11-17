<template>
  <div id="app">
    <div class="desktop-container">
      <div class="desktop-paragraphs-container">
        <img class="logo-image" src="@/assets/logo.png" alt="logo" />
        <p class="desktop-paragraph">Please open the app from mobile device.</p>
      </div>
      <img
        class="mockup-image"
        src="@/assets/Mockup.png"
        alt="mockup"
        width="950"
        height="550"
      />
    </div>

    <div class="mobile-container">
      <TopMenu />

      <main>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </main>
    </div>
  </div>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue";
export default {
  name: "App",
  components: { TopMenu },
};
</script>
<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
html {
  font-size: 62.5%;
  background-color: #1d1c28;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #1d1c28;
  width: 100%;
  height: 100%;

  .desktop-container {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    display: none;

    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    @media (min-width: 100px) {
      flex-direction: row;
    }

    .desktop-paragraphs-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;

      .desktop-paragraph {
        font-size: 2.8rem;
        color: #d6d5da;
        margin-top: 1rem;
        line-height: 1.5;
      }
    }
  }
  .mobile-container {
    @media (min-width: 992px) {
      display: none;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
