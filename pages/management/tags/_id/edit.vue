<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.tags._id.edit.heading') }}
          </h1>
        </div>

        <TagForm :errors="errors" :tag="tag" @submit="update" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import TagForm from '~/components/Tag/TagForm.vue'
import permissions from '~/config/Permissions'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions } from '~/types/entities'
import { Tag } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  async asyncData({ params, $accessor }) {
    await $accessor.tags.fetch({ id: params.id })
  },
  components: {
    TagForm,
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.updateTag],
    } as MetaAuthOptions,
  },
})
export default class TagEditPage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  get tag(): Tag {
    return this.$accessor.tags.show
  }

  update(data: Object | FormData): void {
    this.$accessor.tags
      .update({ id: String(this.tag.id), data })
      .then((tag: Tag) => {
        const route = this.localeRoute({ name: 'management-tags' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.edit.success.title')),
          String(
            this.$t('modals.general.edit.success.text', {
              entity: tag.label,
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
