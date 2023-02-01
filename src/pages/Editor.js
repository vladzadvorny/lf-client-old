import { useHead } from 'hoofd/preact'
import { useEffect, useState } from 'preact/hooks'

import './Editor.scss'

import { siteName } from '../constants/config'
import { useTranslate } from '../hooks/useTranslate'
import { agent } from '../utils/agent'
import { useAppState } from '../state'

import Text from '../components/editor/Text'
import Image from '../components/editor/Image'
import Video from '../components/editor/Video'

let timeout
const Editor = () => {
  const { t } = useTranslate()
  const { notification } = useAppState()

  useHead({
    title: `${t('editor.createPost')}— ${siteName}`
  })
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (error && error.message === 'POSTS_EMPTY_ITEMS') {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }, [error])

  const send = async () => {
    setLoading(true)

    try {
      const data = await agent('/posts', {
        method: 'PUT',
        body: {
          title,
          body: items,
          status: 'published' // or draft
        }
      })
      console.log(data)
      if (data.error) {
        notification.value = data.error.message
        setError(data.error)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getId = () => Math.random().toString(36).slice(-4)

  const addItem = item => setItems([...items, item])

  const changeItem = item =>
    setItems(
      items.map(_item => {
        if (_item.id === item.id) {
          return item
        }
        return _item
      })
    )

  const moveItem = (from, to) => {
    const newItems = [...items]
    newItems.splice(to, 0, newItems.splice(from, 1)[0])

    setItems(newItems)
  }

  const removeItem = index => {
    const newItems = [...items]
    newItems.splice(index, 1)

    setItems(newItems)
  }

  const addBoxItems = [
    {
      name: t('text'),
      icon: 'text_snippet',
      item: {
        id: getId(),
        type: 'text',
        body: { html: '' }
      }
    },
    {
      name: t('image'),
      icon: 'image',
      item: {
        id: getId(),
        type: 'image',
        body: { id: '', path: '' }
      }
    },
    {
      name: t('video'),
      icon: 'videocam',
      item: {
        id: getId(),
        type: 'video',
        body: { id: '', provider: '' }
      }
    }
  ]

  return (
    <div className="container editor-page">
      <h3>{t('editor.createPost')}</h3>
      <input
        type="text"
        name="title"
        aria-label="Title"
        {...(error && error.fields.includes('title') && { ariaInvalid: true })}
        placeholder={t('editor.title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        onFocus={() => setError(null)}
      />

      {items.map((item, index) => (
        <div
          className={`item${
            error && error.fields.includes(item.id) ? ' error' : ''
          }`}
          key={item.id}
        >
          <div>
            {item.type === 'text' && (
              <Text
                item={item}
                changeItem={body => {
                  changeItem({
                    ...item,
                    body
                  })
                }}
                onBlur={console.log}
              />
            )}

            {item.type === 'image' && (
              <Image
                item={item}
                changeItem={body =>
                  changeItem({
                    ...item,
                    body
                  })
                }
              />
            )}

            {item.type === 'video' && (
              <Video
                item={item}
                changeItem={body =>
                  changeItem({
                    ...item,
                    body
                  })
                }
              />
            )}
          </div>
          <div>
            <span
              className="material-symbols-outlined"
              role="presentation"
              onClick={() => removeItem(index)}
            >
              close
            </span>

            <div>
              <span
                className={`material-symbols-outlined${
                  index === 0 ? ' disable' : ''
                }`}
                role="presentation"
                onClick={() => moveItem(index, index - 1)}
              >
                arrow_upward
              </span>
              <span
                className={`material-symbols-outlined${
                  index === items.length - 1 ? ' disable' : ''
                }`}
                role="presentation"
                onClick={() => moveItem(index, index + 1)}
              >
                arrow_downward
              </span>
            </div>
          </div>
        </div>
      ))}

      <div className="add-box">
        {addBoxItems.map(({ name, item, icon }) => (
          <div role="presentation" onClick={() => addItem(item)}>
            <span
              role="presentation"
              className="material-symbols-outlined"
              onClick={() => {}}
            >
              {icon}
            </span>
            <i>{name}</i>
          </div>
        ))}
      </div>

      <div className="push" />
      <div className="grid">
        <button
          className="secondary"
          type="submit"
          onClick={() => {}}
          // aria-busy={loading}
        >
          {t('editor.saveAsDraft')}
        </button>
        <button
          className="primary"
          type="submit"
          onClick={send}
          aria-busy={loading}
        >
          {t('editor.publish')}
        </button>
      </div>
    </div>
  )
}

export default Editor

// ;[
//   {
//     id: 'xmd6',
//     type: 'text',
//     body: {
//       html: ''
//     }
//   },
//   {
//     id: 'prpw',
//     type: 'image',
//     body: {
//       id: '',
//       path: ''
//     }
//   },
//   {
//     id: '8q2q',
//     type: 'video',
//     body: {
//       id: '',
//       provider: ''
//     }
//   }
// ]
