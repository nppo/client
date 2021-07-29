<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center space-x-3 mb-6">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.users.index.heading') }}
          </h1>

          <CreateButton page="user" />
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
                      `pages.management.users.index.table_fields.${field.name}`
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
            <tr v-for="user in users" :key="user.id" class="text-gray-500">
              <Value>
                <LocaleLink
                  class="font-semibold text-black hover:text-blue-700"
                  :path="`/user/${user.id}`"
                >
                  {{ user.id }}
                </LocaleLink>
              </Value>

              <Value>
                {{ user.person.first_name }} {{ user.person.last_name }}
              </Value>

              <Value>
                {{ user.email }}
              </Value>

              <Value class="w-1">
                <div class="flex items-center space-x-2">
                  <EditButton :entity-id="user.id" page="users" />
                  <DeleteButton @delete-entity="deleteEntity(user)" />
                </div>
              </Value>
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
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import TableInteraction from '~/mixins/table-interaction'
import { TableField } from '~/types/entities'
import { Models } from '~/types/enums'

import 'sweetalert2/src/sweetalert2.scss'
import { User } from '~/types/models'

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
      email: 'tom@way2web.nl',
      person: {
        first_name: 'Tom',
        last_name: 'Stemerding',
      },
    },
    {
      id: 2,
      email: 'tom@way2web.nl',
      person: {
        first_name: 'Tom',
        last_name: 'Stemerding',
      },
    },
    {
      id: 3,
      email: 'tom@way2web.nl',
      person: {
        first_name: 'Tom',
        last_name: 'Stemerding',
      },
    },
    {
      id: 4,
      email: 'tom@way2web.nl',
      person: {
        first_name: 'Tom',
        last_name: 'Stemerding',
      },
    },
  ]

  public fields: TableField[] = [
    {
      name: 'identifier',
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
      field.name
        ? this.$t(`pages.management.users.index.table_fields.${field.name}`)
        : ''
    ),
  }))

  deleteEntity(user: User): void {
    this.$accessor.user.delete(String(user.id)).then(() =>
      Swal.fire(
        String(this.$t('general.actions.confirm.delete.success_title')),
        String(
          this.$t('general.actions.confirm.delete.success_text', {
            entity: user.person
              ? user.person.firstName + user.person.lastName
              : '',
          })
        ),
        'success'
      )
    )
  }
}
</script>
