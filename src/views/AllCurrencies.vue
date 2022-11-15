<template>
  <div class="all-container">
    <Loader  v-if="loading" />
    <CryptoCoin v-for="coin in crypto_list" :key="coin.name" :coinProp="coin" />
    <p v-if="error">Ups, something went wrong</p>
  </div>
</template>

<script>
import CryptoCoin from "@/components/CryptoCoin.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";
import options from "/scripts/config.js";
export default {
  name: "AllCurrencies",
  components: { CryptoCoin, Loader },
  props: ["all_data"],
  data(){
    return{
      loading: true,
crypto_list: [],
error: false,
    }
  },
  computed: {
     currenciesList() {
      return [];
    }
  },
  mounted(){
    axios
        .request(options)
        .then((response) => {
          console.log(response.data.data.coins);
          this.crypto_list = response.data.data.coins;
          this.loading = false;
        })
        .catch(() => (this.error = true));
  }
};
</script>

<style lang="scss" scoped>
.all-container {
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