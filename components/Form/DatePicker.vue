<template>
  <div class="flex flex-col mb-4">
    <label v-if="label" class="pl-3 mb-1">
      {{ label }}
    </label>
    <date-picker
      v-model="localDate"
      type="datetime"
      :show-time-panel="showTimePanel"
    >
      <template #icon-calendar>
        <font-awesome-icon class="w-3 h-3 fill-current" icon="calendar-alt" />
      </template>

      <template #footer>
        <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
          {{ showTimePanel ? 'select date' : 'select time' }}
        </button>
      </template>
    </date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'

import DatePicker from 'vue2-datepicker'

import 'vue2-datepicker/index.css'

@Component({
  components: {
    DatePicker,
  },
})
export default class DatepickerInput extends Vue {
  private localDate: string = ''
  private showTimePanel: boolean = false

  @Prop({ type: String, default: '' }) readonly label!: string
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: String, default: '' }) readonly errorMessage!: string

  @Watch('localDate')
  updateDate() {
    this.$emit('update:value', this.localDate)

    if (this.required) {
      if (this.localDate.length > 0) {
        this.$emit('update:hasErrors', false)
      } else {
        this.$emit('update:hasErrors', true)
      }
    }
  }

  toggleTimePanel() {
    this.showTimePanel = !this.showTimePanel
  }
}
</script>
