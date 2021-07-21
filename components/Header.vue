<template>
  <div class="relative">
    <img
      v-if="hasImage"
      :src="imageUrl ? imageUrl : require(`~/assets/img/${defaultImage}`)"
      class="absolute inset-0 object-cover w-full h-full"
    />

    <div
      class="relative inset-0 px-5 bg-blue-800 lg:px-0"
      :class="hasDarkHeader ? 'bg-opacity-90' : 'bg-opacity-50'"
    >
      <div class="container relative h-full mx-auto">
        <Navbar>
          <form
            v-if="hasSearchBar"
            class="flex justify-end flex-1 pr-24"
            @submit.prevent="handleSearchSubmit"
          >
            <SearchBar :value.sync="searchQuery" :resets-filters="true" />
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
  public defaultImage: string = 'header_bg.jpg'
  private searchQuery: string = ''

  @Prop({ type: Boolean, default: false }) readonly hasDarkHeader!: boolean
  @Prop({ type: Boolean, default: false }) readonly hasSearchBar!: boolean
  @Prop({ type: Boolean, default: true }) readonly hasImage!: boolean
  @Prop({ type: String, default: '' }) readonly imageUrl!: string

  handleSearchSubmit() {
    this.$router.push({
      path: this.localePath('/search'),
      query: { query: this.searchQuery },
    })
  }
}
</script>
