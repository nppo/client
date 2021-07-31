<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.tags.index.heading') }}
          </h1>
        </div>

        <TagForm :errors="errors" @submit="create" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TagForm from '~/components/Tag/TagForm.vue'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { ValidationErrors } from '~/types/repositories'
import { MetaAuthOptions } from '~/types/entities'
import permissions from '~/config/Permissions'

@Component({
  components: {
    TagForm,
  },
  middleware: ['auth', 'check-permissions'],

  meta: {
    auth: {
      requiredPermissions: [permissions.createTag],
    } as MetaAuthOptions,
  },
})
export default class TagCreatePage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  create(data: Object | FormData): void {
    this.$accessor.tags
      .store({ data })
      .then(() => {
        const route = this.localeRoute({ name: 'management-tags' })

        if (route) {
          this.$router.push(route)
        }
      })
      .catch((errors: ValidationErrors) => {
        this.errors = errors
      })
  }
}
</script>
