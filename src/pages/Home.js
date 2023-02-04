import { useEffect, useState } from 'preact/hooks'
import { useHead } from 'hoofd/preact'

import './Home.scss'
import { useAppState } from '../state'
import { agent } from '../utils/agent'
import { filesUri } from '../constants/config'

const Home = () => {
  useHead({
    title: 'Welcome to Lily Family'
  })
  const { posts } = useAppState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)

    try {
      const data = await agent('/posts')
      console.log(data)
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
        <article key={post.id}>
          <header>{post.title}</header>
          <div>
            {post.body.map(body => {
              if (body.type === 'text') {
                return (
                  <p
                    key={body.id}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: body.body.html }}
                  />
                )
              }
              if (body.type === 'image') {
                return (
                  <img
                    key={body.id}
                    src={`${filesUri}${body.body.path}`}
                    alt={post.title}
                  />
                )
              }
              return null
            })}
          </div>

          <footer>Footer</footer>
        </article>
      ))}
    </div>
  )
}

export default Home
