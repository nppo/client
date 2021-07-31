<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.keywords.index.heading') }}
          </h1>
        </div>

        <KeywordForm :errors="errors" @submit="create" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import KeywordForm from '~/components/Keyword/KeywordForm.vue'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { ValidationErrors } from '~/types/repositories'
import { MetaAuthOptions } from '~/types/entities'
import permissions from '~/config/Permissions'
import { Keyword } from '~/types/models'

@Component({
  components: {
    KeywordForm,
  },
  middleware: ['auth', 'check-permissions'],

  meta: {
    auth: {
      requiredPermissions: [permissions.createKeyword],
    } as MetaAuthOptions,
  },
})
export default class KeywordCreatePage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  create(data: Object | FormData): void {
    this.$accessor.keywords
      .create({ data })
      .then((keyword: Keyword) => {
        const route = this.localeRoute({ name: 'management-keywords' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.create.success.title')),
          String(
            this.$t('modals.general.create.success.text', {
              entity: keyword.label,
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
