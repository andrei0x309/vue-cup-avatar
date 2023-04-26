<template>
	<div class="relative">
		<cropper-preview
			v-if="state.crop"
			:width="width"
			:height="height"
			:image="state.crop.image"
			:coordinates="state.crop.coordinates"
			class="twvac-rounded-full"
		/>

		<div
			v-if="state.crop && width <= 40 && height <= 40"
			class="twvac-absolute twvac-w-2.5 twvac-h-2.5 twvac-rounded-full twvac-bottom-0 twvac-right-0 twvac-ring twvac-ring-gray-900"
			:class="{
				'twvac-bg-yellow-400': status === 'away',
				'twvac-bg-red-400': status === 'busy',
				'twvac-bg-gray-400': status === 'offline',
				'twvac-bg-green-400': status === 'online',
			}"
		/>
	</div>
</template>

<script setup lang="ts">
import { state } from '@/hooks/state'
import { Preview as CropperPreview } from 'vue-advanced-cropper'
import { defineProps } from 'vue'

defineProps<{
	width: number
	height: number
	status?: 'busy' | 'away' | 'online' | 'offline'
}>()
</script>

<style scoped></style>