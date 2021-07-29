<template>
  <div>
    <ThemeForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ThemeForm from '~/components/Theme/Form.vue'

@Component({
  components: {
    ThemeForm,
  },
})
export default class ThemeCreatePage extends Vue {}
</script>
