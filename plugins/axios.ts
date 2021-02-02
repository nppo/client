import { Plugin } from '@nuxt/types'

const accessor: Plugin = ({ $axios, app, error }) => {
  const nuxtError = error
  $axios.onError((error) => {
    // We could expand this based on: https://github.com/axios/axios#handling-errors
    if (error.response) {
      if (error.response.status === 404) {
        nuxtError({ statusCode: 404, message: 'Page not found' })
      }
      if (error.response.status < 500) {
        return
      }
    }
    // This also triggers an error message when there was no response from the server at all (time-outs and such)
    app.$accessor.errors.setCurrent({ type: 'default', message: error.message })
  })
}

export default accessor
