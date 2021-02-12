<template>
  <Dropdown>
    <button
      slot="button"
      class="flex items-center p-2 space-x-4 text-sm font-bold bg-white rounded"
    >
      <span>{{ currentLocale.toUpperCase() }}</span>
      <svg
        class="w-3 h-3 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 9"
      >
        <path
          d="M7.464 3.827l.407.446a.513.513 0 010 .68L4.31 8.858a.411.411 0 01-.62 0L.128 4.953a.513.513 0 010-.68l.407-.446a.414.414 0 01.628.008l2.103 2.42V.482c0-.267.196-.482.44-.482h.586c.244 0 .44.215.44.482v5.773l2.103-2.42a.41.41 0 01.628-.008z"
        />
      </svg>
    </button>

    <div slot="items" class="divide-y divide-gray-100">
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        type="button"
        class="w-full py-1 text-sm text-left"
        :disabled="isCurrentLocale(locale.code)"
        :class="
          isCurrentLocale(locale.code) ? 'text-gray-500' : 'hover:font-bold'
        "
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </button>
    </div>
  </Dropdown>
</template>

<script lang="ts">
import { NuxtVueI18n } from 'nuxt-i18n/types/nuxt-i18n'
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class LanguageSwitcher extends Vue {
  get currentLocale() {
    return this.$i18n.locale
  }

  set currentLocale(value: string) {
    this.$i18n.setLocale(value)
  }

  get availableLocales() {
    return this.$i18n.locales! as NuxtVueI18n.Options.LocaleObject[]
  }

  isCurrentLocale(locale: string): boolean {
    return locale === this.currentLocale
  }

  changeLocale(code: string) {
    this.currentLocale = code
  }
}
</script>
