<template>
	<div class="twvac-flex-col" :class="!keep ? 'sm:twvac-hidden md:twvac-flex' : 'twvac-flex'">
		<span v-if="name" class="twvac-text-sm twvac-font-bold twvac-text-gray-500 twvac-mb-1" v-text="name" />
		<div class="twvac-flex twvac-items-center -twvac-ml-1" :class="wrapper">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	name?: string
	wrapper?: string | object | string[]
	keep?: boolean
}>()
</script>

<style scoped></style>