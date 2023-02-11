import { Link, route } from 'preact-router'

import './Post.scss'
import { filesUri } from '../constants/config'
import { useTranslate } from '../hooks/useTranslate'

import Likes from './Likes'

const Post = ({ data, single }) => {
  const { lang } = useTranslate()

  return (
    <article className="post">
      <header>
        <Link href={`/categories/${data.category.uri}`}>
          {data.category.name[lang]}
        </Link>
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
        <div
          className="comment-count"
          role="presentation"
          onClick={() => {
            route(`/post/${data.uri}#comments`)
          }}
        >
          <i>10</i>
          <span className="material-symbols-outlined">chat_bubble</span>
        </div>
      </footer>
    </article>
  )
}

export default Post
