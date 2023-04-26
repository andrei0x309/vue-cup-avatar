<template>
	<div class="twvac-flex twvac-space-x-1">
		<div
			v-for="part in parts"
			:key="part"
			class="twvac-rounded-md twvac-bg-gray-700 twvac-px-2 twvac-py-1 twvac-text-xs twvac-capitalize twvac-font-medium twvac-text-gray-200"
			v-text="name(part)"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
	keybindings: string
}>()

const parts = props.keybindings.split('+')
const name = (key: string) => {
	const map: Record<string, string> = {
		ArrowLeft: '←',
		ArrowRight: '→',
		ArrowUp: '↑',
		ArrowDown: '↓',
		Minus: '-',
		Plus: '+',
	}

	return map[key] ?? key
}
</script>

<style scoped></style>