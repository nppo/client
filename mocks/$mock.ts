/* eslint-disable */
import { AxiosInstance } from 'axios'
import mockServer from 'axios-mock-server'
import mock0 from './products/index'

export default (client?: AxiosInstance) => mockServer([
  {
    path: '/products',
    methods: mock0
  }
], client, '')
