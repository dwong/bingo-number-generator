import BingoNumbers from '@/components/BingoNumbers'
import NumberValidator from '@/components/NumberValidator'

export default [
  {
    path: '/generate',
    name: 'BingoNumbers',
    component: BingoNumbers
  },
  {
    path: '/validate',
    name: 'ValidateNumber',
    component: NumberValidator
  }
]
