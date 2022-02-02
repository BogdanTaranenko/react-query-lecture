import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export function ErrorState () {
  const queryInfo = useQuery('pokemon', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (true) {
      throw new Error('Test error!')
    }
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : queryInfo.isError ? (
    queryInfo.error['message']
  ) : (
    <div>
      {queryInfo.data.map((result: any) => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
