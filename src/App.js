import { lazy, Suspense, createContext, useReducer } from 'react'
import logo from './logo.svg'
import './App.css'

export const ThemeContext = createContext('light')

const Component = lazy(() => import('./components/Component'))

/** 
## Hooks
- Hooks 是让你从函数组件中“钩入”React 状态和生命周期特性的函数。
- 钩子规则。
Hooks 只能在 React 功能组件内部调用。
挂钩只能在功能组件的顶层调用。不能有条件地调用声明。
 
## useState Hook
- useState 是一个钩子，可让您管理功能组件中的状态。

## useEffect Hook
- useEffect 是一个钩子，可让您访问功能组件中的生命周期方法

## useContext
- useContext 是一个钩子，它返回给定上下文的数据。

## useReducer
- useReducer 是一个钩子，可让您管理功能组件中的状态，但与 useState 不同，它使用 Redux 模式。

## useCallback
- useCallback 挂钩返回回调的记忆版本，其唯一目的是优化性能。

## useMemo
- useMemo 钩子返回回调产生的值的记忆版本。就像 useCallback 一样，useMemo 是一个性能优化钩子。

## useRef
- useRef 挂钩返回一个可变的 ref 对象，其 .current 属性初始化为传递的参数 (initialValue)。

## useTransition
- useTransition 挂钩可让您将不太紧急的操作标记为过渡。

**/

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
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <p>{count}</p>
        <button onClick={() => dispatch('increment')}>+</button>
        <button onClick={() => dispatch('decrement')}>-</button>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeContext.Provider value='light'>
            <Component />
          </ThemeContext.Provider>
        </Suspense>
      </header>
    </div>
  )
}

export default App
