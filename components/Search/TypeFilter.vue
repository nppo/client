<template>
  <Dropdown>
    <button
      slot="button"
      type="button"
      class="px-2 py-1 text-xs font-extrabold rounded-lg shadow cursor-pointer"
      @click="toggleFilter()"
    >
      {{ $t('entities.type.singular') }}
      <font-awesome-icon icon="arrow-down" class="ml-3" />
    </button>

    <div slot="items" class="w-64">
      <ul v-for="(type, index) in types" :key="'type_' + index">
        <li
          class="block py-2 mb-2 text-sm hover:font-bold"
          :class="{
            'border-b border-gray-100 hover:border-b-2 hover:border-yellow-brand':
              index < types.length - 1,
          }"
        >
          <div class="mb-2">
            <input
              :id="type.name"
              type="checkbox"
              class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
              :value="type.name"
              :checked="isChecked(type.name)"
              @change="toggleType(type.name)"
            />
            <label class="cursor-pointer" :for="type.name">
              {{ $t('entities.' + type.name + '.singular') }}
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
export default class TypeFilter extends Vue {
  public active: boolean = false
  public selected: Array<number> = []

  get types() {
    return this.$accessor.types.all
  }

  get activeFilters() {
    return this.$accessor.search.filters
  }

  toggleFilter() {
    this.active = !this.active
  }

  isChecked(type: string) {
    if (this.activeFilters.types) {
      return this.activeFilters.types.includes(String(type))
    }
  }

  toggleType(id: number) {
    const indexOf = this.selected.indexOf(id)

    if (indexOf >= 0) {
      this.selected.splice(indexOf, 1)
    } else {
      this.selected.unshift(id)
    }

    this.$emit('set-filters', 'types', this.selected)
  }

  mounted() {
    if (this.types.length < 1) {
      this.$accessor.types.fetchAll()
    }
  }
}
</script>
