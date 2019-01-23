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
      :bingo-regex="bingoRegex"
      @bingo-number-generated="(bingoNumber) => numberGenerated(bingoNumber)"
    />
    <div class="row fixed-bottom mb-5">
      <div class="col-sm-6">
        <button
          v-show="haveBingoNumbers"
          class="btn btn-lg btn-outline-danger"
          @click="clearValues"
        ><span>New Round</span>
        <i class="material-icons md-18">replay</i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      bingoNumbers: [],
      bingoRegex: /^(\D)\s*(\d+)?$/i
    }
  },
  computed: {
    haveBingoNumbers: function () {
      return this.bingoNumbers.length > 0
    }
  },
  methods: {
    numberGenerated: function (bingoNumber) {
      this.bingoNumbers.push(bingoNumber)
    },
    clearValues: function () {
      this.bingoNumbers = []
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
.material-icons.md-18 {
  font-size: 18px;
}
</style>
<style>
  @import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
  @import url('https://fonts.googleapis.com/css?family=Roboto+Slab');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
