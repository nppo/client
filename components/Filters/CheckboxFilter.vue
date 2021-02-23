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
          v-for="item in sortedEntity"
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

      <div v-if="entity.length > maxFilters" class="block text-center mt-3">
        <span class="underline text-blue-400" @click="showingAll = !showingAll">
          {{
            showingAll
              ? $t('filters.show_less')
              : $t('filters.show_more', { number: showMoreNumber })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class CheckboxFilter extends Vue {
  public active: boolean = true
  public showingAll: boolean = false
  public maxFilters: number = 5
  public checkedFilters: number = 0

  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: Array, required: true }) entity!: Array<any>
  @Prop({ type: Boolean, default: false }) requiresTranslation!: boolean

  get activeFilters() {
    return this.$accessor.search.filters
  }

  get sortedEntity(): Array<any> {
    let visibleAmount
    this.checkedFilters = 0

    const sorted = [...this.entity].sort((entity: any) => {
      return this.isChecked(entity.id) ? -1 : 1
    })

    sorted.forEach((entity: any) => {
      if (this.isChecked(entity.id)) {
        this.checkedFilters++
      }
    })

    if (this.showingAll) {
      visibleAmount = this.entity.length
    } else if (this.checkedFilters > 0) {
      visibleAmount =
        this.checkedFilters > this.maxFilters
          ? this.checkedFilters
          : this.maxFilters
    } else {
      visibleAmount = this.maxFilters
    }

    return sorted.slice(0, visibleAmount)
  }

  get showMoreNumber(): number {
    if (this.checkedFilters > this.maxFilters) {
      return this.entity.length - this.checkedFilters
    }

    return this.entity.length - this.maxFilters
  }

  toggleFilter(): void {
    this.active = !this.active
  }

  isChecked(id: string): boolean {
    return (
      this.activeFilters[this.name] &&
      this.activeFilters[this.name].includes(String(id))
    )
  }

  toggleItem(id: number): void {
    this.$emit('toggle-filter', this.name, id.toString())
  }
}
</script>
