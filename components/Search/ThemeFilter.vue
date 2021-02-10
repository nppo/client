<template>
  <div ref="filterDropdown" class="flex flex-row">
    <div
      class="rounded-lg shadow-lg p-2 text-xs font-bold mr-4"
      @click="toggleFilter('theme')"
    >
      Thema
      <font-awesome-icon icon="arrow-down" class="ml-3" />
    </div>

    <div
      v-show="active"
      class="bg-white rounded-lg shadow-lg absolute right-0 mr-4 mt-12 w-64 h-64 p-4 overflow-y-scroll"
    >
      <ul v-for="theme in themes" :key="'theme_' + theme.id">
        <li class="search-filter">
          <input type="checkbox" :value="theme.id" @change="toggleTheme" />
          {{ theme.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ThemeFilter extends Vue {
  public active = false
  public selected = []

  get themes() {
    return this.$accessor.themes.all
  }

  toggleFilter() {
    this.active = !this.active
  }

  toggleTheme(e) {
    const indexOf = this.selected.indexOf(e.target.value)

    if (indexOf >= 0) {
      return this.selected.splice(indexOf, 1)
    }

    return this.selected.unshift(e.target.value)
  }

  onClick(event) {
    const onDropdownItem = event.target.classList.contains('search-filter')
    const onOutsideSelf = !this.$refs.filterDropdown.contains(event.target)

    if (onDropdownItem || onOutsideSelf) {
      this.active = false
    }
  }

  mounted() {
    document.addEventListener('click', this.onClick)

    if (this.themes.length <= 0) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
