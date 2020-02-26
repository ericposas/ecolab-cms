import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import App from './components/App'
import { createGlobalStyle } from 'styled-components'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './images/Logo_Joint_ECL-NW_Reverse.png'
import './images/pencil.svg'
import interstateReg from './fonts/interstate-regular-comp.otf'
import './index.scss'

console.log(interstateReg)

const requireFonts = require.context('./fonts', false, /.otf$/)
requireFonts.keys().forEach(font => requireFonts(font))

// const GlobalStyle = createGlobalStyle`
//   @font-face {
//     font-family: "interstate-reg";
//     src:
//       url("./fonts/interstate-regular-comp.otf");
//   }
//
//   html, body {
//     font-family: "interstate-reg";
//   }
// `

const rootElement = document.getElementById('root')
const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    {/* <GlobalStyle/> */}
    <App/>
  </Provider>,
  rootElement
)
