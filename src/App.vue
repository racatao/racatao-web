<template>
  <div id="app">
    <Navbar/>
    <AppMain/>
  </div>
</template>

<script>
import { AppMain, Navbar } from '@/components'
export default {
  name: 'app',
  components: {
    Navbar,
    AppMain
  }
}
</script>

<style>
@import "~font-awesome/css/font-awesome.css";

#app {
}
</style>
