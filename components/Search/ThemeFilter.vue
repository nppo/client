<template>
  <Dropdown :is-active.sync="active">
    <template #button>
      <button
        type="button"
        class="flex items-center px-2 py-1 space-x-4 text-xs font-extrabold rounded-lg shadow cursor-pointer"
        @click="toggleFilter()"
      >
        <span>{{ $t('entities.theme.singular') }}</span>

        <DropdownArrows :active="active" />
      </button>
    </template>

    <template #items>
      <div class="w-64">
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
    </template>
  </Dropdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ThemeFilter extends Vue {
  public active: boolean = false
  public selected: Array<string> = []

  @Prop({ type: Array, required: true }) themes!: Array<any>

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
    const indexOf = this.selected.indexOf(String(id))

    if (indexOf >= 0) {
      this.selected.splice(indexOf, 1)
    } else {
      this.selected.unshift(String(id))
    }

    this.$emit('set-filters', 'themes', this.selected)
  }
}
</script>
