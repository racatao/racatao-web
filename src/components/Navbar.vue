<template lang="html">
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-navbar-brand href="#/">Unicamp Transparente</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-nav is-nav-bar class="ml-auto">
        <b-nav is-nav-bar>
          <router-link class="text-white btn" to="Search">Buscar Documentos</router-link>
          <router-link class="text-white btn" to="Why">Por que contribuir?</router-link>
          <router-link class="text-white btn disabled" to="Visualization" disabled>Visualizações</router-link>
        </b-nav>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
}
</script>

<style>
</style>
