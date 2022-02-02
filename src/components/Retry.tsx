import React from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

export function Retry ({ pokemon }) {
  const queryInfo = useQuery(
    ['pokemon', pokemon],
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.data)
    },
    {
      retry: 5,
      retryDelay: (index) => index * 1000,
      enabled: pokemon,
    }
  )

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : queryInfo.isError ? (
    queryInfo.error['message']
  ) : (
    <div>
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
      ) : (
        'Pokemon not found.'
      )}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}
