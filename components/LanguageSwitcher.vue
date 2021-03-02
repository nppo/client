<template>
  <Dropdown>
    <template #button>
      <button
        class="flex items-center p-2 space-x-4 text-sm font-bold bg-white rounded"
      >
        <span>{{ currentLocale.toUpperCase() }}</span>
        <font-awesome-icon class="w-3 h-3 fill-current" icon="arrow-down" />
      </button>
    </template>

    <template #items>
      <div class="divide-y divide-gray-100">
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
    </template>
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
