<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'

const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)
</script>

<template>
  <div class="layout">
    <AppHeader />

    <!-- LNB와 메인 컨텐츠를 묶는다 -->
    <div class="content">
      <AppSidebar />
      <main :class="['main-content', { collapsed: isCollapsed }]">
        {{ isCollapsed }}
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1; /** layout이 flex-direction: column이므로 header 아래 남은 공간 모두 차지 */
  margin-top: var(--header-height);
}

.main-content {
  flex: 1; /** main-content가 사이드바 제외한 남은 공간 모두 차지 */
  padding: 24px;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
  margin-left: var(--sidebar-width);
}

.main-content.collapsed {
  margin-left: var(--collapsed-sidebar-width);
}
</style>
