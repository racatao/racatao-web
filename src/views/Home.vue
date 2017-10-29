<template lang="html">
  <div>
  <b-jumbotron
    class="jumbotron-height"
    header="Unicamp Transparente"
    lead="Ajude a transparencia da Unicamp em dois cliques:"
    fluid
  >
    <b-form-file id="file_input1" v-model="file"></b-form-file>
    <br> Arquivo selecionado: {{file && file.name}}
    <br> <b-button @click="sendFile">Enviar</b-button>
  </b-jumbotron>

  <b-container>
    <b-row>
      <b-col>
        <b-card title="Card Title"
            img-src="https://lorempixel.com/600/300/food/5/"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <b-button href="#" variant="primary">Busque documentos</b-button>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Card Title"
            img-src="https://lorempixel.com/600/300/food/5/"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <b-button href="#" variant="primary">Contribua você também</b-button>
        </b-card>
      </b-col>
      <b-col>
        <b-card title="Card Title"
            img-src="https://lorempixel.com/600/300/food/5/"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <b-button href="#" class="disabled" variant="primary">Visualizações</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>

  <b-container>
    <b-jumbotron
      header="Sobre nós"
      lead="Equipe Racatão, formada por quatro alunos de graduação"
    >
    <b-row>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://imgur.com/A3n7J7H.jpg"/>
        <p>Rose é topzera da balada na Microsoft</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://imgur.com/SxhESMw.jpg"/>
        <p>Douglão é o mitão da equipe</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://i.imgur.com/QGYliCB.jpg"/>
        <p>Salva é o de fora que entrou por sorte</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://i.imgur.com/FNSYsJ6.jpg"/>
        <p>Guru é o comedy relief do grupo</p>
      </b-col>
    </b-row>
    </b-jumbotron>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    file: null,
    slide: 0,
    sliding: null
  }),
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    sendFile () {
      function getBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      }
      let apiURL = 'https://racataouploadxls.azurewebsites.net/api/racatao-upload'
      let formData = new FormData()
      getBase64(this.file)
      .then((encoded) => {
        formData.set('file', encoded)
        this.$http.post(apiURL, formData)
        .then((res) => {
          console.log(res.data)
        })
        .catch((error) => {
          console.log('error', error)
        })
      })
    }
  }
}
</script>

<style lang="css">
</style>
