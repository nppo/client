<template>
  <table class="table-auto">
    <thead>
      <slot name="headings" v-bind="{ sortBy, currentSortBy }">
        <tr>
          <th
            v-for="field in fields"
            :key="field.name"
            scope="col"
            class="w-auto text-left"
            :class="{ 'px-6 py-3': !field.isSortable }"
          >
            <span
              v-if="!field.isSortable"
              class="text-sm font-medium text-gray-300"
            >
              {{ field.label }}
            </span>

            <button
              v-else
              type="button"
              class="flex items-center w-full px-6 py-3 text-sm focus:outline-none"
              :class="
                currentSortBy.field === field.name &&
                currentSortBy.direction !== null
                  ? 'font-semibold text-black'
                  : 'font-medium text-gray-300'
              "
              @click="sortBy(field.name)"
            >
              {{ field.label }}
              <font-awesome-icon
                v-if="
                  currentSortBy.field === field.name &&
                  currentSortBy.direction !== null
                "
                class="ml-2 text-4xl text-gray-200 fill-current"
                :class="{
                  'transform rotate-180': currentSortBy.direction === 'desc',
                }"
                icon="caret-down"
              />
            </button>
          </th>
        </tr>
      </slot>
    </thead>

    <tbody class="bg-white divide-y divide-gray-100 rounded-md shadow">
      <slot name="bodyHeading" />

      <slot
        v-if="isLoading"
        name="loadingPreview"
        :previewRows="previewRows"
        :previewColumns="previewColumns"
      >
        <tr v-for="row in previewRows" :key="row">
          <td v-for="col in previewColumns" :key="col" class="px-6 py-6">
            <div class="h-6 bg-gray-100 animate-pulse"></div>
          </td>
        </tr>
      </slot>

      <template v-else>
        <slot />
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SortBy, SortByDirection, TableField } from '~/types/entities'

@Component
export default class Table extends Vue {
  @Prop({ type: Boolean }) readonly isLoading: boolean = false
  @Prop({ type: Array, required: true }) readonly fields!: TableField[]
  @Prop({ type: Number, default: 15 }) readonly previewRows!: number
  @Prop({ type: Object }) readonly defaultSortBy!: SortBy

  private currentSortBy: SortBy = { ...this.defaultSortBy }

  get previewColumns(): number {
    return this.fields.length
  }

  getSortBy(newField: string): SortBy {
    const sortBy: SortBy = { ...this.currentSortBy }

    if (sortBy.field === newField) {
      sortBy.direction = this.getNewDirection(sortBy.direction)
    } else {
      sortBy.field = newField
      sortBy.direction = this.getNewDirection(null)
    }

    return sortBy.direction === null ? { ...this.defaultSortBy } : sortBy
  }

  getNewDirection(previous: SortByDirection): SortByDirection {
    if (previous === 'asc') {
      return 'desc'
    }

    if (previous === 'desc') {
      return null
    }

    return 'asc'
  }

  sortBy(field: string) {
    const sortBy = this.getSortBy(field)

    this.currentSortBy = sortBy
    this.$emit('sorted-by', sortBy)
  }
}
</script>
