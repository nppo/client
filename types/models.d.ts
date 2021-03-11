/* eslint-disable no-use-before-define */
export interface Can {
  update: boolean
}

export interface Model {
  can?: Can
}

export interface Party extends Model {
  id: number
  name: string
  description: string
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
  phone: string
  about: string
  tags?: Tag[]
  parties?: Party[]
  products?: Product[]
  projects?: Project[]
  themes?: Theme[]
}

export interface Product extends Model {
  id: number
  title: string
  description: string
  image: string
  likes: string
  publishedAt: string
  themes?: Theme[]
  tags?: Tag[]
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
  createdAt: string
  owner?: Owner
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
}

export interface Permission extends Model {
  id: number
  name: string
}

export interface Role extends Model {
  id: number
  name: string
}
