<template>
  <Base
    :is-open="open"
    :title="$t('modals.person.create.heading')"
    @close="closeModal()"
  >
    <template #content>
      <div class="flex flex-col">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="pb-8 space-y-6 border-b border-gray-100"
            @submit.prevent="handleSubmit(create)"
          >
            <div class="grid grid-cols-3 gap-4">
              <div class="flex flex-col mb-4">
                <label
                  :for="$t('pages.person._id.edit.labels.profile_picture')"
                  class="pl-3 mb-1"
                >
                  {{ $t('pages.person._id.edit.labels.profile_picture') }}
                </label>

                <input
                  :id="$t('pages.person._id.edit.labels.profile_picture')"
                  class="px-3 py-3 font-bold rounded-md shadow focus:outline-none"
                  type="file"
                  @change="profilePictureSelected"
                />
              </div>

              <TextInput
                :value.sync="formData.function"
                :name="$t('pages.person._id.edit.labels.function')"
                :label="$t('pages.person._id.edit.labels.function')"
                :required="true"
              />

              <TextInput
                :value.sync="formData.phone"
                :name="$t('pages.person._id.edit.labels.phone')"
                :label="$t('pages.person._id.edit.labels.phone')"
                :required="true"
              />

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

              <Multiselect
                :entity.sync="formData.skills"
                :options="skills"
                :taggable="true"
                :label="$t('pages.person._id.edit.labels.skills')"
              />

              <Textarea
                :value.sync="formData.about"
                :name="$t('pages.person._id.edit.labels.about')"
                :label="$t('pages.person._id.edit.labels.about')"
                class="col-span-2"
              />

              <Multiselect
                :entity.sync="formData.themes"
                :options="themes"
                :label="$t('pages.person._id.edit.labels.themes')"
                :required="true"
              />
            </div>
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

        <button
          class="flex items-center pt-8 text-left focus:outline-none"
          @click="closeModal"
        >
          <h2 class="mr-4 text-base font-semibold">
            {{ $t('modals.person.create.cancel_text') }}
          </h2>

          <font-awesome-icon
            class="text-base text-orange-brand"
            icon="arrow-right"
          />
        </button>
      </div>
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
export default class PersonCreateModal extends Vue {
  private formData: any = {
    profile_picture: null,
    identifier: '1234567890',
    first_name: null,
    last_name: null,
    about: null,
    function: null,
    phone: null,
    skills: [],
    themes: [],
  }

  @Prop({ default: false }) readonly isOpen!: boolean

  @Prop({ type: Array, required: true }) themes!: Array<any>
  @Prop({ type: Array, required: true }) skills!: Array<any>

  public open: boolean = this.isOpen

  create(): void {
    this.$accessor.people.store(this.asFormData()).then(() => {
      this.closeModal()
      this.$auth.fetchUser()
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

    localStorage.setItem('closedProfileModal', 'true')
  }

  profilePictureSelected(event: any): void {
    this.formData.profile_picture = event.target.files[0]
  }
}
</script>
