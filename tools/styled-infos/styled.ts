import styled from 'styled-components'

const View = styled('div')`
  align-items: stretch;
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
  display: flex;
  flex-basis: auto;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 0;
  min-width: 0;
`

const getColor = color => {
  switch (color) {
    case 0:
      return '#222'
    case 1:
      return '#666'
    case 2:
      return '#999'
    case 3:
      return 'blue'
    case 4:
      return 'orange'
    case 5:
      return 'red'
    default:
      return 'transparent'
  }
}
