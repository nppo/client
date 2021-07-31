<template>
  <ValidationProvider v-slot="validation" :name="name" :rules="formattedRules">
    <div class="flex flex-col mb-4">
      <label v-if="label" class="pl-3 mb-1">
        {{ label }}

        <small v-if="required" class="ml-1 text-red-500">
          {{ $t('validation.required_label') }}
        </small>
      </label>
      <vSelect
        v-model="localSelected"
        :options="options"
        append-to-body
        :class="{ 'error-border': hasErrors(validation.errors) }"
        :reduce="onSelected"
        v-bind="$attrs"
      />

      <span
        v-for="(error, index) in formattedValidationErrors(validation.errors)"
        :key="index"
        class="pl-3 text-red-500"
      >
        {{ error }}
      </span>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Prop, Watch, mixins } from 'nuxt-property-decorator'
import vSelect from 'vue-select'
import FormInput from '~/mixins/form-input'

import 'vue-select/dist/vue-select.css'

@Component({
  components: {
    vSelect,
  },
})
export default class SelectInput extends mixins(FormInput) {
  @Prop() value!: any
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: Array }) options!: Array<any>
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: String, default: '' }) readonly errorMessage!: string
  @Prop({ type: Function }) readonly onSelected?: Function

  private localSelected: any = this.value

  @Watch('localSelected')
  updateSelected() {
    this.$emit('update:value', this.localSelected)

    if (this.required) {
      if (this.localSelected.length > 0) {
        this.$emit('update:hasErrors', false)
      } else {
        this.$emit('update:hasErrors', true)
      }
    }
  }
}
</script>

<style>
.vs__dropdown-menu {
  @apply max-h-40 overflow-y-auto rounded-md shadow border-none mt-3 p-4 !important;
}
</style>
