<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.tags.index.heading') }}
          </h1>

          <Badge
            v-if="$accessor.tags.all.meta.total"
            :text="`${$accessor.tags.all.meta.total}`"
            color="yellow-brand"
          />

          <CreateButton
            v-if="$gates.hasPermission($permissions.createTag)"
            page="management/tags"
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
                  :name="$t(`models.tag.labels.${field.name}`)"
                  type="search"
                  input-class="w-full px-5 py-3 placeholder-gray-200 border-gray-200 rounded"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
                <SelectInput
                  v-else-if="field.inputType === 'select'"
                  :value="field.searchValue"
                  :name="$t(`models.tag.labels.${field.name}`)"
                  class="min-w-48"
                  :options="field.options"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
              </th>
            </tr>
          </template>

          <template #default>
            <tr v-for="(tag, index) in tags" :key="index" class="text-gray-500">
              <Value>
                {{ tag.id }}
              </Value>

              <Value>
                {{ tag.label }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton
                    v-if="$gates.hasPermission($permissions.updateTag)"
                    :entity-id="tag.id"
                    page="management/tags"
                  />
                  <DeleteButton
                    v-if="$gates.hasPermission($permissions.deleteTag)"
                    @delete-entity="deleteEntity(tag)"
                  />
                </div>
              </Value>
            </tr>
            <tr v-if="tags.length < 1">
              <td colspan="6" class="p-4 text-center">
                {{
                  $t('general.noResults', {
                    model: $t('pages.tags.index.heading'),
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
import { Tag } from '~/types/models'
import { Models } from '~/types/enums'
import TableInteraction from '~/mixins/table-interaction'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Filter } from '~/types/repositories'

@Component({
  async asyncData({ $accessor }) {
    await $accessor.tags.index({})
  },
  middleware: ['auth'],
})
export default class TagIndexPage extends mixins(
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
    label: String(field.name ? this.$t(`models.tag.labels.${field.name}`) : ''),
  }))

  get tags(): Tag[] {
    return this.$accessor.tags.all.items
  }

  deleteEntity(tag: Tag): void {
    this.$accessor.tags
      .delete({ id: String(tag.id) })
      .then(() => {
        this.$swal.fire(
          String(this.$t('general.actions.confirm.delete.success_title')),
          String(
            this.$t('general.actions.confirm.delete.success_text', {
              entity: tag.label,
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
    return this.$accessor.tags
      .index({
        mutation: 'setAll',
        page: _params.page,
        filters: _params.filters,
        sorts: _params.sortBy,
      })
      .then(() => {})
  }
}
</script>
