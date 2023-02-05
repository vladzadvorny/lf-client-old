import { useEffect, useState } from 'preact/hooks'

import './Home.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'
import { useMeta } from '../utils/meta'

import Post from '../components/Post'

const Home = () => {
  useMeta({
    title: 'Welcome to Lily Family'
    // meta: [{ name: 'description', content: 'hello world' }] TODO:
  })
  const { posts } = useAppState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (posts.value.length <= 1) {
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

  if (loading) {
    return <div className="loader" aria-busy />
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
