<script setup lang="ts">
import CherryBlossom from './CherryBlossom.vue'

defineProps<{
  count?: number
}>()
</script>

<template>
  <div class="falling-wrapper">
    <CherryBlossom v-for="n in count" :key="'petal' + n" />
  </div>
</template>

<style scoped>
.falling-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 10;
}
</style>
