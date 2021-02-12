<template>
  <div class="bg-gray-brand-light flex flex-row flex-wrap justify-center">
    <div
      v-for="theme in themes"
      :key="'theme_shortcut_' + theme.id"
      class="rounded-md bg-green-300 px-3 py-1 m-1 text-xs font-extrabold cursor-pointer"
      @click="setFilter(theme.id)"
    >
      {{ theme.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FilterList extends Vue {
  setFilter(themeId: number) {
    this.$accessor.search.setFilter({ type: 'themes', values: [themeId] })

    const query = {
      filters: encodeURIComponent(JSON.stringify({ themes: [themeId] })),
    }

    this.$router.push({
      path: 'search',
      query,
    })
  }

  get themes() {
    return this.$accessor.themes.all
  }

  mounted() {
    if (!this.themes.length) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
