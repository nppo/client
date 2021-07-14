<template>
  <Base
    :is-open="open"
    :title="'Je hebt nog geen profiel, wil je die aanmaken?'"
    @close="closeModal()"
  >
    <template #content>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="space-y-6 pb-8 border-b border-gray-100" @submit.prevent="handleSubmit(create)">
           <TextInput
              :value.sync="formData.first_name"
              :name="$t('pages.person._id.edit.labels.first_name')"
              :label="$t('pages.person._id.edit.labels.first_name')"
              :required="true"
            />

            <TextInput
              :value.sync="formData.last_name"
              :name="$t('pages.person._id.edit.labels.last_name')"
              :label="$t('pages.person._id.edit.labels.last_name')"
              :required="true"
            />
          <div class="flex flex-col items-center">
            <button
              class="self-start px-4 py-2 text-sm text-white rounded bg-orange-brand"
              type="submit"
            >
              {{ $t('general.actions.create') }}
            </button>
          </div>
        </form>
      </ValidationObserver>

      <button class="pt-8 flex items-center text-left focus:outline-none" @click="closeModal">
        <h2 class="text-base font-semibold">Nu geen profiel aanmaken? Ga door naar het platform</h2>

        <font-awesome-icon class="text-base text-orange-brand" icon="arrow-right" />
      </button>
    </template>
  </Base>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ValidationObserver } from 'vee-validate'
import objectToFormData from '~/common/utils/objectToFormData'

@Component({
  components: { ValidationObserver },
})
export default class UserCreateModal extends Vue {
  private formData: any = {
    identifier: '1234567890',
    first_name: null,
    last_name: null,
  }

  @Prop({ default: false })
  readonly isOpen!: boolean

  public open: boolean = this.isOpen

  create(): void {
    this.$accessor.people
      .store(this.asFormData())
      .then(() => {
        this.closeModal()
    })
  }

  asFormData(): FormData {
    return objectToFormData(this.formData)
  }

  openModal() {
    this.open = !this.open
    document.querySelector('body')!.style.overflow = 'hidden'
  }

  closeModal() {
    this.open = false
    document.querySelector('body')!.style.overflow = 'auto'
  }
}
</script>
