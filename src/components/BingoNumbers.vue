<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2 id="bingo-number" class="mt-5">{{ bingoNumber }}</h2>
      </div>
    </div>
    <button
      @click="newBingoNumber"
    >
    New number!</button>
  </div>
</template>

<script>
export default {
  name: 'BingoNumbers',
  data () {
    return {
      bingoNumber: 'Get Started',
      grid: [
        { header: 'B', min: 1, max: 15 },
        { header: 'I', min: 16, max: 30 },
        { header: 'N', min: 31, max: 45 },
        { header: 'G', min: 46, max: 60 },
        { header: 'O', min: 61, max: 75 }
      ]
    }
  },
  methods: {
    newBingoNumber () {
      this.bingoNumber = this.generateBingoNumber()
    },
    generateBingoNumber () {
      const column = this.grid[Math.floor(Math.random() * (this.grid.length - 1))]
      const number = this.getRandomIntInclusive(column.min, column.max)
      return `${column.header} ${number}`
    },
    // https://stackoverflow.com/a/1527820
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive
    getRandomIntInclusive (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min // The maximum is inclusive and the minimum is inclusive
    }
  }
}
</script>
