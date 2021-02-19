<template>
  <div
    class="flex flex-col h-auto overflow-hidden bg-white rounded-md shadow-block"
  >
    <div
      class="flex items-center justify-between px-4 py-3 bg-blue-800 cursor-pointer"
      @click="toggleFilter()"
    >
      <span class="text-base text-white">
        {{ $t('filters.' + name + '.title') }}
      </span>

      <div class="flex items-center">
        <span class="px-1 mr-4 text-xs font-bold rounded-sm bg-yellow-brand">
          {{ entity.length }}
        </span>

        <font-awesome-icon v-if="active" icon="minus" class="text-white" />
        <font-awesome-icon v-else icon="plus" class="text-white" />
      </div>
    </div>

    <div v-if="active" class="p-4">
      <ul>
        <li
          v-for="item in entity"
          :key="'filter_' + name + '_' + item.id"
          class="flex items-center mb-2 text-sm"
        >
          <input
            :id="'filter_' + name + '_' + item.id"
            type="checkbox"
            class="w-4 h-4 mr-2 bg-gray-100 form-checkbox text-yellow-brand"
            :value="item.id"
            :checked="isChecked(item.id)"
            @change="toggleItem(item.id)"
          />
          <label
            class="flex-1 cursor-pointer"
            :for="'filter_' + name + '_' + item.id"
          >
            {{
              requiresTranslation
                ? $t('filters.' + name + '.labels.' + item.label)
                : item.label
            }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CheckboxFilter extends Vue {
  public active: boolean = true

  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: Array, required: true }) entity: any
  @Prop({ type: Boolean, default: false }) requiresTranslation: any

  get activeFilters() {
    return this.$accessor.search.filters
  }

  toggleFilter() {
    this.active = !this.active
  }

  isChecked(id: string) {
    return (
      this.activeFilters[this.name] &&
      this.activeFilters[this.name].includes(String(id))
    )
  }

  toggleItem(id: number) {
    this.$emit('toggle-filter', this.name, id.toString())
  }
}
</script>
