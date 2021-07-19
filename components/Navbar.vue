<template>
  <nav class="flex items-center justify-between py-5 space-x-2">
    <div class="text-2xl text-white">
      <NuxtLink :to="localePath('/')"> NPPO</NuxtLink>
    </div>

    <slot />

    <div class="flex space-x-2">
      <LanguageSwitcher />

      <Dropdown v-if="$auth.loggedIn" :is-active.sync="active">
        <template #button>
          <button
            class="flex items-center px-4 py-2 space-x-4 text-sm text-white rounded bg-orange-brand focus:outline-none"
          >
            <span>{{ $t('account.manage') }}</span>

            <DropdownArrow :active="active" />
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
        path="login"
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
  public active: boolean = false

  get links(): Array<{ link: string; text: string }> {
    const links = []

    if (this.person) {
      links.push({
        link: `/person/${this.person?.id}`,
        text: 'account.profile',
      })
    }

    links.push({
      link: '/logout',
      text: 'auth.actions.logout',
    })

    return links
  }

  get person(): Person | undefined {
    return this.$auth.user?.person as Person
  }
}
</script>
