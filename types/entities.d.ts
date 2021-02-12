export interface Product {
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

export interface search extends Product {
  id: number
}
