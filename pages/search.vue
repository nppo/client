<template>
  <div>
    <div class="grid grid-cols-4 gap-4 p-6">
      <div />
      <div class="col-span-3">
        <SearchBar
          name="main"
          variant="main"
          :value.sync="searchString"
          @click="search()"
        />

        <div v-if="loading">
          <SearchSkeleton />
        </div>
        <div v-else>
          <div v-if="products.length > 0">
            <h1 class="mb-3 text-2xl">Producten</h1>
            <div class="grid grid-cols-3 gap-4">
              <div v-for="product in products" :key="product.id">
                <div class="flex flex-col">
                  <span class="mb-3">{{ product.title }}</span>
                  {{ product.description }}
                </div>
              </div>
            </div>
          </div>

          <div v-else>{{ $t('pages.search.no_results') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SearchPage extends Vue {
  private searchString: string = ''
  private loading: boolean = false

  get products() {
    return this.$accessor.search.current
  }

  async search() {
    this.loading = true

    if (this.searchString) {
      this.$store.commit('search/setCurrent', this.searchString)

      await this.$accessor.search.result(this.searchString)
    }

    this.loading = false
  }

  mounted() {
    if (this.$route.query.query) {
      this.searchString = this.$route.query.query.toString()
    }
  }
}
</script>
