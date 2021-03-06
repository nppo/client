import { MetaData, ProductLinks } from './entities'

/* eslint-disable no-use-before-define */
export interface Can {
  update?: boolean
}

export interface Model {
  can?: Can
}

export interface Party extends Model {
  id: string
  name: string
  description: string
  partyPictureUrl: string
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
}

export interface Tag extends Model {
  id: string
  label: string
}

export interface Theme extends Tag {}
export interface Keyword extends Tag {}
export interface Skill extends Tag {}

export interface Person extends Model {
  id: string
  identifier: string
  firstName: string
  lastName: string
  email: string
  function: string
  profilePictureUrl: string
  phone: string
  about: string
  skills?: Skill[]
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
  themes?: Theme[]
  meta?: MetaData[]
}

export interface Product extends Model {
  id: string
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
  keywords?: Keyword[]
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
  keywords?: Keyword[]
}

export interface Project extends Model {
  id: string
  title: string
  purpose: string
  description: string
  likes: string
  projectPictureUrl: string
  createdAt: string
  owner?: Owner
  meta?: MetaData[]
  keywords?: Keyword[]
  themes?: Theme[]
  parties?: Party[]
  people?: Person[]
  products?: Product[]
  projects?: Project[]
}

export interface User extends Model {
  id: string
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
  id: string
  title: string
  keywords?: Keyword[]
  themes?: Theme[]
  content: Array<object>
  header: StrapiMedia[]
  summary: string
  previewUrl: string
  createdAt: string
  products?: Product[]
  projects?: Project[]
}

export interface StrapiMedia {
  url: string
}

export interface Like extends Model {
  userId: string
  likedProducts: Product[]
  likedProjects: Project[]
  likedPeople: Person[]
  likedParties: Party[]
  likedArticles: Article[]
}
