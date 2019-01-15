<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="nav flex-column static-top">
      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item w-25 border-left border-top border-light rounded-left">
          <router-link
            :to="{ name: 'BingoNumbers' }"
            class="nav-link"
            active-class="active">
            Generate
          </router-link>
        </li>
        <li class="nav-item w-25 mr-2">
          <router-link
            :to="{ name: 'ValidateNumber' }"
            class="nav-link"
            active-class="active">
            Validate
          </router-link>
        </li>
      </ul>
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
}
</style>
<style>
  @import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
</style>
