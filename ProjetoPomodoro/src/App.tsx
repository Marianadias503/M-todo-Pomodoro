import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GoblalStyle } from './styles/global'
import { Router } from './Router'
import{BrowserRouter} from 'react-router-dom'
import { CyclesContextProvider } from './contexts/CyclesContext'



 


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <CyclesContextProvider>
          <Router/>
      </CyclesContextProvider>

      </BrowserRouter>
    <GoblalStyle/>
    </ThemeProvider>
     

  )
}
 




