<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class IndexPage extends Vue {
  redirect() {
    this.$router.push('/search')
  }

  mounted() {
    this.redirect()
  }
}
</script>
