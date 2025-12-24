import { Category } from "./category"
import { Subcategory } from "./subcategory"

export interface Whishlist {
  status: string
  count: number
  data: ITEMWHISH[]
}

export interface ITEMWHISH {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Category
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
  availableColors?: any[]
}
