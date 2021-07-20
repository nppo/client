import { Party, Person, Product, Project } from './models'

/* eslint-disable no-use-before-define */
export interface Skill {
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
  images: [
    { url: string }
  ]
  component: string
}

export interface ImageComponent {
  image: { url: string }
  component: string
}

export interface MetaAuthOptions {
  requiredPermissions?: string[]
}
