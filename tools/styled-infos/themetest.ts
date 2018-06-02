import styled, { ThemedReactEmotionInterface } from 'react-emotion'

type Theme = {
  color: {
    primary: string,
    positive: string,
    negative: string,
  },
  // ...
}

export default styled as ThemedReactEmotionInterface<Theme>