import { loadFont } from './loadFont'

export const Roboto = loadFont({
  name: 'Roboto',
  styles: ['normal', 'italic'],
  weights: [100, 300, 400, 500]
})

export const AbrilFatface = loadFont({
  name: 'AbrilFatface',
  styles: ['normal'],
  weights: [400]
})

