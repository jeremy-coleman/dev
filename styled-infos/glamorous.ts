import glamorous from 'glamorous'


const View = glamorous.div({
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0
})

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
};

const Box = glamorous(View)((props => ({
  flexDirection: props.layout === 'column' ? 'column' : 'row',
  padding: props.outer ? 4 : 0,
  height: props.fixed ? 20 : 'auto',
  width: props.fixed ? 20 : 'auto',
  backgroundColor: getColor(props.color)
})));

export default Box

