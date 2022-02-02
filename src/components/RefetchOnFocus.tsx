import React from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

export function RefetchOnFocus () {
  const queryInfo = useQuery(
    'pokemon',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data.results)
    },
    {
      refetchOnWindowFocus: true,
    }
  )

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : queryInfo.isError ? (
    queryInfo.error['message']
  ) : (
    <div>
      {queryInfo.isFetching ? <b>Updating...</b> : null}
      {queryInfo.data.map((result: any) => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
