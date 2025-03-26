<script setup lang="ts">
defineProps<{
  isDark: boolean
  size?: number | string
}>()
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size ?? 24"
    :height="size ?? 24"
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="theme-icon"
    :class="{ 'is-dark': isDark }"
  >
    <!-- glow 효과 적용 -->
    <defs>
      <filter id="moon-glow" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- 달 -->
    <g class="moon" :class="{ visible: isDark }">
      <path d="M12 2a9 9 0 1 0 9 10 7 7 0 0 1-9-10z" filter="url(#moon-glow)" />
    </g>

    <!-- 해 -->
    <g class="sun" :class="{ visible: !isDark }">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </g>
  </svg>
</template>

<style scoped>
.theme-icon {
  transition: all 0.2s ease;
  stroke: white;
}

.theme-icon:not(.is-dark) {
  stroke: black;
}

.sun,
.moon {
  opacity: 0;
  transform: scale(0.8) rotate(-20deg);
  transition: all 0.2s ease;
  transform-origin: center;
}

.visible {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
</style>
