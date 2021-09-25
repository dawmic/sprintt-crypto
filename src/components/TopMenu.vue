<template>
  <div class="top-container">
    <img class="top-logo" src="@/assets/logo.png" alt="top menu logo" />
    <p class="top-market-paragraph" v-if="marketUp">Market is up</p>
    <p class="top-market-paragraph" v-if="!marketUp">Market is down</p>
    <div class="top-market-green-arrow" v-if="marketUp">
      <img src="@/assets/green_arrow.png" alt="green arrow" /><span>{{
        market_change_24hr
      }}</span>
    </div>
    <div class="top-market-red-arrow" v-if="!marketUp">
      <img src="@/assets/red_arrow.png" alt="red arrow" /><span>{{
        market_change_24hr
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopMenu",
  props: ["marketUp", "market_change_24hr"],
};
</script>

<style lang="scss" scoped>
.top-container {
  background-color: #2a283d;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 22.3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .top-logo {
    height: 1.9rem;
    margin-bottom: 2rem;
  }
  .top-market-paragraph {
    font-size: 2.2rem;
    color: #d6d5da;
    font-family: "Roboto", sans-serif;
    flex: 0 1 10%;
  }
  .top-market-green-arrow,
  .top-market-red-arrow {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    img {
      height: 1.8rem;
      width: 3.1rem;
      margin: .2rem;
    }
    span {
      font-family: "Roboto" sans-serif;
      font-size: 2.4rem;
    }
  }
  .top-market-green-arrow span {
    color: #59bb6e;
  }
  .top-market-red-arrow span {
    color: #db4848;
  }
}
</style>