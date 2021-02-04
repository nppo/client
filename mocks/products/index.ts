import { MockMethods } from 'axios-mock-server'
import { Product } from '~/types/entities'

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
  },
  {
    id: 2,
    name: 'Product 2',
  },
  {
    id: 3,
    name: 'Product 3',
  },
  {
    id: 4,
    name: 'Product 4',
  },
  {
    id: 5,
    name: 'Product 5',
  },
  {
    id: 6,
    name: 'Product 6',
  },
  {
    id: 7,
    name: 'Product 7',
  },
  {
    id: 8,
    name: 'Product 8',
  },
]

const mockMethods: MockMethods = {
  get() {
    return [200, { data: products }]
  },
}

export default mockMethods
