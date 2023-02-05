import { useEffect, useState } from 'preact/hooks'

import './Post.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'
import { useMeta } from '../utils/meta'
import { siteName } from '../constants/config'

import Post from '../components/Post'

const PostPage = ({ uri }) => {
  const { posts } = useAppState()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState(null)
  useMeta({
    title: post ? `${post.title} — ${siteName}` : siteName
    // meta: [{ name: 'description', content: 'hello world' }] TODO:
  })

  useEffect(() => {
    const [data] = posts.value.filter(item => item.uri === uri)

    if (data) {
      setPost(data)
    } else {
      getPost()
    }
  }, [])

  const getPost = async () => {
    setLoading(true)

    try {
      const data = await agent(`/posts/${uri}`)

      posts.value = [...posts.value, data.post]
      setPost(data.post)
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
