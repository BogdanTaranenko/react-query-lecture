import React from 'react'
import { useQuery, useMutation } from 'react-query'

import axios from 'axios'
import { queryClient } from '../App'


interface IProps {
  [key: string]: any
}
const PostForm = (props: IProps) => null

export const Mutations = () => {
  const postsQuery = useQuery('posts', () =>
    axios.get('/api/posts').then((res) => res.data)
  )

  const createPost = useMutation<any>(
    (values) => axios.post('/api/posts', values),
    {
      onSuccess: () => {
        return queryClient.invalidateQueries('posts')
      },
    }
  )

  return (
    <section>
      <div>
        <div>
          {postsQuery.isLoading ? (
            <span>Loading...</span>
          ) : (
            <>
              <h3>Posts {postsQuery.isFetching ? <small>...</small> : null}</h3>
              <ul>
                {postsQuery.data.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
              <br />
            </>
          )}
        </div>
      </div>

      <hr />

      <div>
        <h3>Create New Post</h3>
        <div>
          <PostForm
            onSubmit={createPost.mutate}
            clearOnSubmit
            submitText={
              createPost.isLoading
                ? 'Saving...'
                : createPost.isError
                  ? 'Error!'
                  : createPost.isSuccess
                    ? 'Saved!'
                    : 'Create Post'
            }
          />
        </div>
      </div>
    </section>
  )
}
