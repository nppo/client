import { Context } from '@nuxt/types'

export default async function ({ $accessor }: Context) {
  await $accessor.user.fetchCurrent()
}
