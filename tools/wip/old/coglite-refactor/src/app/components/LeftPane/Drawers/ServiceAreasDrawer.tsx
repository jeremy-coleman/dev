import { chain, flatten } from 'lodash'
import { Drawer } from 'material-ui'
import * as React from 'react'
import { CSVUploader } from '../../InputComponents/CSVUploader'
import { FieldSelector } from '../../InputComponents'



export let ServiceAreasDrawer = () =>
  <Drawer className='LeftDrawer' open={true}>
    <h2>Service Areas</h2>
    <CSVUploader onUpload={getFileName(this.filename)} />
    <p className='Ellipsis Muted SmallFont'>
    {"upload"}
    </p>
    <hr />
    <FieldSelector />
    <FieldSelector/>

  </Drawer >
 


 let getFileName = (file: File) => this.filename;
 
async function onFileSelected(file: File) {}



