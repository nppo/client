export interface Product {
  id: number
  title: string
  description: string
  image: string
}

export interface ErrorMessage {
  type: string
  message: string
}

export interface search extends Product {
  id: number
}
