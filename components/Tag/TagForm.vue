<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <TextInput
        :rules="[$rules.required, $rules.min(3)]"
        :errors="errors.label"
        :name="$t('models.tag.labels.label')"
        :label="$t('models.tag.labels.label')"
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
import { Tag } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class TagForm extends Vue {
  @Prop({ default: null }) readonly tag!: Tag | null
  @Prop({ default: () => {} }) readonly errors!: ValidationErrors

  private data = {
    label: this.tag?.label ?? '',
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
