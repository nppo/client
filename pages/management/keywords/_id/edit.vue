<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.keywords._id.edit.heading') }}
          </h1>
        </div>

        <KeywordForm :errors="errors" :keyword="keyword" @submit="update" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import KeywordForm from '~/components/Keyword/KeywordForm.vue'
import permissions from '~/config/Permissions'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions } from '~/types/entities'
import { Keyword } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  async asyncData({ params, $accessor }) {
    await $accessor.keywords.fetch({ id: params.id })
  },
  components: {
    KeywordForm,
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.updateKeyword],
    } as MetaAuthOptions,
  },
})
export default class KeywordEditPage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  get keyword(): Keyword {
    return this.$accessor.keywords.show
  }

  update(data: Object | FormData): void {
    this.$accessor.keywords
      .update({ id: String(this.keyword.id), data })
      .then((keyword: Keyword) => {
        const route = this.localeRoute({ name: 'management-keywords' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.edit.success.title')),
          String(
            this.$t('modals.general.edit.success.text', {
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
