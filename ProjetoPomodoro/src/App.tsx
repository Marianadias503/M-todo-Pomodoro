import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GoblalStyle } from './styles/global'
 
 


export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>

   

    <GoblalStyle/>
    </ThemeProvider>
     

  )
}
 




