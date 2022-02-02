import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const email = 'a@a.com'

export function DependentQuery () {
  const userQuery = useQuery('user', () =>
    axios
      .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
      .then(res => res.data[0])
  )

  const postsQuery = useQuery(
    ['posts'],
    () =>
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data.id}`
        )
        .then(res => res.data),
    {
      enabled: userQuery.data?.id,
    }
  )

  return userQuery.isLoading ? (
    <div>Loading user...</div>
  ) : (
    <div>
      User Id: {userQuery.data.id}
      <br />
      <br />
      {postsQuery.isIdle ? null : postsQuery.isLoading ? (
        <div>Loading posts...</div>
      ) : (
        <div>Post Count: {postsQuery.data.length}</div>
      )}
    </div>
  )
}
