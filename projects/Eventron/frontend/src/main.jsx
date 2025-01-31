import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/ReactToastify.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router"
import {Provider} from "react-redux" 
import { store } from './redux/store.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
      <Provider store = {store}>
      <App />
      </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
