import { useEffect, useState } from 'preact/hooks'

import './Post.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'

import Post from '../components/Post'

const PostPage = ({ uri }) => {
  const { posts } = useAppState()
  const [data] = posts.value.filter(item => item.uri === uri)
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (data) {
      setPost(data)
    } else {
      getPost()
    }
  }, [])

  const getPost = async () => {
    setLoading(true)

    try {
      const res = await agent(`/posts/${uri}`)

      posts.value = [...posts.value, res.post]
      setPost(res.post)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  if (!post || loading) {
    return <div className="loader" aria-busy />
  }

  return (
    <div className="container post-page">
      <Post data={post} single />
    </div>
  )
}

export default PostPage
