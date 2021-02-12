<template>
  <nav class="flex items-center justify-between pt-5 space-x-2">
    <div class="text-2xl text-white">
      <NuxtLink to="/"> NPPO </NuxtLink>
    </div>

    <slot />

    <div class="flex space-x-2">
      <LanguageSwitcher />

      <NuxtLink
        :to="$auth.loggedIn ? 'account' : 'login'"
        class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
      >
        {{ $auth.loggedIn ? $t('my_account') : $t('login') }}
      </NuxtLink>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Navbar extends Vue {}
</script>
