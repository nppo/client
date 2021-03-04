/* eslint-disable no-use-before-define */
export interface Party {
  id: number
  name: string
  description: string
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
}

export interface Tag {
  id: number
  label: string
}

export interface Theme {
  id: number
  label: string
}

export interface Person {
  id: number
  firstName: string
  lastName: string
  email: string
  function: string
  phone: string
  about: string
  tags?: Tag[]
}

export interface Product {
  id: number
  title: string
  description: string
  image: string
  likes: string
  publishedAt: string
  themes?: Theme[]
  tags?: Tag[]
}

export interface Owner {
  id: number
  firstName: string
  lastName: string
  email: string
  function: string
  phone: string
  about: string
  identifier: string
  tags?: Tag[]
}

export interface Project {
  id: number
  title: string
  purpose: string
  description: string
  likes: string
  createdAt: string
  owner?: Owner
  tags?: Tag[]
  themes?: Theme[]
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
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
