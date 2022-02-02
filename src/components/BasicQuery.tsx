import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export function BasicQuery () {
  const queryInfo = useQuery('pokemon', () =>
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((res: any) => res.data.results)
  )

  return (
    <div>
      {queryInfo.data?.map((result: any) => {
        return <div key={result.name}>{result.name}</div>
      })}
    </div>
  )
}
