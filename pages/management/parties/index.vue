<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.parties.index.heading') }}
          </h1>

          <Badge
            v-if="$accessor.parties.all.meta.total"
            :text="`${$accessor.parties.all.meta.total}`"
            color="yellow-brand"
          />

          <CreateButton
            v-if="$gates.hasPermission($permissions.createParty)"
            page="management/parties"
          />
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
                  :name="$t(`models.party.labels.${field.name}`)"
                  type="search"
                  input-class="w-full px-5 py-3 placeholder-gray-200 border-gray-200 rounded"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
                <SelectInput
                  v-else-if="field.inputType === 'select'"
                  :value="field.searchValue"
                  :name="$t(`models.party.labels.${field.name}`)"
                  class="min-w-48"
                  :options="field.options"
                  @update:value="handleHeaderInputChanged(field.name, $event)"
                />
              </th>
            </tr>
          </template>

          <template #default>
            <tr
              v-for="(party, index) in parties"
              :key="index"
              class="text-gray-700"
            >
              <Value class="text-center w-30">
                <img
                  v-if="party.partyPictureUrl"
                  class="inline w-10 h-10 mr-4 rounded-full"
                  :src="party.partyPictureUrl"
                  :alt="''"
                />
              </Value>

              <Value>
                {{ party.id }}
              </Value>

              <Value>
                {{ party.name }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton
                    v-if="$gates.hasPermission($permissions.updateParty)"
                    :entity-id="party.id"
                    page="management/parties"
                  />
                  <DeleteButton
                    v-if="$gates.hasPermission($permissions.deleteParty)"
                    @delete-entity="deleteEntity(party)"
                  />
                </div>
              </Value>
            </tr>
            <tr v-if="parties.length < 1">
              <td colspan="6" class="p-4 text-center">
                {{
                  $t('general.no_results', {
                    model: $t('pages.parties.index.heading'),
                  })
                }}
              </td>
            </tr>
          </template>
        </Table>

        <Pagination
          v-if="
            $accessor.parties.all.meta &&
            $accessor.parties.all.meta.last_page > 1
          "
          class="flex flex-wrap justify-center space-x-1"
          :current="$accessor.parties.all.meta.current_page"
          :total="$accessor.parties.all.meta.last_page"
          @changed="handlePaginationClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import { SortBy, TableField } from '~/types/entities'
import { Party } from '~/types/models'
import { Models } from '~/types/enums'
import TableInteraction from '~/mixins/table-interaction'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Filter } from '~/types/repositories'

@Component({
  async asyncData({ $accessor }) {
    await $accessor.parties.fetchIndex({})
  },
  middleware: ['auth'],
})
export default class PartyIndexPage extends mixins(
  TableInteraction,
  NavigationRouterHook
) {
  public fields: TableField[] = [
    {
      name: null,
      searchValue: '',
      isSortable: false,
      inputType: null,
    },
    {
      name: 'id',
      searchValue: '',
      isSortable: true,
      inputType: Models.Text,
    },
    {
      name: 'name',
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
      field.name ? this.$t(`models.party.labels.${field.name}`) : ''
    ),
  }))

  get parties(): Party[] {
    return this.$accessor.parties.all.items
  }

  async fetchTableData(params: {
    page: number
    filters?: Filter[]
    sortBy?: SortBy[]
  }): Promise<void> {
    this.isLoading = true

    await this.$accessor.parties.fetchIndex({
      mutation: 'setAll',
      page: params.page,
      filters: params.filters,
      sorts: params.sortBy,
    })

    this.isLoading = false
  }

  deleteEntity(party: Party): void {
    this.$accessor.parties
      .delete({ id: String(party.id) })
      .then(() => {
        this.$swal.fire(
          String(this.$t('general.actions.confirm.delete.success_title')),
          String(
            this.$t('general.actions.confirm.delete.success_text', {
              entity: party.name,
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
