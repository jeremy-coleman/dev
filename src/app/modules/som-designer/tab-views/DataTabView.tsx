import * as React from 'react'
import {observer} from 'mobx-react'
import {withTheme} from 'theming'
import styled from 'styled-jss'


export let DataTabView = withTheme(observer((props) =>
<DataTab
dataset={this.som.dataset}
revision={this.state.datasetRevision}
onUpdate={() => {
  this.initializeModel();
  this.setState({ datasetRevision: this.state.datasetRevision + 1 });
}}
onSelect={selectedDatasource => this.setState({ selectedDatasource })}
/>
))


