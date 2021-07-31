<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <TextInput
        :rules="[$rules.required, $rules.min(2)]"
        :errors="errors.label"
        :name="$t('models.keyword.labels.label')"
        :label="$t('models.keyword.labels.label')"
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
import { Keyword } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class KeywordForm extends Vue {
  @Prop({ default: null }) readonly keyword!: Keyword | null
  @Prop({ default: () => {} }) readonly errors!: ValidationErrors

  private data = {
    label: this.keyword?.label ?? '',
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
