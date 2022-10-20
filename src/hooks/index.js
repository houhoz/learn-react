import { useState, useEffect, useCallback } from 'react'
import { useRequest } from 'ahooks'

function useFetch() {
  const [data, setData] = useState(null)
  const { run: request, loading } = useRequest(
    () =>
      fetch(
        'https://mock.apifox.cn/m1/894315-0-default/pet/findByStatus?status='
      ),
    {
      manual: true,
      onSuccess: result => {
        result.json().then(res => {
          if (res.status >= 400) {
            console.log('res.message :>> ', res.message)
          } else {
            console.log('res :>> ', res)
            setData(res)
          }
        })
      },
      onError: err => {
        console.log('err :>> ', err)
      },
    }
  )
  const requesting = useCallback(() => {
    request()
  }, [request])

  // requesting()

  return [data, loading]
}

export default useFetch
