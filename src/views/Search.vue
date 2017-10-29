<template lang="html">
<b-container class="padding-top">
  <b-alert
  variant="danger"
  dismissible
  :show="noResults"
  @dismissed="resetResult"
  >
    Nenhum resultado encontrado
  </b-alert>
  <b-row>
    <b-col @keyup.enter="querySearch" >
      <b-form-input v-model="search" type="text" placeholder="Busque documentos"></b-form-input>
    </b-col>
    <b-col cols="1">
      <b-button @click="querySearch" :disabled="searchingRaw || searchingProcessed">
        <i v-if="searchingRaw || searchingProcessed" class="fa fa-circle-o-notch fa-spin"></i>
        <span v-else>Buscar</span>
      </b-button>
    </b-col>
  </b-row>
  <hr>
  <b-table small stripped hover :items="items" :fields="fields">
    <template slot="link" slot-scope="data">
      <b-button v-show="data.item.link" small class="btn" :href="data.item.link">Download</b-button>
    </template>
  </b-table>
</b-container>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Search',
  data: () => ({
    fields: ['nome', 'tratado', 'link'],
    items: [
      { nome: null, tratado: null, link: null }
    ],
    search: '',
    noResultsRaw: false,
    noResultsProcessed: false,
    searchingRaw: false,
    searchingProcessed: false
  }),
  computed: {
    noResults () {
      return this.noResultsProcessed && this.noResultsRaw
    }
  },
  methods: {
    resetResult () {
      this.noResultsRaw = false
      this.noResultsProcessed = false
    },
    querySearch () {
      console.log(this.search)
      if (this.search === '') {
        return
      }

      if (this.searchingRaw || this.searchingProcessed) {
        return
      }

      this.items = []
      this.searchingRaw = true
      this.searchingProcessed = true
      const querystring = qs.stringify({
        search: this.search,
        'api-key': '5112AF0AAE64FF3EE9428CB0794C8034',
        'api-version': '2016-09-01'
      })
      console.log(querystring)
      this.$http.get(
        `https://racatao-documents.search.windows.net/indexes/raw-files-index/docs?${querystring}`
      )
      .then((response) => {
        this.searchingRaw = false
        console.log('received response', response)
        if (!response.data || !response.data.value) {
          console.log('received falsy data or value', response.data)
          return
        }

        if (response.data.value.length === 0) {
          this.noResultsRaw = true
          return
        }

        const items = response.data.value.map((el) => {
          return {
            nome: el.metadata_storage_name,
            tratado: 'Não',
            link: `https://racataouploadxlbe62.blob.core.windows.net/raw-files/${el.metadata_storage_name}`
          }
        })

        items.forEach(item => {
          this.items.push(item)
        })
      })
      .catch((err) => {
        console.log('err', err)
        this.searchingRaw = false
      })

      this.$http.get(
        `https://racatao-documents.search.windows.net/indexes/processed-files-index/docs?${querystring}`
      )
      .then((response) => {
        this.searchingProcessed = false
        console.log('received response', response)
        if (!response.data || !response.data.value) {
          console.log('received falsy data or value', response.data)
          return
        }

        if (response.data.value.length === 0) {
          this.noResultsProcessed = true
          return
        }

        const items = response.data.value.map((el) => {
          return {
            nome: el.metadata_storage_name,
            tratado: 'Sim',
            link: `https://racataouploadxlbe62.blob.core.windows.net/processed-files/${el.metadata_storage_name}`
          }
        })

        items.forEach(item => {
          this.items.push(item)
        })
      })
      .catch((err) => {
        console.log('err', err)
        this.searchingProcessed = false
      })
    }
  }
}
</script>

<style lang="css">
.padding-top {
  padding-top: 15px;
}
</style>
