import React from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

export function CacheTimeComponent () {
  const queryInfo = useQuery(
    'pokemon',
    async () => {
      return axios
        .get('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data.results)
    },
    {
      cacheTime: 5000,
    }
  )

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : queryInfo.isError ? (
    queryInfo.error['message']
  ) : (
    <div>
      {queryInfo.isFetching ? <b>Updating...</b> : null}
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}

export function CacheTime () {
  const [show, toggle] = React.useReducer(d => !d, true)
  return (
    <div>
      <button onClick={() => toggle()}>{show ? 'Hide' : 'Show'}</button>
      <br />
      <br />
      {show ? <CacheTimeComponent /> : null}
    </div>
  )
}
