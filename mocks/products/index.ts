import { MockMethods } from 'axios-mock-server'
import { Product } from '~/types/entities'

const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 2,
    title: 'Product 2',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 3,
    title: 'Product 3',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: '',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 4,
    title: 'Product 4',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 5,
    title: 'Product 5',
    description:
      'Laboriosam quae temporibus ipsa edt dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 6,
    title: 'Product 6',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 7,
    title: 'Product 7',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: '',
    publishedAt: new Date().toDateString(),
  },
  {
    id: 8,
    title: 'Product 8',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    publishedAt: new Date().toDateString(),
  },
]

const mockMethods: MockMethods = {
  get() {
    return [200, { data: products }]
  },
}

export default mockMethods
