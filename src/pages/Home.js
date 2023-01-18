import './Home.scss'

import { useState } from '../state'

const Home = () => {
  const { hello } = useState()
  console.log('render')

  return (
    <div className="container home-page">
      <p>Count: {hello}</p>
      <button
        type="submit"
        onClick={() => {
          hello.value++
        }}
      >
        click me!
      </button>
    </div>
  )
}

export default Home
