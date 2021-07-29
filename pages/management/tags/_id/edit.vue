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

        <TagForm v-if="tag" :errors="errors" :tag="tag" @submit="update" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import TagForm from '~/components/Tag/TagForm.vue'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Tag } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  async asyncData({ params, $accessor }) {
    await $accessor.tags.fetch({ id: params.id })
  },
  components: {
    TagForm,
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
