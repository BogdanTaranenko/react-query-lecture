import React from 'react'
import { useQuery } from 'react-query'

export function Cancellation ({ pokemon }) {
  const queryInfo = useQuery(
    ['pokemon', pokemon],
    () => {
      const controller = new AbortController()

      const signal = controller.signal

      const promise = new Promise(resolve => setTimeout(resolve, 1000))
        .then(() => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
            method: 'get',
            signal,
          })
        })
        .then(res => res.json())

      // @ts-ignore
      promise.cancel = () => {
        controller.abort()
      }

      return promise
    },
    {
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

