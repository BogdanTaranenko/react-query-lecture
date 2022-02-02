import React from 'react'
import { useQuery, useMutation } from 'react-query'

import axios from 'axios'
import { queryClient } from '../App'

interface IProps {
  [key: string]: any
}
const PostForm = (props: IProps) => null

export function MutationUpdatingQuery ({ post }) {
  const postsQuery = useQuery(['post', post.id], () =>
    axios.get('/api/posts').then((res) => res.data),
  )

  const createPost = useMutation(
    (values) => axios.put('/api/post', values),
    {
      onError: (error: any) => {
        window.alert(error.response.data.message)
      },
      onMutate: (values: any) => {
        queryClient.setQueryData(['post', values.id], values)
      },
      onSuccess: (data, values) => {
        queryClient.setQueryData(['post', values.id], data)
        queryClient.invalidateQueries('posts')
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
                  <a href="/[postId]">
                    <li key={post.id}>{post.title}</li>
                  </a>
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
            onSubmit={createPost}
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
          {createPost.isError ? (
            <pre>{createPost.error.response.data.message}</pre>
          ) : null}
        </div>
      </div>
    </section>
  )
}
