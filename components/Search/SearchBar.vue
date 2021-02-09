<template>
  <div class="relative text-gray-600 focus-within:text-gray-400 mb-6">
    <input
      v-model="localValue"
      class="w-full focus:outline-none bg-white placeholder-blue-800 font-bold shadow-input rounded-3xl"
      :class="variant === 'main' ? 'py-3 px-5' : 'py-2 px-4'"
      type="search"
      :placeholder="$t('pages.search.placeholder')"
      @keyup.enter="search()"
    />

    <span
      class="absolute w-8 inset-y-0 right-0 flex items-center justify-center m-2"
      :class="
        variant === 'main'
          ? 'bg-orange-500 text-white rounded-full'
          : 'text-blue-500'
      "
    >
      <button class="btn btn-primary" @click="search()">
        <font-awesome-icon icon="search" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class SearchBar extends Vue {
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, required: true }) variant!: string

  localValue = this.value

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)
  }

  search() {
    this.$emit('click')
  }
}
</script>
