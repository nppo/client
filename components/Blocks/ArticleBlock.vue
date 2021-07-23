<template>
  <LocaleLink
    :path="`/article/${article.id}`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="relative">
      <img
        v-if="article.previewUrl"
        class="object-cover w-full h-32 mb-2"
        :src="article.previewUrl"
        alt="Article"
      />

      <div class="flex items-center justify-between">
        <span class="absolute top-0 left-0 m-4 mb-5 min-w-1/4">
          <Badge
            :text="$t('entities.article.singular')"
            icon-name="newspaper"
            icon-style="fas"
          />
        </span>
      </div>
    </div>

    <div class="flex justify-between px-4 text-tiny">
      <span>{{ createdAt }}</span>
    </div>

    <div class="flex flex-col p-4">
      <h4 class="mb-1 text-base break-all">
        {{ article.title }}
      </h4>

      <div class="text-gray-300 line-clamp-4">
        {{ article.summary }}
      </div>
    </div>

    <div class="flex justify-between px-4 pb-3 mt-auto">
      <div class="flex space-x-5">
        <div class="flex items-center space-x-1">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" class="text-base" />
          <span>{{ article.likes }}</span>
        </div>
        <div class="flex items-center space-x-1">
          <font-awesome-icon :icon="['fas', 'eye']" class="text-base" />
          <span>123</span>
        </div>
      </div>

      <span class="text-blue-500">
        <font-awesome-icon :icon="['far', 'bookmark']" class="text-base" />
      </span>
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Article } from '~/types/models'

@Component
export default class ArticleBlock extends Vue {
  @Prop({ type: Object, required: true }) readonly article!: Article

  get createdAt(): string {
    const date = this.$dayjs(this.article.createdAt)

    return date.locale(this.$i18n.locale).format('D MMM YYYY')
  }
}
</script>
