<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="provider"
    :name="name"
    :rules="{ required: required }"
  >
    <div class="flex flex-col mb-4">
      <label v-if="label" :for="name" class="pl-3 mb-1">
        {{ label }}

        <small v-if="required" class="ml-1 text-red-500">
          {{ $t('validation.required_label') }}
        </small>
      </label>

      <div class="relative flex items-center mb-1">
        <input
          :id="name"
          :name="name"
          class="w-full px-3 py-3 font-bold rounded-md shadow focus:outline-none"
          type="file"
          :class="{ 'border border-red-300': errors[0] }"
          @change="fileSelected"
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
export default class FileInput extends Vue {
  @Prop({ type: File }) value!: string
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: String, default: '' }) readonly errorMessage!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean

  private localValue: string = this.value

  $refs!: { provider: InstanceType<typeof ValidationProvider> }

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)

    if (this.localValue) {
      this.$emit('update:hasErrors', false)
    } else {
      this.$emit('update:hasErrors', true)
    }
  }

  fileSelected(event: any): void {
    const valid = this.$refs.provider.validate(event)

    if (valid) {
      this.localValue = event.target.files[0]
    }
  }
}
</script>
