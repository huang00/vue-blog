<template>
  <div class="index">
    <app-header></app-header>
    <div class="banner"></div>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  name: 'index',
  components: {
    AppHeader
  },
  data () {
    return {
      msg: 'Welcome to Your index.js App',
      value: [20, 50]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index {
    .banner {
      height: 265px;
      background: url('../assets/img/banner_top.jpg') no-repeat;
      background-size: 120% 100%;
      background-position: -82px;
    }
  }
</style>
