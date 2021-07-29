<template>
  <div>
    <div class="flex flex-col w-6/12 space-y-40">
      Themes

      <div
        v-for="(theme, index) in themes"
        :key="index"
        class="my-6 overflow-y-auto"
      >
        {{ theme.label }}
      </div>

      <infinite-loading spinner="waveDots" @infinite="loadMore" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'
import { Theme } from '~/types/models'

@Component({
  components: {
    InfiniteLoading,
  },
  async asyncData({ $accessor }) {
    await $accessor.themes.index({})
  },
})
export default class ThemeIndexPage extends Vue {
  get themes(): Theme[] {
    return this.$accessor.themes.all.items
  }

  loadMore($state: any = null): void {
    const page = this.$accessor.themes.all.meta.current_page + 1

    this.$accessor.themes
      .index({
        mutation: 'allAppend',
        page,
      })
      .then(() => {
        if (
          this.$accessor.themes.all.meta.current_page >=
          this.$accessor.themes.all.meta.last_page
        ) {
          $state.complete()
          return
        }
        $state.loaded()
      })
  }
}
</script>
