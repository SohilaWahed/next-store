// ./products.ts
export interface ProductsI {
  _id: string
  title: string
  imageCover: string
  // add more fields if API returns them
}

// cart types
export interface CartResponse {
  status: string
  numOfCartItems: number
  cartId: string
  data: ItemI
}

export interface ItemI {
  _id: string
  cartOwner: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProduct {
  count: number
  _id: string
  product: ProductsI
  price: number
}
