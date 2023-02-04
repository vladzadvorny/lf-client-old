import { useEffect, useState } from 'preact/hooks'
import { useHead } from 'hoofd/preact'

import './Home.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'

import Post from '../components/Post'

const Home = () => {
  useHead({
    title: 'Welcome to Lily Family'
  })
  const { posts } = useAppState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // for ssr
    if (!posts.value.length) {
      getPosts()
    }
  }, [])

  const getPosts = async () => {
    setLoading(true)

    try {
      const data = await agent('/posts')

      posts.value = data.posts
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container home-page">
      {posts.value.map(post => (
        <Post data={post} />
      ))}
    </div>
  )
}

export default Home
