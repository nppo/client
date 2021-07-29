<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.themes.index.heading') }}
          </h1>

          <CreateButton page="management/themes" />
        </div>

        <Table
          class="min-w-full"
          :is-loading="isLoading"
          :fields="fields"
          :default-sort-by="defaultSortBy"
          @sorted-by="handleSortedByEvent"
        >
          <template #bodyHeading>
            <tr>
              <th
                v-for="field in fields"
                :key="field.name"
                class="relative px-3 py-4 whitespace-nowrap"
              >
                <TextInput
                  v-if="field.inputType === 'text'"
                  :value="field.searchValue"
                  :name="
                    $t(
                      `pages.management.themes.index.table_fields.${field.name}`
                    )
                  "
                  type="search"
                  input-class="w-full px-5 py-3 placeholder-gray-200 border-gray-200 rounded"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
                <SelectInput
                  v-else-if="field.inputType === 'select'"
                  :value="field.searchValue"
                  :name="
                    $t(
                      `pages.management.themes.index.table_fields.${field.name}`
                    )
                  "
                  class="min-w-48"
                  :options="field.options"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
              </th>
            </tr>
          </template>

          <template #default>
            <tr
              v-for="(theme, index) in themes"
              :key="index"
              class="text-gray-500"
            >
              <Value>
                {{ theme.id }}
              </Value>

              <Value>
                {{ theme.label }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton :entity-id="theme.id" page="management/themes" />
                </div>
              </Value>
            </tr>
            <tr v-if="themes.length < 1">
              <td colspan="6" class="p-4 text-center">
                {{
                  $t('general.noResults', {
                    model: $t('pages.themes.index.heading'),
                  })
                }}
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { SortBy, TableField } from '~/types/entities'
import { Theme } from '~/types/models'
import { Models } from '~/types/enums'
import TableInteraction from '~/mixins/table-interaction'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Filter } from '~/types/repositories'

@Component({
  async asyncData({ $accessor }) {
    await $accessor.themes.index({})
  },
})
export default class ThemeIndexPage extends mixins(
  TableInteraction,
  NavigationRouterHook
) {
  public fields: TableField[] = [
    {
      name: 'id',
      searchValue: '',
      isSortable: true,
      inputType: Models.Text,
    },
    {
      name: 'label',
      searchValue: '',
      isSortable: true,
      inputType: Models.Text,
    },
    {
      name: null,
      searchValue: '',
      isSortable: false,
      inputType: null,
    },
  ].map((field) => ({
    ...field,
    label: String(
      field.name
        ? this.$t(`pages.management.themes.index.table_fields.${field.name}`)
        : ''
    ),
  }))

  get themes(): Theme[] {
    return this.$accessor.themes.all.items
  }

  fetchTableData(_params: {
    page: number
    filters?: Filter[]
    sortBy?: SortBy[]
  }): Promise<void> {
    return this.$accessor.themes
      .index({
        mutation: 'allSet',
        page: _params.page,
        filters: _params.filters,
        sorts: _params.sortBy,
      })
      .then(() => {})
  }
}
</script>
