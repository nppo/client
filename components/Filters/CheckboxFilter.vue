<template>
  <div
    class="flex flex-col h-auto bg-white rounded-md shadow-block overflow-hidden"
  >
    <div class="flex items-center justify-between px-4 py-3 bg-blue-800">
      <span class="text-base text-white">Thema</span>

      <div class="flex items-center">
        <span class="px-1 mr-4 text-xs font-bold rounded-sm bg-yellow-brand">
          {{ themes.length }}
        </span>
        <font-awesome-icon icon="minus" class="text-white" />
      </div>
    </div>

    <div class="p-4">
      <ul>
        <li
          v-for="theme in themes"
          :key="'theme_' + theme.id"
          class="block text-sm"
        >
          <div class="mb-2">
            <input
              :id="theme.id"
              type="checkbox"
              class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
              :value="theme.id"
              @change="toggleTheme(theme.id)"
            />
            <label class="cursor-pointer" :for="theme.id">
              {{ theme.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class CheckboxFilter extends Vue {
  public active: boolean = false
  public filters = JSON.parse(<string>localStorage.getItem('currentFilters'))
  public selected = this.filters
    ? (this.filters.values as any)
    : ([] as any)

  get themes() {
    return this.$accessor.themes.all
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
