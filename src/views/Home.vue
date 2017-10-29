<template lang="html">
  <div>
  <b-jumbotron
    class="jumbotron-height"
    header="Unicamp Transparente"
    lead="Ajude a transparencia da Unicamp em dois cliques:"
    fluid
  >
    <b-alert variant="success" :show="success" dismissible @dismissed="success = false">
      Arquivo enviado com sucesso
    </b-alert>
    <b-row>
      <b-col><b-form-file id="file_input1" ref="fileinput" v-model="file"></b-form-file></b-col>
      <b-col cols="2">
        <b-button @click="sendFile">
          <i v-if="sending" class="fa fa-circle-o-notch fa-spin"></i>
          <span v-else>Enviar</span>
        </b-button>
      </b-col>
    </b-row>
  </b-jumbotron>

  <b-carousel id="carousel1"
              style="text-shadow: 1px 1px 2px #333;"
              controls
              indicators
              background="#ababab"
              :interval="4000"
              img-width="1024"
              img-height="480"
              v-model="slide"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
  >

    <!-- Slides with custom text -->
    <b-carousel-slide img-src="https://imgur.com/laBTsXL.png">
    </b-carousel-slide>

    <!-- Text slides with image -->
    <b-carousel-slide img-src="https://imgur.com/tClP7S3.png"
    ></b-carousel-slide>

    <!-- Slides with image only -->
    <b-carousel-slide img-src="https://imgur.com/nlAwL8N.png">
    </b-carousel-slide>

  </b-carousel>

  <b-container class="padding-top">
    <b-jumbotron
      header="Sobre nós"
      lead="O Racatão é um projeto originado na Hack the Campus 2017, que teve como tema a Transparência na Unicamp. Nossa proposta é servir como um facilitador para que todos colaborem para a transparência dos dados públicos, servindo como um centro para a consulta dessas informações de modo padronizado por nossos sistemas."
    >
    <b-row>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://imgur.com/A3n7J7H.jpg"/>
        <p>Rose é aluna de Engenharia Eletrica na UNICAMP. Além de Estagiária de serviços na Microsoft, realiza Iniciação Cientifica na área de Internet of Things e automação residencial.</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://imgur.com/SxhESMw.jpg"/>
        <p>Douglas é aluno de Ciências da Computação, no ICMC. Também estagiário de serviços na Microsoft, com ampla experiencia em Startup Weekends e Maratonas de Programação.</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://i.imgur.com/QGYliCB.jpg"/>
        <p>Gustavo, também aluno do ICMC, é estagiário de Engenharia de Software na Calamar. Experiencias incluem: Operações, Desenvolvimento e Design de Interfaces Conversacionais</p>
      </b-col>
      <b-col>
        <b-img rounded="circle" width="180" height="180" alt="img" class="m-1" src="https://i.imgur.com/FNSYsJ6.jpg"/>
        <p>Lucas, também aluno do ICMC, participou do Data Science Game, evento internacional de Data Science sediado em Paris. Participador avido de Hackathons de Hardware.</p>
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
    sliding: null,
    success: false,
    sending: false
  }),
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    sendFile () {
      this.sending = true
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
          this.sending = false
          console.log(res.data)
          this.success = true
          this.file = null
          this.$refs.fileinput.reset()
        })
        .catch((error) => {
          this.sending = false
          console.log('error', error)
        })
      })
    }
  }
}
</script>

<style lang="css">
.padding-top {
  padding-top: 32px;
}
</style>
