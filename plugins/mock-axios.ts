import { Plugin } from '@nuxt/types'
import mock from '../mocks/$mock'

const mockAxios: Plugin = (context) => {
  if (process.env.mockAxios === 'true') {
    mock(context.$axios)
  }
}

export default mockAxios
