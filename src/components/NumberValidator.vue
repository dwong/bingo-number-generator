<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-5 col-sm-6 col-md-3 mx-auto">
        <form>
          <div class="form-group">
            <label
              for="bingo-number"
              class="sr-only">Bingo Value</label>
            <div class="btn-group">
              <input
                id="bingo-number"
                v-model="bingoNumberToValidate"
                class="form-control"
                placeholder="B1"
                type="text"
                autocomplete="off"
                @keyup.esc.prevent="clearValue('esc')"
                @keyup.enter.prevent="clearValue('enter')"
              >
              <button
                v-show="clearable"
                id="clear-btn"
                type="button"
                @click.prevent="clearValue('btn')"
              ><i class="material-icons">clear</i></button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-8 mx-auto">
        <i
          v-show="validNumber"
          class="material-icons md-48 green"
        >thumb_up</i>
        <i
          v-show="invalidNumber"
          class="material-icons md-48 red"
        >thumb_down</i>
      </div>
    </div>
  </div>
</template>

<script>
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex#Polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
/* eslint-disable */
Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(r){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),t=e.length>>>0;if("function"!=typeof r)throw new TypeError("predicate must be a function");for(var n=arguments[1],i=0;i<t;){var o=e[i];if(r.call(n,o,i,e))return i;i++}return-1},configurable:!0,writable:!0});
/* eslint-enable */

export default {
  name: 'NumberValidator',
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
      bingoNumberToValidate: '',
      validLetters: ['B', 'I', 'N', 'G', 'O']
    }
  },
  computed: {
    clearable () {
      return this.bingoNumberToValidate.length > 0
    },
    valid () {
      if (this.numberFromBingoNumber === null ||
        this.letterFromBingoNumber === null) {
        return null
      } else {
        return this.isValidLetter && this.isValidBingoNumber
      }
    },
    validNumber () {
      let isValid = this.valid === true
      if (isValid) {
        this.trackValidate(true)
      }
      return isValid
    },
    invalidNumber () {
      let isInvalid = this.valid === false
      if (isInvalid) {
        this.trackValidate(false)
      }
      return isInvalid
    },
    regexResult () {
      return this.bingoRegex.exec(this.bingoNumberToValidate)
    },
    letterFromBingoNumber () {
      const result = this.regexResult
      if (result && result.length > 1) {
        return result[1]
      } else {
        return null
      }
    },
    numberFromBingoNumber () {
      const result = this.regexResult
      if (result && result.length > 2) {
        const intResult = parseInt(result[2])
        return isNaN(intResult) ? null : intResult
      } else {
        return null
      }
    },
    isValidLetter () {
      return this.normalizedLetter != null
    },
    normalizedLetter () {
      if (this.letterFromBingoNumber === null) {
        return null
      } else {
        // https://stackoverflow.com/a/40195757
        const foundIndex = this.validLetters.findIndex(item =>
          this.letterFromBingoNumber.toUpperCase() === item.toUpperCase())
        return foundIndex >= 0 ? this.validLetters[foundIndex] : null
      }
    },
    isValidBingoNumber () {
      const letter = this.normalizedLetter
      const number = this.numberFromBingoNumber
      return letter != null &&
        number != null &&
        this.bingoNumbers.indexOf(`${letter}${number}`) >= 0
    }
  },
  methods: {
    clearValue (method) {
      this.bingoNumberToValidate = ''
      this.trackClear(method)
    },
    trackValidate (success) {
      this.$ga.event('User Action', 'Input', 'Validate', success ? 1 : 0)
    },
    trackClear (method) {
      let intVal = -1
      switch (method) {
        case 'esc':
          intVal = 1
          break
        case 'enter':
          intVal = 2
          break
        case 'btn':
          intVal = 3
          break
      }
      this.$ga.event('User Action', 'Input', 'Clear', intVal)
    }
  }
}
</script>
<style scoped>
#bingo-number {
  font-size: 4rem;
  text-align: center;
}
#clear-btn {
  position: absolute;
  right: -40px;
  top: 0;
  bottom: 0;
  height: 24px;
  margin: auto;
  font-size: 14px;
  cursor: pointer;
  color: #ccc;
}
.material-icons.md-48 {
  font-size: 48px;
}
.material-icons.green {
  color: #2f9914;
}
.material-icons.red {
  color: #d13636;
}
input[type=search]::-webkit-search-cancel-button {
    -webkit-appearance: searchfield-cancel-button;
}
</style>
