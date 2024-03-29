import './Notification.scss'

import { useAppState } from '../state'

const Notification = () => {
  const { notification } = useAppState()

  return (
    <div
      className="notification"
      style={{
        display: notification.value ? 'flex' : 'none'
        // opacity: notification.value ? 1 : 0,
        // maxHeight: notification.value ? 1000 : 0
      }}
    >
      <span>{notification}</span>
      <span
        role="presentation"
        className="material-symbols-outlined"
        onClick={() => {
          notification.value = null
        }}
      >
        close
      </span>
    </div>
  )
}

export default Notification
