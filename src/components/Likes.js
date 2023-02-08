import { useState } from 'preact/hooks'

import './Likes.scss'
import { agent } from '../utils/agent'
import { useAppState } from '../state'

const Likes = ({ data }) => {
  const { id: postId, likes, my_like: myLike } = data
  const [loading, setLoading] = useState(false)
  const { posts } = useAppState()

  const toggle = async () => {
    setLoading(true)

    try {
      const data = await agent('/likes/post', {
        method: 'POST',
        body: { postId }
      })
      console.log(data)

      posts.value = [
        ...posts.value.map(item =>
          item.id === postId
            ? {
                ...item,
                ...(data.deleted
                  ? { my_like: false, likes: item.likes - 1 }
                  : {
                      my_like: true,
                      likes: item.likes + 1
                    })
              }
            : item
        )
      ]
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="likes" role="presentation" onClick={toggle}>
      <span className={`material-symbols-outlined${myLike ? ' fill' : ''}`}>
        favorite
      </span>

      {loading ? <div aria-busy /> : <i>{likes}</i>}
    </div>
  )
}

export default Likes
