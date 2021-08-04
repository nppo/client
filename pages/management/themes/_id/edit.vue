<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.themes._id.edit.heading') }}
          </h1>
        </div>

        <ThemeForm :errors="errors" :theme="theme" @submit="update" />
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
  async asyncData({ params, $accessor }) {
    await $accessor.themes.fetch({ id: params.id })
  },
  components: {
    ThemeForm,
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.updateTheme],
    } as MetaAuthOptions,
  },
})
export default class ThemeEditPage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  get theme(): Theme {
    return this.$accessor.themes.show
  }

  update(data: Object | FormData): void {
    this.$accessor.themes
      .update({ id: String(this.theme.id), data })
      .then((theme: Theme) => {
        const route = this.localeRoute({ name: 'management-themes' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.edit.success.title')),
          String(
            this.$t('modals.general.edit.success.text', {
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
