<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" class="pl-3 mb-1">
      {{ label }}
    </label>
    <vSelect
      v-model="localSelected"
      :options="options"
      multiple
      append-to-body
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import vSelect from 'vue-select'

import 'vue-select/dist/vue-select.css'

@Component({
  components: {
    vSelect,
  },
})
export default class Multiselect extends Vue {
  @Prop({ type: Array }) entity!: Array<any>
  @Prop({ type: Array }) options!: Array<any>
  @Prop({ type: String, default: '' }) readonly label!: string

  private localSelected: Array<any> = this.entity

  @Watch('localSelected')
  updateSelected() {
    this.$emit('update:entity', this.localSelected)
  }
}
</script>

<style>
.vs__dropdown-menu {
  @apply max-h-40 overflow-y-auto rounded-md shadow border-none mt-3 p-4 !important;
}
</style>
