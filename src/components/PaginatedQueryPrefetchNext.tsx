import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { queryClient } from "../App";

const fetchPosts = (page) =>
  axios
    .get('/api/posts', {
      params: {
        pageSize: 10,
        pageOffset: page,
      },
    })
    .then((res) => res.data)

export function PaginatedQueryPrefetchNext () {
  const [page, setPage] = React.useState(0)

  const postsQuery = useQuery(['posts', { page }], () => fetchPosts(page))

  React.useEffect(() => {
    queryClient.prefetchQuery(
      ['posts', { page: page + 1 }],
      fetchPosts
    )
  }, [postsQuery.data?.nextPageOffset])

  return (
    <div>
      {postsQuery.isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
          <ul>
            {postsQuery.data.items.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
          <br />
        </>
      )}
      <button onClick={() => setPage((old) => old - 1)} disabled={page === 0}>
        Previous
      </button>{' '}
      <button
        onClick={() => setPage((old) => old + 1)}
        disabled={!postsQuery.data?.nextPageOffset}
      >
        Next
      </button>{' '}
      <span>
        Current Page: {page + 1} {postsQuery.isFetching ? '...' : ''}
      </span>
    </div>
  )
}
