<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <TextInput
        :rules="['required', 'min:3']"
        :errors="errors.label"
        :name="$t('pages.theme.create.labels.label')"
        :label="$t('pages.theme.create.labels.label')"
        :value.sync="data.label"
      />

      <button
        class="self-start px-4 py-2 text-sm text-white rounded bg-orange-brand"
        type="submit"
      >
        {{ $t('general.save') }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { Theme } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class ThemeForm extends Vue {
  @Prop({ default: null }) readonly theme!: Theme | null
  @Prop({ default: () => {} }) readonly errors!: ValidationErrors

  private data = {
    label: this.theme?.label ?? '',
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
