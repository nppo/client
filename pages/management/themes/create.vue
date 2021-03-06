<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.themes.create.heading') }}
          </h1>
        </div>

        <ThemeForm :errors="errors" @submit="create" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import ThemeForm from '~/components/Theme/ThemeForm.vue'
import permissions from '~/config/Permissions'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions } from '~/types/entities'
import { Theme } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ThemeForm,
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.createTheme],
    } as MetaAuthOptions,
  },
})
export default class ThemeCreatePage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  create(data: Object | FormData): void {
    this.$accessor.themes
      .create({ data })
      .then((theme: Theme) => {
        const route = this.localeRoute({ name: 'management-themes' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.create.success.title')),
          String(
            this.$t('modals.general.create.success.text', {
              entity: theme.label,
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
