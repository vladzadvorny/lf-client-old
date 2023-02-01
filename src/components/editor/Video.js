// eslint-disable-next-line no-unused-vars
import { Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import urlParser from 'js-video-url-parser/lib/base'
import 'js-video-url-parser/lib/provider/youtube'

import './Video.scss'

import YouTube from './Youtube'
import { useAppState } from '../../state'

const Video = ({ changeItem, item }) => {
  const { notification } = useAppState()
  const [url, setUrl] = useState('')
  const [video, setVideoState] = useState({})

  useEffect(() => {
    const { body } = item
    if (body.id) {
      setVideoState({ ...body })
    }
  }, [item])

  const onChange = value => {
    console.log(value)
    setVideoState({})
    const res = urlParser.parse(value)
    if (!res || res.mediaType === undefined || res.mediaType !== 'video') {
      notification.value = 'Такого видео не существует'
    } else {
      setVideoState(res)
      changeItem({
        id: res.id,
        provider: 'youtube'
      })
    }

    setUrl(value)
  }

  return (
    <div className="editor-video">
      {video.id === undefined ? (
        <div className="input">
          <span>Скопируй ссылку на видео и вставь сюда</span>
          <div>
            <input
              // {...(!!error && { ariaInvalid: true })}
              type="text"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              name="url"
              // onPaste={e => onChange(e.clipboardData.getData('Text'))}
              onInput={e => onChange(e.target.value)}
              value={url}
            />
            <div>
              <span
                role="presentation"
                className="material-symbols-outlined"
                onClick={() => {}}
              >
                content_copy
              </span>
            </div>
          </div>
        </div>
      ) : (
        <YouTube id={video.id} />
      )}
    </div>
  )
}

export default Video
