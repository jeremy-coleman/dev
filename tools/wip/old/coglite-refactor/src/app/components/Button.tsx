import * as React from 'react';
import {observer} from 'mobx-react';
import {style} from 'typestyle'
import classnames from 'classnames';



 interface IButtonProps {
   buttonCSS?: any
 }

export const buttonCSS = style(
  { fontSize: '30px' },
  { color: 'red' },
);

export const HeaderShell = style(
  {    position: 'fixed'},
  {    top:       0,},
  {    left:      0,},
  {    right:     0,}

)
 export const Button = observer((props: IButtonProps) => 
      <button className={buttonCSS} onClick={this.doOnClickAction()}>
        {this.renderIconButton()}
      </button>
    
 )


/*extends React.Props<any>*/
interface NavigationItemChild  {
    id: string;
    isOpen: (id: string) => boolean;
    toggleOpen: (id: string) => void;
}
interface NavigationItemProps {
    id: string;
    title: string;
    toggleOpen: (id: string) => void;
    isOpen: (id: string) => boolean;
    child?: React.ComponentClass<NavigationItemChild> | React.SFC<NavigationItemChild>
    | React.ClassicComponentClass<NavigationItemChild>;
}

export const NavigationItem = observer(
    (props: NavigationItemProps) => {
        const Child = props.child;
        return (
            <li className="navigation-item" >
                <a className="navigation-link"
                    style={{ cursor: "pointer" }}
                    data-popover
                    onClick={() => props.toggleOpen(props.id)}>
                    {props.title}
                </a>
                <Child
                    id={props.id}
                    isOpen={props.isOpen}
                    toggleOpen={props.toggleOpen} />
            </li>
        );
    }
);


const fontSize = { fontSize: '30px' };
const className = style(
  fontSize,
  { color: 'red' },
);




const Wrapper = ({ children }) => (
  <div style={{
    background: 'papayawhip',
    width: '100%',
    height:'5%',
  }}>
    {children}
  </div>
)

const Title = () => (
  <h3 style={{ color: 'palevioletred' }}>
    Hello World!
  </h3>
)

