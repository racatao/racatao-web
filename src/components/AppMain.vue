<template>
  <div>
  <router-view/>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  data: () => ({
    file: null
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.jumbotron-height {
  height: 100vh;
}
</style>
