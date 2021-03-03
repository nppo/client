<template>
  <div
    class="flex overflow-hidden flex-col h-auto bg-white rounded-md shadow-block"
  >
    <div
      class="flex justify-between items-center py-3 px-4 bg-blue-800 cursor-pointer"
      @click="toggleFilter()"
    >
      <span class="text-base text-white">
        {{ $t('filters.' + name + '.title') }}
      </span>

      <div class="flex items-center">
        <span class="px-1 mr-4 text-xs font-bold rounded-sm bg-yellow-brand">
          {{ entities.length }}
        </span>

        <font-awesome-icon v-if="active" icon="minus" class="text-white" />
        <font-awesome-icon v-else icon="plus" class="text-white" />
      </div>
    </div>

    <div v-if="active" class="p-4">
      <ul>
        <li
          v-for="item in sortedEntities"
          :key="'filter_' + name + '_' + item.id"
          class="flex items-center mb-2 text-sm"
        >
          <input
            :id="'filter_' + name + '_' + item.id"
            type="checkbox"
            class="mr-2 w-4 h-4 bg-gray-100 form-checkbox text-yellow-brand"
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

      <div
        v-if="entities.length > maxFilters && checkedFilters < entities.length"
        class="block mt-3 text-center"
      >
        <span
          class="text-blue-400 underline cursor-pointer"
          @click="showingAll = !showingAll"
        >
          {{
            showingAll
              ? $t('general.show_less')
              : $t('general.show_more', { number: showMoreNumber })
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
  public checkedFilters: number = 0

  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: Array, required: true }) entities!: Array<any>
  @Prop({ type: Number, default: 5 }) maxFilters!: number
  @Prop({ type: Boolean, default: false }) requiresTranslation!: boolean

  get activeFilters() {
    return this.$accessor.search.filters
  }

  get sortedEntities(): Array<any> {
    const checkedFilters = [...this.entities]
      .filter((entity: any) => {
        return this.isChecked(entity.id)
      })
      .sort()

    const unCheckedFilters = [...this.entities]
      .filter((entity: any) => {
        return !this.isChecked(entity.id)
      })
      .sort()

    const sorted = checkedFilters.concat(unCheckedFilters)

    return sorted.slice(0, this.numberVisibleFilters)
  }

  get numberVisibleFilters(): number {
    if (this.showingAll) {
      return this.entities.length
    }

    if (this.checkedFilters > 0) {
      return this.checkedFilters > this.maxFilters
        ? this.checkedFilters
        : this.maxFilters
    }

    return this.maxFilters
  }

  get showMoreNumber(): number {
    if (this.checkedFilters > this.maxFilters) {
      return this.entities.length - this.checkedFilters
    }

    return this.entities.length - this.maxFilters
  }

  setCheckedFilters(): void {
    this.checkedFilters = 0

    this.entities.forEach((entity: any) => {
      if (this.isChecked(entity.id)) {
        this.checkedFilters++
      }
    })
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
    this.setCheckedFilters()
  }

  mounted() {
    this.setCheckedFilters()
  }
}
</script>
