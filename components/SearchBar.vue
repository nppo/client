<template>
  <div class="relative text-gray-600 focus-within:text-gray-400 mb-6">
    <input
      v-model="value"
      class="w-full py-4 px-6 focus:outline-none bg-white placeholder-blue-800 shadow-input rounded-3xl"
      type="search"
      :placeholder="$t('pages.search.placeholder')"
      @keyup.enter="search()"
    />

    <span
      class="absolute w-10 inset-y-0 right-0 flex items-center justify-center bg-orange-500 text-white rounded-full m-2"
    >
      <button class="btn btn-primary">
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

  @Watch('value')
  updateValue() {
    this.$emit('update:value', this.value)
  }
}
</script>
