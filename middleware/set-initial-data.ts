import { Context } from '@nuxt/types'

export default function ({ $accessor }: Context) {
  $accessor.user.setPermissions()

  if ($accessor.likes.all === null) {
    $accessor.likes.fetchAll()
  }
}
