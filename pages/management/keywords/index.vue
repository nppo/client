<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.keywords.index.heading') }}
          </h1>

          <Badge
            v-if="$accessor.keywords.all.meta.total"
            :text="`${$accessor.keywords.all.meta.total}`"
            color="yellow-brand"
          />

          <CreateButton
            v-if="$gates.hasPermission($permissions.createKeyword)"
            page="management/keywords"
          />
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
                  :name="$t(`models.keyword.labels.${field.name}`)"
                  type="search"
                  input-class="w-full px-5 py-3 placeholder-gray-200 border-gray-200 rounded"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
                <SelectInput
                  v-else-if="field.inputType === 'select'"
                  :value="field.searchValue"
                  :name="$t(`models.keyword.labels.${field.name}`)"
                  class="min-w-48"
                  :options="field.options"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
              </th>
            </tr>
          </template>

          <template #default>
            <tr
              v-for="(keyword, index) in keywords"
              :key="index"
              class="text-gray-500"
            >
              <Value>
                {{ keyword.id }}
              </Value>

              <Value>
                {{ keyword.label }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton
                    v-if="$gates.hasPermission($permissions.updateKeyword)"
                    :entity-id="keyword.id"
                    page="management/keywords"
                  />
                  <DeleteButton
                    v-if="$gates.hasPermission($permissions.deleteKeyword)"
                    @delete-entity="deleteEntity(keyword)"
                  />
                </div>
              </Value>
            </tr>
            <tr v-if="keywords.length < 1">
              <td colspan="6" class="p-4 text-center">
                {{
                  $t('general.noResults', {
                    model: $t('pages.keywords.index.heading'),
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
import { Keyword } from '~/types/models'
import { Models } from '~/types/enums'
import TableInteraction from '~/mixins/table-interaction'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Filter } from '~/types/repositories'

@Component({
  async asyncData({ $accessor }) {
    await $accessor.keywords.fetchIndex({})
  },
  middleware: ['auth'],
})
export default class KeywordIndexPage extends mixins(
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
      field.name ? this.$t(`models.keyword.labels.${field.name}`) : ''
    ),
  }))

  get keywords(): Keyword[] {
    return this.$accessor.keywords.all.items
  }

  deleteEntity(keyword: Keyword): void {
    this.$accessor.keywords
      .delete({ id: String(keyword.id) })
      .then(() => {
        this.$swal.fire(
          String(this.$t('general.actions.confirm.delete.success_title')),
          String(
            this.$t('general.actions.confirm.delete.success_text', {
              entity: keyword.label,
            })
          ),
          'success'
        )
      })
      .finally(() => {
        this.fetchTableData(this.getCurrentParams({}))
      })
  }

  fetchTableData(_params: {
    page: number
    filters?: Filter[]
    sortBy?: SortBy[]
  }): Promise<void> {
    return this.$accessor.keywords
      .fetchIndex({
        mutation: 'setAll',
        page: _params.page,
        filters: _params.filters,
        sorts: _params.sortBy,
      })
      .then(() => {})
  }
}
</script>
