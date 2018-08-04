<template>
  <div class="live">
    <app-header :currLocation="'live'"></app-header>
    <main></main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'

export default {
  name: 'live',
  components: {
    AppHeader,
    AppFooter
  },
  data () {
    return { }
  },
  methods: { }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.live { }
</style>
