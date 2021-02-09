import { MockMethods } from 'axios-mock-server'
import { Product } from '~/types/entities'

const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 2,
    title: 'Product 2',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 3,
    title: 'Product 3',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 4,
    title: 'Product 4',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 5,
    title: 'Product 5',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 6,
    title: 'Product 6',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 7,
    title: 'Product 7',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
  {
    id: 8,
    title: 'Product 8',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
  },
]

const mockMethods: MockMethods = {
  get() {
    return [200, { data: products }]
  },
}

export default mockMethods
