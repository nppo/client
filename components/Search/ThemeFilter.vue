<template>
  <Dropdown>
    <button
      slot="button"
      type="button"
      class="px-2 py-1 mr-4 text-xs font-extrabold rounded-lg shadow cursor-pointer"
      @click="toggleFilter()"
    >
      {{ t('entities.theme.singular') }}
      <font-awesome-icon icon="arrow-down" class="ml-3" />
    </button>

    <div slot="items" class="w-64">
      <ul v-for="(theme, index) in themes" :key="'theme_' + theme.id">
        <li class="block py-2 text-sm">
          <input
            type="checkbox"
            class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
            :value="theme.id"
            @change="toggleTheme(theme.id)"
          />
          {{ theme.label }}

          <hr v-if="index < themes.length - 1" class="mt-4 text-gray-100" />
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

  mounted() {
    if (this.themes.length < 1) {
      this.$accessor.themes.fetchAll()
    }
  }
}
</script>
