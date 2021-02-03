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
]

const mockMethods: MockMethods = {
  get() {
    return [200, { data: products }]
  },
}

export default mockMethods
