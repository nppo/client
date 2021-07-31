<template>
  <div class="flex-1 pb-24">
    <Header has-dark-header has-search-bar :has-image="false" />

    <div class="container mx-auto mt-6">
      <BackButton :has-navigated-internal="hasNavigatedInternal" />

      <div class="mt-18">
        <div class="flex items-center mb-6 space-x-3">
          <h1 class="text-4xl font-bold">
            {{ $t('pages.management.parties._id.edit.heading') }}
          </h1>
        </div>

        <PartyForm :errors="errors" :party="party" @submit="update" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import PartyForm from '~/components/Party/PartyForm.vue'
import permissions from '~/config/Permissions'
import NavigationRouterHook from '~/mixins/navigation-router-hook'
import { MetaAuthOptions } from '~/types/entities'
import { Party } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  async asyncData({ params, $accessor }) {
    await $accessor.parties.fetch({ id: params.id })
  },
  components: {
    PartyForm,
  },
  middleware: ['auth', 'check-permissions'],
  meta: {
    auth: {
      requiredPermissions: [permissions.updateParty],
    } as MetaAuthOptions,
  },
})
export default class PartyEditPage extends mixins(NavigationRouterHook) {
  private errors: ValidationErrors | object = {}

  get party(): Party {
    return this.$accessor.parties.show
  }

  update(data: Object | FormData): void {
    this.$accessor.parties
      .update({ id: String(this.party.id), data })
      .then((party: Party) => {
        const route = this.localeRoute({ name: 'management-parties' })

        if (route) {
          this.$router.push(route)
        }

        this.$swal.fire(
          String(this.$t('modals.general.edit.success.title')),
          String(
            this.$t('modals.general.edit.success.text', {
              entity: party.name,
            })
          ),
          'success'
        )
      })
      .catch((errors: ValidationErrors) => {
        this.errors = errors
      })
  }
}
</script>
