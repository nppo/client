import { MockMethods } from 'axios-mock-server'
import { Product } from '~/types/models'

const products: Product[] = [
  {
    id: 1,
    type: 'image',
    title: 'Product 1',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    likes: '8',
    publishedAt: new Date().toDateString(),
    themes: [],
    tags: [],
  },
  {
    id: 2,
    type: 'image',
    title: 'Product 2',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    likes: '8',
    publishedAt: new Date().toDateString(),
    themes: [],
    tags: [],
  },
  {
    id: 3,
    type: 'image',
    title: 'Product 3',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: '',
    likes: '8',
    publishedAt: new Date().toDateString(),
    themes: [],
    tags: [],
  },
  {
    id: 4,
    type: 'image',
    title: 'Product 4',
    description:
      'Laboriosam quae temporibus ipsa et dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    likes: '8',
    publishedAt: new Date().toDateString(),
    themes: [],
    tags: [],
  },
  {
    id: 5,
    type: 'image',
    title: 'Product 5',
    description:
      'Laboriosam quae temporibus ipsa edt dicta porro tempore qui. Sapiente quasi et et est. Occaecati qui eos pariatur sapiente reiciendis earum voluptatem.',
    image: 'https://picsum.photos/296/150',
    likes: '8',
    publishedAt: new Date().toDateString(),
    themes: [],
    tags: [],
  },
]

const mockMethods: MockMethods = {
  get() {
    return [200, { data: products }]
  },
}

export default mockMethods
