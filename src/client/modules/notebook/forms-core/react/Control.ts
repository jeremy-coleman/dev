import { ControlProps, ControlState } from '../core';
import { RendererComponent } from './Renderer';


export class Control<P extends ControlProps, S extends ControlState>
  extends RendererComponent<P, S> {
  constructor(props: P) {
    super(props);
    this.state = {
      value: props.data ? props.data : '',
      isFocused: false
    } as S;
  }

  handleChange = value => {
    this.setState({ value });
    this.updateData(value);
  }

  onFocus = () => {
    this.setState({ isFocused:  true });
  }

  onBlur = () => {this.setState({ isFocused:  false })}

  updateData = value => {
    this.props.handleChange(this.props.path, value);
  }
}
