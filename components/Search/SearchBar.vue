<template>
  <div
    class="flex items-center h-12 px-2 py-2 space-x-2 bg-white rounded-full shadow-input focus-within:text-gray-400"
  >
    <input
      v-model="localValue"
      class="flex-1 py-2 ml-3 text-sm placeholder-blue-800 focus:outline-none"
      :placeholder="$t('pages.search.placeholder')"
      @keyup.enter="search()"
      type="search"
    />

    <slot />

    <button
      class="p-2"
      :class="
        variant === 'main'
          ? 'bg-orange-500 text-white rounded-full'
          : 'text-blue-500'
      "
      @click="search()"
    >
      <font-awesome-icon class="block" icon="search" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class SearchBar extends Vue {
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, required: true }) variant!: string

  localValue = this.value

  @Watch('value')
  onValueChanged(value: string) {
    this.localValue = value
  }

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)
  }

  search() {
    this.$emit('click')
  }
}
</script>
