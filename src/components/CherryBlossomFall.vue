<script setup lang="ts">
import CherryBlossom from './CherryBlossom.vue'

defineProps<{
  count?: number
}>()
</script>

<template>
  <div>
    <CherryBlossom v-for="n in count" :key="'petal' + n" />
  </div>
</template>
