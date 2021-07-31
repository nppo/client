<template>
  <button
    class="flex justify-center p-2 text-white bg-red-500 rounded-full cursor-pointer"
    :class="`w-${circleSize} h-${circleSize}`"
    @click="deleteEntity()"
  >
    <font-awesome-icon :class="`text-${iconSize}`" icon="times" />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import 'sweetalert2/src/sweetalert2.scss'

@Component
export default class DeleteButton extends Vue {
  @Prop({ type: String, default: '8' }) circleSize!: string
  @Prop({ type: String, default: 'base' }) iconSize!: string

  deleteEntity(): void {
    this.$swal
      .fire({
        title: String(this.$t('general.actions.confirm.delete.title')),
        text: String(this.$t('general.actions.confirm.delete.text')),
        icon: 'warning',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#ff8427',
        cancelButtonColor: '#d33',
        confirmButtonText: String(
          this.$t('general.actions.confirm.delete.confirm_button')
        ),
        cancelButtonText: String(
          this.$t('general.actions.confirm.delete.cancel_button')
        ),
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.$emit('delete-entity')
        }
      })
  }
}
</script>
