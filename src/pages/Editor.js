import { useHead } from 'hoofd/preact'
import { useState } from 'preact/hooks'

import './Editor.scss'

import { siteName } from '../constants/config'
import { useTranslate } from '../hooks/useTranslate'

import Text from '../components/editor/Text'
import Image from '../components/editor/Image'
import Video from '../components/editor/Video'

// https://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links

const Editor = () => {
  const { t } = useTranslate()

  useHead({
    title: `${t('editor.createPost')}— ${siteName}`
  })
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  console.log(items)

  const getId = () => Math.random().toString(36)

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
        body: ''
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
      <input placeholder={t('editor.title')} />

      {items.map((item, index) => (
        <div className="item" key={item.id}>
          <div>
            {item.type === 'text' && (
              <Text
                html={item.body}
                setHtml={html => {
                  changeItem({
                    ...item,
                    body: html.replace(/(<\/?(?:a|b|i)[^>]*>)|<[^>]+>/gi, '$1')
                  })
                }}
                onBlur={console.log}
              />
            )}

            {item.type === 'image' && (
              <Image
                item={item}
                setImage={image =>
                  changeItem({
                    ...item,
                    body: image
                  })
                }
              />
            )}

            {item.type === 'video' && (
              <Video
                item={item}
                setVideo={video =>
                  changeItem({
                    ...item,
                    body: video
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
          onClick={() => {}}
          // aria-busy={loading}
        >
          {t('editor.publish')}
        </button>
      </div>
    </div>
  )
}

export default Editor
