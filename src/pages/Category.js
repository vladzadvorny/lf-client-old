import { useLoaderData } from 'react-router-dom'

import './Category.scss'

const Category = () => {
  const { name, page } = useLoaderData()

  return <div className="container category-page">Category {name}  {page}</div>
}

export async function loader({params}) {
  // const response = await fetch(`https://animechan.vercel.app/api/quotes`)
  // const data = await response.json()

  return { name : params.name , page: params.page}
}

export default Category
