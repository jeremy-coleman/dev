
//import "bulma/bulma.sass";
import './styles.css'
//import './less/root.less'

//var dom = require('vinyl-dom');


import {VinylDOM as dom} from './vinyl-dom'



const divElement = document.createElement("div")
divElement.id = 'placeholder'
divElement.innerHTML = 'hi from placeholder'

dom.src(divElement)
  //.pipe()
  .pipe(dom.dest('#root'));

const root = document.getElementById("root");

console.log(root.innerHTML)


var briefjs = require('briefjs')
const {tags, component, render} = briefjs;
const {div, span} = tags;

function randomColor() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r},${g},${b})`;
}

const MyTag = component({
  props: {
    color: 'red;',
    onclick: 'void(0)',
  },
  render(props, slot) {
    return div({style: {color: props.color}, onclick: props.onclick})`
      ${span({ref: 'foo'})`1`}
      ${span`${props.color}`}
      ${slot}
    `;
  },
  updated() {
    console.log(this.refs);
  },
});

const Outer = component({
  render(props, slot) {
    let color = randomColor();
    const onclick = () => {
      color = randomColor();
      this.update();
    };
    return MyTag({color, onclick})`${slot}`;
  },
  updated() {
    this.node.addEventListener('mousedown', () => {
      console.log('mousedown');
    });
  },
});

const tpl = div`
  ${Outer`
    ${span`abc`}
  `}
  ${span`3`}
  ${span`4`}
  ${div`
    ${span`5`}
  `}
`;

render(tpl, document.getElementById('app'));



const canvas = document.createElement("canvas") as HTMLCanvasElement
document.body.appendChild(canvas)
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

const car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 3,
    vy: 3,
    draw() {
        ctx.save()
        ctx.fillStyle = "#333"
        ctx.font = "48px 'Courier New'"
        ctx.translate(this.x, this.y)
        ctx.fillText("⚽️", 0, 0)
        ctx.restore()
    }
}

function clear() {
    ctx.save()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#D8D8D8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
}

function draw() {
    if (car.x > canvas.width - 48 || car.x < 0) {
        car.vx = -car.vx
    }
    if (car.y > canvas.height || car.y < 48) {
        car.vy = -car.vy
    }
    clear()
    car.draw()
    car.x += car.vx
    car.y += car.vy
    window.requestAnimationFrame(draw);
}



draw()

export default draw()