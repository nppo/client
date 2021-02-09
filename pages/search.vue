<template>
  <div>
    <div class="grid grid-cols-4 gap-4">
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
            <h2 class="text-3xl mb-3">Producten</h2>

            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="product in products"
                :key="product.id"
                class="bg-white rounded-md shadow-block overflow-hidden"
              >
                <div class="flex flex-col h-full">
                  <div class="relative">
                    <img
                      class="w-full mb-2"
                      src="https://picsum.photos/296/150"
                      alt="Product picture"
                    />

                    <div
                      class="flex items-center absolute top-0 left-0 px-2 py-1 m-5 min-w-1/4 font-bold rounded-md bg-green-300"
                    >
                      tag
                    </div>
                  </div>

                  <div class="flex justify-between px-4 text-tiny">
                    <span>21 sep 2020</span>

                    <span>Thema</span>
                  </div>

                  <div class="flex flex-col p-4">
                    <h4 class="text-base mb-1">{{ product.title }}</h4>

                    <div class="line-clamp-4 text-gray-300">
                      {{ product.description }}
                    </div>
                  </div>

                  <div class="flex justify-end px-4 pb-3 mt-auto">
                    <span class="text-blue-500">
                      <font-awesome-icon
                        :icon="['far', 'bookmark']"
                        class="text-base"
                      />
                    </span>
                  </div>
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
}
</script>
