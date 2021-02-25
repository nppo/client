<template>
  <div class="container relative py-24 mx-auto">
    <h3 class="mb-12 text-2xl font-bold text-center">
      {{ $t('pages.index.statistics_title') }}
    </h3>

    <div class="flex justify-around space-x-5">
      <div
        v-for="statistic in statistics"
        :key="statistic.name"
        class="flex flex-col items-center"
      >
        <div class="text-4xl font-bold text-blue-500" :title="statistic.count">
          {{ statistic.count.toLocaleString($i18n.locale) }}
        </div>
        <div class="text-base capitalize">
          {{ $tc(`entities.${statistic.name}.default`, statistic.count) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class StatisticsSection extends Vue {
  @Prop({ type: Array, required: true }) statistics!: any
}
</script>
