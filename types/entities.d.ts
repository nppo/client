export interface Party {
  id: number
  name: string
  description: string
}

export interface Person {
  id: number
  firstName: string
  lastName: string
  email: string
  function: string
  phone: string
}

export interface Product {
  id: number
  title: string
  description: string
  image: string
}

export interface Project {
  id: number
  title: string
  description: string
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
