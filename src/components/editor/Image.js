import { useState, useEffect } from 'preact/hooks'

import './Image.scss'

import { filesUri } from '../../constants/config'
import { useTranslate } from '../../hooks/useTranslate'
import { agent } from '../../utils/agent'
import { useAppState } from '../../state'

import Dropzone from './Dropzone'

const Image = ({ changeItem, item }) => {
  const { notification } = useAppState()
  const { t } = useTranslate()

  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState('')
  const [isOnDrag, setIsOnDrag] = useState(false)

  useEffect(() => {
    const { body } = item
    if (body.p) {
      setPath(body.p)
    }
  }, [item])

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
      notification.value =
        'Максимальный размер файла 5mb, форматы: .jpg и .png!'
    } else {
      setLoading(true)
      const [file] = acceptedFiles

      const formData = new FormData()
      formData.append('file', file)

      const data = await agent('/upload', {
        method: 'POST',
        body: formData
      })

      if (data.error) {
        notification.value = data.error.message
      } else {
        changeItem({ path: data.filePath, id: data.id })
        setPath(data.filePath)
      }
      setLoading(false)
    }
  }

  return (
    <div className="editor-image">
      {!path ? (
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={5 * 1024 * 1024}
          accept="image/jpeg, image/png, image/gif, image/webp"
          className={`dropzone${isOnDrag ? ' active' : ''}`}
          disableClick={loading}
          onDragEnter={() => setIsOnDrag(true)}
          onDragLeave={() => setIsOnDrag(false)}
        >
          {loading ? <div aria-busy /> : <div>{t('editor.dropzone')}</div>}
        </Dropzone>
      ) : (
        <img src={`${filesUri}${path}`} alt="" />
      )}
    </div>
  )
}

export default Image
