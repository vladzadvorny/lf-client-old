import { useLoaderData } from 'react-router-dom'

import './Category.scss'

const Category = () => {
  const { data } = useLoaderData()

  return <div className="container category-page">Category</div>
}

export async function loader() {
  const response = await fetch(`https://animechan.vercel.app/api/quotes`)
  const data = await response.json()

  return { data }
}

export default Category
