<template>
  <div id="app">
    <div class="desktop-container">
      <div class="desktop-paragraphs-container">
        <img class="logo-image" src="@/assets/logo.png" alt="logo" />
        <p class="desktop-paragraph">Please open the app from mobile device.</p>
      </div>
      <img class="mockup-image" src="@/assets/Mockup.png" alt="mockup" />
    </div>

    <div class="mobile-container">
      <TopMenu :market_change_24hr="market_change_24hr" />

      <main>
        <transition name="fade" mode="out-in">
          <router-view
            :all_data="allCurrencies"
            :tracked_data="trackedCurrencies"
            @addToTrack="addToTrack"
            @removeFromTrack="removeFromTrack"
            :currencies="allCurrencies"
          />
        </transition>
      </main>
    </div>
  </div>
</template>
<script>
const options = {
  headers: {
    "user-access-token": "90275ed9-b7f3-4061-a8b7-6d602bfef99c",
  },
};
import TopMenu from "@/components/TopMenu.vue";
import axios from "axios";
export default {
  name: "App",
  components: { TopMenu },
  props: {},
  data() {
    return {
      market_change_24hr: null,
      allCurrencies: "",
      trackedCurrencies: "",
    };
  },
  created() {
    this.getMarketStatus();
    this.getAllCurrencies();
    this.getTrackedCurrencies();
  },
  methods: {
    getMarketStatus() {
      axios
        .get("https://api.sprintt.co/crypto/currencies/market_change", options)
        .then((response) => {
          console.log(response);
          this.market_change_24hr = response.data.market_change_24hr;
        })
        .catch(() => {
          this.market_change_24hr = "Sorry, we have some problems.";
        });
    },
    getAllCurrencies() {
      axios
        .get(
          "https://api.sprintt.co/crypto/currencies/list?limit=20&offset=0",
          options
        )
        .then((response) => {
          this.allCurrencies = response.data.currencies_list;
        })
        .catch(() => (this.allCurrencies = "Empty list"));
    },
    getTrackedCurrencies() {
      axios
        .get(
          "https://api.sprintt.co/crypto/currencies/list?tracked_only=true&limit=100&offset=0",
          options
        )
        .then((response) => {
          this.trackedCurrencies = response.data.currencies_list;
        })
        .catch(() => (this.trackedCurrencies = "Empty list"));
    },

    addToTrack(currencyId) {
      axios.post(
        `https://api.sprintt.co/crypto/currencies/tracked_currencies/${currencyId}?status=true`,
        null,
        options
      );
      console.log("addToTrack");
      this.getTrackedCurrencies();
      this.getAllCurrencies();
    },
    removeFromTrack(currencyId) {
      axios.post(
        `https://api.sprintt.co/crypto/currencies/tracked_currencies/${currencyId}?status=false`,
        null,
        options
      );
      console.log("removeTrack");
      this.getTrackedCurrencies();
      this.getAllCurrencies();
    },
  },
  /*watch: {
    market_change_24hr: function (newMarketChange) {
      if (newMarketChange.includes("-")) {
        this.marketUp = false;
      } else {
        this.marketUp = true;
      }
    },
  },*/
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
  .mobile-container {
    @media (min-width: 769px) {
      display: none;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
