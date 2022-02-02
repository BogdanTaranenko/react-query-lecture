import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export function LoadingState () {
  const queryInfo = useQuery('pokemon', async () => {
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {queryInfo.data.map((result: any) => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
