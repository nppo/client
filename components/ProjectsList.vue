<template>
  <div>
    <div
      v-for="project in slicedListItems"
      :key="project.id"
      class="flex flex-col h-full mb-4 overflow-hidden bg-white rounded-md shadow"
    >
      <LocaleLink class="flex flex-row" :path="`/project/${project.id}`">
        <div class="w-1/4 h-24">
          <img
            v-if="project.projectPictureUrl"
            class="inline object-cover object-center h-full"
            :src="project.projectPictureUrl"
            :alt="project.title + '_image'"
          />
        </div>

        <div class="flex flex-col flex-wrap w-3/4 px-4 py-2 mr-2 break-all">
          <span class="flex flex-row mb-1">
            <Badge :text="$t('entities.project.singular')" />
          </span>

          <span class="text-base font-bold">
            {{ project.title }}
          </span>
        </div>
      </LocaleLink>
    </div>

    <div class="mb-6">
      <div v-if="projects.length > maxItems" class="block mt-3 text-center">
        <span
          class="text-blue-400 underline cursor-pointer"
          @click="showingAll = !showingAll"
        >
          {{
            showingAll
              ? $t('general.show_less')
              : $t('general.show_more', { number: showMoreNumber })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Project } from '~/types/models'

@Component
export default class PeopleList extends Vue {
  public showingAll: boolean = false

  @Prop({ type: Number, default: 3 }) maxItems!: number
  @Prop({ type: Array, required: true }) projects!: Project[]

  get numberVisibleListItems(): number {
    if (this.showingAll) {
      return this.projects.length
    }

    return this.maxItems
  }

  get showMoreNumber(): number {
    return this.projects.length - this.maxItems
  }

  get slicedListItems(): Project[] {
    return this.projects.slice(0, this.numberVisibleListItems)
  }
}
</script>
