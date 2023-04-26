<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue'

defineEmits(['close'])
defineProps({ show: Boolean })
</script>

<template>
  <TransitionRoot
    appear
    as="template"
    :show="show"
  >
    <Dialog
      class="twvac-fixed twvac-inset-0 twvac-z-10 twvac-flex twvac-items-center twvac-justify-center twvac-overflow-y-auto"
      :open="show"
      @close="$emit('close')"
    >
      <TransitionChild
        enter="twvac-transition twvac-ease-out twvac-duration-300"
        enter-from="twvac-opacity-0"
        enter-to="twvac-opacity-100"
        leave="twvac-transition twvac-ease-in twvac-duration-200"
        leave-from="twvac-opacity-100"
        leave-to="twvac-opacity-0"
      >
        <DialogOverlay class="twvac-fixed twvac-inset-0 twvac-bg-gray-900 twvac-opacity-95" />
      </TransitionChild>

      <TransitionChild
        as="template"
        enter="twvac-transition twvac-ease-out twvac-transform twvac-duration-300"
        enter-from="twvac-opacity-0 twvac-translate-y-4 sm:twvac-translate-y-0 sm:twvac-scale-95"
        enter-to="twvac-opacity-100 twvac-translate-y-0 sm:twvac-scale-100"
        leave="twvac-transition twvac-ease-in twvac-transform twvac-duration-200"
        leave-from="twvac-opacity-100 twvac-translate-y-0 sm:twvac-scale-100"
        leave-to="twvac-opacity-0 translate-y-4 sm:twvac-translate-y-0 sm:twvac-scale-95"
      >
        <div class="twvac-relative twvac-z-10 twvac-flex twvac-justify-center twvac-w-full twvac-p-8 twvac-text-gray-100 twvac-flex-col">
          <slot />
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>