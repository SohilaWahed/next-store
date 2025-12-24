import { Category } from './category';
import { Subcategory } from "./subcategory"

export interface ProductsI {
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
  id: string
}