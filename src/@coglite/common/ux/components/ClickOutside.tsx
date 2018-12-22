import * as React from "react";


interface ClickOutside {
  onOutsideClick: () => void;
  disabled?: boolean;
  className?: string;
}

class ClickOutside extends React.PureComponent<ClickOutside> {
  childRef: React.RefObject<HTMLDivElement> = React.createRef();

  handleClick = (e: MouseEvent) => {
    if (
      this.childRef.current &&
      !this.childRef.current.contains(e.target as HTMLElement)
    ) {
      this.props.onOutsideClick();
    }
  };

  addListener = () => void document.addEventListener("mousedown", this.handleClick);
  

  removeListener = () => void document.removeEventListener("mousedown", this.handleClick);
  

  componentDidMount() {
    if (!this.props.disabled) {
      this.addListener();
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  componentDidUpdate(prevProps: ClickOutside) {
    if (prevProps.disabled !== this.props.disabled) {
      this.props.disabled ? this.removeListener() : this.addListener();
    }
  }

  render() {
    const { className, children } = this.props;
    return (
      <div ref={this.childRef} className={className}>
        {children}
      </div>
    );
  }
}

export {ClickOutside}
export default ClickOutside;