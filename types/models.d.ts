import { MetaData, ProductLinks } from './entities'

/* eslint-disable no-use-before-define */
export interface Can {
  update?: boolean
}

export interface Model {
  can?: Can
}

export interface Party extends Model {
  id: number
  name: string
  description: string
  partyPictureUrl: string
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
}

export interface Tag extends Model {
  id: number
  label: string
}

export interface Theme extends Model {
  id: number
  label: string
}

export interface Person extends Model {
  id: number
  identifier: string
  firstName: string
  lastName: string
  email: string
  function: string
  profilePictureUrl: string
  phone: string
  about: string
  skills?: Tag[]
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
  themes?: Theme[]
  meta?: MetaData[]
}

export interface Product extends Model {
  id: number
  type: string
  title: string
  summary: string
  description: string
  image: string
  likes: string
  publishedAt: string
  owner?: Owner
  themes?: Theme[]
  parties?: Party[]
  people?: Person[]
  tags?: Tag[]
  links?: ProductLinks
  meta?: MetaData[]
  children?: Product[]
  parents?: Product[]
  projects?: Project[]
}

export interface Owner extends Model {
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

export interface Project extends Model {
  id: number
  title: string
  purpose: string
  description: string
  likes: string
  projectPictureUrl: string
  createdAt: string
  owner?: Owner
  meta?: MetaData[]
  tags?: Tag[]
  themes?: Theme[]
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
}

export interface User extends Model {
  id: number
  email: string
  permissions?: Permission[]
  roles?: Role[]
  person?: Person
}

export interface Permission extends Model {
  id: number
  name: string
}

export interface Role extends Model {
  id: number
  name: string
}

export interface Article extends Model {
  title: string
  tags?: Tag[]
  themes?: Theme[]
  content: Array<object>
  header: StrapiMedia[]
  summary: string
  previewUrl: string
  createdAt: string
}

export interface StrapiMedia {
  url: string
}

export interface Like extends Model {
  userId: number
  likedProducts: Product[]
  likedProjects: Project[]
  likedPeople: Person[]
  likedParties: Party[]
}
