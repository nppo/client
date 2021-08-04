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

    <div class="pt-5 pb-5 mb-12 border-b border-gray-200">
      <div class="container relative h-full mx-auto">
        <div class="flex items-center justify-end">
          <Badge
            v-if="showLikeButton"
            :icon-name="hasLiked ? 'minus' : 'bookmark'"
            :icon-style="hasLiked ? 'fas' : 'far'"
            :text="
              hasLiked
                ? $t('pages.product._id.actions.bookmarked')
                : $t('pages.product._id.actions.bookmark')
            "
            text-color="white"
            color="blue-500"
            tag="button"
            :class="{ 'animate-pulse': toggleLikeLoading }"
            :disabled="toggleLikeLoading"
            type="button"
            @click="toggleLike()"
          />
        </div>
      </div>
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
        <div class="w-4/12">
          <div v-if="article.projects.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.article._id.headings.related_projects') }}
            </h3>

            <ProjectsList :projects="article.projects" />
          </div>
          <div v-if="article.products.length > 0">
            <h3 class="mb-5 text-2xl font-bold">
              {{ $t('pages.article._id.headings.related_products') }}
            </h3>

            <ParentsList :parents="article.products" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Models } from '~/types/enums'
import { Article } from '~/types/models'

@Component({
  async asyncData({ params, $accessor }: Context) {
    const { id } = params

    await $accessor.articles.fetchShow(id)
  },
})
export default class ArticleDetailPage extends mixins(NavigationRouterHook) {
  public toggleLikeLoading: boolean = false

  get article(): Article {
    return this.$accessor.articles.show
  }

  get headerImage(): string | null {
    return this.article.header.length > 0 ? this.article.header[0].url : null
  }

  get hasLiked() {
    return this.$accessor.likes.hasArticle(this.article.id)
  }

  get showLikeButton(): boolean {
    return this.$auth.loggedIn
  }

  async toggleLike() {
    this.toggleLikeLoading = true
    await this.$accessor.likes.store({
      likableType: Models.article,
      likableId: this.article.id,
    })
    this.toggleLikeLoading = false
  }
}
</script>
