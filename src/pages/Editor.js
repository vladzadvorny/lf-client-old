import { useHead } from 'hoofd/preact'
import { useState, useContext } from 'preact/hooks'
import { TranslateContext } from '@denysvuika/preact-translate'

import './Editor.scss'

import { siteName } from '../constants/config'

const Editor = () => {
  const { setLang, t, lang } = useContext(TranslateContext)
  useHead({
    title: `— ${siteName}`
  })
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  const getId = () => Math.random().toString(36)

  // const addBoxItems = [
  //   {
  //     name: t('text'),
  //     Icon: FileAlt,
  //     item: {
  //       id: getId(),
  //       type: 'text',
  //       body: ''
  //     }
  //   },
  //   {
  //     name: t('image'),
  //     Icon: Image,
  //     item: {
  //       id: getId(),
  //       type: 'image',
  //       body: { id: '', path: '' }
  //     }
  //   },
  //   {
  //     name: t('video'),
  //     Icon: Video,
  //     item: {
  //       id: getId(),
  //       type: 'video',
  //       body: { id: '', provider: '' }
  //     }
  //   }
  // ]

  return (
    <div className="container editor-page">
      {t('editor.editor')}
      {/* <input placeholder={<Text id="editor.editor" />} /> */}
      <div>
        <button onClick={() => setLang('en')}>EN</button>
        <button onClick={() => setLang('ru')}>UA</button>
      </div>
    </div>
  )
}

export default Editor
