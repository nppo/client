<template>
  <ValidationProvider v-slot="validation" :name="name" :rules="formattedRules">
    <div class="flex flex-col mb-4">
      <label v-if="label" :for="name" class="pl-3 mb-1">
        {{ label }}

        <small v-if="isRequired" class="ml-1 text-red-500">
          {{ $t('validation.required_label') }}
        </small>
      </label>

      <div class="flex items-center mb-1">
        <textarea
          :id="name"
          v-model="localValue"
          :name="name"
          class="w-full p-3 font-bold rounded-md shadow focus:outline-none"
          :class="{ 'border border-red-300': hasErrors(validation.errors) }"
          rows="6"
        />
      </div>

      <Errors :errors="formattedValidationErrors(validation.errors)" />
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Watch, mixins } from 'nuxt-property-decorator'

import { ValidationProvider } from 'vee-validate'
import FormInput from '~/mixins/form-input'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class TextArea extends mixins(FormInput) {
  @Prop({ type: String }) value!: string
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: '' }) readonly label!: string

  private localValue: string = this.value

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
