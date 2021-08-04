<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <div class="flex flex-col space-x-6 md:flex-row">
        <div class="w-1/2">
          <TextInput
            :value.sync="data.email"
            :name="$t('models.user.labels.email')"
            :label="$t('models.user.labels.email')"
            :rules="[$rules.required, $rules.email]"
            :errors="errors.email"
          />
        </div>
        <div class="w-1/2">
          <SelectInput
            :value.sync="data.roles"
            :name="$t('models.user.relationships.roles')"
            :label="$t('models.user.relationships.roles')"
            :options="formatRolesAsOption(roles)"
            :errors="errors.role"
            :multiple="true"
          />
        </div>
      </div>

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
import { Role, User } from '~/types/models'
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
    email: this.user?.email ?? '',
    roles: this.formatRolesAsOption(this.user?.roles ?? []),
  }

  get roles(): Array<Role> {
    return this.$accessor.roles.all.items
  }

  formatRolesAsOption(roles: Array<Role>): Array<any> {
    return roles.map((role: Role) => {
      return {
        ...role,
        label: role.name,
      }
    })
  }

  fetch(): Promise<void> {
    return this.$accessor.roles.fetchIndex({ perPage: 50 }).then(() => {})
  }

  submit(): void {
    this.$emit('submit', this.data)
  }
}
</script>
