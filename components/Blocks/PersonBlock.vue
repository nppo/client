<template>
  <LocaleLink
    :path="`/person/${person.id}`"
    class="flex flex-col h-full overflow-hidden bg-white rounded-md shadow"
  >
    <div class="flex flex-col items-center p-4">
      <img
        v-if="person.profilePictureUrl"
        class="inline w-24 h-24 mb-2 rounded-full shadow"
        :src="person.profilePictureUrl"
        :alt="person.firstName + '_avatar'"
      />

      <h4 class="text-base font-bold break-all">
        {{ person.firstName }} {{ person.lastName }}
      </h4>
      <span class="mb-2 text-xs text-gray-300">{{ person.function }}</span>

      <div class="flex w-full mb-2 justify-evenly">
        <div v-if="person.projects" class="flex flex-col items-center">
          <span class="font-bold uppercase">
            {{ $t('entities.project.plural') }}
          </span>
          <span>{{ person.projects.length }}</span>
        </div>

        <div v-if="person.products" class="flex flex-col items-center">
          <span class="font-bold uppercase">
            {{ $t('entities.product.plural') }}
          </span>
          <span>{{ person.products.length }}</span>
        </div>
      </div>

      <div class="flex items-center justify-center">
        <div
          class="flex justify-center w-8 h-8 p-2 mr-2 text-white bg-blue-500 rounded-full"
        >
          <font-awesome-icon
            :icon="['fab', 'twitter-square']"
            class="text-base"
          />
        </div>
        <div
          class="flex justify-center w-8 h-8 p-2 mr-2 text-white bg-blue-500 rounded-full"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" class="text-base" />
        </div>
        <div
          class="flex justify-center w-8 h-8 p-2 text-white bg-blue-500 rounded-full"
        >
          <font-awesome-icon
            :icon="['fab', 'researchgate']"
            class="text-base"
          />
        </div>
      </div>
    </div>

    <hr class="mb-3 border-gray-100" />

    <div
      v-if="slicedSkills && slicedSkills.length > 0"
      class="flex flex-row flex-wrap items-start justify-center px-4 mb-4"
    >
      <div
        v-for="skill in slicedSkills"
        :key="'skill_shortcut_' + skill.id"
        class="px-3 py-1 m-1 text-xs font-extrabold bg-green-300 rounded-md cursor-pointer"
      >
        {{ skill.label }}
      </div>
    </div>

    <div class="flex justify-end px-4 pb-3 mt-auto">
      <FollowButton entity="person" :entity-id="person.id" />
    </div>
  </LocaleLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Person } from '~/types/models'

@Component
export default class PersonBlock extends Vue {
  @Prop({ type: Object, required: true }) person!: Person

  get slicedSkills(): Array<any> | undefined {
    return this.person.skills?.slice(0, 5)
  }
}
</script>
