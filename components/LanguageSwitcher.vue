<template>
  <div>
    <span>
      {{ currentLocale.toUpperCase() }}
    </span>

    <div class="flex space-x-2">
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        class="bg-blue-800 text-white p-2 rounded"
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
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

  changeLocale(code: string) {
    this.currentLocale = code
  }
}
</script>
