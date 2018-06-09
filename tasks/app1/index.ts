let x = new DocumentFragment()

let child = document.createElement('div')
x.appendChild(child)

x.textContent = 'hi'

document.body.appendChild(x)