import {stylesheet} from 'typestyle'

export const DIMENSIONS = stylesheet({
 Wrapper:{
  padding: 40,
  background: '#f7df1e',
  textAlign: 'center'
},

FillFlex:  {
  display: 'flex',
  flex: '1',
  width: '100%',
  height: '100%',
},
 Row: {
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  justifyContent: 'stretch'
},
 HorizontalStretch:  {
  display: "flex",
  flex: "auto",
  flexDirection: "row",
  justifyContent: "stretch",
},


 VerticalStretch: {
  display: "flex",
  flex: "1 1 auto",
  height: "100%",
  flexDirection: "column",
  justifyContent: "stretch"
},

FillParent: {
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},

CardContainer: {
  position: 'relative',
  display: "flex",
  flex: '1 1 auto',
  width: "100%",
  margin: '0px'
}

})

