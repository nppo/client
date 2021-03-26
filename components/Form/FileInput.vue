<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" :for="name" class="pl-3 mb-1">
      {{ label }}
    </label>

    <div class="relative flex items-center mb-1">
      <input
        :id="name"
        :name="name"
        class="w-full px-3 py-3 font-bold rounded-md shadow focus:outline-none"
        type="file"
        @change="fileSelected"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class FileInput extends Vue {
  @Prop({ type: File }) value!: string
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: '' }) readonly label!: string

  private localValue: string = this.value

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)
  }

  fileSelected(event: any): void {
    this.localValue = event.target.files[0]
  }
}
</script>
