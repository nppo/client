import { Context } from '@nuxt/types'

export default function ({ $accessor }: Context) {
  $accessor.user.setPermissions()
  $accessor.likes.fetchAll()
}
