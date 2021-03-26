<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" class="pl-3 mb-1">
      {{ label }}
    </label>
    <date-picker
      v-model="localDate"
      value-type="format"
      format="DD-MM-YYYY"
      :lang="currentLocale"
    >
      <template #icon-calendar>
        <font-awesome-icon class="w-3 h-3 fill-current" icon="calendar-alt" />
      </template>
    </date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/nl'
import 'vue2-datepicker/locale/en'

@Component({
  components: {
    DatePicker,
  },
})
export default class DatepickerInput extends Vue {
  @Prop({ type: String }) value!: string
  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean

  private localDate: string = this.formatDate(this.value)

  @Watch('localDate')
  updateDate() {
    this.$emit('update:value', this.localDate)
  }

  get currentLocale() {
    return this.$i18n.locale
  }

  formatDate(dateString: string | null) {
    if (dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(this.$i18n.locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    }

    return '-'
  }
}
</script>
