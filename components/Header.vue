<template>
  <div class="relative">
    <img
      src="~/assets/img/header_bg.jpg"
      alt=""
      class="absolute inset-0 object-cover w-full h-full"
    />

    <div class="relative inset-0 bg-blue-800 bg-opacity-50">
      <div class="container relative h-full mx-auto">
        <Navbar>
          <form
            v-if="hasSearchBar"
            class="flex justify-end flex-1 pr-24"
            @submit.prevent="handleSearchSubmit"
          >
            <SearchBar :value.sync="searchQuery" />
          </form>
        </Navbar>

        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class Header extends Vue {
  private searchQuery: string = ''

  @Prop({ type: Boolean, default: false }) readonly hasSearchBar!: boolean

  async handleSearchSubmit() {
    this.$router.push({
      path: 'search',
      query: { query: this.searchQuery },
    })
  }
}
</script>
