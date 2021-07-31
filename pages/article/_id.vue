<template>
  <div class="flex-1 pb-24">
    <Header has-search-bar :image-url="headerImage">
      <div class="flex items-center justify-between mt-8">
        <BackButton :has-navigated-internal="hasNavigatedInternal" />
      </div>
      <div class="pt-48 text-white">
        <h1 class="pb-12 text-4xl font-bold">
          {{ article.title }}
        </h1>
      </div>
    </Header>
    <div class="mb-12 border-b border-gray-200">
      <div class="container relative h-full mx-auto"></div>
    </div>
    <div class="container relative mx-auto">
      <div class="flex justify-between space-x-32 mt-18">
        <div class="w-8/12">
          <ContentPart
            v-for="(part, index) in article.content"
            :key="index"
            :data="part"
            class="mb-18"
          />
          <div v-if="article.keywords && article.keywords.length > 0">
            <h2 class="mb-3 text-2xl font-bold">
              {{ $t('pages.article._id.headings.keywords') }}
            </h2>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="keyword in article.keywords"
                :key="'article_keyword_' + keyword.id"
                :text="keyword.label"
                class="mb-2 mr-2"
              />
            </div>
          </div>
          <div v-if="article.themes && article.themes.length > 0">
            <h2 class="mb-3 text-2xl font-bold">
              {{ $t('pages.article._id.headings.themes') }}
            </h2>

            <div class="flex flex-wrap mb-8">
              <Badge
                v-for="theme in article.themes"
                :key="'article_theme_' + theme.id"
                :text="theme.label"
                class="mb-2 mr-2"
              />
            </div>
          </div>
        </div>
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

    await $accessor.articles.fetchShow(id)
  },
})
export default class ArticleDetailPage extends mixins(NavigationRouterHook) {
  get article(): Article {
    return this.$accessor.articles.show
  }

  get headerImage(): string | null {
    return this.article.header.length > 0 ? this.article.header[0].url : null
  }
}
</script>
