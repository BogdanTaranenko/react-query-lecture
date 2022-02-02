import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { queryClient } from '../App'

export function Invalidation () {
  const randomQuery = useQuery('random', async () => {
    return Promise.resolve(Math.random())
  }, {
    staleTime: Infinity
  })

  return (
    <div>
      <h1>Random Number {randomQuery.isFetching ? '...' : null}</h1>
      <h2>
        {randomQuery.isLoading
          ? 'Loading random number...'
          : Math.round(randomQuery.data * 1000)}
      </h2>
      <div>
        <button onClick={() => queryClient.invalidateQueries('random')}>
          Invalidate Random Number
        </button>
      </div>
    </div>
  )
}
