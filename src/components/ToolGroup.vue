<template>
	<div class="flex-col" :class="!keep ? 'sm:hidden md:flex' : 'flex'">
		<span v-if="name" class="text-sm font-bold text-gray-500 mb-1" v-text="name" />
		<div class="flex items-center -ml-1" :class="wrapper">
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