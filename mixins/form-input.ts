import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { ValidationProvider } from 'vee-validate'

@Component({
  components: {
    ValidationProvider,
  },
})
export default class FormInput extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly rules!: Array<string>
  @Prop({ default: () => [] }) readonly errors!: Array<string> | null

  get formattedRules(): string {
    return this.rules.join('|')
  }

  get isRequired(): boolean {
    return this.rules.includes(this.$rules.required)
  }

  hasErrors(validationErrors: Array<string> = []) {
    return this.formattedValidationErrors(validationErrors).length > 0
  }

  formattedValidationErrors(
    validationErrors: Array<string> = []
  ): Array<string> {
    if (validationErrors.length !== 0) {
      return validationErrors
    }

    if (this.errors) {
      return this.errors
    }

    return []
  }
}
