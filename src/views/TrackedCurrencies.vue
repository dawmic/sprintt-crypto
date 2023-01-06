<template>
  <div class="tracked-container">
    <Loader v-if="loading" />
    <CryptoCoin v-for="coin in tracked" :key="coin.name" :coinProp="coin" />
    <p v-if="tracked.length < 1">You don't have favorite crypto yet.</p>
  </div>
</template>

<script>
import CryptoCoin from "@/components/CryptoCoin.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";
import options from "/scripts/options.js";
export default {
  name: "TrackedCurrencies",
  components: { CryptoCoin, Loader },
  data() {
    return {
      loading: true,
      crypto: [],
    };
  },
  mounted() {
    axios
      .request(options)
      .then((response) => {
        this.crypto = response.data.data.coins;
        this.loading = false;
      })
      .catch(() => (this.error = true));
  },
  computed: {
    tracked() {
      return this.crypto.filter((el) =>
        JSON.parse(localStorage.getItem("tracked").includes(el.symbol))
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.tracked-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #d6d5da;
    font-size: 2rem;
    margin-top: 5rem;
  }
}
</style>
