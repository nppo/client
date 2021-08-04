<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.users.index.heading') }}
          </h1>

          <CreateButton page="management/users" />
        </div>

        <Table
          class="min-w-full mb-6"
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
                      `pages.management.users.index.table_fields.${field.name}`
                    )
                  "
                  type="search"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
                <SelectInput
                  v-else-if="field.inputType === 'select'"
                  :value="field.searchValue"
                  :name="
                    $t(
                      `pages.management.users.index.table_fields.${field.name}`
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
            <tr v-for="user in users" :key="user.id" class="text-gray-700">
              <Value>
                {{ user.id }}
              </Value>

              <Value>
                {{ user.email }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton :entity-id="user.id" page="management/users" />
                  <DeleteButton @delete-entity="deleteEntity(user)" />
                </div>
              </Value>
            </tr>
            <tr v-if="users.length < 1">
              <td colspan="6" class="p-4 text-center">
                {{
                  $t('general.no_results', {
                    model: $t('pages.users.index.heading'),
                  })
                }}
              </td>
            </tr>
          </template>
        </Table>

        <Pagination
          v-if="
            $accessor.users.all.meta && $accessor.users.all.meta.last_page > 1
          "
          class="flex flex-wrap justify-center space-x-1"
          :current="$accessor.users.all.meta.current_page"
          :total="$accessor.users.all.meta.last_page"
          @changed="handlePaginationClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import NavigationRouterHook from '~/mixins/navigation-router-hook'
import TableInteraction from '~/mixins/table-interaction'
import { SortBy, TableField } from '~/types/entities'
import { Models } from '~/types/enums'

import 'sweetalert2/src/sweetalert2.scss'
import { User } from '~/types/models'
import { Filter } from '~/types/repositories'

@Component({
  middleware: ['auth'],
})
export default class ManagementPage extends mixins(
  NavigationRouterHook,
  TableInteraction
) {
  public fields: TableField[] = [
    {
      name: 'id',
      searchValue: '',
      isSortable: true,
      inputType: Models.Text,
    },
    {
      name: 'email',
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
      field.name ? this.$t(`models.user.labels.${field.name}`) : ''
    ),
  }))

  get users(): User[] {
    return this.$accessor.users.all.items
  }

  async fetchTableData(params: {
    page: number
    filters?: Filter[]
    sortBy?: SortBy[]
  }): Promise<void> {
    this.isLoading = true

    await this.$accessor.users.index({
      mutation: 'setAll',
      page: params.page,
      filters: params.filters,
      sorts: params.sortBy,
    })

    this.isLoading = false
  }

  deleteEntity(user: User): void {
    this.$accessor.user
      .delete({ id: String(user.id) })
      .then(() => {
        this.$swal.fire(
          String(this.$t('modals.general.delete.success.title')),
          String(
            this.$t('modals.general.delete.success.text', {
              entity: user.email,
            })
          ),
          'success'
        )
      })
      .finally(() => {
        this.fetchTableData(this.getCurrentParams({}))
      })
  }
}
</script>
