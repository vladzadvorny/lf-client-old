import './Notification.scss'

import { useAppState } from '../state'

const Notification = () => {
  const { notification } = useAppState()

  return (
    <div
      className="notification"
      style={{
        opacity: notification.value ? 1 : 0,
        maxHeight: notification.value ? 1000 : 0
      }}
    >
      <span>
        Hello world! Hello world! Hello world! Hello world! Hello world!
      </span>
      <span
        role="presentation"
        className="material-symbols-outlined"
        onClick={() => {
          notification.value = false
        }}
      >
        close
      </span>
    </div>
  )
}

export default Notification
