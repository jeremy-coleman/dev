import styled from '@emotion/styled'

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

const Box = styled(View)`
  flex-direction: ${props => (props.layout === 'column' ? 'column' : 'row')};
  padding: ${props => (props.outer ? '4px' : '0')};
  height: ${props => (props.fixed ? '20px' : 'auto')};
  width: ${props => (props.fixed ? '20px' : 'auto')};
  background-color: ${props => getColor(props.color)};
`

const Link = styled.a(props => ({
	minWidth: '12rem',
	margin: '0 auto 20px',
	padding: props.primary ? 18 : 16,
	borderRadius: 5,
	textDecoration: 'none',
	border: props.primary
		? 'none'
		: '3px solid currentColor',
	background:
		props.primary &&
		'linear-gradient(90deg, #D26AC2, #46C9E5)',
	color: props.primary ? '#1D2029' : '#D26AC2',
	'&:hover': {
		opacity: '0.95'
	},
	'@media (min-width: 768px)': {
		margin: '0 20px 0 0',
		'&:last-child': {
			margin: 0
		}
	}
}))
