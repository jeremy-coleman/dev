import * as React from 'react'
import {observer} from 'mobx-react'

import { percent, rem } from 'csx';
import { style } from 'typestyle';

const navClass = style({
    width: percent(100),
});

const listClass = style({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    backgroundColor: 'black',
    display: 'flex',
    textAlign: 'center',
    $nest: {
        '& li': {
            float: 'left',
            $nest: {
                '& a': {
                    display: 'inline-block',
                    minWidth: rem(1.4),
                    height: rem(5),
                    lineHeight: rem(5),
                    color: 'white',
                    textDecoration: 'none',
                    padding: rem(1),
                    $nest: {
                        '&:hover': {
                            backgroundColor: 'purple',
                        },
                    },
                },
            },
        },
    },
});

export const Header = () => (
    <nav className={navClass}>
        <ul className={listClass}>
            <li><a>Home</a></li>
            <li><a >About</a></li>
            <li><a >Currency</a></li>
            <li><a>NotALink</a></li>
        </ul>
    </nav>
);





const FancyButton: any = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();

export let CatalogPage = observer((props) =>
<>
<div>CatalogPage</div>
<Header/>
<FancyButton ref={ref}>Click me!</FancyButton>
</>
)