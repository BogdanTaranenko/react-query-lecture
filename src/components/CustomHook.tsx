import React from 'react'
import { useQuery } from 'react-query'

import axios from 'axios'

function usePokemon() {
  return useQuery('pokemons', async () => {
    return axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(res => res.data.results)
  })
}

const Count = () => {
  const queryInfo = usePokemon()

  return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
}

const Pokemon = () => {
  const queryInfo = usePokemon()

  return queryInfo.isLoading ? (
    <div>Loading...</div>
  ) : queryInfo.isError ? (
    queryInfo.error['message']
  ) : (
    <div>
      {queryInfo.data.map(result => {
        return <div key={result.name}>{result.name}</div>
      })}
      <br />
      {queryInfo.isFetching ? 'Updating...' : null}
    </div>
  )
}
