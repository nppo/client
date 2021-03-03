<template>
  <button
    type="button"
    class="inline-flex items-center py-1 px-2 space-x-2 font-bold text-blue-500 rounded-md border border-blue-500"
    @click.prevent=""
  >
    <font-awesome-icon class="block" icon="plus" />
    <span>{{ $t('general.follow') }}</span>
  </button>
</template>
