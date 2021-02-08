<template>
  <div class="relative text-gray-600 focus-within:text-gray-400 mb-6">
    <input
      v-model="value"
      class="w-full focus:outline-none bg-white placeholder-blue-800 shadow-input rounded-3xl"
      :class="variant === 'main' ? 'py-3 px-5' : 'py-2 px-4'"
      type="search"
      :placeholder="$t('pages.search.placeholder')"
      @keyup.enter="search()"
    />

    <span
      class="absolute w-8 inset-y-0 right-0 flex items-center justify-center m-2 text-blue-500"
      :class="{ 'bg-orange-500 text-white rounded-full': variant === 'main' }"
    >
      <button class="btn btn-primary" @click="search()">
        <font-awesome-icon icon="search" />
      </button>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SearchBar extends Vue {
  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, required: true }) variant!: string

  @Watch('value')
  updateValue() {
    this.$emit('update:value', this.value)
  }
}
</script>
