<template>
  <div
    class="flex items-center px-2 py-2 bg-white rounded-3xl shadow focus-within:text-gray-400"
    :class="variant === 'large' ? 'h-12' : 'h-10'"
  >
    <input
      v-model="localValue"
      class="flex-1 py-2 ml-3 text-sm placeholder-blue-800 focus:outline-none"
      :placeholder="$t('pages.search.placeholder')"
      type="search"
      @keyup.enter="search()"
    />

    <slot />

    <button
      class="p-3 ml-4"
      :class="
        variant === 'large'
          ? 'bg-orange-brand text-white text-sm rounded-full'
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
  private localValue: string = ''

  @Prop({ type: String }) value!: string
  @Prop({ type: String, default: 'search' }) readonly ariaLabel!: string
  @Prop({ type: String, default: 'small' }) readonly variant!: 'large' | 'small'

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
