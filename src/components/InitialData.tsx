import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const email = 'Sincere@april.biz'
const existingUser = {
  id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
}

export function InitialData () {
  const userQuery = useQuery(
    'user',
    async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then(res => res.data[0])
    },
    {
      initialData: existingUser,
    }
  )

  return userQuery.isLoading ? (
    <div>Loading...</div>
  ) : userQuery.isError ? (
    userQuery.error['message']
  ) : (
    <div>
      <pre>{JSON.stringify(userQuery.data, null, 2)}</pre>
      {userQuery.isFetching ? 'Updating...' : null}
    </div>
  )
}
