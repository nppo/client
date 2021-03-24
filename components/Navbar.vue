<template>
  <nav class="flex items-center justify-between py-5 space-x-2">
    <div class="text-2xl text-white">
      <NuxtLink :to="localePath('/')"> NPPO</NuxtLink>
    </div>

    <slot />

    <div class="flex space-x-2">
      <LanguageSwitcher />

      <Dropdown v-if="$auth.loggedIn">
        <template #button>
          <button class="px-4 py-2 text-sm text-white rounded bg-orange-brand">
            {{ $t('account.manage') }}
          </button>
        </template>

        <template #items>
          <div class="grid grid-cols-1 divide-y divide-gray-100">
            <LocaleLink
              v-for="link in links"
              :key="link.link"
              :path="link.link"
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
            >
              {{ $t(link.text) }}
            </LocaleLink>
          </div>
        </template>
      </Dropdown>

      <LocaleLink
        v-else
        :path="accountLink"
        class="px-4 py-2 text-sm text-white rounded bg-orange-brand"
      >
        {{ $t('auth.actions.login') }}
      </LocaleLink>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Person } from '~/types/models'

@Component
export default class Navbar extends Vue {
  get accountLink(): string {
    if (!this.$auth.loggedIn) {
      return '/login'
    }

    return this.person ? `/person/${this.person.id}` : '/account'
  }

  get person(): Person | undefined {
    return this.$auth.user?.person as Person
  }

  private links: Array<{ link: string; text: string }> = [
    {
      link: `/person/${this.person?.id}`,
      text: 'account.profile',
    },
    {
      link: '/logout',
      text: 'auth.actions.logout',
    },
  ]
}
</script>
