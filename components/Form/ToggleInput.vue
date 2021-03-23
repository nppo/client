<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" :for="name" class="pl-3 mb-1">
      {{ label }}
    </label>
    <div
      class="flex items-center w-16 h-8 p-1 duration-300 ease-in-out bg-gray-200 rounded-full cursor-pointer"
      :class="{ 'bg-yellow-brand': localValue }"
      @click="localValue = !localValue"
    >
      <div
        class="flex items-center duration-300 ease-in-out transform translate-x-0"
        :class="{ 'translate-x-4': localValue }"
      >
        <span v-if="localValue" class="mr-1 font-bold">
          {{ $t('general.yes') }}
        </span>
        <div class="w-5 h-5 bg-white rounded-full shadow-md" />
        <span v-if="!localValue" class="ml-1 font-bold">
          {{ $t('general.no') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class CheckboxInput extends Vue {
  @Prop({ type: Boolean }) value!: boolean
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: '' }) readonly label!: string

  private localValue: boolean = this.value

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)

    if (this.localValue) {
      this.$emit('update:hasErrors', false)
    } else {
      this.$emit('update:hasErrors', true)
    }
  }
}
</script>
