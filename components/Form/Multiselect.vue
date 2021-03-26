<template>
  <ValidationProvider
    v-slot="{ errors }"
    :label="label"
    :rules="{ required: required }"
  >
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
        multiple
        append-to-body
        :taggable="taggable"
        :label="optionLabelAttribute"
        :class="{ 'error-border': errors[0] }"
        :get-option-label="optionLabel"
      />

      <span v-if="errors[0]" class="pl-3 text-red-500">{{ errorMessage }}</span>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

import vSelect from 'vue-select'

@Component({
  components: {
    vSelect,
    ValidationProvider,
  },
})
export default class Multiselect extends Vue {
  @Prop({ type: Array }) entity!: Array<any>
  @Prop({ type: Array }) options!: Array<any>
  @Prop({ type: String }) readonly optionLabelAttribute!: string
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: String, default: '' }) readonly errorMessage!: string
  @Prop({ type: Boolean, default: false }) readonly taggable!: boolean
  @Prop({ type: Function }) readonly optionLabel?: Function

  private localSelected: Array<any> = this.entity

  @Watch('localSelected')
  updateSelected() {
    this.$emit('update:entity', this.localSelected)

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
