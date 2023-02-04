import { useEffect } from 'preact/hooks'
import { Router, route, Route } from 'preact-router'

import { useAppState } from './state'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Editor from './pages/Editor'
import Post from './pages/Post'

const Routes = ({ url }) => {
  return (
    <Router url={url}>
      {/* public routes */}
      <Home path="/" />
      <Post path="/post/:uri" />

      {/* these routes should only be accessible when the user IS NOT logged in */}
      <OnlyUnauthRoute path="/auth" component={() => <Auth />} />

      {/* these routes should only be accessible when the user IS logged in */}
      <PrivateRoute path="/editor" component={() => <Editor />} />
    </Router>
  )
}

const PrivateRoute = ({ path, component, ...rest }) => {
  const me = useAppState().me.value

  return me.id ? (
    <Route path={path} component={component} {...rest} />
  ) : (
    <Redirect to="/auth" />
  )
}

const OnlyUnauthRoute = ({ path, component, ...rest }) => {
  const me = useAppState().me.value

  return !me.id ? (
    <Route path={path} component={component} {...rest} />
  ) : (
    <Redirect to="/" />
  )
}

const Redirect = ({ to }) => {
  useEffect(() => setTimeout(() => route(to, true), 1), [])

  return null
}

export default Routes
