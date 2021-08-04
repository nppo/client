import { Plugin } from '@nuxt/types'

const accessor: Plugin = ({ $axios, app, error, $swal }) => {
  const nuxtError = error

  $axios.onError((error) => {
    // We could expand this based on: https://github.com/axios/axios#handling-errors

    if (error.response) {
      if (error.response.status === 404) {
        nuxtError({ statusCode: 404, message: 'Page not found' })
      }

      if (error.response.status === 401) {
        $swal.fire(
          String(app.i18n.t('modals.general.unauthenticated.title')),
          String(app.i18n.t('modals.general.unauthenticated.text')),
          'error'
        )
      }

      if (error.response.status === 403) {
        $swal.fire(
          String(app.i18n.t('modals.general.unauthorized.title')),
          String(app.i18n.t('modals.general.unauthorized.text')),
          'error'
        )
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
