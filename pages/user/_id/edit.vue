<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{
              $t('pages.management.users.edit.heading', {
                name: user.email,
              })
            }}
          </h1>
        </div>

        <UserForm v-if="user" :errors="errors" :user="user" @submit="update" />
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
import { User } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  async asyncData({ params, $accessor }) {
    await $accessor.user.fetch({ id: params.id })
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.updateUser],
    } as MetaAuthOptions,
  },
})
export default class UserEditPage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  get user(): User {
    return this.$accessor.user.show
  }

  update(data: Object | FormData): void {
    this.$accessor.user
      .update({ id: this.user.id, data })
      .then(() => {
        const route = this.localeRoute({ name: 'management-users' })

        if (route) {
          this.$router.push(route)
        }

        Swal.fire(
          String(this.$t('general.actions.confirm.edit.success_title')),
          String(
            this.$t('general.actions.confirm.edit.success_text', {
              user: this.user.email,
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
