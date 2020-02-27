import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import App from './components/App'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import './images/Logo_Joint_ECL-NW_Reverse.png'
import './images/pencil.svg'
import './index.scss'

const requireFonts = require.context('./fonts', false, /.(woff|woff2)$/)
requireFonts.keys().forEach(font => requireFonts(font))

const rootElement = document.getElementById('root')
const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

const customTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      input: {
        '&::placeholder': {
          fontFamily: 'interstateregular_comp'
        }
      }
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  rootElement
)
