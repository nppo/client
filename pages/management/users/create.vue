<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.users.create.heading') }}
          </h1>
        </div>

        <UserForm :errors="errors" @submit="create" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import permissions from '~/config/Permissions'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions } from '~/types/entities'
import { ValidationErrors } from '~/types/repositories'
import 'sweetalert2/src/sweetalert2.scss'
import { User } from '~/types/models'

@Component({
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.createUser],
    } as MetaAuthOptions,
  },
})
export default class UserCreatePage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  create(data: Object | FormData): void {
    this.$accessor.users
      .create({ data })
      .then((user: User) => {
        const route = this.localeRoute({ name: 'management-users' })

        if (route) {
          this.$router.push(route)
        }

        Swal.fire(
          String(this.$t('general.actions.confirm.edit.success_title')),
          String(
            this.$t('general.actions.confirm.edit.success_text', {
              user: user.email,
            })
          ),
          'success'
        )
      })
      .catch((errors: ValidationErrors) => {
        this.errors = errors
      })
  }
}
</script>
