# Learn React in 5 minutes

## TODO

- [ ] useCallback useMemo？？？
- [x] 使用 useContext useReducer 构建全局状态管理 [reducer分支]( https://github.com/houhoz/learn-react/tree/reducer)
- [x] 自定义 hooks [useFetch](https://github.com/houhoz/learn-react/blob/master/src/hooks/useFetch.js)
- [x] test

## 正文

1. Create React App  
   `npx create-react-app react-app`  
    or  
    `yarn create react-app react-app`

2. Functional Component

   ```js
   const Component = () => {
     return <div>Hello World</div>
   }
   ```

3. Importing a component

   ```js
   // Component.js
   function Component() {
     return <div>Hello World</div>
   }
   export default Component

   // App.js
   import { Component } from './components/Component'
   function App() {
     return <Component />
   }
   ```

4. Lazy loading

   ```js
   // Component.js
   function Component() {
     return <div>Hello World</div>
   }
   export default Component

   // App.js
   import { lazy, Suspense } from 'react'
   const Component = lazy(() => import('./components/Component'))
   function App() {
     return (
       <Suspense fallBack={<div>loading...</div>}>
         <Component />
       </Suspense>
     )
   }
   ```

5. Component properties

   - These are the values with which the component is initialized. Props are accepted as the function parameter.

   ```js
   // no props
   function App() {
     return <Person name='Mike' age={19} />
   }

   // with props
   const Person = props => {
     return (
       <h1>
         Name: {props.name}, Age: {props.age}
       </h1>
     )
   }

   // with destructured props
   const Person = ({ name, age }) => {
     return (
       <h1>
         Name: {name}, Age: {age}
       </h1>
     )
   }
   ```

6. Prop Destructuring.

   - Person is a component that accepts a name prop.

   ```js
   function App() {
     return person.map(({ id, ...props }) => <Person key={id} {...props} />)
   }
   ```

7. Events

   ```js
   const clickHandler = () => alert('hello')
   function App() {
     return (
       <>
         <h1>Welcome to my app</h1>
         <button onClick={clickHandler}>Say Hi</button>
       </>
     )
   }
   ```

8. Hooks.

   - Hooks are functions that let you “hook into” React state and lifecycle features from function components.
   - Rules of hooks.

   ✅ Hooks must be invoked only inside a React functional component.  
   ✅ Hooks must be only called at the top level of a functional component.  
   ✅ Declaration CAN NOT be called conditionally.

9. useState Hook

   - useState is a hook that lets you manage the state in a functional component.

   ```js
   function App() {
     const [count, setCount] = useState(0)
     return (
       <div>
         <p>you clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>click me</button>
       </div>
     )
   }
   ```

10. useEffect Hook

    - useEffect is a hook that lets you access lifecycle methods in a functional component.

    ```js
    function App() {
      const [count, setCount] = useState(0)
      useEffect(() => {
        console.log('initialized')
        // clean up function runs before the component is unmounted
        return () => {
          console.log('Cleaned up')
        }
      }, []) // empty array: run dur ing mount only

      useEffect(() => {
        document.title = `You clicked ${count} times`
      }, [count])
      // array with count: run every time count changes
      return (
        <div>
          <p>you clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>click me</button>
        </div>
      )
    }
    ```

11. useContext Hook

    - useContext is a hook that returns the data for the given context.

    ```js
    const ThemeContext = createContext('light')
    function App() {
      return (
        <ThemeContext.Provider value='light'>
          <Component />
        </ThemeContext.Provider>
      )
    }

    function Component() {
      const theme = useContext(ThemeContext)
      return <div>The current theme is: {theme}</div>
    }
    ```

12. useReducer

    - useReducer is a hook that lets you manage state in functional components, but unlike useState it uses the Redux pattern.

    ```js
    function App() {
      const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
          case 'increment':
            return state + 1
          case 'decrement':
            return state - 1
          default:
            throw new Error()
        }
      }, 0)
      return (
        <div>
          <p>{count}</p>
          <button onClick={() => dispatch('increment')}>+</button>
          <button onClick={() => dispatch('decrement')}>-</button>
        </div>
      )
    }
    ```

13. useCallback

    - The useCallback hook returns a memoized version of the callback, with the sole purpose of optimizing performance.

    ```js
    function App() {
      const [count, setCount] = useState(0)
      const increment = useCallback(() => {
        setCount(c => c + 1)
      }, [])
      return (
        <div>
          <p>{count}</p>
          <button onClick={increment}>+</button>
        </div>
      )
    }
    ```

14. useMemo

    - The useMemo hook returns a memoized version of the value produced by the callback. Just like useCallback, useMemo is a performance optimization hook.

    ```js
    function App() {
      const [count, setCount] = useState(0)
      const memoizedIncrement = useMemo(() => {
        return () => setCount(c => c + 1)
      }, [])
      return (
        <div>
          <p>{count}</p>
          <button onClick={memoizedIncrement}>+</button>
        </div>
      )
    }
    ```

15. useRef

    - The useRef hook returns a mutable ref object whose .current property is initialized to the passed argument (initialValue).

    ```js
    function App() {
      const inputRef = useRef(null)
      const onButtonClick = () => {
        inputRef.current.focus()
      }
      return (
        <div>
          <input ref={inputRef} type='text' />
          <button onClick={onButtonClick}>Focus</button>
        </div>
      )
    }
    ```

16. useTransition

    - The useTransition hook lets you mark less-urgent actions as transitions.

    ```js
    function App() {
      const [input, setInput] = useState('')
      const [data, setData] = useState([...items])
      const [isPending, startTransition] = useTransition()
      useEffect(() => {
        startTransition(() => {
          setData(items.filter(i => i.includes(input)))
        })
      }, [input])

      const updateInput = e => setInput(e.target.value)
      return (
        <div>
          <input value={input} onChange={updateInput} type='text' />
          <ul>
            {data.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }
    ```
