import { Party, Person, Product, Project } from './models'

/* eslint-disable no-use-before-define */
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

export interface Discover {
  results: number
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
}

export interface Type {
  id: number
  label: string
}

export interface ProductTypeButton {
  iconName: string
  iconStyle: string
  text: string
  textColor?: string
  color?: string
}

export interface Error {
  message: string
  statusCode: number
}
