<template>
  <div ref="filterDropdown" class="flex flex-row">
    <div
      class="rounded-lg shadow-input px-2 py-1 text-xs font-extrabold mr-4 cursor-pointer"
      @click="toggleFilter()"
    >
      Thema
      <font-awesome-icon icon="arrow-down" class="ml-3" />
    </div>

    <div
      v-show="active"
      class="search-filter bg-white rounded-lg shadow-input absolute right-0 mr-4 mt-8 w-64 h-64 p-4 overflow-y-scroll"
    >
      <ul v-for="(theme, index) in themes" :key="'theme_' + theme.id">
        <li class="block py-2 text-sm">
          <input
            type="checkbox"
            class="form-checkbox mr-2 text-yellow-brand w-4 h-4 bg-gray-100"
            :value="theme.id"
            @change="toggleTheme(theme.id)"
          />
          {{ theme.label }}

          <hr v-if="index < themes.length - 1" class="mt-4 text-gray-100" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ThemeFilter extends Vue {
  public active: boolean = false
  public selected: Array<number> = []

  get themes() {
    return this.$accessor.themes.all
  }

  toggleFilter() {
    this.active = !this.active
  }

  toggleTheme(id: number) {
    const indexOf = this.selected.indexOf(id)

    if (indexOf >= 0) {
      this.selected.splice(indexOf, 1)
    } else {
      this.selected.unshift(id)
    }

    this.$emit('set-filters', 'themes', this.selected)
  }

  onClick(event: Event) {
    const target = event.target as HTMLBaseElement
    const ref = this.$refs.filterDropdown as HTMLBaseElement
    const onDropdownItem = target.classList.contains('search-filter')
    const onOutsideSelf = ref ? !ref.contains(target) : false

    if (onDropdownItem || onOutsideSelf) {
      this.active = false
    }
  }

  mounted() {
    document.addEventListener('click', this.onClick)

    if (this.themes.length < 1) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
