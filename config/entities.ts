const filterTypes = {
  1: 'products',
  2: 'projects',
  3: 'people',
  4: 'parties',
  5: 'articles',
} as const

export default filterTypes

export type filterTypesValues = typeof filterTypes[keyof typeof filterTypes]
export type filterTypesKeys = keyof typeof filterTypes
