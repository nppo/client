<template>
  <div class="flex flex-row w-full">
    <div class="flex flex-col w-6/12 space-y-40">
      Testing

      <div
        v-for="(theme, index) in themes"
        :key="index"
        class="my-6 overflow-y-auto"
      >
        {{ theme.label }}
      </div>

      <infinite-loading spinner="waveDots" @infinite="loadMore" />
    </div>
    <div class="flex flex-col w-6/12">
      <TextInput
        :value.sync="formData.label"
        :name="$t('pages.person.create.labels.function')"
        :label="$t('pages.person.create.labels.function')"
        :errors="errors.label"
        :rules="['required']"
      />
      <div class="w-full bg-red" @click="submit">Test 123</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'
import { Theme } from '~/types/models'
import { ValidationErrors } from '~/types/repositories'

@Component({
  asyncData({ $accessor }) {
    $accessor.themes.index({})
  },
  components: {
    InfiniteLoading,
  },
})
export default class TestPage extends Vue {
  private loading: boolean = false
  private errors: object = {}
  private formData = {
    label: '',
  }

  get themes(): Theme[] {
    return this.$accessor.themes.all.items
  }

  loadMore($state: any = null): void {
    const page = this.$accessor.themes.all.meta.current_page + 1

    this.$accessor.themes
      .index({
        mutation: 'appendAll',
        page,
      })
      .then(() => {
        if (
          this.$accessor.themes.all.meta.current_page >=
          this.$accessor.themes.all.meta.last_page
        ) {
          $state.complete()
          return
        }
        $state.loaded()
      })
  }

  submit(): void {
    this.$accessor.themes
      .store({ data: this.formData })
      .catch((errors: ValidationErrors) => {
        this.errors = errors
      })
  }
}
</script>
