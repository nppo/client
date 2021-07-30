import { Component, Vue } from 'nuxt-property-decorator'
import { Debounce } from 'vue-debounce-decorator'
import { SortBy, TableField } from '~/types/entities'
import { Filter } from '~/types/repositories'

@Component
export default class TableInteraction extends Vue {
  protected isLoading: boolean = false
  public currentPage: number = 1
  public sortBy: SortBy = { ...this.defaultSortBy }
  public fields: TableField[] = []
  public currentFilters: Filter[] = []

  async handleSortedByEvent(sortBy: SortBy): Promise<void> {
    this.isLoading = true

    await this.fetchTableData(this.getCurrentParams({ sortBy }))

    this.sortBy = sortBy
    this.isLoading = false
  }

  async handlePaginationClick(page: number): Promise<void> {
    this.isLoading = true

    await this.fetchTableData(this.getCurrentParams({ page }))

    this.currentPage = page
    this.isLoading = false
  }

  @Debounce(500)
  handleHeaderInputChanged(field: any, value: string | { value: string }) {
    this.changeHeaderInput(field, value)
  }

  async changeHeaderInput(
    field: any,
    value: string | { value: string }
  ): Promise<void> {
    const currentField = this.fields.find(({ name }) => name === field)

    if (!currentField) return

    this.changeFilter(field, value)

    this.isLoading = true

    await this.fetchTableData(
      this.getCurrentParams({ filters: this.currentFilters })
    )

    this.isLoading = false
  }

  changeFilter(key: any, value: string | { value: string }): void {
    if (typeof value === 'object' && value !== null) {
      value = value.value
    }

    const index = this.currentFilters.findIndex(
      ({ key: filterField }) => key === filterField
    )

    if (index === -1) {
      this.currentFilters.push({
        key,
        value,
      })
    } else if (value !== '') {
      Vue.set(this.currentFilters, index, {
        ...this.currentFilters[index],
        value,
      })
    } else {
      this.currentFilters.splice(index, 1)
    }
  }

  get defaultSortBy(): SortBy {
    return {
      field: this.fields?.[0].name || '',
      direction: 'asc',
    }
  }

  getSortByArray(sortBy: SortBy): SortBy[] {
    if (
      sortBy.field === this.defaultSortBy.field &&
      sortBy.direction !== this.defaultSortBy.direction
    ) {
      return [sortBy]
    }

    return sortBy.field === this.defaultSortBy.field
      ? [this.defaultSortBy]
      : [sortBy, this.defaultSortBy]
  }

  @Debounce(500)
  async fetchTableData(_params: {
    page: number
    sortBy?: SortBy[]
    filters?: Filter[]
  }): Promise<void> {}

  getCurrentParams({
    page = this.currentPage,
    sortBy = this.sortBy,
    filters = this.currentFilters,
  }) {
    return {
      page,
      sortBy: this.getSortByArray(sortBy),
      filters,
    }
  }

  created(): void {
    if (!this.fields.length) {
      throw new Error('No table fields set')
    }
  }

  beforeMount(): void {
    this.fetchTableData(this.getCurrentParams({}))
  }
}
