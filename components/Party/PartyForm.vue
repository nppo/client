<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <TextInput
        :rules="['required', 'min:3']"
        :errors="errors.name"
        :name="$t('models.party.labels.name')"
        :label="$t('models.party.labels.name')"
        :value.sync="data.name"
      />
      <Textarea
        :rules="['required', 'min:3']"
        :errors="errors.description"
        :name="$t('models.party.labels.description')"
        :label="$t('models.party.labels.description')"
        :value.sync="data.description"
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
import { Party } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class PartyForm extends Vue {
  @Prop({ default: null }) readonly party!: Party | null
  @Prop({ default: () => {} }) readonly errors!: ValidationErrors

  private data = {
    name: this.party?.name ?? '',
    description: this.party?.description ?? '',
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
