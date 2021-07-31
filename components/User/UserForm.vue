<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      class="p-4 overflow-hidden bg-white rounded-md shadow"
      @submit.prevent="handleSubmit(submit)"
    >
      <SelectInput
        :value.sync="data.roles"
        :name="$t('pages.user.edit.labels.role')"
        :label="$t('pages.user.edit.labels.role')"
        :options="formatRolesAsOption(roles)"
        :rules="['required']"
        :errors="errors.role"
        :multiple="true"
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
