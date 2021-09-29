<template>
  <div class="all-container">
    <CryptoCoin v-for="coin in all_data_computed" :key="coin.name" :coinProp="coin" />
    <p v-if="all_data.length == 0">The list is empty</p>
  </div>
</template>

<script>
import CryptoCoin from "@/components/CryptoCoin.vue";
export default {
  name: "AllCurrencies",
  components: { CryptoCoin },
  props: ["all_data"],
  computed: {
    all_data_computed() {
      return this.all_data
    }
  },
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