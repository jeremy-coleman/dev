import * as React from 'react';
import { createErrorSpec } from '../vega/vegaSpecs';
import renderChart from 'vega-embed';

export class ErrorChart extends React.Component<any, any> {
  errorChart: HTMLDivElement;
  
  componentDidUpdate () {
    this.createErrorChart();
  }

  createErrorChart () {
    const { error, label } = this.props;
    const values = error.map((e, i) => ({iterations: i, [label]: e}));

    //@ts-ignore
    return renderChart(this.errorChart, createErrorSpec(label, values), { actions: false });
  }

  render () {
    return <div ref={errorChart => this.errorChart = errorChart}></div>
  }
}
