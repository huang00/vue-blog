<template>
  <div class="index">
    <app-header :currLocation="'index'"></app-header>
    <div class="banner"></div>
    <main></main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'

export default {
  name: 'index',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return {
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
      background-position: -153px;
    }
    main {
      height: 500px;
    }
  }
</style>
