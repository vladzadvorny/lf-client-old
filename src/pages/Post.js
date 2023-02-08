import { useEffect, useMemo } from 'preact/hooks'

import './Post.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'
import { useMeta } from '../utils/meta'
import { siteName } from '../constants/config'

import Post from '../components/Post'

const PostPage = ({ uri }) => {
  const { posts } = useAppState()

  const [post] = useMemo(
    () => posts.value.filter(item => item.uri === uri),
    [posts.value]
  )

  console.log(post, uri)

  useMeta({
    title: post ? `${post.title} — ${siteName}` : siteName
  })

  useEffect(() => {
    if (!post) {
      getPost()
    }
  }, [])

  const getPost = async () => {
    try {
      const res = await agent(`/posts/${uri}`)

      posts.value = [res.post]
    } catch (error) {
      console.log(error)
    }
  }

  if (!post) {
    return <div className="loader" aria-busy />
  }

  return (
    <div className="container post-page">
      <Post data={post} single />
    </div>
  )
}

export default PostPage
