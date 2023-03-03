<template>
  <button
    :class="[
      'px-3 py-2.5 space-x-1 flex items-center justify-center',
      'text-sm font-medium',
      'transition',
      'rounded-md',
      'text-green-600 bg-green-500 bg-opacity-15 hover:bg-opacity-20',
      'focus:outline-none focus-visible:bg-opacity-40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-pink-200 focus-visible:ring-opacity-20'
    ]"
  >
    <slot />
  </button>
</template>

<style scoped></style>