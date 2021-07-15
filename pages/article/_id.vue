<template>
  <div class="flex-1 pb-24">
    <Header has-search-bar>
      <div class="flex items-center justify-between mt-8">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
      </div>
      <div class="pt-32 text-white">
        <h1 class="pb-6 text-4xl font-bold">
          {{ article.title }}
        </h1>
      </div>
    </Header>
    <div class="mb-12 border-b border-gray-200">
      <div class="container relative h-full mx-auto"></div>
    </div>
    <div class="container relative px-12 mx-auto">
      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-8/12"></div>
        <div class="w-4/12"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Article } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.articles.fetchShow(Number(id))
  },
})
export default class ArticleDetailPage extends mixins(NavigationRouterHook) {
  get article(): Article {
    return this.$accessor.articles.show
  }
}
</script>
