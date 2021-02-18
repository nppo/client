<template>
  <div>
    <h1 class="mb-3 text-2xl">{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  middleware: 'auth',
})
export default class AccountPage extends Vue {
  get user() {
    return this.$auth.user
  }
}
</script>
