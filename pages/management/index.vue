<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <h1 class="mb-6 text-4xl font-bold">Beheer</h1>
      </div>

      <div class="grid h-32 grid-cols-4 gap-4">
        <LocaleLink
          path="/management/users"
          class="flex items-center p-5 bg-white rounded shadow hover:bg-opacity-50 justify-evenly"
        >
          <font-awesome-icon
            class="text-4xl text-gray-200 fill-current"
            icon="user"
          />

          <h2 class="text-2xl font-bold">Gebruikers</h2>
        </LocaleLink>
        <LocaleLink
          path="/management/themes"
          class="flex items-center p-5 bg-white rounded shadow hover:bg-opacity-50 justify-evenly"
        >
          <font-awesome-icon
            class="text-4xl text-gray-200 fill-current"
            icon="th-list"
          />

          <h2 class="text-2xl font-bold">Thema's</h2>
        </LocaleLink>
        <LocaleLink
          path="/management/tags"
          class="flex items-center p-5 bg-white rounded shadow hover:bg-opacity-50 justify-evenly"
        >
          <font-awesome-icon
            class="text-4xl text-gray-200 fill-current"
            icon="tags"
          />

          <h2 class="text-2xl font-bold">Tags</h2>
        </LocaleLink>
        <LocaleLink
          path="/management/parties"
          class="flex items-center p-5 bg-white rounded shadow hover:bg-opacity-50 justify-evenly"
        >
          <font-awesome-icon
            class="text-4xl text-gray-200 fill-current"
            icon="copy"
          />
          <h2 class="text-2xl font-bold">Partijen</h2>
        </LocaleLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'

@Component
export default class ManagementPage extends mixins(NavigationRouterHook) {}
</script>
