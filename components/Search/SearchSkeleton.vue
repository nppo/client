<template>
  <div>
    <div class="w-1/3 h-10 mb-3 rounded shimmer"></div>

    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="(block, index) in 6"
        :key="index"
        class="bg-white shadow-md rounded-md"
      >
        <div class="w-full h-32 shimmer mb-3"></div>
        <div class="flex justify-between mb-2 px-2">
          <div class="w-1/3 h-2 mb-4 rounded shimmer"></div>
          <div class="w-1/3 h-2 mb-4 rounded shimmer"></div>
        </div>
        <div class="p-2">
          <div class="w-1/2 h-2 mb-4 rounded shimmer"></div>
          <div class="w-full h-2 mb-3 rounded shimmer"></div>
          <div class="w-full h-2 mb-3 rounded shimmer"></div>
          <div class="w-full h-2 mb-3 rounded shimmer"></div>
          <div class="w-full h-2 mb-3 rounded shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
