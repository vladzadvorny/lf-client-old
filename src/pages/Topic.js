import { useLoaderData } from 'react-router-dom'

import './Topic.scss'

const Topic = () => {
  const { name } = useLoaderData()

  return <div className="container category-page">Topic {name}  </div>
}

export async function loader({params}) {

  return { name : params.name}
}

export default Topic
