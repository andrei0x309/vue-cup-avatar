<script setup lang="ts">
import VACropper from './main/Main.vue'

const test = (data: any) => {
	console.log(data, 'sssss', 'ssss')
}

</script>

<template>
	<VACropper @cropped="test" />
</template>
