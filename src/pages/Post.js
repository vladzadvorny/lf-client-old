/* eslint-disable no-restricted-globals */
import { useEffect, useMemo } from 'preact/hooks'

import './Post.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'
import { useMeta } from '../utils/meta'
import { isBrowser, siteName } from '../constants/config'

import Post from '../components/Post'
import Comments from '../components/Comments'

const PostPage = ({ uri }) => {
  const { posts } = useAppState()

  const [post] = useMemo(
    () => posts.value.filter(item => item.uri === uri),
    [posts.value]
  )

  useEffect(() => {
    if (isBrowser && post) {
      let scrollTop = 0
      if (location.hash) {
        scrollTop = document.querySelector(location.hash).offsetTop
      }
      window.scrollTo({ top: scrollTop })
    }
  }, [posts.value])

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
      <Comments postId={post.id} />
    </div>
  )
}

export default PostPage
