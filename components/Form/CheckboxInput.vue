<template>
  <ValidationProvider v-slot="{ errors }" :name="name" rules="required">
    <div class="flex flex-col mb-4">
      <label v-if="label" :for="name" class="pl-3 mb-1">
        {{ label }}
      </label>

      <div class="relative flex items-center mb-1">
        <input
          :id="name"
          v-model="localValue"
          :name="name"
          class="w-4 h-4 mr-2 font-bold bg-gray-100 rounded-md shadow form-checkbox text-yellow-brand focus:outline-none"
          :class="{ 'border border-red-300': errors[0] }"
          type="checkbox"
        />
      </div>

      <span v-if="errors[0]" class="pl-3 text-red-500">{{ errorMessage }}</span>
    </div>
  </ValidationProvider>
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
  @Prop({ type: String, default: '' }) readonly errorMessage!: string

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
