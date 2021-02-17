<template>
  <div
    class="flex flex-col h-auto bg-white rounded-md shadow-block overflow-hidden"
  >
    <div
      class="flex items-center justify-between px-4 py-3 cursor-pointer bg-blue-800"
      @click="toggleFilter()"
    >
      <span class="text-base text-white">{{ name }}</span>

      <div class="flex items-center">
        <span class="px-1 mr-4 text-xs font-bold rounded-sm bg-yellow-brand">
          {{ entity.length }}
        </span>

        <font-awesome-icon v-if="active" icon="minus" class="text-white" />
        <font-awesome-icon v-else icon="plus" class="text-white" />
      </div>
    </div>

    <div v-if="active || activeFilters.length > 0" class="p-4">
      <ul>
        <li
          v-for="item in entity"
          :key="'item_' + item.id"
          class="block text-sm"
        >
          <div class="mb-2">
            <input
              :id="item.id"
              type="checkbox"
              class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
              :value="item.id"
              :checked="isChecked(item.id)"
              @change="toggleItem(item.id)"
            />
            <label class="cursor-pointer" :for="item.id">
              {{ item.label }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CheckboxFilter extends Vue {
  public active: boolean = false
  public selected: Array<number> = []

  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: Array, required: true }) entity: any

  get activeFilters() {
    return this.$accessor.search.filters
  }

  toggleFilter() {
    this.active = !this.active
  }

  isChecked(id: number) {
    if (this.activeFilters.themes) {
      return this.activeFilters.themes.includes(Number(id))
    }
  }

  toggleItem(id: number) {
    const indexOf = this.selected.indexOf(id)

    if (indexOf >= 0) {
      this.selected.splice(indexOf, 1)
    } else {
      this.selected.unshift(id)
    }

    this.$emit('set-filters', 'items', this.selected)
  }
}
</script>
