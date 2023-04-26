<template>
  <button
  style="border: 2px;"
    :class="[
      'twvac-px-3 twvac-py-2.5 twvac-space-x-1 twvac-flex twvac-items-center twvac-justify-center',
      'twvac-text-sm twvac-font-medium',
      'twvac-transition',
      'twvac-rounded-md',
      'twvac-text-green-600 twvac-bg-green-500 twvac-bg-opacity-15 hover:twvac-bg-opacity-20',
      'twvac-focus:outline-none focus-visible:twvac-bg-opacity-40 focus-visible:twvac-ring-2 focus-visible:twvac-ring-offset-2 focus-visible:twvac-ring-offset-gray-800 focus-visible:twvac-ring-pink-200 focus-visible:twvac-ring-opacity-20'
    ]"
  >
    <slot />
  </button>
</template>

<style scoped></style>