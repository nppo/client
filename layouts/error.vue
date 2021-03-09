<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div
        v-if="error.statusCode === 403"
        class="flex flex-col items-center justify-center mt-18"
      >
        <h1 class="mb-4 text-3xl">{{ $t('pages.error.403') }}</h1>
        <LocaleLink
          :path="'/'"
          class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
        >
          {{ $t('pages.error.back_to_homepage') }}
        </LocaleLink>
      </div>

      <div
        v-if="error.statusCode === 404"
        class="flex flex-col items-center justify-center mt-18"
      >
        <h1 class="mb-4 text-3xl">{{ $t('pages.error.404') }}</h1>
        <LocaleLink
          :path="'/'"
          class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
        >
          {{ $t('pages.error.back_to_homepage') }}
        </LocaleLink>
      </div>

      <div
        v-if="error.statusCode === 500"
        class="flex flex-col items-center justify-center mt-18"
      >
        <h1 class="mb-4 text-3xl">
          {{ $t('pages.error.405') }}
        </h1>
        <LocaleLink
          :path="'/'"
          class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
        >
          {{ $t('pages.error.back_to_homepage') }}
        </LocaleLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { Error } from '~/types/entities'

@Component({
  layout: 'default',
})
export default class ErrorPage extends mixins(NavigationRouterHook) {
  @Prop({ type: Object }) error: Error | undefined
}
</script>
