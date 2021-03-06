import { Article, Party, Person, Product, Project } from './models'
import { Models } from './enums'

/* eslint-disable no-use-before-define */
export interface Skill {
  id: string
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

export interface SearchResultItem<T> {
  items: Array<T>
  nextCursor: string | null | false
}

export interface Search {
  results: number
  parties?: SearchResultItem<Party>
  people?: SearchResultItem<Person>
  products?: SearchResultItem<Product>
  projects?: SearchResultItem<Project>
  articles?: SearchResultItem<Article>
  filters?: Filter[]
}

export interface Discover {
  results: number
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
  articles?: Article[]
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
  on?: object
}

export interface Error {
  message: string
  statusCode: number
}

export interface ProductLinks {
  preview: string | null
}

export interface IconSetting {
  type: string
  icon: string
  style: string
}

export interface MetaData {
  id: number
  label: string
  value: any
}

export interface TextComponent {
  text: string
  component: string
}
export interface SliderComponent {
  images: [{ url: string }]
  component: string
}

export interface ImageComponent {
  image: { url: string }
  component: string
}
export interface PartyComponent {
  identifier: string
  component: string
}
export interface ProductComponent {
  identifier: string
  component: string
}
export interface ProjectComponent {
  identifier: string
  component: string
}
export interface PersonComponent {
  identifier: string
  component: string
}

export interface MetaAuthOptions {
  requiredPermissions?: string[]
}

export interface TableField {
  label: string
  name: string | null
  searchValue: string | { value: string }
  isSortable: boolean
  inputType: Models | null
  options?: { label: string; value: string | null }[]
}

export type SortByDirection = 'asc' | 'desc' | null

export interface SortBy {
  field: string
  direction: SortByDirection
}
