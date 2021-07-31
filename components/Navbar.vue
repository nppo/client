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
              v-if="person"
              :path="`/person/${person.id}`"
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
            >
              {{ $t('account.profile') }}
            </LocaleLink>
            <span
              v-else
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
              @click="createProfile"
            >
              {{ $t('account.profile') }}
            </span>
            <LocaleLink
              :path="`/person/${person.id}/likes`"
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
            >
              {{ $t('account.saved') }}
            </LocaleLink>
            <LocaleLink
              v-if="$gates.hasAnyPermission(managementPermissions)"
              path="/management"
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
            >
              {{ $t('general.management') }}
            </LocaleLink>
            <LocaleLink
              v-if="$auth.user"
              :path="`/logout`"
              class="w-full py-1 text-sm text-left border-b border-gray-100 hover:font-bold"
            >
              {{ $t('auth.actions.logout') }}
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

  get person(): Person | undefined {
    return this.$auth.user?.person as Person
  }

  get managementPermissions(): string {
    return [
      this.$permissions.createUser,
      this.$permissions.updateUser,
      this.$permissions.deleteUser,
      this.$permissions.createTag,
      this.$permissions.updateTag,
      this.$permissions.deleteTag,
      this.$permissions.createTheme,
      this.$permissions.updateTheme,
    ].join('|')
  }

  createProfile(): void {
    localStorage.removeItem('closedProfileModal')
    this.$router.push('/')
  }
}
</script>
