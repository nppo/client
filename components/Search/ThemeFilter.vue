<template>
  <Dropdown>
    <button
      slot="button"
      type="button"
      class="px-2 py-1 text-xs font-extrabold rounded-lg shadow cursor-pointer"
      @click="toggleFilter()"
    >
      {{ $t('entities.theme.singular') }}
      <font-awesome-icon icon="arrow-down" class="ml-3" />
    </button>

    <div slot="items" class="w-64">
      <ul>
        <li
          v-for="(theme, index) in themes"
          :key="'theme_' + theme.id"
          class="block py-2 mb-2 text-sm hover:font-bold"
          :class="{
            'border-b border-gray-100 hover:border-b-2 hover:border-yellow-brand':
              index < themes.length - 1,
          }"
        >
          <div class="mb-2">
            <input
              :id="theme.id"
              type="checkbox"
              class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
              :value="theme.id"
              :checked="isChecked(theme.id)"
              @change="toggleTheme(theme.id)"
            />
            <label class="cursor-pointer" :for="theme.id">
              {{ theme.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </Dropdown>
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

  get activeFilters() {
    return this.$accessor.search.filters
  }

  toggleFilter() {
    this.active = !this.active
  }

  isChecked(themeId: string) {
    return (
      this.activeFilters.themes &&
      this.activeFilters.themes.includes(String(themeId))
    )
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

  mounted() {
    if (this.themes.length < 1) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
