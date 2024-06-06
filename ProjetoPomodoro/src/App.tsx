import { ThemeProvider } from 'styled-components'
import { Buttton } from './components/Button'
import { defaultTheme } from './styles/themes/default'

export function App() {
  
  return (
 
<ThemeProvider theme={defaultTheme}>
<Buttton variant="primary"  />
<Buttton variant="secondary" />
<Buttton variant="success" />
<Buttton variant="danger" />
<Buttton/>



</ThemeProvider>
 
  )
}
 


