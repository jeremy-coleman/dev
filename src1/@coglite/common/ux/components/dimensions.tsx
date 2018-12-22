import * as React from 'react'
import {style} from 'typestyle'

const ErrorMsg = (...props) => <div className={style({
    fontSize: '12px',
    backgroundColor: 'red',
    color: 'white',
    padding: "4px 8px"
})
}/>


export const Wrapper = (...props) => <div className={style({
  padding: 40,
  background: '#f7df1e',
  textAlign: 'center'
})
}/>


export const FillFlex = (...props) => <div className={style({
  display: 'flex',
  flex: '1',
  width: '100%',
  height: '100%',
})
}/>

export const Row = (...props) => <div className={style({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'row',
  justifyContent: 'stretch'
})
}/>

export const HorizontalStretch = (...props) => <div className={style({
  display: "flex",
  flex: "auto",
  flexDirection: "row",
  justifyContent: "stretch",
})
}/>


export const VerticalStretch = (...props) => <div className={style({
  display: "flex",
  flex: "1 1 auto",
  height: "100%",
  flexDirection: "column",
  justifyContent: "stretch"
})
}/>

export const FillParent = (...props) => <div className={style({
    position: 'relative',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
})
}/>

export const CardContainer = (...props) => <div className={style({
  position: 'relative',
  display: "flex",
  flex: '1 1 auto',
  width: "100%",
  margin: '0px'
})
}/>
