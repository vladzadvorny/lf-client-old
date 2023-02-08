import { Link } from 'preact-router'

import './Post.scss'
import { filesUri } from '../constants/config'

import Likes from './Likes'

const Post = ({ data, single }) => {
  return (
    <article className="post">
      <header>
        {single ? (
          <h2>{data.title}</h2>
        ) : (
          <Link href={`/post/${data.uri}`}>
            <h2>{data.title}</h2>
          </Link>
        )}
      </header>
      <div>
        {data.body.map(body => {
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
                alt={data.title}
              />
            )
          }
          return null
        })}
      </div>

      <footer>
        <Likes data={data} />
      </footer>
    </article>
  )
}

export default Post
