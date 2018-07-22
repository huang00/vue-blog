<template>
  <div class="hello">
    <app-header></app-header>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'

export default {
  name: 'HelloWorld',
  components: {
    AppHeader
  },
  data () {
    return {
      msg: 'Welcome to about'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
