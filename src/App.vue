<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
      <div class="container">
        <a
          class="navbar-brand"
          href="#">Bingo Number Generator</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"/>
        </button>
        <div
          id="navbarResponsive"
          class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                :to="{ name: 'BingoNumbers' }"
                class="nav-link"
                active-class="active">
                Generate
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'ValidateNumber' }"
                class="nav-link"
                active-class="active">
                Validate
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view
      :bingo-numbers="bingoNumbers"
      @bingo-number-generated="(bingoNumber) => numberGenerated(bingoNumber)"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bingoNumbers: []
    }
  },
  methods: {
    numberGenerated: function (bingoNumber) {
      this.bingoNumbers.push(bingoNumber)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto Slab', Georgia, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
//  margin-top: 60px;
}
</style>
<style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
</style>
