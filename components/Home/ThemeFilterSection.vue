<template>
  <div class="container w-4/5 py-16 mx-auto lg:py-24">
    <div class="flex flex-col items-center">
      <h2 class="mb-12 text-3xl font-bold">
        {{ $t('pages.index.find_by_theme') }}
      </h2>

      <div class="flex flex-wrap justify-center">
        <div
          v-for="theme in themes"
          :key="'theme_shortcut_' + theme.id"
          class="px-3 py-1 m-1 text-xs font-extrabold bg-green-300 rounded-md cursor-pointer"
          @click="setFilter(theme.id)"
        >
          {{ theme.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import qs from 'qs'

@Component
export default class ThemeFilterSection extends Vue {
  @Prop({ type: Array, required: true }) themes!: Array<any>

  setFilter(themeId: number) {
    this.$accessor.search.setFilter({ type: 'themes', values: [themeId] })

    const query = {
      filters: qs.stringify({ themes: [themeId] }, { encode: false }),
    }

    this.$router.push({
      path: 'search',
      query,
    })
  }
}
</script>
