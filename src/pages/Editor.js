import { useHead } from 'hoofd/preact'
import { useState } from 'preact/hooks'

import './Editor.scss'

import { siteName } from '../constants/config'
import { useTranslate } from '../hooks/useTranslate'

const Editor = () => {
  const { t } = useTranslate()
  useHead({
    title: `${t('editor.editor')}— ${siteName}`
  })
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const getId = () => Math.random().toString(36)

  const addItem = item => setItems([...items, item])

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
      <input placeholder={t('editor.title')} />
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
    </div>
  )
}

export default Editor
