import { useHead, useLink } from 'hoofd/preact'

import './Home.scss'

import { useState } from '../state'

const Home = () => {
  const { hello } = useState()
  useHead({
    title: 'Welcome to hoofd | 💭',
    metas: [{ content: 'Jovi De Croock', name: 'description' }]
  })

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
      <input />
      <article>
        <header>Header</header>
        Body
        <footer>Footer</footer>
      </article>
      <form>
        <div className="grid">
          <label htmlFor="firstname">
            First name
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First name"
              required
            />
          </label>

          <label htmlFor="lastname">
            Last name
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last name"
              required
              aria-invalid
            />
          </label>
        </div>

        <label htmlFor="email">
          Email address
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
          />
        </label>

        <small>We ll never share your email with anyone else.</small>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Home
