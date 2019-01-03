import * as React from 'react'
import {observer} from 'mobx-react'

import {style} from 'typestyle'
import {fillParent, vertical, height, content, flex, width, horizontal} from 'csstips'

const bg = (color) => ({backgroundColor:color});

export let AboutPage = observer((props) =>
<div className={style(fillParent, vertical)}>
  <div className={style(content,height(50), bg('lightskyblue'))}>
    Header
  </div>
  <div className={style(flex, horizontal)}>
    <div className={style(content, width(100), bg('lightpink'))}>
      Sidebar
    </div>
    <div className={style(flex, bg('darkorange'))}>
      Body
    </div>
    <div className={style(content, width(100), bg('limegreen'))}>
      Sidebar
    </div>
  </div>
  <div className={style(content,height(50), bg('lightskyblue'))}>
    Footer
  </div>
</div>
)

export default AboutPage