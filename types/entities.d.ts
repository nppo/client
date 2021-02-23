export interface Party {
  id: number
}

export interface Person {
  id: number
}

export interface Product {
  id: number
  title: string
  description: string
  image: string
  publishedAt: string
}

export interface Project {
  id: number
}

export interface Theme {
  id: number
  label: string
}

export interface Filter {
  type: string
  values: any[]
}

export interface ErrorMessage {
  type: string
  message: string
}

export interface Search {
  results: number
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
  filters?: Filter[]
}

export interface Type {
  id: number
  label: string
}
