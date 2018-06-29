import * as React from "react";
import {Slider} from "material-ui";

export interface LogSliderProps {
  [key: string]: any;
  value: number;
  onChange(e: React.MouseEvent<{}>, value: number): void;
}


export class LogSlider extends React.Component<LogSliderProps, any> {
  render() {
    let { value, onChange, ...props } = this.props;
    return <Slider
      value={Math.log10(value)}
      onChange={(event, value) => onChange(event, Math.pow(10, value))}
      {...props}
    />;
  }
}
