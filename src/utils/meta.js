/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { isBrowser } from '../constants/config'

export const Context = createContext({})

// export const Consumer = Context.Consumer

export const MetaProvider = ({ children, context }) => {
  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useMeta = meta => {
  if (isBrowser && meta.title) {
    document.title = meta.title
  }

  if (isBrowser) return

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(Context)

  Object.keys(meta).forEach(key => {
    context[key] = meta[key]
  })
}

const getUniqueListBy = (arr, key) => [
  ...new Map(arr.map(item => [item[key], item])).values()
]

export const createTags = context => {
  const tags = []

  if (context.title) {
    tags.push(`<title>${context.title}</title>`)
  }

  if (context.meta) {
    const meta = getUniqueListBy(context.meta, 'name')
    meta.forEach(item =>
      tags.push(
        `<meta ${Object.keys(item)
          .map(key => `${key}="${item[key]}"`)
          .join(' ')}>`
      )
    )
  }

  return { tags: tags.join(''), ...(context.lang && { lang: context.lang }) }
}
