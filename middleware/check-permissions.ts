import { Context } from '@nuxt/types'
import { MetaAuthOptions } from '~/types/entities'

export default function ({ error, $gates, route, app: { i18n } }: Context) {
  const permissions = getPermissionsFromAuthMeta(route.meta)

  if (!permissions.length) {
    throw new Error('No permissions set!')
  }

  if (
    permissions.every((permission: string) => $gates.hasPermission(permission))
  ) {
    return
  }

  return error({
    statusCode: 403,
    message: String(i18n.t('pages.error.403')),
  })
}

const getPermissionsFromAuthMeta = (meta: any): string[] => {
  if (!Array.isArray(meta) && !meta.length) {
    return []
  }

  // Last meta is current page component
  const currentMeta = [...meta].pop()

  return (currentMeta.auth as MetaAuthOptions)?.requiredPermissions || []
}
