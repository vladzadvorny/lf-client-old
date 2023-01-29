import { useState, useEffect } from 'preact/hooks'

import './Image.scss'
import { filesUri } from '../../constants/config'
import { useTranslate } from '../../hooks/useTranslate'
import { agent } from '../../utils/agent'

import Dropzone from './Dropzone'

const Image = ({ setImage, item }) => {
  const { t } = useTranslate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [path, setPath] = useState('')

  useEffect(() => {
    const { body } = item
    if (body.p) {
      setPath(body.p)
    }
  })

  const onDrop = async (acceptedFiles, rejectedFiles) => {
    setError(null)

    if (rejectedFiles.length) {
      setError('Максимальный размер файла 2mb, форматы: .jpg и .png!')
    } else {
      setLoading(true)
      const [file] = acceptedFiles

      const formData = new FormData()
      formData.append('file', file)

      const data = await agent('/upload', {
        // headers: {
        //   // 'Content-Type': false
        // },
        method: 'POST',
        body: formData
      })
      // const data = await res.json()

      console.log('data', data)

      if (data.error) {
        setError(data.error)
      } else {
        setImage({ p: data.filePath })
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
          className="dropzone"
          disableClick={loading}
        >
          {/* {loading ? <Loading absolute /> : <div>{t('dropzone')}</div>} */}
          {error && <span className="error-message">{error}</span>}
        </Dropzone>
      ) : (
        <img src={`${filesUri}${path}`} alt="" />
      )}
    </div>
  )
}

export default Image
