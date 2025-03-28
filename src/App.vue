<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import CherryBlossomFall from './components/CherryBlossomFall.vue'
import SnowFall from './components/SnowFall.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import customRoutes from './router/customRoutes'
import { useThemeStore } from './stores/themeStore'

const route = useRoute()

const themeStore = useThemeStore()
const { isDark, isSeasonThemeActive } = storeToRefs(themeStore)

// 커스텀 경로인지 확인
const isCustomRoute = computed(() =>
  customRoutes.some((customRoute) => customRoute.path === route.path),
)

// 메타 정보에서 레이아웃을 가져오고, 없으면 기본 레이아웃 사용
const layout = computed(() => {
  if (isCustomRoute.value) return 'div' // 커스텀 경로는 레이아웃 없이 그대로 표시
  return route.meta.layout || DefaultLayout // 기본 레이아웃 적용
})
</script>

<template>
  <CherryBlossomFall v-if="!isDark && isSeasonThemeActive" :count="20" />
  <SnowFall v-if="isDark && isSeasonThemeActive" />

  <component :is="layout">
    <RouterView />
  </component>
</template>
