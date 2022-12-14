import { useContext, useState, useTransition, useEffect } from 'react'
import { ThemeContext } from './../App'
import useFetch from './../hooks/useFetch'

const items = ['1', '2', '3', '4']
const Component = () => {
  const {
    loading,
    error,
    data: list,
  } = useFetch('https://hn.algolia.com/api/v1/search?query=react')

  const theme = useContext(ThemeContext)
  const [input, setInput] = useState('')
  const [data, setData] = useState([...items])
  const [isPending, startTransition] = useTransition()
  console.log('isPending :>> ', isPending)
  useEffect(() => {
    startTransition(() => {
      setData(items.filter(i => i.includes(input)))
    })
  }, [input])

  const updateInput = e => setInput(e.target.value)
  return (
    <div>
      Hello World <p>{theme}</p>
      <div>
        <input value={input} onChange={updateInput} type='text' />
        <ul>
          {data.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Component
