import { useContext } from 'react'
import { ThemeContext } from './../App'
const Component = () => {
  const theme = useContext(ThemeContext)
  return (
    <div>
      Hello World <p>{theme}</p>
    </div>
  )
}
export default Component
