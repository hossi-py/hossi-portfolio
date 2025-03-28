<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import CustomButton from './button/CustomButton.vue'

const sidebarStore = useSidebarStore()
const { isCollapsed } = storeToRefs(sidebarStore)
</script>

<template>
  <aside :class="['sidebar', { collapsed: isCollapsed }]">
    <CustomButton :size="40" icon-only @click="sidebarStore.toggleSidebar">
      <img src="/src/assets/images/sidebar-toggle.png" width="40px" height="40px" />
    </CustomButton>
    <nav class="menu" v-if="!isCollapsed">
      <ul>
        <li><RouterLink to=""></RouterLink></li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width); /* LNB의 너비 */
  height: 100vh; /* 화면 전체 높이 */
  border-right: 1px solid var(--border-color);
  position: fixed;
  left: 0;
  overflow-y: auto;
  padding: 16px;
}

.sidebar.collapsed {
  width: var(--collapsed-sidebar-width); /* 접힌 상태의 너비 */
}

.menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 16px;
}

.menu a {
  text-decoration: none;
  color: var(--text-color);
  font-size: 1rem;
}

.menu a:hover {
  background: transparent;
  color: var(--accent-color);
}
</style>
