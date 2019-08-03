<template>
  <div class="container mt-5">
    <div class="row justify-content-start">
      <div class="col-3 my-auto">
        <i
          v-show="validNumber"
          class="material-icons md-48 green m-auto"
        >thumb_up</i>
        <i
          v-show="invalidNumber"
          class="material-icons md-48 red m-auto"
        >thumb_down</i>
      </div>
      <div class="col-6 col-sm-8 col-md-6">
        <form
          @submit.prevent="saveValidatedValue"
        >
          <div class="form-group">
            <label
              for="bingo-number"
              class="sr-only">Bingo Value</label>
            <div class="btn-group">
              <input
                id="bingo-number"
                :value="bingoNumberToValidate"
                class="form-control"
                placeholder="B1"
                type="text"
                autocomplete="off"
                @input="evt => bingoNumberToValidate = evt.target.value"
                @keyup.esc.prevent="clearValue('esc')"
              >
              <button
                v-show="clearable"
                id="clear-btn"
                type="button"
                @click.prevent="clearValue('btn')"
              ><i class="material-icons">clear</i></button>
            </div>
          </div>
          <div
            v-show="validatedValues.length > 0"
          >
            <div
              v-for="(val, index) in validatedValues"
              :key="val"
              class="chip"
            >{{ val }}
              <span
                class="closebtn"
                @click="removeValidatedValue(index)"
              >
                &times;
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
    <button
      v-show="validatedValues.length > 0"
      class="btn btn-info btn-lg btn-outline-info"
      @click="clearValidatedValues"
    >
      Clear All
    </button>
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
  metaInfo: {
    title: 'Validate'
  },
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
      validLetters: ['B', 'I', 'N', 'G', 'O'],
      validatedValues: []
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
    normalizedBingoNumber () {
      const letter = this.normalizedLetter
      const number = this.numberFromBingoNumber
      return letter != null && number != null ? `${letter}${number}` : null
    },
    isValidBingoNumber () {
      return this.bingoNumbers.indexOf(this.normalizedBingoNumber) >= 0
    }
  },
  methods: {
    clearValue (method) {
      this.bingoNumberToValidate = ''
      this.trackClear(method)
    },
    trackValidate (success) {
      if (this.$ga) {
        this.$ga.event('User Action', 'Input', 'Validate', success ? 1 : 0)
      }
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
      if (this.$ga) {
        this.$ga.event('User Action', 'Input', 'Clear', intVal)
      }
    },
    saveValidatedValue () {
      if (this.isValidBingoNumber &&
          this.validatedValues.indexOf(this.normalizedBingoNumber) === -1) {
        this.validatedValues.push(this.normalizedBingoNumber)
      }
      this.clearValue()
    },
    removeValidatedValue (index) {
      this.validatedValues.splice(index, 1)
    },
    clearValidatedValues () {
      this.validatedValues = []
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
  height: 28px;
  margin: auto;
  font-size: 14px;
  cursor: pointer;
  color: #ccc;
  background-color: transparent;
  border: none;
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
.chip {
  display: inline-block;
  padding: 0 15px;
  margin: 2px 5px;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  border-radius: 25px;
  background-color: #f1f1f1;
}
.chip .closebtn {
  padding-left: 10px;
  color: #888;
  font-weight: bold;
  float: right;
  font-size: 20px;
  cursor: pointer;
}
.chip .closebtn:hover {
  color: #000;
}
</style>
