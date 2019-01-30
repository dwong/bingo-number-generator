<template>
  <!-- Page Content -->
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2
          id="bingo-number"
          class="mt-5">{{ bingoNumber }}</h2>
      </div>
    </div>
    <button
      v-ga="'trackGenerate'"
      id="generate-bingo-button"
      class="btn btn-primary btn-lg btn-outline-primary mt-5"
      @click="newBingoNumber"
    >
      Generate Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'BingoNumbers',
  props: {
    bingoNumbers: {
      type: Array,
      default () {
        return []
      }
    },
    bingoRegex: {
      type: RegExp,
      default () {
        return /^(\D)\s*(\d+)?$/i
      }
    }
  },
  data () {
    return {
      grid: [
        { header: 'B', min: 1, max: 15 },
        { header: 'I', min: 16, max: 30 },
        { header: 'N', min: 31, max: 45 },
        { header: 'G', min: 46, max: 60 },
        { header: 'O', min: 61, max: 75 }
      ]
    }
  },
  computed: {
    bingoNumber () {
      if (this.bingoNumbers && this.bingoNumbers.length > 0) {
        const bingoVal = this.bingoNumbers[this.bingoNumbers.length - 1]
        const regexResult = this.bingoRegex.exec(bingoVal)
        if (regexResult && regexResult.length > 1) {
          return `${regexResult[1]} ${regexResult[2]}`
        }
      }
      return '--'
    }
  },
  methods: {
    newBingoNumber () {
      const bingoNumber = this.generateBingoNumber()
      this.$emit('bingo-number-generated', bingoNumber.replace(/\s+/g, ''))
    },
    generateBingoNumber () {
      const column = this.grid[this.getRandomIntInclusive(0, this.grid.length - 1)]
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

<style scoped>
#bingo-number {
  font-size: 5rem;
}
</style>
