<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <h1 class="mb-6 text-4xl font-bold">Gebruikers</h1>
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
              <FormTextInput
                v-if="field.inputType === 'text'"
                :value="field.searchValue"
                :name="$t(`pages.users.index.tableFields.${field.name}`)"
                type="search"
                input-class="w-full px-5 py-3 placeholder-gray-200 border-gray-200 rounded"
                @update:value="handleHeaderInputChanged(field.name, $event)"
              />
              <FormSelectInput
                v-else-if="field.inputType === 'select'"
                :value="field.searchValue"
                :name="$t(`pages.users.index.tableFields.${field.name}`)"
                class="min-w-48"
                :options="field.options"
                @update:value="handleHeaderInputChanged(field.name, $event)"
              />
            </th>
          </tr>
        </template>

        <template #default>
          <tr v-for="user in users" :key="user.id" class="text-gray-500">
            <TableValue>
              <LocaleLink
                class="font-semibold text-black hover:text-blue-700"
                :path="`/users/${user.id}`"
              >
                {{ user.id }}
              </LocaleLink>
            </TableValue>

            <TableValue>
              {{ user.name }}
            </TableValue>
          </tr>
          <tr v-if="users.length < 1">
            <td colspan="6" class="p-4 text-center">
              {{
                $t('general.noResults', {
                  model: $t('pages.users.index.heading'),
                })
              }}
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import TableInteraction from '~/mixins/table-interaction'
import { TableField } from '~/types/entities'
import { Models } from '~/types/enums'

@Component({
  middleware: ['auth'],
})
export default class ManagementPage extends mixins(
  NavigationRouterHook,
  TableInteraction
) {
  private users = [
    {
      id: 1,
      name: 2,
    },
    { id: 2, name: 2 },

    { id: 3, name: 2 },

    { id: 4, name: 2 },
  ]

  public fields: TableField[] = [
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
  ].map((field) => ({
    ...field,
    label: String(this.$t(`pages.users.index.tableFields.${field.name}`)),
  }))
}
</script>
