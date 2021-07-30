<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <SelectInput
        :value.sync="data.role"
        :name="$t('pages.user.edit.labels.role')"
        :label="$t('pages.user.edit.labels.role')"
        :options="roles"
        :rules="['required']"
        :errors="errors.role"
        :on-selected="(option) => option.label"
      />

      <button
        class="self-start px-4 py-2 text-sm text-white rounded bg-orange-brand"
        type="submit"
      >
        {{ $t('general.actions.create') }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { User } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  components: {
    ValidationObserver,
  },
})
export default class UserForm extends Vue {
  @Prop({ default: null }) readonly user!: User | null
  @Prop({ default: () => {} }) readonly errors!: ValidationErrors

  private data = {
    role: this.user?.roles ?? '',
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
