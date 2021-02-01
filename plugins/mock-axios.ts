import { Plugin } from '@nuxt/types'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore: Cannot find module
import mock from '../mocks/$mock'

const mockAxios: Plugin = (context) => {
  if (process.env.mockAxios === 'true') {
    mock(context.$axios)
  }
}

export default mockAxios
