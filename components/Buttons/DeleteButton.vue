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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component
export default class DeleteButton extends Vue {
  @Prop({ type: String, default: '8' }) circleSize!: string
  @Prop({ type: String, default: 'base' }) iconSize!: string

  deleteEntity(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.$emit('delete-entity')
      }
    })
  }
}
</script>
