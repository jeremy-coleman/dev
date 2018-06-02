import { Drawer } from 'material-ui'
import * as React from 'react'
import { CSVUploader } from '../.././InputComponents/CSVUploader'


export let ProvidersDrawer = () =>
  <Drawer className='LeftDrawer' open={true}>
    <h2>Providers</h2>
    <CSVUploader onUpload={getFile} />
    <p className='Ellipsis Muted SmallFont'>{
    }</p>
  </Drawer>
  

let getFile = (file: File) => {}