<script setup lang="ts">
import { useHover } from '@/composables/hover'
import { ref, watch } from 'vue'

const headerRef = ref(null)

const { isHover } = useHover(headerRef)

watch(
  isHover,
  (newValue) => {
    console.log(newValue)
  },
  { immediate: true },
)
</script>

<template>
  <header ref="headerRef" class="header"></header>
</template>

<style scoped>
.header {
  width: 100%;
  height: var(--header-height);
  background: transparent;
  backdrop-filter: blur(5px);
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  left: 0;
  top: 0;
}
</style>
