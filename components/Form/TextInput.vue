<template>
  <ValidationProvider v-slot="{ errors }" :name="name" rules="required">
    <div class="flex flex-col mb-4">
      <label v-if="label" :for="name" class="pl-3 mb-1">
        {{ name }}
      </label>

      <div class="relative flex items-center mb-1">
        <input
          :id="name"
          v-model="localValue"
          :name="name"
          class="w-full px-3 py-3 font-bold rounded-md shadow focus:outline-none"
          type="text"
        />
        <font-awesome-icon
          v-if="errors[0]"
          class="absolute right-0 mr-3 text-sm text-red-500"
          icon="times"
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
export default class TextInput extends Vue {
  @Prop({ type: String }) value!: string
  @Prop({ type: String, default: '' }) readonly name!: string
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: String, default: '' }) readonly errorMessage!: string

  localValue = this.value

  @Watch('localValue')
  updateValue() {
    this.$emit('update:value', this.localValue)
  }

  @Watch('ValidationProvider')
  setErrors() {
    if (ValidationProvider.errors && ValidationProvider.errors[0]) {
      this.$emit('update:hasErrors', true)
    }
  }
}
</script>
