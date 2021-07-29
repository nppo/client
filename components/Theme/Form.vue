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
        {{ $t('general.actions.create') }}
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
  @Prop() theme: Theme | null = null

  private data = {
    label: this.theme?.label ?? '',
  }

  private errors: ValidationErrors | object = {}

  submit(): void {
    this.$accessor.themes
      .store({ data: this.data })
      .then(() => {
        const route = this.localeRoute({ name: 'theme' })

        if (route) {
          this.$router.push(route)
        }
      })
      .catch((errors: ValidationErrors) => {
        this.errors = errors
      })
  }
}
</script>
