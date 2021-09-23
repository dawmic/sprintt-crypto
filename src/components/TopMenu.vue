<template>
  <div class="top-container">
    <img class="top-logo" src="@/assets/logo.png" alt="top menu logo" />
  </div>
</template>

<script>
export default {
  name: "TopMenu",
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
   
  }
}
</style>