<template>
  <div class="details-container">
      <nav class="details-nav">
          <button class="back-button" @click="goBack">
              <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 2L2.76688 8.99979C2.35165 9.40163 2.36242 10.0707 2.79037 10.459L10 17" stroke="#D6D5DA" stroke-width="3" stroke-linejoin="round"/>
</svg>

          </button>
     <img class="details-logo" src="@/assets/logo.png" alt="logo">
    </nav>
  </div>
</template>

<script>
export default {
name: 'CurrencyDetails',
props: ['CoinDetail'],
methods:{
    goBack(){
        this.$router.go(-1);
    }
},
};
</script>

<style lang="scss" scoped>
.details-container{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1d1c28;
    overflow-y: scroll;
.details-nav{
    height: 10rem;
    display: flex;
    flex-direction: row;
  
    align-items: center;
.back-button{
background: transparent;
border: none;
flex: .5 1 auto;
}
.details-logo{
   width: 14rem;
   height: 1.9rem; 
}
}
}
</style>

