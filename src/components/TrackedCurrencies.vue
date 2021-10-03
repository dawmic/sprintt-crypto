<template>
  <div class="tracked-container">
    <CryptoCoin
      v-for="coin in tracked_data_computed"
      :key="coin.name"
      :coinProp="coin"
    />
    <p v-if="tracked_data_computed.length == 0">The list is empty.</p>
  </div>
</template>

<script>
import CryptoCoin from "@/components/CryptoCoin.vue";
export default {
  name: "TrackedCurrencies",
  components: { CryptoCoin },
  props: ["tracked_data"],
  computed: {
    tracked_data_computed() {
      return this.tracked_data;
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