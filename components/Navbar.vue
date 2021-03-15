<template>
  <nav class="flex items-center justify-between py-5 space-x-2">
    <div class="text-2xl text-white">
      <NuxtLink :to="localePath('/')"> NPPO</NuxtLink>
    </div>

    <slot />

    <div class="flex space-x-2">
      <LanguageSwitcher />

      <LocaleLink
        :path="$auth.loggedIn ? '/person/' + $auth.user.id : '/login'"
        class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
      >
        {{ $auth.loggedIn ? $t('account.profile') : $t('account.login') }}
      </LocaleLink>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {}
</script>
