/*

https://github.com/andywer/react-stateful-fn

see also https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
-------------example 1------------------
import stateful from 'react-stateful-fn'

const increase = () => state => ({ clicks: state.clicks + 1 })

const Counter = (props, state) => (
  <div>
    <div>Clicked {state.clicks} times</div>
    <button onClick={props.onClick}>Increase +</button>
  </div>
)

export default stateful(Counter, { clicks: 0 }, {
  onClick: event => ({ setState }) => setState(increase())
})


-------------example 2, form-----------------
import stateful from 'react-stateful-fn'

/**
 #note    Use as:
 #  <LoginForm onLogin={(email, password) => { ... }} />

const LoginForm = (props, state) => (
  <form>
    <input type='email' placeholder='Email' value={state.email} onChange={props.onEmailChange} />
    <input type='password' placeholder='Password' value={state.password} onChange={props.onPasswordChange} />
    <button type='submit' onClick={props.onSubmitClick}>Login</button>
  </form>
)

const initialState = {
  email: '',
  password: ''
}

export default stateful(LoginForm, initialState, {
  onEmailChange: event => ({ setState }) => setState({ email: event.target.value }),
  onPasswordChange: event => ({ setState }) => setState({ password: event.target.value }),
  onSubmitClick: event => (_, props, state) => props.onLogin(state.email, state.password)
})


*/





import * as React from 'react'

//module.exports = makeStateful

export let makeStateful = (component, initialState, propHandlers) => {
  class statefulComponent extends React.Component {
    statefulMethods: any
    propHandlers: any
    
    constructor (props) {
      super(props)
      this.state = initialState || {}
      this.statefulMethods = {
        setState: this.setState.bind(this)
      }
      this.propHandlers = propHandlers ? this.preparePropHandlers(propHandlers) : null
    }

    render () {
      const props = this.propHandlers ? Object.assign({}, this.props, this.propHandlers) : this.props
      return component(props, this.state, this.statefulMethods)
    }

    preparePropHandlers (propHandlers) {
      const preparedHandlers = {}

      Object.keys(propHandlers).forEach(key => {
        const handler = propHandlers[key]
        preparedHandlers[key] = typeof handler !== 'function' ? handler : (...args) => {
          const result = handler(...args)

          if (typeof result === 'function') {
            const props = Object.assign({}, this.props, this.propHandlers)
            return result(this.statefulMethods, props, this.state)
          } else {
            return result
          }
        }
      })

      return preparedHandlers
    }
  }

  if (component.name) {
    this.displayName = component.name
  }
  if (component.propTypes) {
    this.propTypes = component.propTypes
  }

  return statefulComponent
}